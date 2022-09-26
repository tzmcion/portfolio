import Field from './Field';
//@ts-ignore
import gradient from 'gradient-color';

interface ActionType{
    duration:number
    waitTime:number
    startTime:number
    sizeTo:{w:number,h:number}
    sizeStart:{w:number,h:number}
    positionStart:{x:number,y:number}
    priority:boolean
}

interface MoveAction{
    duration:number
    delay:number
    createTime:number
    from:{x:number,y:number}
    to:{x:number,y:number}
}

interface ColorAction{
    duration:number
    delay:number
    createTime:number
    from:string
    to:string
    colors:Array<string>
}

class ActionsManagerField extends Field{
    public actions:Array<ActionType>
    public moveActions:Array<MoveAction>
    private colorActions:Array<ColorAction>
    constructor(ctx:CanvasRenderingContext2D,width:number,height:number,x:number,y:number,r:number){
        super(ctx,width,height,x,y,r);
        this.actions = [];
        this.moveActions = [];
        this.colorActions = [];
        this.set_auto_resize_with_delay = this.set_auto_resize_with_delay.bind(this);
        this.set_action_move_to = this.set_action_move_to.bind(this);
        this.set_action_change_color = this.set_action_change_color.bind(this); 
        this.handle_move_actions = this.handle_move_actions.bind(this);
        this.draw = this.draw.bind(this);
    }

    private handle_actions():void{
        const now = Date.now();
        let newActions:Array<ActionType> = [];
        this.actions.map((action,index) =>{
            if(this.isHigherOrder === false || action.priority === true){
                if(now - action.startTime >= action.waitTime){
                    //newActions = [];
                    if(action.sizeStart.w === -1){action.sizeStart.w = this.size.w;action.sizeStart.h=this.size.h;}
                    if(action.positionStart.x === -1){action.positionStart.x = this.position.x;action.positionStart.y = this.position.y}
                    const runActions = (perc?:number) =>{
                        const current_duration = now - action.startTime - action.waitTime;
                        const percentage = perc === undefined ?  current_duration < action.duration ? current_duration / action.duration : 1 : perc;
                        let newSize = {
                            w: action.sizeStart.w > action.sizeTo.w ? (action.sizeStart.w - action.sizeTo.w) * percentage: (action.sizeTo.w - action.sizeStart.w  ) * percentage,
                            h: action.sizeStart.h > action.sizeTo.h ? (action.sizeStart.h - action.sizeTo.h) * percentage: (action.sizeTo.h - action.sizeStart.h  ) * percentage,
                        }
                        newSize.w = Math.floor(action.sizeStart.w > action.sizeTo.w ? action.sizeStart.w - newSize.w : newSize.w + action.sizeStart.w);
                        newSize.h = Math.floor(action.sizeStart.h > action.sizeTo.h ? action.sizeStart.h - newSize.h: newSize.h + action.sizeStart.h);
                        const off_set_x = this.size.w - newSize.w;
                        const off_set_y = this.size.h - newSize.h;
                        this.size = newSize;
                        this.position.x = this.position.x + off_set_x/2;
                        this.position.y = this.position.y + off_set_y/2;
                    }
                    runActions();
                    //Checking if action array is finished, or if next
                    if(this.actions[index +1] !== undefined){
                        if(now - this.actions[index+1].startTime <= this.actions[index+1].waitTime){
                            if(this.size.w !== action.sizeTo.w && this.size.h !== action.sizeTo.h){
                                newActions.push(action);
                            }else{
                                runActions(1)
                            }
                        }else{
                            runActions(1)
                        }
                    }else{
                        if(this.size.w !== action.sizeTo.w && this.size.h !== action.sizeTo.h){
                            newActions.push(action);
                        }else{
                            runActions(1)
                        }
                    }
                }
                else{
                    newActions.push(action);
                }
            }
                return null;
            })
            this.actions = newActions;
        }

        private handle_move_actions = ():void =>{
            const now = Date.now();
            let newMoveActions:Array<MoveAction> = [];
            //if(this.moveActions.length > 0){this.actions = []}
            this.moveActions.map((action) =>{
                //Only one move action can be done, or does it ?
                if(now - action.createTime >= action.delay){
                    //It's time to do some stuff, first let's check if action is alone and delete it's previous elements ass field can't animate 2 things once
                    newMoveActions = [];
                    if(action.from.x === -1){action.from.x = this.position.x;action.from.y = this.position.y}
                    const current_duration = now - action.createTime - action.delay;
                    const percentage = current_duration < action.duration ? current_duration/ action.duration : 1;
                    const offSetX = (action.from.x < action.to.x ? (action.to.x -  action.from.x) : (action.from.x - action.to.x))*percentage;
                    const offSetY = (action.from.y < action.to.y ? (action.to.y -  action.from.y) : (action.from.y - action.to.y))*percentage;
                    const newPosition = {
                        x:action.from.x < action.to.x ? action.from.x + offSetX : action.from.x - offSetX,
                        y:action.from.y < action.to.y ? action.from.y + offSetY : action.from.y - offSetY,
                    }
                    this.position = newPosition;
                    if(percentage <= 1 && this.position.x !== action.to.x && this.position.y !== action.to.y){
                        newMoveActions.push(action);
                    }
                }else{
                    newMoveActions.push(action);
                }
            return null;
        })
        this.moveActions = newMoveActions;
    }

    private handle_color_actions():void{
        const now = Date.now();
        const newColors:Array<ColorAction> = []
        this.colorActions.map(action=>{
            if(now - action.createTime >= action.delay){
                newColors.pop();
                if(action.from === "null"){
                    //@ts-ignore
                    action.from = this.color ? this.color : '#fff';
                    action.colors = gradient([action.from,action.to],20)
                }
                const current_duration = now - action.createTime - action.delay;
                const percentage = current_duration < action.duration ? current_duration/ action.duration : 1;
                if(percentage < 1)
                    this.color = action.colors[Math.floor(action.colors.length * percentage)];
                    newColors.push(action);
                if(percentage >= 1){
                    this.color = action.to
                }
            }
            else{
                newColors.push(action);
            }
            return null;
        })
        this.colorActions = newColors;
    
    }

    //Public 

    public set_auto_resize_with_delay(toSize:{w:number,h:number},duration:number,delay:number,priority?:boolean):void{
        this.actions.push(
            {
                sizeStart:{w:-1,h:0},
                positionStart:{x:-1,y:0},
                sizeTo:toSize,
                startTime: Date.now(),
                duration:duration,
                waitTime:delay,
                priority:priority ? priority : false
            }
        )
    }

    public set_action_move_to(delay:number,duration:number,to:{x:number,y:number}):void{
        //this.moveActions.push();
        this.moveActions = [...this.moveActions,{
            createTime: Date.now(),
            delay:delay,
            duration:duration,
            from:{x:-1,y:-1},
            to:to
        }]
    }

    public set_action_change_color(delay:number,duration:number,to:string):void{
        this.colorActions = [...this.colorActions,{
            createTime: Date.now(),
            duration:duration,
            delay:delay,
            from:"null",
            to:to,
            colors:[]
        }]
    }

    public draw(color: string | CanvasGradient): void {
        this.moveActions.length > 0 && this.handle_move_actions();
        this.actions.length > 0 && this.handle_actions();
        this.colorActions.length > 0 && this.handle_color_actions();
        this.draw_field(color);
    }
}

export {ActionsManagerField}