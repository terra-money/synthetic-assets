/// <reference types="react-scripts" />

interface App {
  wallet?: Wallet
}

interface Wallet {
  address: string
}

interface Coin {
  denom: string
  amount: string
}

type Balance = { [key: string]: string }
type Prices = { [key: string]: string }

interface API<T> {
  data?: T
  loading: boolean
  error?: Error
  execute: (params?: any) => void
}
