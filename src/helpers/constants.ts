import { Dictionary } from "ramda"

export const DENOM = "uust"
export const marketAddress = "terra1dqrzwx9trx3uhx5k6cm7dxm3dfgmsy58epswlc"

export const tokenAddress: Dictionary<string> = {
  sBTC: "terra15n8zdwru3rqv9nfzz8yd8mwk3758w0ccdlw6sz",
  sETH: "terra1tvr09egxn3wu8h2q9zdh2sammg3s8wfhml9t2p",
  sXRP: "terra1x4vt5xndndzq664rxtqrrqu9py9qndp3nw95lu",
  sLTC: "terra1twzjwa2vp07v6rpyz03wxl3vw3hx32467pmz8a",
  sBCH: "terra1j7t7h9ne6t7tdgvly8dr5432k6xar5u2u4rsz5",
  sXMR: "terra1fraaw7qfntyfnwfyehs57deyq3hjuaanws5tfk",
  sEOS: "terra1tkm3fzwaak7r2ktpqfk2yteqctpwgp46r2qdqt",
  sBAT: "terra158lkxlvn6zypqde62wngx9zdgtqkqw3e60ch6f",
  sXLM: "terra18td9ks42hgfscrnylnncmcaz7fvxrt45aevn33",
  sADA: "terra1wdqyjggekx8h03rwcxp80zx2shx26j5ra4qrqz",
}

export const oracleAddress: Dictionary<string> = {
  sBTC: "terra1m5xqrvpdlrj0ntlswf0zh75887df5eq2wg2pky",
  sETH: "terra1wgnpjk9s5dgyashvf4xl9hy3kzkfqynj8vlgyh",
  sXRP: "terra193lv5grxfjuppsku56ldx90qxlg2mdsfpk5uw0",
  sLTC: "terra1kqsmaakeas3ns2cjrqd5yuxjse7n93el0crh7w",
  sBCH: "terra1dq23sfrd9jl6lf0stnfxvxvtk9degyjgnde74r",
  sXMR: "terra14rl2tp9ql28tleyyyh8sahx4cqcm0v99h9vr78",
  sEOS: "terra1qjcnvc8u8mkhel6ecss288q0ftvd3ds6d583rc",
  sBAT: "terra16hwfksjt43me2v3rxg53qkmusgj8xc7njnekdf",
  sXLM: "terra1jch3uuu5nzhrywscpuh607y8zkyjwy0nlve55l",
  sADA: "terra15r4hlppq8yrntf4xz6wx8fpvng35st2uucm5nc",
}

export const symbols = Object.keys(tokenAddress)
