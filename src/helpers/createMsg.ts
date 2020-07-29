import { MsgExecuteContract, Coins, Msg } from "@terra-money/terra.js"
import { marketAddress, tokenAddress } from "./constants"
import { toSnakeCase } from "../utils"

export enum Type {
  "BUY" = "Buy",
  "SELL" = "Sell",
}

interface ContractParams {
  address: string
  type: Type
  amount: string
  denom: string
}

const contract = (params: ContractParams): Msg[] => {
  const { address, type, amount, denom } = params
  const coins = new Coins([])

  const msgs: Record<Type, MsgExecuteContract[]> = {
    [Type.SELL]: [
      new MsgExecuteContract(
        address,
        tokenAddress[denom],
        toSnakeCase({ approve: { amount, spender: marketAddress } }),
        coins
      ),
      new MsgExecuteContract(
        address,
        marketAddress,
        toSnakeCase({ sell: { amount, symbol: denom } }),
        coins
      ),
    ],
    [Type.BUY]: [
      new MsgExecuteContract(
        address,
        marketAddress,
        toSnakeCase({ buy: { symbol: denom } }),
        new Coins(amount + denom)
      ),
    ],
  }

  return msgs[type]
}

export default { contract }
