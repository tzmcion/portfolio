import {useEffect,RefObject, useState } from "react";

interface AnimatorProps{
    new (ctx:CanvasRenderingContext2D,width:number,height:number): any,
    updateDimensions?: (width:number,height:number) => void,
    render?: () => void,
    stopRender?:() => void,
    rebuildFields?:() => void,
    isRendering?:boolean
}

const useCanvas = (ref:RefObject<HTMLCanvasElement>,Animator:AnimatorProps,dimensions:{width:number,height:number}):any =>{
    const [animator,setAnimator] = useState<AnimatorProps>();

    //initialize
    useEffect(()=>{
        if(ref.current !== null && animator==null){
            const ctx = ref.current.getContext('2d');
            ctx && setAnimator(new Animator(ctx,dimensions.width,dimensions.height));
        }
        if(animator){
            if(!animator.isRendering){
                animator.render && animator.render();
                animator.isRendering = true;
            }
        }
    },[ref,Animator,animator,dimensions.width,dimensions.height]);

    useEffect(()=>{
        if(animator){
            if(animator.updateDimensions)
            animator.updateDimensions(dimensions.width,dimensions.height);
            animator.rebuildFields!();
        }
    },[dimensions,animator])

    const stopAnimator = () =>{
        if(animator){
            animator.stopRender && animator.stopRender();
        }
    }

    return [animator,stopAnimator]
}

export default useCanvas