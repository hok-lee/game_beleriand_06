class Class_Projectile extends Class_Sprite{
    constructor(canvas, context, x=0, y=0, width=30, height=30, color="White", array_attackee=array_foe){
        super(canvas, context, x, y, width, height, color);

        this.dictionary_sprite_sheet.walk = sprite_sheet_arrow;

        this.status = Enum_Sprite_Status.walk;

        this.damage = 25;

        this.array_attackee = array_attackee;
        this.array_target_passed = [];
        

        this.boolean_pass_attackee = false;

    }

    update(time_delta){
        super.update(time_delta);

        this.angle = this.velocity.angle;

        var attackee = this.closet_sprite_alive_in_array(this.array_attackee.filter(sprite => {return !this.array_target_passed.includes(sprite)}));
        if (attackee){
            if (Math.abs(this.displacement_to_sprite(attackee).x) < 0.5*(this.width + attackee.width) && Math.abs(this.displacement_to_sprite(attackee).y) < 0.5*(this.height + attackee.height)){
                this.target = attackee;
                this.cause_damage_to_sprite(attackee);
                this.array_target_passed.push(this.target);
                if (!this.boolean_pass_attackee){
                    array_sprite_will_die.push(this);
                }
            }
        }
    }

    cause_damage_to_sprite(a_sprite){
        a_sprite.hit_by_sprite(this);

        if (this.dictionary_audio.cause_damage){
            this.dictionary_audio.cause_damage.play();
        }
    }

    draw(){
        super.draw();

        this.draw_sprite_sheet();

    }

    draw_health_bar(){
        // Dost do tasks not
    }

    handle_boundary(){
        if (this.x < -this.width/2){
            // West (Valinor)
            array_sprite_will_die.push(this);
        }

        if (this.y < -this.height/2){
            // North (Angband Mountains)
            array_sprite_will_die.push(this);
        }

        if (this.x > this.canvas.width+this.width/2){
            // East (Blue Mountains)
            array_sprite_will_die.push(this);
        }

        if (this.y > this.canvas.height+this.height/2){
            // South (Far Harad)
            array_sprite_will_die.push(this);
        }
    }

    die(){
        super.die();

        this.remove_self_from_array(array_projectile);
    }

    set_index_row_from_direction(direction){
        super.set_index_row_from_direction(direction);
    }

    update_index_row_in_sprite_sheet(){
        super.update_index_row_in_sprite_sheet();
    }

    update_index_column_in_sprite_sheet(){
        super.update_index_column_in_sprite_sheet();
    }

    update_sprite_sheet_info(){
        // Customize for subclasses
        if (this.status == Enum_Sprite_Status.walk){
            this.sprite_sheet_active = this.dictionary_sprite_sheet.walk;

            this.count_sprite_sheet_column = 8;
            this.count_sprite_sheet_row = 8;
    
            this.index_row_in_sprite_sheet = 0;
            this.index_column_in_sprite_sheet = 0;

            this.fraction_destination_offset_x = 0;
            this.fraction_destination_offset_y = 0;

            this.fraction_destination_width = 4.0;
            this.fraction_destination_height = 2.0;
        }
    }
}