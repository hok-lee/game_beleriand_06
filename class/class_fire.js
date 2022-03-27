class Class_Fire extends Class_Sprite{
    constructor(canvas, context, x=0, y=0, width=40, height=60, color="White"){
        super(canvas, context, x, y, width, height, color);

        this.dictionary_sprite_sheet.idle = sprite_sheet_fire;

        this.index_row_in_sprite_sheet = 0;
        this.index_column_in_sprite_sheet = 0;

        this.time_interval_change_sprite = 40;


        this.status_default = Enum_Sprite_Status.idle;
        this.status = this.status_default;


        

        // this.boolean_draw_box = true;
    }

    draw(){
        super.draw();

        this.draw_sprite_sheet();

    }

    draw_health_bar(){
        // Dost do tasks not
    }
    
    update_index_row_in_sprite_sheet(){
        if (this.index_column_in_sprite_sheet == this.count_sprite_sheet_column - 1){
            this.index_row_in_sprite_sheet = (this.index_row_in_sprite_sheet + 1) % this.count_sprite_sheet_row;
        }
    }

    // update_index_column_in_sprite_sheet(){
    //     // Dost do tasks not
    // }

    update_sprite_sheet_info(){
        // Customize for subclasses
        if (this.status == Enum_Sprite_Status.idle){
            this.sprite_sheet_active = this.dictionary_sprite_sheet.idle;

            this.count_sprite_sheet_column = 8;
            this.count_sprite_sheet_row = 4;
    
            this.index_row_in_sprite_sheet = 0;
            this.index_column_in_sprite_sheet = 0;

            this.fraction_destination_offset_x = 0;
            this.fraction_destination_offset_y = -0.25;

            this.fraction_destination_width = 1.7;
            this.fraction_destination_height = 2;
        }
    }
}