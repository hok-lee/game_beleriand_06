canvas.addEventListener("keydown", handle_keydown);
setup_slider();

function toggle_play(a_boolean_game_running_by_force=null){
    // When a_boolean_game_running_by_force is set, then the game's boolean_game_running will be set to the value specified. 
    // When it is left blank (i.e. null), then boolean_game_running is simply toggled. 

    var boolean_game_running_original = boolean_game_running;

    if (a_boolean_game_running_by_force === null){
        boolean_game_running = !boolean_game_running;
    } else {
        boolean_game_running = a_boolean_game_running_by_force;
    }

    var element_button = document.getElementById("id_button_toggle_play");

    if (boolean_game_running){
        element_button.innerHTML="Pause";
    } else {
        element_button.innerHTML="Resume";
    }
    

    if (boolean_game_running && !boolean_game_running_original){
        requestAnimationFrame(update_and_draw);
    }


}

function restart(){
    array_friend = [];
    array_foe = [];
    array_house = [];
    array_projectile = [];
    array_fire = [];
    array_dead = [];
    array_sprite_will_die = [];

    count_friend_slain = 0;
    count_foe_slain = 0;
    count_foe_passed = 0;

    make_sprite();

    int_draw_instruction = 0;
    
    toggle_play(true);

}

function setup_slider(){

    document.querySelectorAll("#id_div_slider > input").forEach(slider => {
        slider.addEventListener("input", handle_slider_change);
    });

}

function handle_slider_change(){
    // console.log("The slider hast changeth");

    var array_span_value = document.querySelectorAll("#id_div_slider > span");

    document.querySelectorAll("#id_div_slider > input").forEach((slider, i) => {
        array_span_value[i].innerHTML = slider.value;
    });

}

function handle_keydown(event_keydown){
    // console.log(`code: ${event_keydown.code}, keyCode: ${event_keydown.keyCode}`);

    if (event_keydown.code == "ArrowUp"){
        var array_sprite_selected = array_friend.filter(sprite => {
            return sprite.boolean_selected && !(sprite instanceof Class_Wizard);
        });

        array_sprite_selected.forEach(sprite => {
            sprite.checkpoint = null;
            sprite.status = Enum_Sprite_Status.walk;
            sprite.velocity.angle = -Math.PI/2;
        });

        event_keydown.preventDefault();
    } else if (event_keydown.code == "ArrowDown"){
        var array_sprite_selected = array_friend.filter(sprite => {
            return sprite.boolean_selected && !(sprite instanceof Class_Wizard);
        });

        array_sprite_selected.forEach(sprite => {
            sprite.checkpoint = null;
            sprite.status = Enum_Sprite_Status.walk;
            sprite.velocity.angle = +Math.PI/2;
        });

        event_keydown.preventDefault();
    } else if (event_keydown.code == "ArrowLeft"){
        var array_sprite_selected = array_friend.filter(sprite => {
            return sprite.boolean_selected && !(sprite instanceof Class_Wizard);
        });

        array_sprite_selected.forEach(sprite => {
            sprite.checkpoint = null;
            sprite.status = Enum_Sprite_Status.walk;
            sprite.velocity.angle = Math.PI;
        });

        event_keydown.preventDefault();
    } else if (event_keydown.code == "ArrowRight"){
        var array_sprite_selected = array_friend.filter(sprite => {
            return sprite.boolean_selected && !(sprite instanceof Class_Wizard);
        });

        array_sprite_selected.forEach(sprite => {
            sprite.checkpoint = null;
            sprite.status = Enum_Sprite_Status.walk;
            sprite.velocity.angle = 0;
        });

        event_keydown.preventDefault();
    } else if (event_keydown.keyCode == 16){  // Shift
        var array_sprite_selected = array_friend.filter(sprite => {
            return sprite.boolean_selected && !(sprite instanceof Class_Wizard);
        });

        array_sprite_selected.forEach(sprite => {
            sprite.status = Enum_Sprite_Status.idle;
        });
    } else if (event_keydown.code == "KeyA"){
        console.log("A is pressed");

        array_friend.forEach(sprite => {
            sprite.handle_selection();
        });
    }
}