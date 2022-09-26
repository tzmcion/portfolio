import React, { ReactElement } from 'react'
import Link from './SingleLink'
import sites from '../../../../Assets/sites.json';

interface SubPageProps{
  ending:boolean
}

export default function Links({ending}:SubPageProps):ReactElement {

    const renderLinks = ():Array<ReactElement> =>{
        const elements_arr:Array<ReactElement> = [];
        sites.map((site,index) => {if(site.name !== 'Home'){elements_arr.push(<Link to={site.name} bg={site.bg} key={index} />)}return null;} )
        return elements_arr;
    }

  return (
    <div className={`Links ${ending? 'Links_ending' : ''}`}>
        {renderLinks()}
    </div>
  )
}
