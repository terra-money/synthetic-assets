import React from "react"
import { createContext, useConnectWallet } from "../hooks"
import Header from "./Header"
import Main from "./Main"

const App = () => {
  const { connect, wallet } = useConnectWallet()

  return (
    <AppProvider value={{ wallet }}>
      <Header
        address={wallet?.address}
        onClick={wallet ? undefined : connect}
      />
      <Main />
    </AppProvider>
  )
}

export default App

/* context */
export const [useApp, AppProvider] = createContext<App>()
