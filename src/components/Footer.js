import React from 'react'
import { Link } from 'gatsby'


import instagram from '../img/insta.png'

const Footer = class extends React.Component {
  render() {
    return (
      <div className="footer">
        <a className="insta-link" href="https://instagram.com/crocflock"><img className="insta-image" src={instagram} /></a>
      </div>
    )
  }
}

export default Footer
