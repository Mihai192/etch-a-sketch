/* GLOBAL VARIABLES */

const grid               = document.querySelector('#grid');
const colorPicker        = document.querySelector('.color-picker-wrapper input');
const toggle_range_input = document.querySelector('#range-grid-input');
const rainbowModeButton  = document.querySelector('.rainbow-mode-button-wrapper button');
const colorModeButton    = document.querySelector('.color-mode-button-wrapper button');
const eraserButton       = document.querySelector('.eraser-button-wrapper button');
const clearButton        = document.querySelector(".clear-button-wrapper button");
const showGridButton     = document.querySelector(".show-grid button");
const gridDimensionsText = document.querySelector(".grid-dimensions-text-wrapper span");
const div                = document.createElement("div");

const whiteColor         = "#ffffff";

let rainbowMode          = true;
let colorMode            = false;
let eraserMode           = false;
let toggleMode           = false;

let activeButton         = rainbowModeButton;

/* UTILITY FUNCTIONS */

function getGridWidth()
{
	return grid.clientWidth;
}

function getGridHeight()
{
	return grid.clientHeight;
}

function generateRandomNumberBetween(a, b)
{
	return Math.floor(Math.random() * b) + a;
}

function changeToRandomColor(div) {
	let red = generateRandomNumberBetween(0, 255);
	let blue = generateRandomNumberBetween(0, 255);
	let green = generateRandomNumberBetween(0, 255);
	
	div.style.backgroundColor = 'rgb(' + [red, blue, green].join(',') + ')';
}

function changeToColor(div, color)
{
	div.style.backgroundColor = color;
}

function changeActiveButton(btn)
{
	activeButton.classList.remove('active-button');

	btn.classList.add('active-button');
	activeButton = btn;

}

/* FUNCTIONALITY */

function clearGrid()
{
	let gridChilds = grid.childNodes;
	gridChilds.forEach((child) => {
		changeToColor(child, whiteColor)
	});
}

function generateGrid(num)
{
	let squareWidth  = getGridWidth() / num;
	let squareHeight = getGridHeight() / num;

	grid.style.gridTemplateColumns = `repeat(${toggle_range_input.value}, 1fr)`;
	grid.style.gridTemplateRows    = `repeat(${toggle_range_input.value}, 1fr)`;

	for (let i = 0; i < num * num ; ++ i)
	{
		div.style.width  =  String(squareWidth)  + "px";
		div.style.height = String(squareHeight)  + "px";

		let new_node = div.cloneNode();

		new_node.addEventListener('mouseover', (e) => {
			if(e.buttons == 1)
			{
				if ( rainbowMode )
					changeToRandomColor(new_node);
				else if ( colorMode )
					changeToColor(new_node, colorPicker.value);
				else
					changeToColor(new_node, whiteColor);
			}
		});

		grid.appendChild(new_node);	
	}
}

function changeGrid(value)
{
	if (value == toggle_range_input.value)
	{
		let oldNumberOfElements = grid.children.length;
		let newNumberOfElements = toggle_range_input.value * toggle_range_input.value;

		let newWidth = getGridWidth() / toggle_range_input.value;
		let newHeight = getGridHeight() / toggle_range_input.value;

		grid.style.gridTemplateColumns = `repeat(${toggle_range_input.value}, 1fr)`;
		grid.style.gridTemplateRows    = `repeat(${toggle_range_input.value}, 1fr)`;

		if (oldNumberOfElements < newNumberOfElements)
		{
			let diff = newNumberOfElements - oldNumberOfElements;

			for (let i = 0; i < diff; ++ i)
			{
				let new_node = div.cloneNode();
				
				new_node.addEventListener('mouseover', (e) => {
					if(e.buttons == 1)
					{
						if ( rainbowMode )
							changeToRandomColor(new_node);
						else if ( colorMode )
							changeToColor(new_node, colorPicker.value);
						else
							changeToColor(new_node, whiteColor);
					}
				});

				grid.appendChild(new_node);	
			}
		}
		else
		{
			let diff = oldNumberOfElements - newNumberOfElements;

			for (let i = 0; i < diff; ++ i)
				grid.removeChild(grid.lastChild);
		}

		let gridChilds = grid.childNodes;

		if (toggleMode)
		{
			gridChilds.forEach((child) => {
				child.classList.add('border');
				child.style.width  = String(newWidth)  + "px";
				child.style.height = String(newHeight) + "px";
			});
		}
		else
		{
			gridChilds.forEach((child) => {
				child.style.width  = String(newWidth)  + "px";
				child.style.height = String(newHeight) + "px";
			});
		}

	}
}

function clearGrid(num)
{
	let gridChilds = [...grid.children];

	gridChilds.forEach((child) => {
		changeToColor(child, "#ffffff");
	});
}

function toggleGrid()
{
	let gridChilds = [...grid.children];

	gridChilds.forEach((child) => {
		child.classList.toggle('border');
	});

	toggleMode = !toggleMode;
}

function init()
{
	gridDimensionsText.innerHTML = `${toggle_range_input.value}x${toggle_range_input.value}`;
	generateGrid(parseInt(toggle_range_input.value));
}

/* EVENTS */

init();

clearButton.addEventListener('click', () => {
	clearGrid();
});

rainbowModeButton.addEventListener('click', () => {
	
	changeActiveButton(rainbowModeButton);

	rainbowMode = true;
	colorMode   = false;
	eraserMode  = false;
});

colorModeButton.addEventListener('click', () => {
	changeActiveButton(colorModeButton);

	rainbowMode = false;
	colorMode   = true;
	eraserMode  = false;
});

eraserButton.addEventListener('click', () => {
	changeActiveButton(eraserButton);

	rainbowMode = false;
	colorMode   = false;
	eraserMode  = true;
});

showGridButton.addEventListener('click', () => {
	showGridButton.classList.toggle('active-button');

	toggleGrid();
});

toggle_range_input.addEventListener('change', () => {	
	gridDimensionsText.innerHTML = `${toggle_range_input.value}x${toggle_range_input.value}`;

	changeGrid(toggle_range_input.value);
});