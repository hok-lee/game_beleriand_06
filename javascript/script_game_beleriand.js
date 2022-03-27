var canvas;
var context;


var w = 1100;    //width of canvas
var h = 700;    //height of canvas

var mouse;

var count_friend_slain = 0;
var count_foe_slain = 0;
var count_foe_passed = 0;

var tower;
var flare_stationary;


var boolean_game_running = true;

var int_draw_instruction = 0; // 0: draw, 1: draw, but already set timeout, 2: do NOT draw!!!!!

var time_of_last_update = null;


var image_map_beleriand = new Image();

var sprite_sheet_house_idle = new Image();
var sprite_sheet_house_dead = new Image();

var sprite_sheet_elf_idle = new Image();
var sprite_sheet_elf_walk = new Image();
var sprite_sheet_elf_fall = new Image();
var sprite_sheet_elf_attack = new Image();
var sprite_sheet_elf_hit = new Image();

var sprite_sheet_ent_idle = new Image();
var sprite_sheet_ent_walk = new Image();
var sprite_sheet_ent_fall = new Image();
var sprite_sheet_ent_attack = new Image();
var sprite_sheet_ent_hit = new Image();

var sprite_sheet_wizard_idle = new Image();
var sprite_sheet_wizard_walk = new Image();
var sprite_sheet_wizard_fall = new Image();
var sprite_sheet_wizard_attack = new Image();
var sprite_sheet_wizard_hit = new Image();

var sprite_sheet_orc_walk = new Image();
var sprite_sheet_orc_fall = new Image();
var sprite_sheet_orc_attack = new Image();
var sprite_sheet_orc_hit = new Image();

var sprite_sheet_balrog_walk = new Image();
var sprite_sheet_balrog_fall = new Image();
var sprite_sheet_balrog_attack = new Image();
var sprite_sheet_balrog_hit = new Image();

var sprite_sheet_spider_walk = new Image();
var sprite_sheet_spider_fall = new Image();
var sprite_sheet_spider_attack = new Image();
var sprite_sheet_spider_hit = new Image();

var sprite_sheet_necromancer_walk = new Image();
var sprite_sheet_necromancer_fall = new Image();
var sprite_sheet_necromancer_attack = new Image();
var sprite_sheet_necromancer_hit = new Image();

var sprite_sheet_tower_idle = new Image();
var sprite_sheet_tower_fall = new Image();
var sprite_sheet_tower_attack = new Image();

var sprite_sheet_flare_stationary_idle = new Image();
var sprite_sheet_flare_stationary_fall = new Image();
var sprite_sheet_flare_stationary_attack = new Image();

var sprite_sheet_arrow = new Image();

var sprite_sheet_magic_missile_yellow = new Image();
var sprite_sheet_magic_missile_blue = new Image();
var sprite_sheet_magic_missile_red = new Image();

var sprite_sheet_flare_red = new Image();
var sprite_sheet_flare_blue = new Image();

var sprite_sheet_fire = new Image();

var array_foe = [];
var array_friend = [];
var array_house = [];
var array_projectile = [];
var array_fire = [];
var array_dead = [];


var array_sprite_will_die = [];

var array_road = [];

var array_road_x = [];
array_road_x.push([567, 457, 352, 378, 442, 583, 749, 833, 798, 864, 808, 699, 567]);
array_road_x.push([567, 458, 191, 296, 401, 500, 620, 682, 709, 686, 710, 770, 740, 567]);
array_road_x.push([566, 689, 682, 598, 533, 516, 439, 427, 652, 778, 918, 867, 876, 569]);
array_road_x.push([561, 439, 279, 164, 80, 139, 177, 262, 347, 449, 558, 663, 749, 771, 814, 903, 866, 743, 567]);
array_road_x.push([567, 787, 945, 866, 884, 893, 867, 676, 603, 723, 697, 726, 745, 568]);
array_road_x.push([571, 449, 322, 292, 208, 127, 180, 294, 502, 641, 781, 752, 567]);
// array_road_x.push();
// array_road_x.push();

var array_road_y = [];
array_road_y.push([73, 178, 264, 369, 469, 528, 528, 417, 290, 213, 115, 101, 72]);
array_road_y.push([72, 175, 332, 437, 532, 554, 629, 482, 342, 228, 212, 157, 72, 71]);
array_road_y.push([71, 114, 142, 168, 187, 209, 276, 397, 415, 370, 316, 214, 75, 71]);
array_road_y.push([73, 37, 7, 4, 21, 88, 152, 147, 92, 113, 132, 124, 135, 211, 266, 242, 209, 101, 69]);
array_road_y.push([70, 122, 105, 210, 381, 527, 649, 595, 430, 318, 221, 195, 102, 71]);
array_road_y.push([69, 114, 122, 177, 220, 248, 373, 339, 313, 286, 255, 124, 70]);
// array_road_y.push();
// array_road_y.push();


