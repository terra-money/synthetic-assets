import { useState } from "react"
import { Extension, Msg, LCDClientConfig } from "@terra-money/terra.js"

interface Return {
  hash?: string
  post: (msgs: Msg[], config?: LCDClientConfig) => void
}

export default (): Return => {
  const ext = new Extension()
  const [hash, setHash] = useState<string>()

  const post: Return["post"] = (msgs, config) => {
    ext.post(msgs, config)
    ext.on("onPost", ({ result }) => setHash(result.txhash))
  }

  return { hash, post }
}
