import React, { ReactElement } from 'react';

import Sphere from '../../Assets/sphere.gif';

interface LogoProps{
    title?:string
}

export default function Logo({title = 'Tymoteusz Apriasz'}:LogoProps):ReactElement {
  return (
    <div className='Navbar-logo'>
        <img src={Sphere} alt="logo" />
        <h2 >{title}</h2>
    </div>
  )
}
