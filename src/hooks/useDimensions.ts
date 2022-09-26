import {useState,useEffect} from 'react';

interface dimensions{
    width:number,
    height:number
}

const useDimensions = (innerWidth:number,innerHeight:number):dimensions => {
    const [dimensions,setDimensions] = useState<dimensions>({width:innerWidth,height:innerHeight})

    useEffect(()=>{
        const handleResize = ():void =>{
            setDimensions({width:window.innerWidth,height:window.innerHeight});
        }
        window.addEventListener('resize',handleResize);
        return () => window.removeEventListener('resize',handleResize);
    },[]);


    return dimensions;
}

export default useDimensions