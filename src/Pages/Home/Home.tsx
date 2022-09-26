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
  const paralax = useParalax(canvasManager,{w:12,h:12},setIsScrolled);
  const params = useParams();
  const [myParams,setParams] = useState<string>('');


  useEffect(()=>{
    window.addEventListener('wheel',(ev) =>{ ev.deltaY > 0 && paralax(ev.deltaY);/*adding scroll down value delta Y */ });
  },[paralax])

  useEffect(()=>{
    if(params.page){
      setParams(params.page);
    }else{
      setParams('')
    }
  },[params])

  return (
    <div className='Home'>
        <canvas className='Background' ref={canvasRef} width={dimensions.width} height={dimensions.height} />
        {isScolled && <Main subPage={myParams} />}
    </div>
  )
}
