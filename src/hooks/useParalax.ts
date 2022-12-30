import { useEffect,useState,useRef } from "react";
import AnimationsManager from "../utils/Animator/Components/AnimationsManager";

const useParalax = (writer:any,size:{w:number,h:number},end_of_paralax:(state:boolean)=>void):(quantity:number) => any =>{

    const [scrollValue,setScrollValue] = useState<number>(0);
    const [currentLevel,setCurrentLevel] = useState<number>(0);
    const [freezeScroll,setFreezeScroll] = useState<boolean>(false);

    const last_wave_time = useRef<number>(0);

    useEffect(()=>{
        if(writer){
            if(Date.now() - last_wave_time.current > 1600 ){
                //writer.wave_from_bottom(1200,4000);
                last_wave_time.current = Date.now();
            }
            if(scrollValue> 500 && currentLevel === 0){
                writer.wave_from_bottom(1200,4000);
                const word = 'hello';
                const x_size = AnimationsManager.calculate_width_for_word(word,size);
                const x_pos = (window.innerWidth - x_size) /2;
                const y_pos = (window.innerHeight)/2 - 100;
                writer.write(word,{x:x_pos,y:y_pos},1500,size);
                setCurrentLevel(curr => curr +1);
            }
            if(scrollValue> 1000 && currentLevel === 1){
                writer.wave_from_bottom(1200,4000);
                const word = 'my name is tymoteusz';
                const x_size = AnimationsManager.calculate_width_for_word(word,size);
                const x_pos = (window.innerWidth - x_size) /2;
                const y_pos = (window.innerHeight)/2 - 100;
                writer.write(word,{x:x_pos,y:y_pos},1500,size);
                setCurrentLevel(curr => curr +1);
            }
            if(scrollValue> 1500 && currentLevel === 2){
                writer.wave_from_bottom(1200,4000);
                const word = 'i am a front-end developer';
                const x_size = AnimationsManager.calculate_width_for_word(word,size);
                const x_pos = (window.innerWidth - x_size) /2;
                const y_pos = (window.innerHeight)/2 - 100;
                writer.write(word,{x:x_pos,y:y_pos},1500,size);
                setCurrentLevel(curr => curr +1);
            }
            if(scrollValue> 2000 && currentLevel === 3){
                writer.wave_from_bottom(1200,4000);
                const word = 'and this is my portfolio';
                const x_size = AnimationsManager.calculate_width_for_word(word,size);
                const x_pos = (window.innerWidth - x_size) /2;
                const y_pos = (window.innerHeight)/2 - 100;
                writer.write(word,{x:x_pos,y:y_pos},1500,size);
                setCurrentLevel(curr => curr +1);
            }
            if(scrollValue> 2500 && currentLevel === 4){
                writer.wave_from_bottom(1200,4000);
                const word = 'enjoy';
                const x_size = AnimationsManager.calculate_width_for_word(word,size);
                const x_pos = (window.innerWidth - x_size) /2;
                const y_pos = (window.innerHeight)/2 - 100;
                writer.write(word,{x:x_pos,y:y_pos},1500,size);
                setCurrentLevel(curr => curr +1);
            }
            if(scrollValue> 3000 && currentLevel === 5){
                writer.wave_from_bottom(1200,4000);
                const word = '';
                writer.write(word,{x:0,y:0},1500,size);
                end_of_paralax(true);
            }
        }   
    },[scrollValue,writer,currentLevel,size,end_of_paralax])

    useEffect(()=>{
        setFreezeScroll(true);
        setTimeout(()=>{
            setFreezeScroll(false);
        },1000)
    },[currentLevel])

    useEffect(()=>{
        if(writer && scrollValue === 0){
            const word = 'scroll me';
            const x_size = AnimationsManager.calculate_width_for_word(word,size);
            const x_pos = (window.innerWidth - x_size) /2;
            const y_pos = (window.innerHeight)/2 - 100;
            writer.write(word,{x:x_pos,y:y_pos},1500,size);
        }
    },[writer,size,scrollValue])

    return (quantity:number) =>{setScrollValue(curr => {if(!freezeScroll){return curr + quantity}else{return quantity}})}
}

export default useParalax;