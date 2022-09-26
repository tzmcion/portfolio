import roundRect from './RoundRect';

class Field{
    public size:{w:number,h:number}
    public position:{x:number,y:number}
    public radius:number
    public ctx: CanvasRenderingContext2D
    public color:string | undefined | CanvasGradient
    public isHigherOrder:boolean
    public isInWord:boolean
    constructor(ctx:CanvasRenderingContext2D,width:number,height:number,x:number,y:number,r:number){
        this.ctx = ctx;
        this.size={w:width,h:height}
        this.position = {x:x,y:y}
        this.radius = r;
        this.color = undefined
        this.isHigherOrder = false;
        this.isInWord = false;
        this.set_size = this.set_size.bind(this);
        this.set_position_and_size = this.set_position_and_size.bind(this);
        this.draw_field = this.draw_field.bind(this);
    }

    public set_position_and_size(pos?:{x:number,y:number},size?:{w:number,h:number}){
        if(pos)this.position = pos;
        if(size)this.size = size;
    }

    public set_static_color(color:string | CanvasGradient){
        this.color = color;
    };

    public set_size(size:{w:number,h:number}){
        this.size = size;
    }


    public draw_field(color: string | CanvasGradient){
        this.ctx.fillStyle = this.color === undefined ? color : this.color;
        roundRect(this.ctx,this.position.x,this.position.y,this.size.w,this.size.h,this.radius);
        this.ctx.fill();
    }
}

export default Field;