var array_checkpoint_x = [];
var array_checkpoint_y = [];
var array_checkpoint = [];



var audio_flare_construct = load_audio("../asset/sound_wizard_attack_flare.wav");
var audio_magic_missile_construct = load_audio("../asset/sound_wizard_attack_magic_missile.wav");

var audio_arrow_cause_damage = load_audio("../asset/sound_arrow_attack_01.wav");
var audio_magic_missile_cause_damage = load_audio("../asset/sound_magic_missile_attack.wav");
var audio_flare_cause_damage = load_audio("../asset/sound_flare_attack_01.wav");

var audio_balrog_fall = load_audio("../asset/sound_balrog_fall_01.m4a");
var audio_orc_fall = load_audio("../asset/sound_orc_fall_01.wav");
var audio_tower_fall = load_audio("../asset/sound_tower_fall.wav");

var audio_ent_fall = load_audio("../asset/sound_ent_fall.wav");

var audio_wizard_walk = load_audio("../asset/sound_wizard_walk_01.wav");



setup_canvas();
setup_image();
setup_road();
make_sprite();


requestAnimationFrame(update_and_draw);

function setup_canvas(){
    canvas = document.getElementById("id_canvas_game_tower_01");
    canvas.width = w;
    canvas.height = h;

    canvas.tabIndex = 0;

    context = canvas.getContext('2d');

    mouse = new Class_Mouse(canvas, context);
}

function setup_image(){
    image_map_beleriand.src="../image/map_beleriand.jpg";
    image_map_beleriand.onload = function(){
        console.log("Map of Beleriand loaded");
    }

    sprite_sheet_house_idle.src="../image/sprite_sheet_house_01_idle.png";
    sprite_sheet_house_dead.src="../image/sprite_sheet_house_01_dead.png";

    sprite_sheet_elf_idle.src="../image/sprite_sheet_elf_02_idle.png";
    sprite_sheet_elf_walk.src="../image/sprite_sheet_elf_02_walk.png";
    sprite_sheet_elf_fall.src="../image/sprite_sheet_elf_02_fall.png";
    sprite_sheet_elf_attack.src="../image/sprite_sheet_elf_02_attack.png";
    sprite_sheet_elf_hit.src="../image/sprite_sheet_elf_02_hit.png";

    sprite_sheet_ent_idle.src="../image/sprite_sheet_ent_01_idle.png";
    sprite_sheet_ent_walk.src="../image/sprite_sheet_ent_01_walk.png";
    sprite_sheet_ent_fall.src="../image/sprite_sheet_ent_01_fall.png";
    sprite_sheet_ent_attack.src="../image/sprite_sheet_ent_01_attack.png";
    sprite_sheet_ent_hit.src="../image/sprite_sheet_ent_01_hit.png";

    sprite_sheet_wizard_idle.src="../image/sprite_sheet_wizard_02_idle.png";
    sprite_sheet_wizard_walk.src="../image/sprite_sheet_wizard_02_walk.png";
    sprite_sheet_wizard_fall.src="../image/sprite_sheet_wizard_02_fall.png";
    sprite_sheet_wizard_attack.src="../image/sprite_sheet_wizard_02_attack.png";
    sprite_sheet_wizard_hit.src="../image/sprite_sheet_wizard_02_hit.png";

    sprite_sheet_orc_walk.src="../image/sprite_sheet_orc_04_walk.png";
    sprite_sheet_orc_fall.src="../image/sprite_sheet_orc_04_fall.png";
    sprite_sheet_orc_attack.src="../image/sprite_sheet_orc_04_attack.png";
    sprite_sheet_orc_hit.src="../image/sprite_sheet_orc_04_hit.png";

    sprite_sheet_balrog_walk.src="../image/sprite_sheet_balrog_03_walk.png";
    sprite_sheet_balrog_fall.src="../image/sprite_sheet_balrog_03_fall.png";
    sprite_sheet_balrog_attack.src="../image/sprite_sheet_balrog_03_attack.png";
    sprite_sheet_balrog_hit.src="../image/sprite_sheet_balrog_03_hit.png";

    sprite_sheet_spider_walk.src="../image/sprite_sheet_spider_01_walk.png";
    sprite_sheet_spider_fall.src="../image/sprite_sheet_spider_01_fall.png";
    sprite_sheet_spider_attack.src="../image/sprite_sheet_spider_01_attack.png";
    sprite_sheet_spider_hit.src="../image/sprite_sheet_spider_01_hit.png";

    sprite_sheet_necromancer_walk.src="../image/sprite_sheet_necromancer_01_walk.png";
    sprite_sheet_necromancer_fall.src="../image/sprite_sheet_necromancer_01_fall.png";
    sprite_sheet_necromancer_attack.src="../image/sprite_sheet_necromancer_01_attack.png";
    sprite_sheet_necromancer_hit.src="../image/sprite_sheet_necromancer_01_hit.png";

    sprite_sheet_tower_idle.src="../image/sprite_sheet_tower_01_idle.png";
    sprite_sheet_tower_fall.src="../image/sprite_sheet_tower_01_fall.png";
    sprite_sheet_tower_attack.src="../image/sprite_sheet_tower_01_attack.png";

    sprite_sheet_flare_stationary_idle.src="../image/sprite_sheet_flare_stationary_01_idle.png";
    sprite_sheet_flare_stationary_fall.src="../image/sprite_sheet_flare_stationary_01_fall.png";
    sprite_sheet_flare_stationary_attack.src="../image/sprite_sheet_flare_stationary_01_attack.png";

    sprite_sheet_arrow.src="../image/arrow_01_small.png";

    sprite_sheet_magic_missile_yellow.src="../image/sprite_sheet_magic_missile_yellow_east.png";
    sprite_sheet_magic_missile_blue.src="../image/sprite_sheet_magic_missile_blue_east.png";
    sprite_sheet_magic_missile_red.src="../image/sprite_sheet_magic_missile_red_east.png";

    sprite_sheet_flare_red.src="../image/sprite_sheet_flare_evil.png";
    sprite_sheet_flare_blue.src="../image/sprite_sheet_flare_good.png";

    sprite_sheet_fire.src="../image/sprite_sheet_fire_01.png";
}

