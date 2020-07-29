import { useState } from "react"
import { Extension, Msg } from "@terra-money/terra.js"

interface Return {
  hash?: string
  post: (msgs: Msg[]) => void
}

export default (): Return => {
  const ext = new Extension()
  const [hash, setHash] = useState<string>()

  const post = (msgs: Msg[]) => {
    ext.post(msgs)
    ext.on("onPost", ({ result }) => setHash(result.txhash))
  }

  return { hash, post }
}
