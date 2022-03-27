var Enum_Sprite_Status = {
    idle: 0,
    walk: 1,
    attack: 2,
    hit: 3,
    fall: 4,
    dead: 5
}

class Class_Sprite{
    constructor(canvas, context, x=0, y=0, width=30, height=30, color="Black"){
        this.canvas = canvas;
        this.context = context;

        this.position = new Class_Vector(x, y);

        // this.x = x;
        // this.y = y;

        this.velocity = new Class_Vector(0.05*(2*Math.random()-1), 0.05*(2*Math.random()-1));

        this.angle = 0;

        // this.v_x = 0.05*(2*Math.random()-1);
        // this.v_y = 0.05*(2*Math.random()-1);

        this.width = width;
        this.height = height;
        this.color = color;

        this.time_total = 0;

        // combat info
        this.health_max = 100;
        this.health = this.health_max;

        this.damage = 10;

        this.time_interval_attack = 1000;
        this.time_since_last_attack = 0;

        this.target = null;
        this.range_attack = this.width;



        // Spritesheet info below
        // Set this ere the status is conjured
        this.dictionary_sprite_sheet = {
            idle: null,
            walk: null,
            attack: null,
            hit: null,
            fall: null,
            dead: null
        };

        this.status_default = Enum_Sprite_Status.walk;

        this.status = this.status_default;  


        this.sprite_sheet_active = null;

        this.count_sprite_sheet_column = 1;
        this.count_sprite_sheet_row = 1;

        this.index_row_in_sprite_sheet = 0;
        this.index_column_in_sprite_sheet = 0;

        this.fraction_destination_offset_x = 0;
        this.fraction_destination_offset_y = 0;

        this.fraction_destination_width = 1.0;
        this.fraction_destination_height = 1.0;

        this.time_interval_change_sprite = 100;
        this.time_since_last_change_sprite = 0;


        this.array_checkpoint = null;
        this.index_checkpoint = 0;
        this.checkpoint = null; // This shall set the status to status_default once more

        this.dictionary_audio = {
            idle: null,
            walk: null,
            cause_damage: null,
            shoot: null,
            hit: null,
            fall: null,
            dead: null
        };

        
        this.boolean_reached_destination = false;

        this.boolean_selected = false;


        this.boolean_draw_box = false;
    }

    get status(){
        return this._status;
    }
    set status(a_status){
        this._status = a_status;
        this.update_sprite_sheet_info();
    }

    get x(){
        return this.position.x;
    }
    set x(a_x){
        this.position.x = a_x;
    }

    get y(){
        return this.position.y;
    }
    set y(a_y){
        this.position.y = a_y;
    }

    get v_x(){
        return this.velocity.x;
    }
    set v_x(a_v_x){
        this.velocity.x = a_v_x;
    }

    get v_y(){
        return this.velocity.y;
    }
    set v_y(a_v_y){
        this.velocity.y = a_v_y;
    }

    get checkpoint(){
        return this._checkpoint;
    }

    set checkpoint(a_checkpoint){
        this._checkpoint = a_checkpoint;

        if (a_checkpoint){
            this.status = Enum_Sprite_Status.walk;

            if (this.dictionary_audio.walk && boolean_game_running){
                this.dictionary_audio.walk.play();
            }

            var angle_to_checkpoint = this.checkpoint.minus(this.position).angle;

            this.velocity.angle = angle_to_checkpoint;
        } else {
            this.status = this.status_default;
        }


    }

    get boolean_alive(){
        return this.status != Enum_Sprite_Status.dead && this.status != Enum_Sprite_Status.fall;
    }
    


    draw(){
        var context = this.context;

        if (this.boolean_draw_box){
            this.draw_box();
        }


        if (this.status != Enum_Sprite_Status.fall && this.status != Enum_Sprite_Status.dead){
            this.draw_health_bar();
        }

    }

    draw_box(){
        context.save();
        context.translate(this.x, this.y);
        context.rotate(this.angle);
        context.strokeStyle=this.color;
        context.strokeRect(-this.width/2, -this.height/2, this.width, this.height);
        context.restore();
    }

    draw_health_bar(){
        var health_bar_width = 3;
        var health_bar_height_max = 20;
        var health_bar_height = health_bar_height_max*this.health/this.health_max;

        // var health_bar_y = health_bar_height_max*(this.health_max-this.health)/this.health_max;
        

        context.save();
        context.translate(this.x - this.width/2 - 10, this.y + health_bar_height_max/2);

        context.lineWidth=0.3;
        context.strokeStyle=this.color;
        context.strokeRect(0, 0, health_bar_width, -health_bar_height_max);

        context.fillStyle=this.color;
        context.fillRect(0, 0, health_bar_width, -health_bar_height)
        context.restore();
    }



