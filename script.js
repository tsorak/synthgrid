const menu = document.querySelector(".content");
const main = document.querySelector("main");
const gridContainer = document.querySelector(".grid-container");

function genGridItems(amount) {
	gridContainer.innerHTML = "";
	for (let i = 0; i < amount; i++) {
		const tile = document.createElement("div");
		tile.onpointerenter = () => {
			const RHSL = `hsl(${Math.round(Math.random() * 360)}, 100%, 50%)`;
			tile.style.transition = "";
			tile.style.background = RHSL;
		};
		tile.onpointerleave = () => {
			if (config.fade) {
				tile.style.transition = "background 2s cubic-bezier(.5,0,1,.5)";
				tile.style.background = "transparent";
			}
		};

		const tileFill = document.createElement("div");
		tile.appendChild(tileFill);

		gridContainer.appendChild(tile);
	}
}

function drawGrid(sizething = 30) {
	const ratio = window.visualViewport.width / window.visualViewport.height;
	const columns = ((window.visualViewport.width / sizething) * ratio) | Math.round;
	const rows = ((window.visualViewport.height / sizething) * ratio) | Math.round;
	const items = columns * rows;

	genGridItems(items);

	gridContainer.style.setProperty("--columns", columns);
	gridContainer.style.setProperty("--rows", rows);
}

function toggleHelpMenu() {
	if (menu.style.opacity === "0") {
		menu.style.opacity = "1";
		main.style.pointerEvents = "initial";
	} else {
		menu.style.opacity = "0";
		main.style.pointerEvents = "none";
	}
}

const config = {
	size: 30,
	fade: true,
};

window.visualViewport.addEventListener("resize", (e) => {
	drawGrid(config.size);
});
drawGrid(config.size);

document.addEventListener("keydown", (e) => {
	console.log(e.key, e.key === " ");

	const listenedKeys = ["ArrowUp", "ArrowDown", " ", "h"];
	if (!listenedKeys.includes(e.key)) return;

	switch (e.key) {
		case "ArrowUp":
			config.size < 200 ? (config.size += 1) : config.size;
			drawGrid(config.size);
			break;

		case "ArrowDown":
			config.size > 1 ? (config.size -= 1) : config.size;
			drawGrid(config.size);
			break;

		case " ":
			config.fade = config.fade ? false : true;
			drawGrid(config.size);
			break;

		case "h":
			toggleHelpMenu();
			break;
		default:
			break;
	}
});
menu.onclick = () => toggleHelpMenu();
