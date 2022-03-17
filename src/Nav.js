import React from 'react'
import { connect } from 'react-redux'

const Nav = ({ plants, plantthings })=> {
    return (
       <nav>
          <a className='link1' href='#plants'>Plant Recommendations</a>
          <a className='link2' href='#plantthings'>Plant Stores</a> 
       </nav> 
    )
}


export default connect(state => state)(Nav);