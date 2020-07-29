import { LCDClient } from "@terra-money/terra.js"

const lcd = new LCDClient({
  URL: "https://tequila-fcd.terra.dev",
  chainID: "tequila-0001",
  gasPrices: { uusd: 0.015 },
})

export default lcd
