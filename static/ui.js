let menu, menuBtn;
let lInp, aInp, lSpan, aSpan;

function loadDOM() {
	// load DOM elements
	menuBtn = document.getElementById("menuBtn");
	menu = document.getElementById("content");

	lInp = document.getElementById("lInp");
	aInp = document.getElementById("aInp");
	lSpan = document.getElementById("lSpan");
	aSpan = document.getElementById("aSpan");
}

// show/hide menu
function showMenu() {
	menuBtn.hidden = true;
	menu.hidden = false;
}

function hideMenu() {
	menuBtn.hidden = false;
	menu.hidden = true;
}

function updateMults() {
	lMult = lInp.value;
	aMult = aInp.value;

	lSpan.innerHTML = lMult;
	aSpan.innerHTML = aMult;
	render();
}