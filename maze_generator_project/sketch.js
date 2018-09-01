let size;
let type;
let generate;
let cell_size;
let maze_type;
let arr = [];
let canvas_size = 625;
let row;
let col;
let g;
let maze_solve;
let algorithm;
let solve;
let s;
let generated = false;
let solved = false;
let playbutton;
let play = false;
let p;
let directbutton;

function setup() {
	canvas = createCanvas(canvas_size, canvas_size);
	canvas.position(785, 170);
	background(245);
	strokeWeight(4);
	size = select("#maze_size");
	type = select("#maze_type");
	generate = select("#button1");
	generate.mousePressed(get_maze);
	maze_solve = select("#maze_solve");
	solve = select("#button2");
	solve.mousePressed(solve_maze);
	playbutton = select("#button3");
	playbutton.mousePressed(play_maze);
	directbutton = select("#button4");
	directbutton.mousePressed(direct_maze);
}

function draw() {
	if(maze_type == 1 && !generated){
		background(245);
		generated = g.dead_end_maze();
		maze_start_end();
		for(let i = 0; i < row; i ++){
			for(let j = 0; j < col; j ++){
				arr[i][j].generate_wall();
			}
		}
	}
	if(maze_type == 2 && !generated){
		background(245);
		generated = g.no_dead_end_maze(arr);
		maze_start_end();
		for(let i = 0; i < row; i ++){
			for(let j = 0; j < col; j ++){
				arr[i][j].generate_wall();
			}
		}	
	}
	if(maze_type == 3 && !generated){
		background(245);
		generated = g.both_maze();
		maze_start_end();
		for(let i = 0; i < row; i ++){
			for(let j = 0; j < col; j ++){
				arr[i][j].generate_wall();
			}
		}
	}
	if(algorithm == 1 && !solved){
		noStroke();
		solved = s.depth_first_search();
		for(let i = 0; i < row; i ++){
			for(let j = 0; j < col; j ++){
				stroke(0);
				arr[i][j].generate_wall();
			}
		}
	}
	if(algorithm == 2 && !solved){
		noStroke();
		solved = s.breadth_first_search();
		for(let i = 0; i < row; i ++){
			for(let j = 0;j < col; j ++){
				stroke(0);
				arr[i][j].generate_wall();
			}
		}
		maze_start_end();
	}
	if(algorithm == 3 && !solved) {
		background(255);
		noStroke();
		solved = s.astar();
		for(let i = 0; i < row; i ++) {
			for(let j = 0; j < col; j ++) {
				stroke(0);
				arr[i][j].generate_wall();
			}
		}
		maze_start_end();
	}
	if(algorithm == 4 && !solved) {
		background(255);
		noStroke();
		solved = s.greedy();
		for(let i = 0; i < row; i ++) {
			for(let j = 0; j < col; j ++) {
				stroke(0);
				arr[i][j].generate_wall();
			}
		}
		maze_start_end();
	}
}

function get_maze(){
	generated = false;
	play = false;
	background(245);
	if(size.value() > 1){
		arr = [];
		cell_size = canvas_size / size.value();
		row = size.value();
		col = size.value();
		maze_type = type.value();
		for(let i = 0; i < row; i ++){
			arr[i] = [];
			for(let j = 0; j < col; j ++){
				cell = new Cell(i, j, cell_size);
				arr[i][j] = cell;
			}
		}

		for(let i = 0; i < row; i ++){
			for(let j = 0; j < col; j ++){
				arr[i][j].generate_wall();
			}
		}
		algorithm = 0;
		g = new Generate(arr, row, col, cell_size);
	}
}

function direct_maze() {
	algorithm = 0;
	play = false;
	let generated = false;
	let direct_maze_type = type.value();
	arr = [];
	cell_size = canvas_size / size.value();
	row = size.value();
	col = size.value();
	for(let i = 0; i < row; i ++){
		arr[i] = [];
		for(let j = 0; j < col; j ++){
			cell = new Cell(i, j, cell_size);
			arr[i][j] = cell;
		}
	}
	g = new Generate(arr, row, col, cell_size);
	while(!generated){
		if(direct_maze_type == 1){
			generated = g.dead_end_maze();
		}
		else if(direct_maze_type == 2){
			generated = g.no_dead_end_maze(arr);			
		}
		else if(direct_maze_type == 3){
			generated = g.both_maze();			
		}
	}
	background(245);
	maze_start_end();
	for(let i = 0; i < row; i ++){
		for(let j = 0; j < col; j ++){
			arr[i][j].generate_wall();
		}
	}

}

function maze_start_end(){
	noStroke();
	fill(255);
	rect(0, 0, cell_size,cell_size);
	fill(255, 0, 0, 200);
	rect(0, 0, cell_size,cell_size);
	rect((row - 1) * cell_size, (col - 1) * cell_size, cell_size, cell_size);
	stroke(0);
	noFill();
}

function solve_maze(){
	solved = false;
	play = false;
	background(245);
	maze_start_end();
	for(let i = 0; i < row; i ++){
		for(let j = 0; j < col; j ++){
			arr[i][j].visited = false;
		}
	}
	algorithm = maze_solve.value();
	maze_type = 0;
	s = new Solver(arr, row, col, cell_size);
}

function play_maze(){
	play = true;
	algorithm = 0;
	background(245);
	for(let i = 0; i < row; i ++){
		for(let j = 0; j < col; j ++){
			arr[i][j].visited = false;
		}
	}
	p = new Play(arr, row, col, cell_size);
	maze_start_end();
	draw_wall();
}

function keyTyped(){
	if(play){
		if(key == 'w'){
			play = p.check_wall(0);
			// p.display_mover();
		}
		if(key == 'd'){
			play = p.check_wall(1);
			// p.display_mover();
		}
		if(key == 's'){
			play = p.check_wall(2);
			// p.display_mover();
		}
		if(key == 'a'){
			play = p.check_wall(3);
			// p.display_mover();
		}
		background(245);
		p.display_path();
		maze_start_end();
		draw_wall();
	}
}

function draw_wall(){
	for(let i = 0; i < row; i ++){
		for(let j = 0;j < col; j ++){
			stroke(0);
			arr[i][j].generate_wall();
		}
	}
}