function setup_road(){
    for (var i=0; i<array_road_x.length; i++){
        var road_x = array_road_x[i];
        var road_y = array_road_y[i];

        var road = [];
        for (var j=0; j<road_x.length; j++){
            var checkpoint_x = road_x[j];
            var checkpoint_y = road_y[j];

            var checkpoint = new Class_Vector(checkpoint_x, checkpoint_y);
            road.push(checkpoint);
        }
        array_road.push(road);

    }
}

function make_sprite(){
    make_house();

    make_friend();

    // make_foe();
}

function make_house(){
    for (var i=0; i<10; i++){

        do{
            var x = Math.random()*w*0.9+0.05*w;
            var y = Math.random()*h/2+h/2-h*0.05;
        } while(y > 1.5*x)

        array_house.push(new Class_House(canvas, context, x, y));
    }

    // //Comment this out later
    // for (var i=0; i<3; i++){
    //     array_fire.push(new Class_Fire(canvas, context, Math.random()*w, Math.random()*h));
    // }

}

function make_friend(){
    for (var i=0; i<document.getElementById("id_slider_elf").value; i++){
        array_friend.push(new Class_Elf(canvas, context, Math.random()*w*0.9+0.05*w, Math.random()*h*0.9+0.05*h));
    }

    for (var i=0; i<document.getElementById("id_slider_wizard").value; i++){
        array_friend.push(new Class_Wizard(canvas, context, Math.random()*w*0.9+0.05*w, Math.random()*h*0.9+0.05*h));
    }

    for (var i=0; i<document.getElementById("id_slider_ent").value; i++){
        array_friend.push(new Class_Ent(canvas, context, Math.random()*w*0.9+0.05*w, Math.random()*h*0.9+0.05*h));
    }
}

function make_foe(){
    int_draw_instruction = 2;

    for (var i=0; i<document.getElementById("id_slider_orc").value; i++){
        setTimeout(()=>{
            var orc = new Class_Orc(canvas, context, Math.random()*w, Math.random()*h);
            var index_road = Math.floor(Math.random()*array_road.length);
            orc.array_checkpoint = array_road[index_road];
            orc.checkpoint = orc.array_checkpoint[0];
            orc.position = orc.checkpoint.clone();
            array_foe.push(orc);
        } , 3000*Math.random());
    }

    for (var i=0; i<document.getElementById("id_slider_balrog").value; i++){

        setTimeout(()=>{
            var balrog = new Class_Balrog(canvas, context, Math.random()*w, Math.random()*h);
            var index_road = Math.floor(Math.random()*array_road.length);
            balrog.array_checkpoint = array_road[index_road];
            balrog.checkpoint = balrog.array_checkpoint[0];
            balrog.position = balrog.checkpoint.clone();
            array_foe.push(balrog);
        } , 3000*Math.random());
    }

    for (var i=0; i<document.getElementById("id_slider_spider").value; i++){

        setTimeout(()=>{
            var spider = new Class_Spider(canvas, context, Math.random()*w, Math.random()*h);
            var index_road = Math.floor(Math.random()*array_road.length);
            spider.array_checkpoint = array_road[index_road];
            spider.checkpoint = spider.array_checkpoint[0];
            spider.position = spider.checkpoint.clone();
            array_foe.push(spider);
        } , 3000*Math.random());
    }

    for (var i=0; i<document.getElementById("id_slider_necromancer").value; i++){

        setTimeout(()=>{
            var necromancer = new Class_Necromancer(canvas, context, Math.random()*w, Math.random()*h);
            var index_road = Math.floor(Math.random()*array_road.length);
            necromancer.array_checkpoint = array_road[index_road];
            necromancer.checkpoint = necromancer.array_checkpoint[0];
            necromancer.position = necromancer.checkpoint.clone();
            array_foe.push(necromancer);
        } , 3000*Math.random());
    }

    if (document.getElementById("id_checkbox_tower").checked){
        tower = new Class_Tower(canvas, context, w/2-50, 50);
        flare_stationary = new Class_Flare_Stationary(canvas, context, tower.x, tower.y - 40);

        array_foe.push(tower);
    }
}

