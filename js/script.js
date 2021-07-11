const canvas = document.getElementById("canvas");
// buttons
const plus = document.getElementById("more");
const minus = document.getElementById("less");
const clear = document.getElementById("clear");
const download = document.getElementById("download");
const fill = document.getElementById("fill");
let isPressed = false;
// brush size indicator
let number = document.getElementById("size");
// color input
let inputColor = document.getElementById("color");
let size;
let color;
const ctx = canvas.getContext("2d");
// random brush size func
function setSize() {
	size = (Math.random() * 10).toFixed(0);
	number.innerHTML = size;
}
// color converter func
let fullColorHex = function (r, g, b) {
	var red = rgbToHex(r);
	var green = rgbToHex(g);
	var blue = rgbToHex(b);
	return `#${red}${green}${blue}`;
};
let rgbToHex = function (rgb) {
	var hex = Number(rgb).toString(16);
	if (hex.length < 2) {
		hex = "0" + hex;
	}
	return hex;
};
// random color func
function randomColor() {
	let color = fullColorHex(
		`${(Math.random() * 255).toFixed(0)}`,
		`${(Math.random() * 255).toFixed(0)}`,
		`${(Math.random() * 255).toFixed(0)}`
	);
	return color;
}
// set color
function setColor() {
	color = `${randomColor()}`;
	inputColor.setAttribute("value", `${color}`);
}
setSize();
setColor();

function brush(x, y) {
	ctx.beginPath();
	ctx.arc(x, y, size, 0, 10);
	ctx.fillStyle = color;
	ctx.fill();
}

function lineDraw(x1, y1, x2, y2) {
	ctx.beginPath();
	ctx.moveTo(x1, y1);
	ctx.lineTo(x2, y2);
	ctx.strokeStyle = color;
	ctx.lineWidth = size * 2;
	ctx.stroke();
}
canvas.addEventListener("mousedown", (e) => {
	isPressed = true;
	x = e.offsetX;
	y = e.offsetY;
});
canvas.addEventListener("mouseup", (e) => {
	isPressed = false;
	x = undefined;
	y = undefined;
});
canvas.addEventListener("mousemove", (e) => {
	if (isPressed) {
		const x2 = e.offsetX;
		const y2 = e.offsetY;
		brush(x2, y2);
		lineDraw(x, y, x2, y2);
		x = x2;
		y = y2;
	}
});

plus.addEventListener("click", function (e) {
	size++;
	number.innerHTML = size;
});
minus.addEventListener("click", function (e) {
	if (size === 1) {
		number.innerHTML = size;
	} else {
		size--;
		number.innerHTML = size;
	}
});

clear.addEventListener("click", function (e) {
	color = "white";
	canvas.style.backgroundColor = "white";
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	color = inputColor.value;
});

inputColor.addEventListener("change", function (e) {
	color = inputColor.value;
});

// download func
function getImage(canvas) {
	var imageData = canvas.toDataURL();
	var image = new Image();
	image.src = imageData;
	return image;
}
function saveImage(image) {
	var link = document.createElement("a");
	link.setAttribute("href", image.src);
	link.setAttribute("download", "my_drawing");
	link.click();
}
function saveCanvasAsImageFile() {
	var image = getImage(canvas);
	saveImage(image);
}
download.addEventListener("click", function (e) {
	saveCanvasAsImageFile();
});

fill.addEventListener("click", function (e) {
	canvas.style.backgroundColor = inputColor.value;
});
