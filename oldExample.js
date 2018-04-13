$(document).ready(function() {
    var d_canvas = document.getElementById('canvas');
    var context = d_canvas.getContext('2d');
    
    var wKeyDown = false;
    var sKeyDown = false;
    var aKeyDown = false;
    var dKeyDown = false;
    
    //d_canvas.onkeydown = function(e) {
    d_canvas.addEventListener("keydown", function(e){
        if ( e.keyCode == 87 ) {wKeyDown=true;}
        if ( e.keyCode == 83 ) {sKeyDown=true;}
        if ( e.keyCode == 65 ) {aKeyDown=true;}
        if ( e.keyCode == 68 ) {dKeyDown=true;}
    }, false);
    //d_canvas.onkeyup = function(e) {
    d_canvas.addEventListener("keyup", function(e){
        if ( e.keyCode == 87 ) {wKeyDown=false;}
        if ( e.keyCode == 83 ) {sKeyDown=false;}
        if ( e.keyCode == 65 ) {aKeyDown=false;}
        if ( e.keyCode == 68 ) {dKeyDown=false;}
    }, false);
    
    var timeStep = 0.05;
    var g = 10;
    var yScale = 0.7;
    var t = 0;
    var position = new Vector(200, 250, 50);
    var velocity = new Vector(0, 0, 0);
    var bodyPath = [{ x: 20, y: 20, z: 0 },
                    { x: 20, y: -20, z: 0 },
                    { x: -20, y: -20, z: 0 },
                    { x: -20, y: 20, z: 0 } ];
    var roll = 0;
    var pitch = 0;
    var yaw = 0;
    var thrust = g; // Start out with thrust set for a stable hover
    
    //context.drawImage(background, 0, 0);

    var myInterval = setInterval(redraw, 50);
    
    function redraw() {
        t = t + 1;
        if (t > 5000) {
            clearInterval(myInterval);
        }
        //pitch = pitch + 1/60.0;
        //roll = roll + 1/70.0;
        //yaw = yaw + 1/80.0;
        //position.z = position.z + 1;
        
        var rollVec = new Vector(0,-1,0);
        var pitchVec = new Vector(1,0,0);
        var yawVec = new Vector(0,0,1);
        rollVec = rollVec.rotate(yawVec, yaw);
        pitchVec = pitchVec.rotate(yawVec, yaw);
        rollVec = rollVec.rotate(pitchVec, pitch);
        yawVec = yawVec.rotate(pitchVec, pitch);
        pitchVec = pitchVec.rotate(rollVec, roll);
        yawVec = yawVec.rotate(rollVec, roll);
        
        if (wKeyDown) {
            thrust = thrust + 1;
        } else if (sKeyDown) {
            thrust = thrust - 1;
        }
        var totalForces = (new Vector(0, 0, -g)).add(yawVec.scale(thrust));
        velocity = velocity.add(totalForces.scale(timeStep));
        position = position.add(velocity.scale(timeStep));
        if (position.z < 0) {
            position.z = 0;
            velocity.z = 0;
        }
        
        var bodyPointsInWorldCoords = [];
        bodyPath.forEach(function(bodyPoint) {
            var bodyPointRotated = pitchVec.scale(bodyPoint.x).add(yawVec.scale(bodyPoint.z)).add(rollVec.scale(bodyPoint.y));
            bodyPointsInWorldCoords.push(bodyPointRotated.add(position));
        });
        
        context.fillStyle = "#FFFFFF";
        context.fillRect(0, 0, d_canvas.width, d_canvas.height);
        context.fillStyle = "#000000";
        context.shadowColor = '#999';
        context.shadowBlur = 20;
        context.shadowOffsetX = 0;
        context.shadowOffsetY = position.z;
        
        // Now make a canvas path containing each project(bodyPointsInWorldCoords[i])
        context.beginPath();
        var startPoint = project(bodyPointsInWorldCoords[0]);
        context.moveTo(startPoint.x, startPoint.y);
        bodyPointsInWorldCoords.forEach(function(bodyPoint) {
            var nextPoint = project(bodyPoint);
            context.lineTo(nextPoint.x, nextPoint.y);
        });
        context.fill();
    }
    
    function project(positionVector) {
        return { x: positionVector.x, y: ((yScale*positionVector.y)-positionVector.z) };
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
    
});


    