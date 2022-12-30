import {ActionsManagerField as Field} from "./Components/ActionsManager";
import AnimationsManager from "./Components/AnimationsManager";
import MovableBackgroundGradient from "./Components/MovableBackgroundGradient";

class Animator extends MovableBackgroundGradient{
    private ctx:CanvasRenderingContext2D
    private frame:number
    private Fields:Array<Array<Field>>
    private letterFields:Array<Field>
    private originals:{w:number,h:number}
    public isRendering:boolean
    constructor(ctx:CanvasRenderingContext2D,width:number,height:number){
        super({1:"#3A1C71",2:"#D76D77",3:"#FFAF7B"},{1:"orange",2:"black",3:"black"},ctx,width,height);
        this.ctx=ctx;
        this.isRendering = false;
        this.frame = 0;
        this.Fields = [];
        this.letterFields = [];
        this.originals = this.create_fields(50,40,{x:2,y:1},5);
        this.wave_from_bottom(1200,4000);
        // setInterval(()=>{
        //     AnimationsManager.generate_wave_vertical(this.Fields,this.originals,{w:1,h:1},2000,2000)},4000)
        // //
        this.render = this.render.bind(this);
        this.stopRender = this.stopRender.bind(this);
        this.wave_from_bottom = this.wave_from_bottom.bind(this);
        this.write = this.write.bind(this);
    }

    private create_fields(quantity_width:number,quantity_height:number,whitespace:{x:number,y:number},radius:number):{w:number,h:number}{
        const horizontal_quantity = Math.floor(this.width /  (whitespace.x + quantity_width)) +  1;
        const vertical_quantity = Math.floor(this.height /  (whitespace.y + quantity_height)) + 1;
        let positions = {x: 2, y: 2};
        for(let x = 0; x < quantity_width; x++){
            const row:Array<Field> = [];
            positions.y = 0;
            for(let y = 0; y < quantity_height; y++){
                row.push(new Field(this.ctx,horizontal_quantity,vertical_quantity,positions.x,positions.y,radius));
                positions.y += Math.floor(vertical_quantity) + whitespace.y;
            }
            positions.x += Math.floor(horizontal_quantity) + whitespace.x; 
            this.Fields.push(row);
        }
        this.Fields.map(row => row.map(field => field.set_auto_resize_with_delay({w:2,h:2},0,0,true)))
        return {w:horizontal_quantity,h:vertical_quantity}
    }

    private create_letter_fields(size:{w:number,h:number},radius:number,quantity:number,count_current:boolean){
        const new_fields_quantity = count_current ? quantity - this.letterFields.length:quantity;
        for(let x = -1; x < new_fields_quantity; x++){
            this.letterFields.push(new Field(this.ctx,size.w,size.h,-100,Math.floor(Math.random() * this.height),radius));
        }
        
    }

    public write(word:string,position:{x:number,y:number},delay:number,size?:{w:number,h:number}):void{
        AnimationsManager.free_letters(this.letterFields);
        const sizes = size === undefined? {w:15,h:15} : size;
        this.create_letter_fields(sizes,3,AnimationsManager.calculate_fields_for_word(word),true);
        let positions = {x:position.x,y:position.y,last_index:-1}
        for(let x = 0; x < word.length; x++){
            positions = AnimationsManager.draw_letter(this.letterFields,word[x],sizes,{x:positions.x,y:position.y},delay,positions.last_index + 1);
        }
        let newFields:Array<Field> = [];
        this.letterFields.map(field=>{
            if(field.isInWord){newFields.push(field)}
            return null;
        })
        this.letterFields = newFields;
        
    }

    public wave_from_bottom(wave_duration:number,duration:number):void{
        AnimationsManager.generate_wave_from_bottom(this.Fields,{w:3,h:3},this.originals,wave_duration,duration);
    }

    public stopRender():void{
        this.ctx.clearRect(0,0,this.width,this.height);
        window.cancelAnimationFrame(this.frame);
    }

    public rebuildFields():void{
        this.Fields = []
        this.originals = this.create_fields(50,40,{x:2,y:1},5);
    }

    public render():void{
        this.ctx.clearRect(0,0,this.width,this.height);
        const toDrawLAter:Array<Field> = [];
        this.Fields.map(row =>{
            row.map(field =>{
                if(field.isHigherOrder){toDrawLAter.push(field)}
                !field.isHigherOrder && field.draw(this.gradient);
                return null;
            })
            return null;;
        })
        toDrawLAter.map(f =>{
            f.draw(this.gradient);
            return null;
        })
        this.letterFields.map(field=>field.draw(this.letter_gradient))
        this.animate_gradient(30);
        this.frame = window.requestAnimationFrame(this.render);
    }
}

export default Animator;