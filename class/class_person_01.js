class Class_Person_01{
    constructor(first_name, last_name){
        this.first_name = first_name;
        this.last_name = last_name;
    }

    get full_name(){
        return this.first_name + " " + this.last_name;
    }

    set full_name(a_full_name){
        var array_name = a_full_name.split(" ");
        this.first_name = array_name[0];
        this.last_name = array_name[1];
    }

    get_full_name(){
        return this.first_name + " " + this.last_name;
    }

    set_full_name(a_full_name){
        var array_name = a_full_name.split(" ");
        this.first_name = array_name[0];
        this.last_name = array_name[1];
    }
}


class Class_Person_02{
    constructor(full_name){
        this.full_name = full_name;
    }

    get first_name(){
        var array_name = this.full_name.split(" ");
        return array_name[0];
    }

    get last_name(){
        var array_name = this.full_name.split(" ");
        return array_name[1];
    }

    set first_name(a_first_name){
        this.full_name = a_first_name + " " + this.get_last_name();
    }

    set last_name(a_last_name){
        this.full_name = this.get_first_name() + " " + a_last_name;
    }

    get_first_name(){
        var array_name = this.full_name.split(" ");
        return array_name[0];
    }

    get_last_name(){
        var array_name = this.full_name.split(" ");
        return array_name[1];
    }

    set_first_name(a_first_name){
        this.full_name = a_first_name + " " + this.get_last_name();
    }

    set_last_name(a_last_name){
        this.full_name = this.get_first_name() + " " + a_last_name;
    }

}