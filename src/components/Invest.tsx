import React, { useState, useEffect, Fragment } from "react"
import { ReactNode, FormEvent } from "react"
import { useLocation } from "react-router-dom"
import { Dictionary, isNil } from "ramda"
import c from "classnames"

import { Coin as TerraCoin } from "@terra-money/terra.js"
import { format, gte } from "@terra-money/use-station"

import { marketAddress, DENOM } from "../helpers/constants"
import contractQuery from "../helpers/contractQuery"
import createMsg, { Type } from "../helpers/createMsg"

import { useBalance, usePrices, useSubmit } from "../hooks"
import { useApp } from "./App"

interface Simulated {
  commissionAmount: Coin
  returnAmount: Coin
  spreadAmount: Coin
}

const CURRENCY = "uusd"
const CONFIG = {
  chainID: "tequila-0002",
  URL: "https://tequila-lcd.terra.dev",
  gasPrices: { uusd: 0.015 },
}

const Invest = () => {
  const { hash } = useLocation()
  const { wallet } = useApp()
  const { post, success, result } = useSubmit()

  /* init */
  const { execute: refreshPrice, ...prices } = usePrices()
  const { execute: refreshBalance, ...balance } = useBalance()

  /* form */
  const initType = () => (hash.replace("#", "") as Type) || Type.BUY
  const [type, setType] = useState<Type>(initType)
  const [input, setInput] = useState<string>("")
  const [symbol, setSymbol] = useState<string>("")
  const amount = format.toAmount(input)

  /* validate */
  const validateBalance = (denom: string) =>
    !!balance.data?.[denom] && gte(balance.data[denom], amount)

  const canInvest: Record<Type, boolean> = {
    [Type.SELL]: validateBalance(symbol),
    [Type.BUY]: validateBalance(CURRENCY),
  }

  const disabled = !symbol || !input || !canInvest[type]

  /* submit */
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    const { address } = wallet!
    post(createMsg.contract({ address, type, amount, denom: symbol }), CONFIG)
  }

  /* simulate */
  const [simulated, setSimulated] = useState<Dictionary<Simulated>>({})
  useEffect(() => {
    const coin = TerraCoin.fromString(amount + DENOM)

    const simulate = async () => {
      const simulated = await contractQuery<Simulated>(marketAddress, {
        simulation: {
          offerAmount: coin.amount.toString(),
          operation: type.toLowerCase(),
          symbol,
        },
      })

      setSimulated((prev) => ({ ...prev, [type + symbol + amount]: simulated }))
    }

    type && symbol && amount && simulate()
  }, [type, symbol, amount])

  /* render */
  const renderInfo = (simulated: Simulated, key: keyof Simulated) =>
    !(input && symbol)
      ? "Idle"
      : !info
      ? "Loading..."
      : formatCoin(simulated[key])

  const info = simulated[type + symbol + amount]
  const getSimulatedInfo = [
    {
      label: "Return",
      value: renderInfo(info, "returnAmount"),
    },
    {
      label: "Commission",
      value: renderInfo(info, "commissionAmount"),
    },
    {
      label: "Spread",
      value: renderInfo(info, "spreadAmount"),
    },
  ]

  return !isNil(success) ? (
    success ? (
      <pre>{JSON.stringify(result, null, 2)}</pre>
    ) : (
      <span>Failed</span>
    )
  ) : (
    <form className="mx-auto my-5" onSubmit={handleSubmit}>
      <h1>Invest</h1>

      <ul className="nav nav-tabs mb-3">
        {Object.values(Type).map((value) => (
          <li className="nav-item" key={value}>
            <a
              href={"#" + value}
              type="button"
              className={c("nav-link", type === value && "active")}
              onClick={() => setType(value)}
            >
              {value}
            </a>
          </li>
        ))}
      </ul>

      <div className="form-group">
        <label htmlFor="asset">Choose a asset</label>
        <select
          className="form-control"
          id="asset"
          value={symbol}
          onChange={(e) => setSymbol(e.target.value)}
          disabled={prices.loading}
        >
          <option value="" disabled>
            Assets
          </option>
          {prices.data &&
            Object.keys(prices.data).map((key) => (
              <option value={key} key={key}>
                {formatDenom(key)}
              </option>
            ))}
        </select>

        {symbol && balance.data && (
          <small className="form-text text-muted">
            Current balance:{" "}
            {formatCoin({ amount: balance.data[symbol], denom: symbol })}
          </small>
        )}
      </div>

      <div className="form-group">
        <label htmlFor="amount">Numbers of shares to mint</label>
        <input
          type="text"
          className="form-control"
          id="amount"
          value={input}
          onChange={(e) => setInput(sanitize(e.target.value))}
          autoComplete="off"
        />
      </div>

      <dl className="row">
        {getSimulatedInfo.map(({ label, value }) => (
          <Fragment key={label}>
            <dt className="col-sm-3">{label}</dt>
            <dd className="col-sm-9">{value}</dd>
          </Fragment>
        ))}
      </dl>

      <button type="submit" className="btn btn-secondary" disabled={disabled}>
        Submit
      </button>
    </form>
  )
}

export default Invest

/* utils */
const sanitize = (v: string = "") => (v ? v.replace(/[^\d.]/g, "") : "")

const formatDenom = (denom: string): string => denom.slice(1).toUpperCase()

const formatCoin = (coin: Coin): ReactNode => {
  const input = format.amount(coin.amount)
  const [integer, decimal] = input.split(".")

  const unit = formatDenom(coin.denom)

  return (
    <>
      {integer}
      <small className="text-muted">.{decimal}</small> {unit}
    </>
  )
}
