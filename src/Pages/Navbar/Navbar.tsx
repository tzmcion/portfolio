import React, { ReactElement } from 'react';
import NavbarLink from './NavbarLink';
import Logo from './Logo';
import '../../Styles/Navbar.scss';

import Sites from '../../Assets/sites.json';



export default function Navbar():ReactElement {

    const renderLinks = ():Array<ReactElement> =>{
        return Sites.map((site,index):ReactElement => <NavbarLink to={site.href} key={index}>{site.name}</NavbarLink>)
    }

  return (
    <div className='Navbar'>
        <Logo />
        {renderLinks()}
    </div>
  )
}