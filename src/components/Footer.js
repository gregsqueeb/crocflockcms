import React from 'react'


import instagram from '../img/insta.png'

const Footer = class extends React.Component {
  render() {
    return (
      <div className="footer">
        <a className="insta-link" href="https://instagram.com/crocflock"><img alt="Instagram Logo" className="insta-image" src={instagram} /></a>
      </div>
    )
  }
}

export default Footer