    update(time_delta){
        if (this.status == Enum_Sprite_Status.dead){
            return;
        }

        this.time_total += time_delta;
        this.time_since_last_change_sprite += time_delta;

        this.time_since_last_attack += time_delta;

        if (this.status === Enum_Sprite_Status.walk){

            this.x += this.v_x*time_delta;
            this.y += this.v_y*time_delta;
    
            this.handle_boundary();
        }

        if (this.time_since_last_change_sprite > this.time_interval_change_sprite){
            this.update_index_row_in_sprite_sheet();
            this.update_index_column_in_sprite_sheet();

            this.time_since_last_change_sprite = 0;
        }

        if (this.checkpoint && this.position.minus(this.checkpoint).magnitude < 10){
            this.reached_checkpoint();
        }

    }

    

    handle_boundary(){
        if (this.x < this.width/2){
            // West (Valinor)
            this.v_x *= -1;
            this.x = this.width/2;
        }

        if (this.y < this.height/2){
            // North (Angband Mountains)
            this.v_y *= -1;
            this.y = this.height/2;
        }

        if (this.x > this.canvas.width-this.width/2){
            // East (Blue Mountains)
            this.v_x *= -1;
            this.x = this.canvas.width-this.width/2;
        }

        if (this.y > this.canvas.height-this.height/2){
            // South (Far Harad)
            this.v_y *= -1;
            this.y = this.canvas.height-this.height/2;
        }
    }




    draw_sprite_sheet(){
        var context = this.context;

        var sx = this.index_column_in_sprite_sheet*this.sprite_sheet_active.width/this.count_sprite_sheet_column;
        var sy = this.index_row_in_sprite_sheet*this.sprite_sheet_active.height/this.count_sprite_sheet_row;
        var sWidth = this.sprite_sheet_active.width/this.count_sprite_sheet_column;
        var sHeight = this.sprite_sheet_active.height/this.count_sprite_sheet_row;

        var dWidth = this.fraction_destination_width*this.width;
        var dHeight = this.fraction_destination_height*this.height;
        var dx = -dWidth/2;
        var dy = -dHeight/2;

        var d_offset_x = this.fraction_destination_offset_x*this.width;
        var d_offset_y = this.fraction_destination_offset_y*this.height;

        context.save();
        context.translate(this.x, this.y);
        context.rotate(this.angle);
        context.drawImage(this.sprite_sheet_active, sx, sy, sWidth, sHeight, dx+d_offset_x, dy+d_offset_y, dWidth, dHeight);
        context.restore();
    }

    cause_damage_to_sprite(a_sprite){
        if (this.distance_to_sprite(this.target) < this.range_attack){
            a_sprite.hit_by_sprite(this);
        }

        if (this.dictionary_audio.cause_damage){
            this.dictionary_audio.cause_damage.play();
        }
    }

    hit_by_sprite(a_sprite){
        if (this.status == Enum_Sprite_Status.dead || this.status == Enum_Sprite_Status.fall){
            return;
        }

        this.health -= a_sprite.damage;

        if (this.health <= 0){
            this.health = 0;
            this.status = Enum_Sprite_Status.fall;
            this.boolean_selected = false;
            if (this.dictionary_audio.fall){
                this.dictionary_audio.fall.play();
            }
        } else {
            this.status = Enum_Sprite_Status.hit;
        }


    }

    die(){
        // Overrided by subclasses
        this.status = Enum_Sprite_Status.dead;
        this.boolean_selected = false;

        if (array_friend.includes(this)){

            this.remove_self_from_array(array_friend);
            array_dead.push(this);
            // array_friend.unshift(this);
            count_friend_slain++;
            
        } else if (array_foe.includes(this)){

            this.remove_self_from_array(array_foe);

            if (this.boolean_reached_destination){
                count_foe_passed++;
            } else {
                // array_foe.unshift(this);
                array_dead.push(this);
                count_foe_slain++;                
            }
        } else if (array_house.includes(this)){

            this.remove_self_from_array(array_house);
            array_dead.push(this);
            
        }

        if (this.dictionary_audio.dead && !this.boolean_reached_destination){
            this.dictionary_audio.dead.play();
        }

        // if (this.boolean_reached_destination){
        //     this.remove_self_from_array(array_foe);
        // }
    }

    remove_self_from_array(a_array){
        var index_self = a_array.indexOf(this);
        if (index_self >= 0){
            a_array.splice(index_self, 1);
        }
    }


    set_index_row_from_direction(direction){
        if (direction == Enum_Vector_Direction.e){
            this.index_row_in_sprite_sheet = 6;
        } else if (direction == Enum_Vector_Direction.se){
            this.index_row_in_sprite_sheet = 7;
        } else if (direction == Enum_Vector_Direction.s){
            this.index_row_in_sprite_sheet = 0;
        } else if (direction == Enum_Vector_Direction.sw){
            this.index_row_in_sprite_sheet = 1;
        } else if (direction == Enum_Vector_Direction.w){
            this.index_row_in_sprite_sheet = 2;
        } else if (direction == Enum_Vector_Direction.nw){
            this.index_row_in_sprite_sheet = 3;
        } else if (direction == Enum_Vector_Direction.n){
            this.index_row_in_sprite_sheet = 4;
        } else if (direction == Enum_Vector_Direction.ne){
            this.index_row_in_sprite_sheet = 5;
        }
    }

