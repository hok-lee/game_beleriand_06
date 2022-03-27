class Class_Flare extends Class_Projectile{
    constructor(canvas, context, x=0, y=0, color="blue", array_attackee=array_foe, width=12, height=12){
        super(canvas, context, x, y, width, height, color, array_attackee);

        this.v_x = 0.13;
        this.v_y = 0;

        this.angle_total = 0;

        if (color == "red"){
            this.dictionary_sprite_sheet.walk = sprite_sheet_flare_red;
        } else if (color == "blue"){
            this.dictionary_sprite_sheet.walk = sprite_sheet_flare_blue;
        } else {
            this.dictionary_sprite_sheet.walk = sprite_sheet_arrow;
        }


        

        this.status = Enum_Sprite_Status.walk;

        this.index_row_in_sprite_sheet = 0;
        this.index_column_in_sprite_sheet = 0;

        this.damage = 45;

        this.dictionary_audio.cause_damage = audio_flare_cause_damage;
        audio_flare_construct.play();

        this.boolean_pass_attackee = true;

        // this.boolean_draw_box = true;
    }

    update(time_delta){
        if (this.status == Enum_Sprite_Status.dead){
            return;
        }

        super.update(time_delta);

        this.angle_total += 0.5 * Math.PI/1000*time_delta;
        this.angle = this.angle_total;
    }

    update_index_row_in_sprite_sheet(){
        // Dost do tasks not
    }

    // update_index_column_in_sprite_sheet(){
    //     // Dost do tasks not
    // }

    update_sprite_sheet_info(){
        // Customize for subclasses
        if (this.status == Enum_Sprite_Status.walk){
            this.sprite_sheet_active = this.dictionary_sprite_sheet.walk;

            this.count_sprite_sheet_column = 17;
            this.count_sprite_sheet_row = 1;
    
            this.index_row_in_sprite_sheet = 0;
            this.index_column_in_sprite_sheet = 0;

            this.fraction_destination_offset_x = 0;
            this.fraction_destination_offset_y = 0;

            this.fraction_destination_width = 3;
            this.fraction_destination_height = 3;
        }
    }
}