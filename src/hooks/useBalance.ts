import { useState, useEffect, useCallback } from "react"
import { Dictionary } from "ramda"
import { Coins } from "@terra-money/terra.js"
import lcd from "../helpers/lcd"
import { tokenAddress, symbols } from "../helpers/constants"
import contractQuery from "../helpers/contractQuery"
import { useApp } from "../components/App"

export default (): API<Balance> => {
  const { wallet } = useApp()
  const address = wallet?.address

  const [balance, setBalance] = useState<Balance>()
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<Error>()

  const execute = useCallback(async () => {
    if (address) {
      try {
        const balance = await queryBalance(address)
        setBalance(balance)
      } catch (error) {
        setError(error)
      } finally {
        setLoading(false)
      }
    }
  }, [address])

  useEffect(() => {
    execute()
  }, [execute])

  return { data: balance, loading, error, execute }
}

/* api */
const queryBalance = async (address: string) => {
  /* Terra balance */
  const reduceBalance = (balance: Coins): Dictionary<string> =>
    balance
      .toArray()
      .reduce(
        (acc, { denom, amount }) => ({ ...acc, [denom]: amount.toString() }),
        {}
      )

  const terraBalance = reduceBalance(await lcd.bank.balance(address))

  /* Mirror balance */
  const query = async (symbol: string): Promise<string> => {
    const { balance } = await contractQuery<{ balance: string }>(
      tokenAddress[symbol],
      { balance: { address: address } }
    )

    return balance
  }

  const mirrorBalance = (
    await Promise.all(symbols.map((symbol) => query(symbol)))
  ).reduce((acc, cur, index) => ({ ...acc, [symbols[index]]: cur }), {})

  return { ...terraBalance, ...mirrorBalance }
}
