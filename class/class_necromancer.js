class Class_Necromancer extends Class_Sprite{
    constructor(canvas, context, x=0, y=0, width=15, height=30, color="Black"){
        super(canvas, context, x, y, width, height, color);

        this.v_x = 0.03 + 0.02*Math.random();
        this.v_y = 0;

        this.velocity.angle = 2*Math.PI*Math.random();

        this.time_interval_attack = 3000;
        this.range_attack = 300;
        this.time_since_last_attack = this.time_interval_attack + 1;

        this.dictionary_sprite_sheet.walk = sprite_sheet_necromancer_walk;
        this.dictionary_sprite_sheet.fall = sprite_sheet_necromancer_fall;
        this.dictionary_sprite_sheet.attack = sprite_sheet_necromancer_attack;
        this.dictionary_sprite_sheet.hit = sprite_sheet_necromancer_hit;
        // more sprite sheets?


        this.status = Enum_Sprite_Status.walk;

        this.damage = 30;

        // this.dictionary_audio.fall = audio_orc_fall;



        // this.boolean_draw_box = true;

    }

    update(time_delta){
        if (this.status == Enum_Sprite_Status.dead){
            return;
        }

        super.update(time_delta);

        if (this.status == Enum_Sprite_Status.walk && this.time_since_last_attack > this.time_interval_attack){
            var sprite_closest = this.closet_sprite_alive_in_array(array_friend.concat(array_house));

            if (sprite_closest && this.distance_to_sprite(sprite_closest) < this.range_attack){
                this.target = sprite_closest;
                this.status = Enum_Sprite_Status.attack;

                this.time_since_last_attack = 0;
            }
        }



    }

    shoot_projectile(){
        var angle_deviation;
        if (Math.random() < 0.5){
            angle_deviation = (2*Math.random()-1)*Math.PI/180*20;
        } else {
            angle_deviation = (2*Math.random()-1)*Math.PI/180*40;
        }

        if (Math.random() < 0.25){
            var flare = new Class_Flare(this.canvas, this.context, this.x, this.y, "red", array_friend.concat(array_house));
    
            flare.velocity.angle = this.displacement_to_sprite(this.target).angle + angle_deviation;
            array_projectile.push(flare);
        } else {
            var magic_missile = new Class_Magic_Missile(this.canvas, this.context, this.x, this.y, "red", array_friend.concat(array_house));
    
            magic_missile.velocity.angle = this.displacement_to_sprite(this.target).angle + angle_deviation;
            array_projectile.push(magic_missile);
        }
    }

    handle_boundary(){
        //Dost do tasks not
    }

    
    draw(){
        super.draw();

        this.draw_sprite_sheet();

    }

    set_index_row_from_direction(direction){
        if (direction == Enum_Vector_Direction.e){
            this.index_row_in_sprite_sheet = 2;
        } else if (direction == Enum_Vector_Direction.se){
            this.index_row_in_sprite_sheet = 3;
        } else if (direction == Enum_Vector_Direction.s){
            this.index_row_in_sprite_sheet = 4;
        } else if (direction == Enum_Vector_Direction.sw){
            this.index_row_in_sprite_sheet = 5;
        } else if (direction == Enum_Vector_Direction.w){
            this.index_row_in_sprite_sheet = 6;
        } else if (direction == Enum_Vector_Direction.nw){
            this.index_row_in_sprite_sheet = 7;
        } else if (direction == Enum_Vector_Direction.n){
            this.index_row_in_sprite_sheet = 0;
        } else if (direction == Enum_Vector_Direction.ne){
            this.index_row_in_sprite_sheet = 1;
        }
    }

    update_index_row_in_sprite_sheet(){
        super.update_index_row_in_sprite_sheet();
    }

    update_index_column_in_sprite_sheet(){
        super.update_index_column_in_sprite_sheet(); 

        
        if (this.status == Enum_Sprite_Status.attack && this.index_column_in_sprite_sheet === 6){
            // this.cause_damage_to_sprite(this.target);
            this.shoot_projectile();
        }
    }

    update_sprite_sheet_info(){
        // Customize for subclasses
        if (this.status == Enum_Sprite_Status.walk){
            this.sprite_sheet_active = this.dictionary_sprite_sheet.walk;

            this.count_sprite_sheet_column = 9;
            this.count_sprite_sheet_row = 8;
    
            this.index_row_in_sprite_sheet = 0;
            this.index_column_in_sprite_sheet = 0;

            this.fraction_destination_offset_x = 0;
            this.fraction_destination_offset_y = 0;

            this.fraction_destination_width = 4.0;
            this.fraction_destination_height = 1.8;

            this.time_interval_change_sprite = 150;
            this.time_since_last_change_sprite = 0;

        } else if (this.status == Enum_Sprite_Status.fall){
            this.sprite_sheet_active = this.dictionary_sprite_sheet.fall;

            this.count_sprite_sheet_column = 5;
            this.count_sprite_sheet_row = 8;
    
            // this.index_row_in_sprite_sheet = 0;
            this.index_column_in_sprite_sheet = 0;

            this.fraction_destination_offset_x = 0;
            this.fraction_destination_offset_y = 0;

            this.fraction_destination_width = 4.0;
            this.fraction_destination_height = 1.8;

            this.time_interval_change_sprite = 100;
            this.time_since_last_change_sprite = 0;

        } else if (this.status == Enum_Sprite_Status.attack){
            this.sprite_sheet_active = this.dictionary_sprite_sheet.attack;

            this.count_sprite_sheet_column = 8;
            this.count_sprite_sheet_row = 8;
    
            // this.index_row_in_sprite_sheet = 0;
            this.index_column_in_sprite_sheet = 0;

            this.fraction_destination_offset_x = 0;
            this.fraction_destination_offset_y = 0;

            this.fraction_destination_width = 4.0;
            this.fraction_destination_height = 1.8;

            this.time_interval_change_sprite = 50;
            this.time_since_last_change_sprite = 0;

        } else if (this.status == Enum_Sprite_Status.hit){
            this.sprite_sheet_active = this.dictionary_sprite_sheet.hit;

            this.count_sprite_sheet_column = 6;
            this.count_sprite_sheet_row = 8;
    
            // this.index_row_in_sprite_sheet = 0;
            this.index_column_in_sprite_sheet = 0;

            this.fraction_destination_offset_x = 0;
            this.fraction_destination_offset_y = 0;

            this.fraction_destination_width = 4.0;
            this.fraction_destination_height = 1.8;

            this.time_interval_change_sprite = 50;
            this.time_since_last_change_sprite = 0;
        }
    }


}