function update_and_draw(timestamp){
    update(timestamp);
    draw();

    if (boolean_game_running){
        requestAnimationFrame(update_and_draw);
    }
}

function update(timestamp){
    

    if (time_of_last_update === null){
        time_of_last_update = timestamp;
    }
    var time_delta = timestamp - time_of_last_update;
    if (time_delta > 500){
        time_delta = 0;
    }


    array_house.forEach(house => {
        house.update(time_delta);
    });

    array_friend.forEach(friend => {
        friend.update(time_delta);
    });

    array_foe.forEach(foe => {
        foe.update(time_delta);
    });

    array_projectile.forEach(projectile => {
        projectile.update(time_delta);
    });

    array_fire.forEach(fire => {
        fire.update(time_delta);
    });


    array_sprite_will_die.forEach(sprite => {
        sprite.die();
    });

    array_sprite_will_die = [];

    time_of_last_update = timestamp;
}

function draw(){
    context.clearRect(0, 0, w, h);
    draw_background();
    draw_border();

    array_house.forEach(house => {
        house.draw();
    });

    array_dead.forEach(sprite_dead => {
        sprite_dead.draw();
    });

    array_fire.forEach(fire => {
        fire.draw();
    });

    array_foe.forEach(foe => {
        foe.draw();
    });

    array_friend.forEach(friend => {
        friend.draw();
    });

    array_projectile.forEach(projectile => {
        projectile.draw();
    });

    mouse.draw();

    draw_statistics();


    if (int_draw_instruction < 2){
        draw_instruction();
    }

    // draw_road();
}

function draw_border(){

    context.save();
        context.strokeStyle="Black";
        context.strokeRect(0, 0, w, h);
    context.restore();
}

function draw_background(){
    var i_w = image_map_beleriand.width;
    var i_h = image_map_beleriand.height;
    context.drawImage(image_map_beleriand, 0.11*i_w, 0.02*i_h, 0.78*i_w, 0.96*i_h, 0, 0, w, h);
}

function draw_road(){

    context.save();
    context.strokeStyle = "Black";

    array_road.forEach(road => {
        road.forEach((checkpoint, i) => {
            if (i==0){
                context.beginPath();
                context.moveTo(checkpoint.x, checkpoint.y);
            } else {
                context.lineTo(checkpoint.x, checkpoint.y);
            }
        });
        context.stroke();
    });

    
    context.restore();
}

function draw_statistics(){
    context.save();
    context.fillStyle = "Black";
    context.font = "20px Arial";
    context.fillText(`Friends Slain: ${count_friend_slain}`, 10, h - 70);
    context.fillText(`Foes Slain: ${count_foe_slain}`, 10, h - 40);
    context.fillText(`Foes Passed: ${count_foe_passed}`, 10, h - 10);
    context.restore();
}

function draw_instruction(){
    context.save();
    context.fillStyle = "White";
    context.font = "40px Arial";
    context.textAlign = "center";
    context.fillText(`Use mouse or arrow keys to move the elves and friends`, w/2, h/2 - 60);
    context.fillText(`Press "a" to select all`, w/2, h/2);
    context.fillText(`Press "Next Wave of Attack" to begin`, w/2, h/2 + 60);
    context.restore();

    if (int_draw_instruction == 0){
        setTimeout(()=>{int_draw_instruction = 2}, 10000);
        int_draw_instruction = 1;
    }
}

function load_audio(filepath){
    var a_audio = new Audio();
    a_audio.src = filepath;
    a_audio.setAttribute("preload", "auto");

    return a_audio;

}