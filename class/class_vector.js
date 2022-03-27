var Enum_Vector_Direction = {
    e: 0,
    se: 1,
    s: 2,
    sw: 3,
    w: 4,
    nw: 5,
    n: 6,
    ne: 7
}

class Class_Vector{
    constructor(x=0, y=0){
        this.x = x;
        this.y = y;
    }

    get angle(){
        // In radians, from -pi to +pi
        return Math.atan2(this.y, this.x);
    }

    set angle(a_angle){
        var magnitude = this.magnitude;
        this.x = magnitude*Math.cos(a_angle);
        this.y = magnitude*Math.sin(a_angle);
    }


    get magnitude(){
        return Math.sqrt(this.x*this.x + this.y*this.y);
    }

    set magnitude(a_magnitude){
        var angle = this.angle;
        this.x = a_magnitude*Math.cos(angle);
        this.y = a_magnitude*Math.sin(angle);
    }

    get direction(){
        var angle_in_degree = this.angle*180/Math.PI;
        if (Math.abs(angle_in_degree - 0) <= 22.5){
            return Enum_Vector_Direction.e;
        } else if (Math.abs(angle_in_degree - 45) <= 22.5){
            return Enum_Vector_Direction.se;
        } else if (Math.abs(angle_in_degree - 90) <= 22.5){
            return Enum_Vector_Direction.s;
        } else if (Math.abs(angle_in_degree - 135) <= 22.5){
            return Enum_Vector_Direction.sw;
        } else if (Math.abs(angle_in_degree - (-135)) <= 22.5){
            return Enum_Vector_Direction.nw;
        } else if (Math.abs(angle_in_degree - (-90)) <= 22.5){
            return Enum_Vector_Direction.n;
        } else if (Math.abs(angle_in_degree - (-45)) <= 22.5){
            return Enum_Vector_Direction.ne;
        } else {
            return Enum_Vector_Direction.w
        }
    }


    clone(){
        return new Class_Vector(this.x, this.y);
    }

    minus(a_vector, boolean_replace_original=false){
        var result = new Class_Vector(this.x-a_vector.x, this.y-a_vector.y);
        if (boolean_replace_original){
            this.x = result.x;
            this.y = result.y;

            return this;
        } else {
            return result;
        }
    }

    plus(a_vector, boolean_replace_original=false){
        var result = new Class_Vector(this.x+a_vector.x, this.y+a_vector.y);
        if (boolean_replace_original){
            this.x = result.x;
            this.y = result.y;

            return this;
        } else {
            return result;
        }
    }

    times_scalar(a_scalar, boolean_replace_original=false){
        var result = new Class_Vector(this.x * a_scalar, this.y * a_scalar);
        if (boolean_replace_original){
            this.x = result.x;
            this.y = result.y;

            return this;
        } else {
            return result;
        }
    }

    divide_scalar(a_scalar, boolean_replace_original=false){
        return this.times_scalar(1/a_scalar, boolean_replace_original);
    }



}