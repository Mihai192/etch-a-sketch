const resize = new ResizeObserver(function() {
	changeGrid(toggle_range_input.value);
});

resize.observe(grid);

