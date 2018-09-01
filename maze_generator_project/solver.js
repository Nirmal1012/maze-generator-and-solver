class Solver{

	constructor(arr, row, col, cell_size){
		this.move = arr[0][0];
		this.move.visited = true;
		this.row = row;
		this.col = col;
		this.cell_size = cell_size;
		this.neighbours = [];
		this.travelled = [this.move];
		this.queue = [this.move];
		this.backtrack;
		this.end = arr[row - 1][col - 1];
		this.openset = [this.move];
		this.closedset = [];
		this.update = false;
		this.path = [];
	}

	depth_first_search(){
		if(this.move != arr[this.row - 1][this.col - 1]){
			this.check_neighbours();
			if(this.neighbours.length != 0){
				this.choose_path();
				this.travelled.push(this.move);
				if(this.move != arr[this.row - 1][this.col - 1]){
					fill(0, 255, 0);
					rect(this.move.x * this.cell_size, this.move.y * this.cell_size, this.cell_size, this.cell_size);
				}
			}
			else{
				fill(245);
				rect(this.move.x * this.cell_size, this.move.y * this.cell_size, this.cell_size, this.cell_size);
				this.travelled.pop();
				this.move = this.travelled[this.travelled.length - 1];
			}
			return false;
		}
		else{
			return true;
		}
	}

	breadth_first_search(){
		if(this.move != arr[this.row - 1][this.col - 1]){
			this.check_neighbours();
			this.add_neighbours();
			this.move = this.queue[0];
			this.backtrack = this.move;
			this.queue.splice(0, 1);
			fill(0, 0, 255, 50);
			rect(this.move.x * this.cell_size, this.move.y * this.cell_size, this.cell_size, this.cell_size);
		}
		else{
			if(this.backtrack.previous != arr[0][0]){
				this.backtrack = this.backtrack.previous;
				fill(0, 255, 0);
				rect(this.backtrack.x * this.cell_size, this.backtrack.y * this.cell_size, this.cell_size, this.cell_size);
			}
			else{
				return true;
			}
		}
	}

	greedy() {
		if(this.openset.length > 0) {
			let j = 0;
			for(let i = 0; i < this.openset.length; i ++) {
				if(this.openset[j].f > this.openset[i].f) {
					j = i; 
				}
			}
			this.move = this.openset[j];
			this.add_neighbors();
			this.openset.splice(j, 1);
			this.closedset.push(this.move);
			if(this.move == this.end) {
				this.display_path();
				console.log("Done");
				return true;
			}
			for(let i = 0; i < this.neighbours.length; i ++) {
				let neighbor = this.neighbours[i];
				if(!this.closedset.includes(neighbor)) {
					let tempG = this.move.g + 0;
					if(!this.openset.includes(neighbor)) {
						this.openset.push(neighbor);
						this.update = true;
					}
					else {
						if(neighbor.g > tempG) {
							this.update = true;
						}
					}
					if(this.update) {
						neighbor.previous = this.move;
						neighbor.g = tempG;
						neighbor.h = this.heuristic(neighbor, this.end);
						neighbor.f = neighbor.g + neighbor.h;
					}
					this.update = false;
				}
			}
		}
		this.display_path();
		return false;
	}

	astar() {
		if(this.openset.length > 0) {
			let j = 0;
			for(let i = 0; i < this.openset.length; i ++) {
				if(this.openset[j].f > this.openset[i].f) {
					j = i; 
				}
			}
			this.move = this.openset[j];
			this.add_neighbors();
			this.openset.splice(j, 1);
			this.closedset.push(this.move);
			if(this.move == this.end) {
				this.display_path();
				console.log("Done");
				return true;
			}
			for(let i = 0; i < this.neighbours.length; i ++) {
				let neighbor = this.neighbours[i];
				if(!this.closedset.includes(neighbor)) {
					let tempG = this.move.g + 1;
					if(!this.openset.includes(neighbor)) {
						this.openset.push(neighbor);
						this.update = true;
					}
					else {
						if(neighbor.g > tempG) {
							this.update = true;
						}
					}
					if(this.update) {
						neighbor.previous = this.move;
						neighbor.g = tempG;
						neighbor.h = this.heuristic(neighbor, this.end);
						neighbor.f = neighbor.g + neighbor.h;
					}
					this.update = false;
				}
			}
		}
		this.display_path();
		return false;
	}

	check_neighbours(){
		this.neighbours = [];
		if(!this.move.wall[0] && !arr[this.move.y - 1][this.move.x].visited){
			this.neighbours.push(0);
		}
		if(!this.move.wall[1] && !arr[this.move.y][this.move.x + 1].visited){
			this.neighbours.push(1);
		}
		if(!this.move.wall[2] && !arr[this.move.y + 1][this.move.x].visited){
			this.neighbours.push(2);
		}
		if(!this.move.wall[3] && !arr[this.move.y][this.move.x - 1].visited){
			this.neighbours.push(3);
		}
	}

	choose_path(){
		let next = this.neighbours[floor(random(0, this.neighbours.length))];
		if(next == 0){
			this.move = arr[this.move.y - 1][this.move.x];
		}
		else if(next == 1){
			this.move = arr[this.move.y][this.move.x + 1];
		}
		else if(next == 2){
			this.move = arr[this.move.y + 1][this.move.x];
		}
		else{
			this.move = arr[this.move.y][this.move.x - 1];
		}
		this.move.visited = true;
	}

	add_neighbours(){
		for(let i = 0; i < this.neighbours.length; i ++){
			if(this.neighbours[i] == 0){
				this.queue.push(arr[this.move.y - 1][this.move.x]);
			}
			else if(this.neighbours[i] == 1){
				this.queue.push(arr[this.move.y][this.move.x + 1]);
			}
			else if(this.neighbours[i] == 2){
				this.queue.push(arr[this.move.y + 1][this.move.x]);
			}
			else{
				this.queue.push(arr[this.move.y][this.move.x - 1]);
			}
			this.queue[this.queue.length - 1].visited = true;
			this.queue[this.queue.length - 1].previous = this.move;
		}
	}

	convert_neighbor(index) {
		if(index == 0) {
			return arr[this.move.y - 1][this.move.x];
		}
		else if(index == 1) {
			return arr[this.move.y][this.move.x + 1];
		}
		else if(index == 2) {
			return arr[this.move.y + 1][this.move.x];
		}
		else {
			return arr[this.move.y][this.move.x - 1];
		} 
	}

	add_neighbors() {
		this.neighbours = []; 
		if(this.move.y > 0 && !this.move.wall[0]) {
			this.neighbours.push(arr[this.move.y - 1][this.move.x]);
		}
		if(this.move.x < this.col - 1 && !this.move.wall[1]) {
			this.neighbours.push(arr[this.move.y][this.move.x + 1]);
		}
		if(this.move.y < this.row - 1 && !this.move.wall[2]) {
			this.neighbours.push(arr[this.move.y + 1][this.move.x]);
		}
		if(this.move.x > 0 && !this.move.wall[3]) {
			this.neighbours.push(arr[this.move.y][this.move.x - 1]);
		}
	}

	heuristic(p1, p2) {
		return Math.abs(p1.x - p2.x) + Math.abs(p1.y - p2.y);
		return Math.sqrt((p1.x - p2.x) * (p1.x - p2.x) + (p1.y - p2.y) * (p1.y - p2.y));
	}

	display_path() {
		noStroke();
		fill(255, 0, 0, 50);
		for(let i = 0; i < this.openset.length; i ++) {
			rect(this.openset[i].x * this.cell_size, this.openset[i].y * this.cell_size, this.cell_size, this.cell_size);
		}

		fill(0, 0, 255, 50);
		for(let i = 0; i < this.closedset.length; i ++) {
			rect(this.closedset[i].x * this.cell_size, this.closedset[i].y * this.cell_size, this.cell_size, this.cell_size);
		}

		this.path = [];
		this.path = [this.move];
		while(this.move.previous) {
			this.path.push(this.move.previous);
			this.move = this.move.previous;
		}
		fill(0, 255, 0);
		for(let i = 0; i < this.path.length; i ++) {
			rect(this.path[i].x * this.cell_size, this.path[i].y * this.cell_size, this.cell_size, this.cell_size);
		}
	}

}