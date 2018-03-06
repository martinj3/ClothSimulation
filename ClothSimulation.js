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


    