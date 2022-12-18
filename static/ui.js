let menu, menuBtn;

function loadDOM() {
	// load DOM elements
	menuBtn = document.getElementById("menuBtn");
	menu = document.getElementById("content");
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