class Class_Mouse{
    constructor(canvas, context){
        this.canvas = canvas;
        this.context = context;

        this.canvas.addEventListener("mousedown", (event)=>{this.handle_mouse_down(event)});
        this.canvas.addEventListener("mouseup", (event)=>{this.handle_mouse_up(event)});
        this.canvas.addEventListener("mousemove", (event)=>{this.handle_mouse_move(event)});

        this.canvas.addEventListener("mouseenter", (event)=>{this.handle_mouse_enter(event)});
        this.canvas.addEventListener("mouseleave", (event)=>{this.handle_mouse_leave(event)});


        this.position_mouse_down = new Class_Vector();
        this.position_mouse_current = new Class_Vector();


        this.boolean_mouse_pressed = false;
    }

    handle_mouse_down(event){
        // console.log("Mouse down");

        var position_in_canvas = this.position_in_canvas_from_position_in_window(event.clientX, event.clientY);


        // console.log(event);
        // console.log(`window.x: ${event.clientX}  window.y: ${event.clientY}`);
        // console.log(`canvas.x: ${position_in_canvas.x}  canvas.y: ${position_in_canvas.y}`);

        this.position_mouse_down = position_in_canvas;
        this.position_mouse_current = position_in_canvas;


        this.boolean_mouse_pressed = true;

        // array_checkpoint_x.push(position_in_canvas.x);
        // array_checkpoint_y.push(position_in_canvas.y);

    }

    handle_mouse_up(event){
        var position_in_canvas = this.position_in_canvas_from_position_in_window(event.clientX, event.clientY);

        var array_friend_temporary = this.array_sprite_inside_mouse_rectangle(array_friend);

        if (array_friend_temporary.length === 0){
            this.handle_mouse_selection_of_empty_position();
        } else {
            this.handle_mouse_selection_of_array_sprite(array_friend_temporary);
        }


        this.boolean_mouse_pressed = false;
    }


    handle_mouse_move(event){
        if (!this.boolean_mouse_pressed){
            return;
        }
        var position_in_canvas = this.position_in_canvas_from_position_in_window(event.clientX, event.clientY);

        this.position_mouse_current = position_in_canvas;

    }


    handle_mouse_enter(event){
        // Dost do tasks not
    }


    handle_mouse_leave(event){
        if (!this.boolean_mouse_pressed){
            return;
        }

        this.handle_mouse_up(event);
    }

    position_in_canvas_from_position_in_window(a_position_in_window_x, a_position_in_window_y){
        var bound_rectangle = this.canvas.getBoundingClientRect();

        var position_in_canvas_x = a_position_in_window_x - bound_rectangle.left * (this.canvas.width / bound_rectangle.width);
        var position_in_canvas_y = a_position_in_window_y - bound_rectangle.top * (this.canvas.height / bound_rectangle.height);

        return new Class_Vector(Math.round(position_in_canvas_x), Math.round(position_in_canvas_y));
    }

    draw(){

        if (this.boolean_mouse_pressed){
            this.context.strokeStyle = "Gold";
            this.context.strokeRect(this.position_mouse_down.x, this.position_mouse_down.y, this.position_mouse_current.x - this.position_mouse_down.x, this.position_mouse_current.y - this.position_mouse_down.y);
        }
    }

    boolean_sprite_overlap_with_mouse_rectangle(a_sprite){
        // var position_center_of_rectangle = new Class_Vector((this.position_mouse_current.x + this.position_mouse_down.x)/2, (this.position_mouse_current.y + this.position_mouse_down.y)/2);
        var position_center_of_rectangle = this.position_mouse_current.plus(this.position_mouse_down).divide_scalar(2);
        var rectangle_width = Math.abs(this.position_mouse_current.x - this.position_mouse_down.x);
        var rectangle_height = Math.abs(this.position_mouse_current.y - this.position_mouse_down.y);

        return (Math.abs(position_center_of_rectangle.x - a_sprite.x) < (rectangle_width + a_sprite.width*1.5)/2 && Math.abs(position_center_of_rectangle.y - a_sprite.y) < (rectangle_height + a_sprite.height*1.5)/2);
    }

    array_sprite_inside_mouse_rectangle(a_array_sprite){
        var array_alive = a_array_sprite.filter(sprite => {
            return sprite.boolean_alive;
        });

        return array_alive.filter(sprite => {
            return this.boolean_sprite_overlap_with_mouse_rectangle(sprite);
        });
    }

    handle_mouse_selection_of_empty_position(){
        var array_sprite_selected = array_friend.filter(sprite => {
            return sprite.boolean_selected;
        });

        // array_sprite_selected.forEach(sprite => {
        //     sprite.checkpoint = this.position_mouse_current;
        // });

        var contingent_center = this.position_mouse_current.clone();
        var n = Math.round(Math.sqrt(array_sprite_selected.length));
        var delta_x = 20;
        var delta_y = 20;

        var corner_x = contingent_center.x + (-n+1)*delta_x/2;
        var corner_y = contingent_center.y + (-n+1)*delta_y/2;


        array_sprite_selected.forEach((sprite, i) => {
            var index_row = Math.floor(i/n);
            var index_column = i % n;

            sprite.checkpoint = new Class_Vector(corner_x + index_column * delta_x, corner_y + (-n+1)/2 + index_row * delta_y);

            // sprite.checkpoint.x = corner_x + index_column * delta_x;
            // sprite.checkpoint.y = corner_y + (-n+1)/2 + index_row * delta_y;
        });

    }


    handle_mouse_selection_of_array_sprite(a_array_sprite){
        array_friend.forEach(sprite => {
            sprite.boolean_selected = false;
        });

        a_array_sprite.forEach(sprite => {
            sprite.handle_selection();
        });
    }

}