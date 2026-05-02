from fastapi import APIRouter, Depends, HTTPException
from pydantic import BaseModel
from sqlalchemy.orm import Session
try:
    from backend.database.db import get_db
    from backend.models.transaction import Transaction
except ImportError:
    from database.db import get_db
    from models.transaction import Transaction
from web3 import Web3
import os
import json

router = APIRouter()

# Blockchain Connection
RPC_URL = os.getenv("BLOCKCHAIN_RPC_URL", "http://localhost:8545")
web3 = Web3(Web3.HTTPProvider(RPC_URL))

# Contract Configuration
CONTRACT_ADDRESS = os.getenv("CONTRACT_ADDRESS", "")
PRIVATE_KEY = os.getenv("BLOCKCHAIN_PRIVATE_KEY", "")

# Load ABI
ABI = [
    {
        "anonymous": False,
        "inputs": [
            {"indexed": True, "internalType": "address", "name": "beneficiary", "type": "address"},
            {"indexed": False, "internalType": "uint256", "name": "amount", "type": "uint256"},
            {"indexed": False, "internalType": "string", "name": "department", "type": "string"}
        ],
        "name": "FundAllocated",
        "type": "event"
    },
    {
        "inputs": [
            {"internalType": "address", "name": "_beneficiary", "type": "address"},
            {"internalType": "uint256", "name": "_amount", "type": "uint256"},
            {"internalType": "string", "name": "_department", "type": "string"}
        ],
        "name": "allocateFund",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    }
]

def get_blockchain():
    rpc_url = os.getenv("BLOCKCHAIN_RPC_URL", "http://127.0.0.1:8545")
    w3 = Web3(Web3.HTTPProvider(rpc_url))
    
    addr = os.getenv("CONTRACT_ADDRESS", "")
    key = os.getenv("BLOCKCHAIN_PRIVATE_KEY", "")
    
    contract_obj = None
    if addr:
        contract_obj = w3.eth.contract(address=Web3.to_checksum_address(addr), abi=ABI)
    
    return w3, contract_obj, key

class AllocationRequest(BaseModel):
    beneficiary: str
    amount: float
    department: str

@router.post("/allocate")
def allocate_fund(req: AllocationRequest, db: Session = Depends(get_db)):
    w3, contract_obj, key = get_blockchain()
    
    if not w3.is_connected() or not contract_obj:
        print(f"DEBUG: Connection: {w3.is_connected()}, Contract: {contract_obj is not None}")
        raise HTTPException(status_code=500, detail="Blockchain connection failed or contract not configured")
    
    try:
        account = w3.eth.account.from_key(key)
        nonce = w3.eth.get_transaction_count(account.address)
        
        # Build transaction
        tx = contract_obj.functions.allocateFund(
            Web3.to_checksum_address(req.beneficiary),
            int(req.amount * 10**6), # Assume 6 decimals for USDC-like precision
            req.department
        ).build_transaction({
            'from': account.address,
            'nonce': nonce,
            'gas': 200000,
            'gasPrice': w3.eth.gas_price
        })
        
        # Sign and send
        signed_tx = w3.eth.account.sign_transaction(tx, key)
        tx_hash = w3.eth.send_raw_transaction(signed_tx.raw_transaction)
        tx_receipt = w3.eth.wait_for_transaction_receipt(tx_hash)
        
        return {
            "status": "success",
            "hash": w3.to_hex(tx_hash),
            "block": tx_receipt.blockNumber
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.get("/ledger")
def get_ledger():
    w3, contract_obj, _ = get_blockchain()
    if not w3.is_connected() or not contract_obj:
        # Return mock data for demonstration when Docker/Ganache is not running
        return {"events": [
            {
                "id": 105,
                "hash": "0x3f5c71a391a2bcde5f4a",
                "from": "0x0000000000000000000000000000000000000000",
                "to": "0x4A2b1c90df00",
                "amount": 25000,
                "department": "Welfare",
                "status": "Confirmed"
            },
            {
                "id": 104,
                "hash": "0x88b1e0f22c44aa11",
                "from": "GovTreasury",
                "to": "0x911Caabbccdd",
                "amount": 12500,
                "department": "Health",
                "status": "Confirmed"
            },
            {
                "id": 103,
                "hash": "0x11a58f773b000011",
                "from": "GovTreasury",
                "to": "0x2B9a00f12cde",
                "amount": 50000,
                "department": "Education",
                "status": "Confirmed"
            }
        ]}
    
    try:
        # Fetch last 50 FundAllocated events
        events = contract_obj.events.FundAllocated.get_logs(from_block=0)
        formatted_events = []
        for event in events:
            formatted_events.append({
                "id": event.blockNumber,
                "hash": w3.to_hex(event.transactionHash),
                "from": "GovTreasury",
                "to": event.args.beneficiary,
                "amount": f"{event.args.amount / 10**6:.2f} USDC",
                "department": event.args.department,
                "status": "Verified"
            })
        return {"events": formatted_events[::-1]} # Latest first
    except Exception as e:
        print("Error fetching ledger:", e)
        return {"events": []}
