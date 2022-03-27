class Class_Flare_Stationary extends Class_Sprite{

    constructor(canvas, context, x=0, y=0, width=15, height=15, color="Black"){
        super(canvas, context, x, y, width, height, color);

        this.v_x = 0;
        this.v_y = 0;


        this.time_interval_attack = 5000;
        this.time_since_last_attack = this.time_interval_attack + 1;

        this.dictionary_sprite_sheet.idle = sprite_sheet_flare_stationary_idle;
        this.dictionary_sprite_sheet.fall = sprite_sheet_flare_stationary_fall;
        this.dictionary_sprite_sheet.attack = sprite_sheet_flare_stationary_attack;
        // more sprite sheets?


        this.status_default = Enum_Sprite_Status.idle;
        this.status = this.status_default;  

        this.damage = 30;

        // this.dictionary_audio.fall = audio_orc_fall;



        // this.boolean_draw_box = true;

    }

    handle_boundary(){
        //Dost do tasks not
    }

    shoot_projectile(){
        if (array_friend.concat(array_house).length == 0){
            return;
        }

        var flare = new Class_Flare(this.canvas, this.context, this.x, this.y, "red", array_friend.concat(array_house));
        array_projectile.push(flare);

        if (Math.random() < 0.5){
            flare.velocity.angle = Math.random()*Math.PI;
        } else {
            // console.log("Ye shall be slain");
            var sprite_closest = this.closet_sprite_alive_in_array(array_friend.concat(array_house));

            if (sprite_closest){
                flare.velocity.angle = sprite_closest.position.minus(this.position).angle;
            }
        }
    }

    draw_health_bar(){
        // Dost do tasks not
    }

    draw(){
        super.draw();

        this.draw_sprite_sheet();

    }

    set_index_row_from_direction(direction){
        // Dost do tasks not
    }

    update_index_row_in_sprite_sheet(){
        // super.update_index_row_in_sprite_sheet();
    }

    update_index_column_in_sprite_sheet(){
        // console.log(`Flare: ${this.index_column_in_sprite_sheet}`);
        // if (this.status == Enum_Sprite_Status.attack && this.index_column_in_sprite_sheet==6){
        //     this.shoot_projectile();
        // }
    }

    update_sprite_sheet_info(){
        // Customize for subclasses
        if (this.status == Enum_Sprite_Status.idle){
            this.sprite_sheet_active = this.dictionary_sprite_sheet.idle;

            this.count_sprite_sheet_column = tower.count_sprite_sheet_column;
            this.count_sprite_sheet_row = tower.count_sprite_sheet_row;
    
            this.index_row_in_sprite_sheet = 0;
            // this.index_column_in_sprite_sheet = 0;

            this.fraction_destination_offset_x = 0;
            this.fraction_destination_offset_y = 0;

            this.fraction_destination_width = 3;
            this.fraction_destination_height = 3;

            // this.time_interval_change_sprite = 150;
            // this.time_since_last_change_sprite = 0;

        } else if (this.status == Enum_Sprite_Status.fall){
            this.sprite_sheet_active = this.dictionary_sprite_sheet.fall;

            this.count_sprite_sheet_column = tower.count_sprite_sheet_column;
            this.count_sprite_sheet_row = tower.count_sprite_sheet_row;
    
            this.index_row_in_sprite_sheet = 0;
            // this.index_column_in_sprite_sheet = 0;

            this.fraction_destination_offset_x = 0;
            this.fraction_destination_offset_y = 0;

            this.fraction_destination_width = 5;
            this.fraction_destination_height = 5;

            // this.time_interval_change_sprite = 100;
            // this.time_since_last_change_sprite = 0;

        } else if (this.status == Enum_Sprite_Status.attack){
            this.sprite_sheet_active = this.dictionary_sprite_sheet.attack;

            this.count_sprite_sheet_column = tower.count_sprite_sheet_column;
            this.count_sprite_sheet_row = tower.count_sprite_sheet_row;
    
            this.index_row_in_sprite_sheet = 0;
            // this.index_column_in_sprite_sheet = 0;

            this.fraction_destination_offset_x = 0;
            this.fraction_destination_offset_y = 0;

            this.fraction_destination_width = 3;
            this.fraction_destination_height = 3;

            // this.time_interval_change_sprite = 100;
            // this.time_since_last_change_sprite = 0;

        }
    }

}