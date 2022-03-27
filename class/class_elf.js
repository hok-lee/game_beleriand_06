class Class_Elf extends Class_Sprite{
    constructor(canvas, context, x=0, y=0, width=15, height=30, color="Blue"){
        super(canvas, context, x, y, width, height, color);

        this.v_x = 0.075;
        this.v_y = 0;
        this.velocity.angle = 2*Math.PI*Math.random();

        this.time_interval_attack = 1500;

        this.dictionary_sprite_sheet.idle = sprite_sheet_elf_idle;
        this.dictionary_sprite_sheet.walk = sprite_sheet_elf_walk;
        this.dictionary_sprite_sheet.fall = sprite_sheet_elf_fall;
        this.dictionary_sprite_sheet.attack = sprite_sheet_elf_attack;
        this.dictionary_sprite_sheet.hit = sprite_sheet_elf_hit;

        this.index_row_in_sprite_sheet = 0;


        this.status_default = Enum_Sprite_Status.idle;
        this.status = this.status_default;

        this.range_attack = 150;

        // this.boolean_draw_box = true;

    }

    update(time_delta){
        if (this.status == Enum_Sprite_Status.dead){
            return;
        }

        super.update(time_delta);

        if (this.status == Enum_Sprite_Status.idle && this.time_since_last_attack > this.time_interval_attack){
            var sprite_closest = this.closet_sprite_alive_in_array(array_foe);

            if (sprite_closest && this.distance_to_sprite(sprite_closest) < this.range_attack){
                this.target = sprite_closest;
                this.status = Enum_Sprite_Status.attack;

                this.time_since_last_attack = 0;
            }
        }
    }

    shoot_projectile(){
        var arrow = new Class_Arrow(this.canvas, this.context, this.x, this.y);

        arrow.velocity.angle = this.displacement_to_sprite(this.target).angle;
        array_projectile.push(arrow);
    }

    draw(){
        super.draw();

        this.draw_sprite_sheet();

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

        super.update_index_row_in_sprite_sheet();

        if (this.status == Enum_Sprite_Status.idle){
            var closest_foe = this.closet_sprite_alive_in_array(array_foe);

            if (closest_foe){
                var direction = this.displacement_to_sprite(closest_foe).direction;

                this.set_index_row_from_direction(direction);
            }


        }
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
        if (this.status == Enum_Sprite_Status.idle){
            this.sprite_sheet_active = this.dictionary_sprite_sheet.idle;

            this.count_sprite_sheet_column = 8;
            this.count_sprite_sheet_row = 8;

            // this.index_row_in_sprite_sheet = 0;
            this.index_column_in_sprite_sheet = Math.floor(Math.random()*this.count_sprite_sheet_column);

            this.fraction_destination_offset_x = 0;
            this.fraction_destination_offset_y = 0;

            this.fraction_destination_width = 4.0;
            this.fraction_destination_height = 2.0;

            this.time_interval_change_sprite = 250;
            this.time_since_last_change_sprite = 0;

        } else if (this.status == Enum_Sprite_Status.walk){
            this.sprite_sheet_active = this.dictionary_sprite_sheet.walk;

            this.count_sprite_sheet_column = 8;
            this.count_sprite_sheet_row = 8;
    
            this.index_row_in_sprite_sheet = 0;
            this.index_column_in_sprite_sheet = 0;

            this.fraction_destination_offset_x = 0;
            this.fraction_destination_offset_y = 0;

            this.fraction_destination_width = 4.0;
            this.fraction_destination_height = 2.0;

            this.time_interval_change_sprite = 70;
            this.time_since_last_change_sprite = 0;

        } else if (this.status == Enum_Sprite_Status.fall){
            this.sprite_sheet_active = this.dictionary_sprite_sheet.fall;

            this.count_sprite_sheet_column = 20;
            this.count_sprite_sheet_row = 8;
    
            this.index_row_in_sprite_sheet = 0;
            this.index_column_in_sprite_sheet = 0;

            this.fraction_destination_offset_x = 0;
            this.fraction_destination_offset_y = 0;

            this.fraction_destination_width = 4.0;
            this.fraction_destination_height = 2.0;

            this.time_interval_change_sprite = 100;
            this.time_since_last_change_sprite = 0;

        } else if (this.status == Enum_Sprite_Status.attack){
            this.sprite_sheet_active = this.dictionary_sprite_sheet.attack;

            this.count_sprite_sheet_column = 12;
            this.count_sprite_sheet_row = 8;
    
            this.index_row_in_sprite_sheet = 0;
            this.index_column_in_sprite_sheet = 0;

            this.fraction_destination_offset_x = 0;
            this.fraction_destination_offset_y = -0.3;

            this.fraction_destination_width = 5.2;
            this.fraction_destination_height = 2.6;

            this.time_interval_change_sprite = 100;
            this.time_since_last_change_sprite = 0;

        } else if (this.status == Enum_Sprite_Status.hit){
            this.sprite_sheet_active = this.dictionary_sprite_sheet.hit;

            this.count_sprite_sheet_column = 7;
            this.count_sprite_sheet_row = 8;
    
            this.index_row_in_sprite_sheet = 0;
            this.index_column_in_sprite_sheet = 0;

            this.fraction_destination_offset_x = 0;
            this.fraction_destination_offset_y = 0;

            this.fraction_destination_width = 4.0;
            this.fraction_destination_height = 2.0;

            this.time_interval_change_sprite = 100;
            this.time_since_last_change_sprite = 0;

        }
    }

    handle_boundary(){
        if (this.x < this.width/2){
            // West (Valinor)
            this.x = this.width/2;
            this.checkpoint = null;
        }

        if (this.y < this.height/2){
            // North (Angband Mountains)
            this.y = this.height/2;
            this.checkpoint = null;
        }

        if (this.x > this.canvas.width-this.width/2){
            // East (Blue Mountains)
            this.x = this.canvas.width-this.width/2;
            this.checkpoint = null;
        }

        if (this.y > this.canvas.height-this.height/2){
            // South (Far Harad)
            this.y = this.canvas.height-this.height/2;
            this.checkpoint = null;
        }
    }
}