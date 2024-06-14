import { ContractInterface } from 'ethers'
import CheckinAbi from 'src/abis/Checkin.json'

export const CheckinContractConfig = {
  address: "0x89d4007e38a74ee85d6b50801bd972ba6c5c3fb5",
  abi: CheckinAbi.abi as ContractInterface
}