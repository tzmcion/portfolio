import React, { ReactElement, ReactNode } from 'react';
import {Link} from 'react-router-dom';

interface NavbarLinkProps{
    to:string,
    children:String | ReactNode
}

export default function NavbarLink({to,children}:NavbarLinkProps):ReactElement {
  return (
    <div className='Navbar-link' >
        <Link to={to}>{children}</Link>
    </div>
  )
}
