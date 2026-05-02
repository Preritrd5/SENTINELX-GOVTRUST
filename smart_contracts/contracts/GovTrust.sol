// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/access/Ownable.sol";

contract GovTrust is Ownable {
    struct Certificate {
        bytes32 hash;
        uint256 issueDate;
        bool isValid;
    }

    struct FundAllocation {
        address beneficiary;
        uint256 amount;
        uint256 timestamp;
        string department;
    }

    mapping(address => Certificate) public certificates;
    FundAllocation[] public allocations;

    event FundAllocated(address indexed beneficiary, uint256 amount, string department);
    event CertificateIssued(address indexed beneficiary, bytes32 hash);
    event AuditLogStored(string action, bytes32 detailHash);

    constructor() Ownable(msg.sender) {}

    function allocateFund(address _beneficiary, uint256 _amount, string memory _department) external onlyOwner {
        allocations.push(FundAllocation({
            beneficiary: _beneficiary,
            amount: _amount,
            timestamp: block.timestamp,
            department: _department
        }));
        emit FundAllocated(_beneficiary, _amount, _department);
    }

    function issueCertificate(address _beneficiary, bytes32 _hash) external onlyOwner {
        certificates[_beneficiary] = Certificate({
            hash: _hash,
            issueDate: block.timestamp,
            isValid: true
        });
        emit CertificateIssued(_beneficiary, _hash);
    }

    function verifyCertificate(address _beneficiary, bytes32 _hash) external view returns (bool) {
        return certificates[_beneficiary].isValid && certificates[_beneficiary].hash == _hash;
    }

    function logAudit(string memory _action, bytes32 _detailHash) external onlyOwner {
        emit AuditLogStored(_action, _detailHash);
    }

    function getAllocationsCount() external view returns (uint256) {
        return allocations.length;
    }
}
