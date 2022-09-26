import React, { ReactElement, useState,useEffect,useRef } from 'react'
import Navbar from '../../Navbar/Navbar';
import About from './SubPages/About';
import Stack from './SubPages/Stack';
import Links from './SubPages/Links';
import Recruiters from './SubPages/Recruiters';
import MainPoints from './SubPages/Main_Points';
import Projects from './SubPages/Projects';

import '../../../Styles/BlocksAnimations.scss';

interface MainProps{
  subPage:string
}

export default function Main({subPage}:MainProps):ReactElement {

  const [ending,setEnding] = useState<boolean>(false);
  const [currentPage,setCurrentPage] = useState<string>('');
  const firstUpdate = useRef(true);

  useEffect(()=>{
    if(!firstUpdate.current){
    setEnding(true);
    setTimeout(()=>{
      setEnding(false);
      setCurrentPage(subPage);
    },1500)
    }
    firstUpdate.current = false;
  },[subPage])

  const renderBlocks = ():Array<ReactElement> =>{
    const toRender:Array<ReactElement> = [];
    console.log(currentPage.toLowerCase());
      switch(currentPage.toLowerCase()){
        case '':
          toRender.push(<About ending={ending} key={1} />,<Stack ending={ending} key={2} />,<Links ending={ending} key={3}/>);
          break;
        case 'for recruiters':
          toRender.push(<Recruiters ending={ending} key={1} />, <MainPoints ending={ending} key={2} />)
          break;
        case 'projects':
          toRender.push(<Projects ending={ending} key={1}  />)
          break;
        case 'github':
          break;
        case 'contact':
          break;
        default:
          break;
      }
    return toRender;
  }

  return (
    <div className='Main'>
        <div className='container'>
            <Navbar />
            {renderBlocks()}
        </div>
    </div>
  )
}
