import React from 'react'
import { Link } from 'gatsby'

const Navbar = class extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      active: false,
      navBarActiveClass: '',
    }
  }

  toggleHamburger = () => {
    // toggle the active boolean in the state
    this.setState(
      {
        active: !this.state.active,
      },
      // after state has been updated,
      () => {
        // set the class in state for the navbar accordingly
        this.state.active
          ? this.setState({
              navBarActiveClass: 'is-active',
            })
          : this.setState({
              navBarActiveClass: '',
            })
      }
    )
  }

  render() {
    return (
      <nav
        className="nav"
        role="navigation"
        aria-label="main-navigation"
      >
        <Link className="nav-item nav-link" to="/products">All Charms</Link>
        <h1 className="logo nav-item"><Link to="/" title="Logo">CrocFlock</Link></h1>
        <Link className="nav-item nav-link" to="/custom">Custom Charms</Link>
      </nav>
    )
  }
}

export default Navbar
