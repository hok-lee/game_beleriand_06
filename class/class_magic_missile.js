class Class_Magic_Missile extends Class_Projectile{
    constructor(canvas, context, x=0, y=0, color="yellow", array_attackee=array_foe, width=10, height=10){
        super(canvas, context, x, y, width, height, color, array_attackee);

        this.v_x = 0.2;
        this.v_y = 0;

        if (color == "yellow"){
            this.dictionary_sprite_sheet.walk = sprite_sheet_magic_missile_yellow;
        } else if (color == "blue"){
            this.dictionary_sprite_sheet.walk = sprite_sheet_magic_missile_blue;
        } else if (color == "red"){
            this.dictionary_sprite_sheet.walk = sprite_sheet_magic_missile_red;
        } else {
            this.dictionary_sprite_sheet.walk = sprite_sheet_arrow;
        }


        

        this.status = Enum_Sprite_Status.walk;

        this.index_row_in_sprite_sheet = 0;
        this.index_column_in_sprite_sheet = 0;

        this.damage = 35;

        this.dictionary_audio.cause_damage = audio_magic_missile_cause_damage;
        audio_magic_missile_construct.play();

        // this.boolean_draw_box = true;
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

            this.count_sprite_sheet_column = 15;
            this.count_sprite_sheet_row = 1;
    
            this.index_row_in_sprite_sheet = 0;
            this.index_column_in_sprite_sheet = 0;

            this.fraction_destination_offset_x = -1;
            this.fraction_destination_offset_y = 0;

            this.fraction_destination_width = 3;
            this.fraction_destination_height = 3;
        }
    }
}