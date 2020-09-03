import { useState } from "react"
import { Extension, Msg, LCDClientConfig } from "@terra-money/terra.js"

interface Return {
  success?: boolean
  result?: object
  post: (msgs: Msg[], config?: LCDClientConfig) => void
}

export default (): Return => {
  const ext = new Extension()
  const [success, setSuccess] = useState<boolean>()
  const [result, setResult] = useState<object>()

  const post: Return["post"] = (msgs, config) => {
    ext.post(msgs, config)
    ext.on("onPost", (params) => {
      const { success, result } = params
      setSuccess(success)
      setResult(result)
    })
  }

  return { success, result, post }
}
