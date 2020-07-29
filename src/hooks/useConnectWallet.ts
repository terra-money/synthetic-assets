import { useState } from "react"
import { Extension } from "@terra-money/terra.js"

export default (): { wallet?: Wallet; connect: () => void } => {
  /* result */
  const [wallet, setWallet] = useState<Wallet>()
  const ext = new Extension()

  const connect = () => {
    ext.connect()
    ext.on("onConnect", setWallet)
  }

  return { connect, wallet }
}
