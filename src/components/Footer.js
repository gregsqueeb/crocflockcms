import React from 'react'
import { OutboundLink } from 'gatsby-plugin-amplitude-analytics';


import instagram from '../img/insta.png'

const Footer = class extends React.Component {
  render() {
    return (
      <div className="footer">
        <OutboundLink className="insta-link" href="https://instagram.com/crocflock"><img alt="Instagram Logo" className="insta-image" src={instagram} /></OutboundLink>
      </div>
    )
  }
}

export default Footer
