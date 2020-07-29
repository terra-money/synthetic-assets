import { useState, useEffect, useCallback } from "react"
import { symbols, oracleAddress } from "../helpers/constants"
import contractQuery from "../helpers/contractQuery"

export default (): API<Prices> => {
  const [prices, setPrices] = useState<Prices>({})
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<Error>()

  const execute = useCallback(async () => {
    try {
      const prices = await queryPrices()
      setPrices(prices)
    } catch (error) {
      setError(error)
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    execute()
  }, [execute])

  return { data: prices, loading, error, execute }
}

/* api */
const queryPrices = async (): Promise<Prices> => {
  const query = async (symbol: string) => {
    const { price } = await contractQuery<{ price: string }>(
      oracleAddress[symbol],
      { price: {} }
    )

    return price
  }

  const prices = (
    await Promise.all(symbols.map((symbol) => query(symbol)))
  ).reduce((acc, cur, index) => ({ ...acc, [symbols[index]]: cur }), {})

  return prices
}
