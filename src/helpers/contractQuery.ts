import lcd from "./lcd"
import { toSnakeCase, toCamelCase } from "../utils"

export default async <T>(address: string, query: object): Promise<T> => {
  const converted = toSnakeCase(query)
  const response = await lcd.wasm.contractQuery<T>(address, converted)
  return toCamelCase<T>(response)
}
