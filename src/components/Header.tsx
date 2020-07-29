import React from "react"
import { format } from "@terra-money/use-station"

interface Props {
  address?: string
  onClick?: () => void
}

const Header = ({ address, onClick }: Props) => {
  return (
    <nav className="navbar navbar-light bg-light">
      <div className="container">
        <a className="navbar-brand" href="/">
          Synthetic assets
        </a>

        <form className="form-inline">
          <button
            type="button"
            className="btn btn-outline-secondary"
            onClick={onClick}
          >
            {address ? format.truncate(address, [6, 6]) : "Connect wallet"}
          </button>
        </form>
      </div>
    </nav>
  )
}

export default Header
