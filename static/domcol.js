let canvas;
let width, height, ratio;
let scene, renderer, camera, plane;
let uniforms, loader, fragmentShader;

let scale, pos;
let lMult = 2, aMult = 3;
const deltaP = 0.075, scaleFac = 0.96;

document.addEventListener("DOMContentLoaded", function() {
	canvas = document.getElementById("canv");

	width = window.innerWidth;
	height = window.innerHeight;
	ratio = width / height;

	loadDOM();
	reset();

	// initialize threejs renderer and things
	renderer = new THREE.WebGLRenderer({
		canvas,
		preserveDrawingBuffer: true
	});
	renderer.setSize(width, height); 

	camera = new THREE.OrthographicCamera(-1, 1, 1, -1, -1, 1);
	scene = new THREE.Scene();
	plane = new THREE.PlaneGeometry(2, 2);

	document.addEventListener("keypress", keyPress);

	// load fragment shader
	loader = new THREE.FileLoader();
	loader.load('static/domcol.frag', function(data) {
		fragmentShader = data;
		load();
	});
});

/*
UI things.
*/


function keyPress(e) {
	// key event listeners
	switch (e.key) {
		case "a":
			pos[0] -= deltaP * scale;
			render();
			return;
		case "d":
			pos[0] += deltaP * scale;
			render();
			return;
		case "s":
			pos[1] -= deltaP * scale;
			render();
			return;
		case "w":
			pos[1] += deltaP * scale;
			render();
			return;
		case "e":
			scale *= scaleFac;
			render();
			return;
		case "c":
			scale /= scaleFac;
			render();
			return;
		case "r":
			reset();
			render();
			return;
	}
}

function reset() {
	// reset the view
	scale = 2.75;
	pos = [0, 0];
}

/*
Shader things.
*/

function load() {
	// initialize shader params and whatnot
	uniforms = {
		res:  {value: new THREE.Vector2(width, height)},
		scale: {value: scale},
		center: {value: new THREE.Vector2()},
		lMult: {value: lMult},
		aMult: {value: aMult}
	};

	let material = new THREE.ShaderMaterial({
		fragmentShader,
		uniforms,
		glslVersion: THREE.GLSL3
	});
	scene.add(new THREE.Mesh(plane, material));

	render();
}

function render() {
	// set uniform values and redraw shader
	uniforms.lMult.value = lMult;
	uniforms.aMult.value = aMult;
	uniforms.scale.value = scale;
	uniforms.center.value.set(pos[0], pos[1]);

    renderer.render(scene, camera);
}