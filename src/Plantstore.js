import React from 'react';
import { connect } from "react-redux";

const Plantthings = ({ plantthings }) => {
return (
  <div className='storelist'>
  <ul className='storelist2'>
      {
        plantthings.map(plantthing => {
            return (
              <div className='plstore'>
                <li className= 'storename' key={plantthing.id}>
                    {plantthing.name} 
                </li>

                <li className='address'> 
                  {plantthing.address}
                </li>
                </div>
              );
          })  
        }  
  </ul>
  </div>
 )
}

export default connect(state => state)(Plantthings)