    update_index_row_in_sprite_sheet(){
        if (this.status == Enum_Sprite_Status.fall || this.status == Enum_Sprite_Status.dead || this.status == Enum_Sprite_Status.hit){
            return;
        }


        var direction = Enum_Vector_Direction.n;

        if (this.status == Enum_Sprite_Status.walk){
            direction = this.velocity.direction;
        } else if (this.status == Enum_Sprite_Status.attack){
            direction = this.displacement_to_sprite(this.target).direction;
        }


        this.set_index_row_from_direction(direction);
    }

    update_index_column_in_sprite_sheet(){
        this.index_column_in_sprite_sheet = (this.index_column_in_sprite_sheet + 1) % this.count_sprite_sheet_column;

        if (this.status == Enum_Sprite_Status.attack && this.index_column_in_sprite_sheet == this.count_sprite_sheet_column - 1){
            this.status = this.status_default;
            this.target = null;
        }

        if (this.status == Enum_Sprite_Status.hit && this.index_column_in_sprite_sheet == this.count_sprite_sheet_column - 1){


            if (this.checkpoint){
                this.status = Enum_Sprite_Status.walk;
            } else {
                this.status = this.status_default;
            }

        }

        if (this.status == Enum_Sprite_Status.fall && this.index_column_in_sprite_sheet == this.count_sprite_sheet_column - 1){

            array_sprite_will_die.push(this);
           

        }
    }

    update_sprite_sheet_info(){
        // Customize for subclasses
        if (this.status == Enum_Sprite_Status.idle){
            this.sprite_sheet_active = this.dictionary_sprite_sheet.idle;

            this.count_sprite_sheet_column = 1;
            this.count_sprite_sheet_row = 1;
    
            this.index_row_in_sprite_sheet = 0;
            this.index_column_in_sprite_sheet = 0;

            this.fraction_destination_offset_x = 0;
            this.fraction_destination_offset_y = 0;
    
            this.fraction_destination_width = 1.0;
            this.fraction_destination_height = 1.0;

            this.time_interval_change_sprite = 100;
            this.time_since_last_change_sprite = 0;

        } else if (this.status == Enum_Sprite_Status.dead){
            this.sprite_sheet_active = this.dictionary_sprite_sheet.dead;

            this.count_sprite_sheet_column = 1;
            this.count_sprite_sheet_row = 1;
    
            this.index_row_in_sprite_sheet = 0;
            this.index_column_in_sprite_sheet = 0;

            this.fraction_destination_offset_x = 0;
            this.fraction_destination_offset_y = 0;
    
            this.fraction_destination_width = 1.0;
            this.fraction_destination_height = 1.0;

            this.time_interval_change_sprite = 100;
            this.time_since_last_change_sprite = 0;
        }
    }

    displacement_to_sprite(a_sprite){
        // returns the vector that points from "this" to "a_sprite"
        return a_sprite.position.minus(this.position);
    }

    distance_to_sprite(a_sprite){
        return this.displacement_to_sprite(a_sprite).magnitude;
    }

    angle_to_sprite(a_sprite){
        return this.displacement_to_sprite(a_sprite).angle;
    }

    closet_sprite_alive_in_array(a_array_sprite){
        var array_sprite_alive = a_array_sprite.filter(a_sprite => {
            return a_sprite.status != Enum_Sprite_Status.dead && a_sprite.status != Enum_Sprite_Status.fall;
        });

        if (array_sprite_alive.length == 0){
            return null;
        }

        var sprite_closest = array_sprite_alive[0];
        
        array_sprite_alive.forEach(a_sprite => {
            if (this.distance_to_sprite(a_sprite) < this.distance_to_sprite(sprite_closest)){
                sprite_closest = a_sprite;
            }
        });

        return sprite_closest;
    }

    handle_selection(){
        this.boolean_selected = true;

        this.boolean_draw_box = true;

        setTimeout(() => {this.boolean_draw_box = false}, 1000);
    }

    reached_checkpoint(){
        if (!this.array_checkpoint){
            this.checkpoint = null;
        } else {
            this.index_checkpoint++;

            if (this.index_checkpoint == this.array_checkpoint.length){
                this.reached_destination();
            } else {

                var checkpoint_original = this.array_checkpoint[this.index_checkpoint].clone();


                if (this.index_checkpoint < this.array_checkpoint.length - 1){
                    checkpoint_original.x += (Math.random()*2-1)*50;
                    checkpoint_original.y += (Math.random()*2-1)*50;
                }
                this.checkpoint = checkpoint_original;
            }
        }
    }

    reached_destination(){
        this.checkpoint = null;
        this.boolean_reached_destination = true;
        array_sprite_will_die.push(this);
    }

}