class Class_Arrow extends Class_Projectile{
    constructor(canvas, context, x=0, y=0, width=7.5, height=7.5, color="White"){
        super(canvas, context, x, y, width, height, color);

        this.v_x = 0.3;
        this.v_y = 0;


        this.dictionary_sprite_sheet.walk = sprite_sheet_arrow;

        this.status = Enum_Sprite_Status.walk;

        this.index_row_in_sprite_sheet = 0;
        this.index_column_in_sprite_sheet = 0;

        this.dictionary_audio.cause_damage = audio_arrow_cause_damage;

        // this.boolean_draw_box = true;
    }

    update_index_row_in_sprite_sheet(){
        // Dost do tasks not
    }

    update_index_column_in_sprite_sheet(){
        // Dost do tasks not
    }

    update_sprite_sheet_info(){
        // Customize for subclasses
        if (this.status == Enum_Sprite_Status.walk){
            this.sprite_sheet_active = this.dictionary_sprite_sheet.walk;

            this.count_sprite_sheet_column = 1;
            this.count_sprite_sheet_row = 1;
    
            this.index_row_in_sprite_sheet = 0;
            this.index_column_in_sprite_sheet = 0;

            this.fraction_destination_offset_x = -1;
            this.fraction_destination_offset_y = 0;

            this.fraction_destination_width = 3;
            this.fraction_destination_height = 0.8;
        }
    }
}