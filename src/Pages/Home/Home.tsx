import React, { ReactElement,useRef,useEffect,useState} from 'react';
import { useParams } from 'react-router-dom';
import Main from './Main/Main';
import '../../Styles/Home.scss';
import '../../Styles/Recruiters.scss';

import useDimensions from '../../hooks/useDimensions';
import useCanvas from '../../hooks/useCanvas';
import useParalax from '../../hooks/useParalax';
import Animator from '../../utils/Animator/Animator';

export default function Home():ReactElement {

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const dimensions = useDimensions(window.innerWidth,window.innerHeight);
  const [canvasManager] = useCanvas(canvasRef,Animator,dimensions);
  const [isScolled,setIsScrolled] = useState<boolean>(false); //CHANGED!!!
  const paralax = useParalax(canvasManager,{w:window.innerWidth/160,h:window.innerWidth/160},setIsScrolled);
  const params = useParams();
  const [myParams,setParams] = useState<string>('');


  useEffect(()=>{
    window.addEventListener('wheel',(ev) =>{ ev.deltaY > 0 && paralax(ev.deltaY + 200);/*adding scroll down value delta Y */ });
    window.addEventListener('touchmove', (ev) =>{paralax(500);})
  },[paralax])

  useEffect(()=>{
    if(params.page){
      setParams(params.page);
    }else{
      setParams('')
    }
  },[params])

  const renderData = ():ReactElement =>{
    if(isScolled){
      if(window.innerWidth >= 1600){
        return <Main subPage={myParams} />
      }else{
        return <div className='ToSmoll'>
          <h2>Your device size is too small to see the rest :c</h2>
          <h4>But you can still scroll to see the wave effect :)</h4>
              </div>
      }
    }else{
      return <></>
    }
  }

  return (
    <div className='Home'>
        <canvas className='Background' ref={canvasRef} width={dimensions.width} height={dimensions.height} />
        {renderData()}
    </div>
  )
}
