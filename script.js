var canvas = document.getElementById("art");
var context = canvas.getContext("2d");

function mp(x,in_min,in_max,out_min,out_max){
	return (x - in_min) * (out_max - out_min) / (in_max - in_min) + out_min;
}

function setPixel( x,y, r, g, b, a) {
	
	let index = (x+y*canvas.width)*4;
  imageData = context.getImageData(0,0, canvas.width, canvas.height);
  imageData.data[index+0] = r
	imageData.data[index+1] = g;
  imageData.data[index+2] = b;
  imageData.data[index+3] = a;
	context.putImageData(imageData,0,0);	

//	context.fillStyle = `rgb(${r},${g},${b},255)`;
//	context.fillRect(x,y,1,1);
}

let tarX = -0.74529;
let tarY = 0.113075;
let R = 1.5/500;

var zoom = 2;
//var xmin = -zoom,xmax = zoom,ymin = -zoom,ymax = zoom;
//var xmin = -2,xmax = 1,ymin = -1.5,ymax = 1.5;
var xmin = tarX-R,
		xmax = tarX+R,
		ymin = tarY-R,
		ymax = tarY+R;

var itt = 400;
var bound = 16;


/*
let dpi = window.devicePixelRatio;
function fix_dpi() {
//get CSS height
//the + prefix casts it to an integer
//the slice method gets rid of "px"
let style_height = +getComputedStyle(canvas).getPropertyValue("height").slice(0, -2);
//get CSS width
let style_width = +getComputedStyle(canvas).getPropertyValue("width").slice(0, -2);
//scale the canvas
canvas.setAttribute('height', style_height * dpi);
canvas.setAttribute('width', style_width * dpi);
}
fix_dpi();
*/

function itterate(x,y){
	/*f(z) = z^2 + c, where c is complex, start z = 0*/
	let real = x, imaginairy = y;
	let n=0;
	real = mp(real,0,canvas.width,xmin,xmax);
	imaginairy = mp(imaginairy,0,canvas.height,ymin,ymax); 
	let a = real, b = imaginairy;
	let aa = 0, bb = 0;
	//Make forloop?
	while (n < itt){
		 aa = a*a - b*b;
		 bb = 2*a*b;
		a = aa+real; b = bb+imaginairy;
		if (Math.abs((a*a)+(b*b)) > bound){
			break;
		}
		n++;
	}
	var bright = mp(n,0,itt,0,1);	
	bright = mp(Math.sqrt(bright),0,1,0,255);
	if (n==itt ){
		bright = 0;
	}
	setPixel(x,y,0,0,bright,255);
}

for (let x = 0;x<canvas.width;x++){
	for (let y = 0;y<canvas.height;y++){
		itterate(x,y);
	//	setPixel(x,y,255,255,255,255);
	}
}	

