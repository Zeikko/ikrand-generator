import React from 'react'
import { IndexLink, Link } from 'react-router'
import './Header.scss'

export const Header = () => (
  <div>
    <h1>Ikrand Generator</h1>
    <IndexLink to='/' activeClassName='route--active'>Home</IndexLink>
    {' · '}
    <Link to='/item' activeClassName='route--active'>Magic Item Generator</Link>
  </div>
)

export default Header
