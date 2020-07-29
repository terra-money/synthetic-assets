import React, { StrictMode } from "react"
import { render } from "react-dom"
import { BrowserRouter as Router } from "react-router-dom"
import "./customize.scss"
import App from "./components/App"

render(
  <StrictMode>
    <Router>
      <App />
    </Router>
  </StrictMode>,
  document.getElementById("root")
)
