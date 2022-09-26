import {ActionsManagerField as Field} from "./ActionsManager";
import letterSchemas from '../../../Assets/letterSchemas.json';

class AnimationsManager{
    public static generate_wave_vertical(Fields:Array<Array<Field>>,initial_size:{w:number,h:number},desired_size:{w:number,h:number},duration:number,delay:number):void{
        let delay1 = 0;
        let delay2 = delay;
        Fields.map(column => {
            delay1 += 100;
            column.map(field =>{
                field.set_auto_resize_with_delay(desired_size,duration,delay1);
                return null;
            })
            return null;
        })
        Fields.map(column => {
            delay2 += 100;
            column.map(field =>{
                field.set_auto_resize_with_delay(initial_size,duration,delay2);
                return null;
            })
            return null;
        })
    }

    public static generate_random_movement(Fields:Array<Array<Field>>):void{
        Fields.map(column =>{
            let delay = 0;
            column.map(field =>{
                delay += 2;
                field.set_action_move_to(delay,800,{x:Math.floor(Math.random() * window.innerWidth),y:Math.floor(Math.random() * window.innerHeight)})
                return null;
            })
            return null;
        })
    }

    public static generate_wave_from_bottom(Fields:Array<Array<Field>>,initial_size:{w:number,h:number},desired_size:{w:number,h:number},duration:number,del:number):void{
        Fields.map(column =>{
            let delay = del;
            let rand_time = Math.floor(Math.random()*500);
            column.map((field) =>{

                field.set_auto_resize_with_delay(desired_size,Math.floor(duration/3.5),delay,true);
                field.set_auto_resize_with_delay(initial_size,duration + rand_time,delay + Math.floor(duration/3.5),true);
                delay -= del/column.length;
                return null;
            })
            return null;
        })
    }

    public static draw_letter_from_background_fields(Fields:Array<Array<Field>>,letter:string,size:{w:number,h:number},start_pos:{x:number,y:number},delay:number):{x:number,y:number,last_index:number}{
        const schema = letterSchemas.find(e => e.letter === letter)?.schema;
        if(!schema){throw new Error('Error, inserted letter is not supported')}
        const rows = schema.split('\n');
        let curr_pos = {x:start_pos.x,y:start_pos.y};
        rows.forEach(row =>{
            curr_pos.y += size.h + 1;
            curr_pos.x = start_pos.x;
            for(let x = 0; x < row.length; x++){
                if(row[x] === '^'){
                    curr_pos.x += size.w + 1
                }
                else if(row[x] === "*"){
                    curr_pos.x += size.w/2 +1;
                }
                else{
                    let random_field;
                    do{
                        random_field = Fields[Math.floor(Math.random()*Fields.length)][Math.floor(Math.random()*Fields[0].length)];
                    }while(random_field.isHigherOrder)
                    random_field.set_action_change_color(delay,1000,'#000');
                    random_field.set_auto_resize_with_delay(size,1000,delay,true);
                    random_field.set_action_move_to(delay,1000,{x:curr_pos.x,y:curr_pos.y});
                    random_field.isHigherOrder = true;
                    curr_pos.x += size.w + 1;
                }
            }
        })
        return {x:curr_pos.x,y:curr_pos.y,last_index:0}
    }

    public static draw_letter(Fields:Array<Field>,letter:string,size:{w:number,h:number},start_pos:{x:number,y:number},delay:number,start_index:number):{x:number,y:number,last_index:number}{
        const schema = letterSchemas.find(e => e.letter === letter)?.schema;
        if(!schema){throw new Error('Error, inserted letter is not supported')}
        const rows = schema.split('\n');
        let curr_pos = {x:start_pos.x,y:start_pos.y};
        let field_counter = start_index;
        rows.forEach(row =>{
            curr_pos.y += size.h + 1;
            curr_pos.x = start_pos.x;
            for(let x = 0; x < row.length; x++){
                if(row[x] === '^'){
                    curr_pos.x += size.w + 1
                }
                else if(row[x] === "*"){
                    curr_pos.x += size.w/2 +1;
                }
                else{
                    if(Fields[field_counter] === undefined){throw new Error('usage of fields exceeds prepared !! Array to small')}
                    const field = Fields[field_counter];
                    field_counter++;
                    field.set_auto_resize_with_delay(size,1000,delay,true);
                    field.set_action_change_color(delay,1000,'black');
                    field.set_action_move_to(delay,1000,{x:curr_pos.x,y:curr_pos.y});
                    field.isInWord = true;
                    curr_pos.x += size.w + 1;
                }
            }
        })
        return {x:curr_pos.x,y:curr_pos.y,last_index:field_counter}
    }

    public static calculate_fields_for_letter(letter:string):number {
        const schema = letterSchemas.find(e => e.letter === letter.toLowerCase())?.schema;
        if(!schema){throw new Error('Error, letter not supported, add schema in src/Assets/letterSchemas.json')}
        return schema.split(letter.toLowerCase()).length === 1 ? schema.split(letter.toUpperCase()).length : schema.split(letter.toLowerCase()).length;
    }

    public static calculate_fields_for_word(word:string):number{
        let variable = 0;
        for(let x = 0; x < word.length; x++){
             variable += this.calculate_fields_for_letter(word[x]);
        }
        return variable;
    }

    public static calculate_width_for_letter(letter:string,size:{w:number,h:number}):number{
        const schema = letterSchemas.find(e => e.letter === letter.toLowerCase())?.schema;
        if(!schema){throw new Error('Error, letter not supported, add schema in src/Assets/letterSchemas.json')}
        const rows = schema.split('\n');
        let curr_pos = {x:0,y:0};
        rows.forEach(row =>{
            curr_pos.y += size.h + 1;
            curr_pos.x = 0;
            for(let x = 0; x < row.length; x++){
                if(row[x] === '^'){
                    curr_pos.x += size.w + 1
                }
                else if(row[x] === "*"){
                    curr_pos.x += size.w/2 +1;
                }
                else{
                    curr_pos.x += size.w + 1;
                }
            }
        })
        return curr_pos.x;
    }

    public static calculate_width_for_word(word:string,size:{w:number,h:number}){
        let variable = 0;
        for(let x = 0; x < word.length; x++){
             variable += this.calculate_width_for_letter(word[x],size);
        }
        return variable;
    }

    public static free_letters(Fields:Array<Field>):void{
        Fields.map(field => {
            field.set_action_move_to(0,500,{x:Math.floor(Math.random()*(window.innerWidth - 100)) + 100,y:Math.floor(Math.random() * window.innerHeight)});
            field.isInWord = false;
            field.set_action_change_color(0,500,'rgb(255,255,255)')
            return null;})
    }

    
}

export default AnimationsManager;