class MovableBackgroundGradient{
    private colors:{1:string,2:string,3:string}
    private letter_colors:{1:string,2:string,3:string}
    private gradient_pos:{x:number,y:number}
    public gradient: CanvasGradient
    public letter_gradient:CanvasGradient
    public width:number
    public height:number
    private ctx_gradient:CanvasRenderingContext2D
    constructor(colors:{1:string,2:string,3:string},letter_colors:{1:string,2:string,3:string},ctx:CanvasRenderingContext2D,width:number,height:number){
        this.colors = colors;
        this.letter_colors = letter_colors;
        this.gradient_pos = {x:-width,y:0}
        this.width = width;
        this.height = height;
        this.gradient = ctx.createLinearGradient(0,0,1,1);
        this.letter_gradient = ctx.createLinearGradient(0,0,1,1);
        this.ctx_gradient = ctx;

        this.animate_gradient = this.animate_gradient.bind(this);
        this.updateDimensions = this.updateDimensions.bind(this);
    }

    public updateDimensions(width:number,height:number):void{
        this.width = width;
        this.height = height;
    }

    public animate_gradient(speed:number = 10){
        this.gradient_pos.x += speed;
        if(this.gradient_pos.x >= 0){
            const second_gradient = this.colors['2'];
            const third_gradient = this.colors['3'];
            this.colors['3'] = this.colors['1'];
            this.colors['2'] = third_gradient;
            this.colors['1'] = second_gradient;
            this.gradient_pos.x = -this.width;

            const let_sc = this.letter_colors['2'];
            const third_sc = this.letter_colors['3'];
            this.letter_colors['3'] = this.letter_colors['1'];
            this.letter_colors['2'] = third_sc;
            this.letter_colors['1'] = let_sc;
        }
        this.gradient = this.ctx_gradient.createLinearGradient(this.gradient_pos.x,this.height/2,this.gradient_pos.x + this.width*2,this.height/2);
        this.gradient.addColorStop(1,this.colors['1']);
        this.gradient.addColorStop(0.5,this.colors['2']);
        this.gradient.addColorStop(0,this.colors['3']);

        this.letter_gradient = this.ctx_gradient.createLinearGradient(this.gradient_pos.x,this.height/2,this.gradient_pos.x + this.width*2,this.height/2);
        this.letter_gradient.addColorStop(1,this.letter_colors['1']);
        this.letter_gradient.addColorStop(0.5,this.letter_colors['2']);
        this.letter_gradient.addColorStop(0,this.letter_colors['3']);
    }
}

export default MovableBackgroundGradient;