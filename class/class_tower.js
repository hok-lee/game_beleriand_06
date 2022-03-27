class Class_Tower extends Class_Sprite{
    constructor(canvas, context, x=0, y=0, width=45, height=90, color="Black"){
        super(canvas, context, x, y, width, height, color);

        this.v_x = 0;
        this.v_y = 0;


        this.time_interval_attack = 3000;
        this.time_since_last_attack = this.time_interval_attack + 1;

        this.dictionary_sprite_sheet.idle = sprite_sheet_tower_idle;
        this.dictionary_sprite_sheet.fall = sprite_sheet_tower_fall;
        this.dictionary_sprite_sheet.attack = sprite_sheet_tower_attack;
        // more sprite sheets?


        this.status_default = Enum_Sprite_Status.idle;
        this.status = this.status_default;  

        this.health_max = 400;
        this.health = this.health_max;


        this.damage = 30;

        this.dictionary_audio.fall = audio_tower_fall;



        // this.boolean_draw_box = true;

    }

    update(time_delta){
        if (this.status == Enum_Sprite_Status.dead){
            return;
        }

        super.update(time_delta);

        if (this.status == Enum_Sprite_Status.idle && this.time_since_last_attack > this.time_interval_attack){

            this.status = Enum_Sprite_Status.attack;
            this.time_since_last_attack = 0;
        }

        flare_stationary.update(time_delta);

    }

    handle_boundary(){
        //Dost do tasks not
    }

    hit_by_sprite(a_sprite){
        if (this.status == Enum_Sprite_Status.dead || this.status == Enum_Sprite_Status.fall){
            return;
        }

        this.health -= a_sprite.damage;

        if (this.health <= 0){
            this.health = 0;
            this.status = Enum_Sprite_Status.fall;
            if (this.dictionary_audio.fall){
                this.dictionary_audio.fall.play();
            }
        }


    }

    draw(){
        super.draw();

        this.draw_sprite_sheet();

        flare_stationary.draw();

    }

    set_index_row_from_direction(direction){
        // Dost do tasks not
    }

    update_index_row_in_sprite_sheet(){
        // super.update_index_row_in_sprite_sheet();
    }

    update_index_column_in_sprite_sheet(){
        super.update_index_column_in_sprite_sheet();   

        if (this.status == Enum_Sprite_Status.hit){
            this.status = Enum_Sprite_Status.idle;
        }

        // console.log(`Tower: ${this.index_column_in_sprite_sheet}`);
        flare_stationary.index_column_in_sprite_sheet = this.index_column_in_sprite_sheet;

        if (flare_stationary.status == Enum_Sprite_Status.attack && flare_stationary.index_column_in_sprite_sheet % 3 == 0){
            flare_stationary.shoot_projectile();
        }



    }

    update_sprite_sheet_info(){
        // Customize for subclasses
        if (this.status == Enum_Sprite_Status.idle){
            this.sprite_sheet_active = this.dictionary_sprite_sheet.idle;

            this.count_sprite_sheet_column = 17;
            this.count_sprite_sheet_row = 1;
    
            this.index_row_in_sprite_sheet = 0;
            // this.index_column_in_sprite_sheet = 0;

            this.fraction_destination_offset_x = 0;
            this.fraction_destination_offset_y = 0;

            this.fraction_destination_width = 1;
            this.fraction_destination_height = 1;

            this.time_interval_change_sprite = 100;
            this.time_since_last_change_sprite = 0;

        } else if (this.status == Enum_Sprite_Status.fall){
            this.sprite_sheet_active = this.dictionary_sprite_sheet.fall;

            this.count_sprite_sheet_column = 11;
            this.count_sprite_sheet_row = 1;
    
            this.index_row_in_sprite_sheet = 0;
            // this.index_column_in_sprite_sheet = 0;

            this.fraction_destination_offset_x = 0;
            this.fraction_destination_offset_y = 0;

            this.fraction_destination_width = 1;
            this.fraction_destination_height = 1;

            this.time_interval_change_sprite = 100;
            this.time_since_last_change_sprite = 0;

        } else if (this.status == Enum_Sprite_Status.attack){
            this.sprite_sheet_active = this.dictionary_sprite_sheet.attack;

            this.count_sprite_sheet_column = 17;
            this.count_sprite_sheet_row = 1;
    
            this.index_row_in_sprite_sheet = 0;
            // this.index_column_in_sprite_sheet = 0;

            this.fraction_destination_offset_x = 0;
            this.fraction_destination_offset_y = 0;

            this.fraction_destination_width = 1;
            this.fraction_destination_height = 1;

            this.time_interval_change_sprite = 100;
            this.time_since_last_change_sprite = 0;

        }

        if (flare_stationary){
            flare_stationary.status = this.status;
        }
    }
}