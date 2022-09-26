import React, { ReactElement } from 'react';
import { Link } from 'react-router-dom';

interface LinkProps{
    to:string
    bg:string
}

export default function SingleLink({to,bg}:LinkProps):ReactElement {
  return (
    <div style={{backgroundImage:'url("' + bg + '")'}} className='Link'>
        <h1 className='title'>{to}</h1>
        <Link className='Link-a' to={"/" + to} />
    </div>
  )
}
