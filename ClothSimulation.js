$(document).ready(function() {
    var d_canvas = document.getElementById('canvas');
    var context = d_canvas.getContext('2d');
  
    //var ballon = document.getElementById('ballon')
  	//context.drawImage(background, 0, 0);
    
    var count = 0;
    
    for (var i = 0; i < 10; i++) {

    }

		context.fillStyle = 'black';
		context.fillRect(0, 0, canvas.width, canvas.height);
    
    var myInterval = setInterval(redraw, 33);
    
    function redraw() {
        
        
        
        count = count + 1;
        if (count > 30000) {
            clearInterval(myInterval);
        }
    }
    
    
    
    function Vector(X,Y,Z) {
        this.x = X;
        this.y = Y;
        this.z = Z;
        // add(Vector b)
        this.add = function(b) {
            return new Vector(this.x + b.x, this.y + b.y, this.z + b.z);
        }
        // subtract(Vector b)
        this.subtract = function(b) {
            return new Vector(this.x - b.x, this.y - b.y, this.z - b.z);
        }
        // scale(Number a)
        this.scale = function(a) {
            return new Vector(a*this.x, a*this.y, a*this.z);
        }
        // dot(Vector b)
        this.dot = function(b) { return this.x*b.x + this.y*b.y + this.z*b.z; }
        this.magnitude = function() {
            return Math.sqrt(this.x*this.x + this.y*this.y + this.z*this.z);
        }
        // cross(Vector b)
        this.cross = function(b) { return new Vector((this.y*b.z - this.z*b.y), 
                                                     (this.z*b.x - this.x*b.z), 
                                                     (this.x*b.y - this.y*b.x)); }
        // getPerp(), Gets a vector perpendicular to this, lying in the x y plane.
        this.getPerp = function() {
            if ((this.x==0)&&(this.y==0)) {
                return new Vector(1, 0, 0);
            } else {
                return new Vector(this.y, -this.x, 0);
            }
        }
        // rotate(Vector axis, Number theta)
        this.rotate = function(axis, theta) {
            var normAx = axis.scale(1.0/axis.magnitude());
            var a = this.scale(Math.cos(theta));
            var b = normAx.cross(this).scale(Math.sin(theta));
            var c = normAx.scale(this.dot(normAx)).scale(1-Math.cos(theta));
            return a.add(b).add(c);
        }
    }
    
    
    
    function hsvToRgb(h, s, v) {
        var rgb = {};
        if (s === 0) {
            rgb.r = rgb.g = rgb.b = v;
        } else {
            if (h < 0) { h = h + 360; }
            h = Math.abs(h % 360);
            var t1 = v;
            var t2 = (255 - s) * v / 255;
            var t3 = (t1 - t2) * (h % 60) / 60;
            if (h < 60) { rgb.r = t1; rgb.b = t2; rgb.g = t2 + t3; }
            else if (h < 120) { rgb.g = t1; rgb.b = t2; rgb.r = t1 - t3; }
            else if (h < 180) { rgb.g = t1; rgb.r = t2; rgb.b = t2 + t3; }
            else if (h < 240) { rgb.b = t1; rgb.r = t2; rgb.g = t1 - t3; }
            else if (h < 300) { rgb.b = t1; rgb.g = t2; rgb.r = t2 + t3; }
            else if (h < 360) { rgb.r = t1; rgb.g = t2; rgb.b = t1 - t3; }
            else { rgb.r = 0; rgb.g = 0; rgb.b = 0; }
        }
        return { r: Math.round(rgb.r), g: Math.round(rgb.g), b: Math.round(rgb.b) };
    }
    
});


    