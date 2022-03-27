class Class_House extends Class_Sprite{
    constructor(canvas, context, x=0, y=0, width=50, height=50, color="Blue"){
        super(canvas, context, x, y, width, height, color);

        

        this.dictionary_sprite_sheet.idle = sprite_sheet_house_idle;
        this.dictionary_sprite_sheet.dead = sprite_sheet_house_dead;

        this.status_default = Enum_Sprite_Status.idle;
        this.status = this.status_default;

        // this.sprite_sheet_active = sprite_sheet_house_idle; 
        // this.update_sprite_sheet_info();

        this.index_row_in_sprite_sheet = Math.floor(Math.random()*this.count_sprite_sheet_row);
        this.index_column_in_sprite_sheet = Math.floor(Math.random()*this.count_sprite_sheet_column);



        // this.boolean_draw_box = true;
    }

    draw(){
        super.draw();

        this.draw_sprite_sheet();

    }

    handle_boundary(){
        if (this.x < -this.width/2){
            // West (Valinor)
            this.x = this.canvas.width+this.width/2;
        }

        if (this.y < -this.height/2){
            // North (Angband Mountains)
            this.y = this.canvas.height+this.height/2;
        }

        if (this.x > this.canvas.width+this.width/2){
            // East (Blue Mountains)
            this.x = -this.width/2;
        }

        if (this.y > this.canvas.height+this.height/2){
            // South (Far Harad)
            this.y = -this.height/2;
        }
    }

    die(){
        super.die();

        var fire_width = Math.random()*20+10;
        
        array_fire.push(new Class_Fire(this.canvas, this.context, this.x+(2*Math.random()-1)*this.width/3, this.y+Math.random()*(-this.height/3), fire_width, fire_width*3/2));
    }

    update_index_row_in_sprite_sheet(){
        // Dost do tasks not
    }

    update_index_column_in_sprite_sheet(){
        if (this.status == Enum_Sprite_Status.hit){
            this.status = this.status_default;
        }

        if (this.status == Enum_Sprite_Status.fall){
            // this.status = Enum_Sprite_Status.dead; // Will fix later
            array_sprite_will_die.push(this);
        }
    }


    update_sprite_sheet_info(){
        // Customize for subclasses
        if (this.status == Enum_Sprite_Status.idle){
            this.sprite_sheet_active = this.dictionary_sprite_sheet.idle;

            this.count_sprite_sheet_column = 6;
            this.count_sprite_sheet_row = 10;

            this.fraction_destination_width = 1.5;
            this.fraction_destination_height = 1.5;

        } else if (this.status == Enum_Sprite_Status.dead){
            this.sprite_sheet_active = this.dictionary_sprite_sheet.dead;

            this.count_sprite_sheet_column = 1;
            this.count_sprite_sheet_row = 1;
    
            this.index_row_in_sprite_sheet = 0;
            this.index_column_in_sprite_sheet = 0;

            this.fraction_destination_width = 1.5;
            this.fraction_destination_height = 1.5;

            this.fraction_destination_offset_y = 0.1;
        }
    }
}