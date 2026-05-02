import hre from "hardhat";

async function main() {
  const GovTrust = await hre.ethers.getContractFactory("GovTrust");
  const govTrust = await GovTrust.deploy();

  await govTrust.waitForDeployment();

  console.log(
    `GovTrust deployed to: ${await govTrust.getAddress()}`
  );
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
