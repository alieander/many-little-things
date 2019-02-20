h = 600;
w = document.getElementById("binary-search-container").offsetWidth;
fontSize = 40;

function setup() {
  createCanvas(w, h);
  background(51);
  frameRate(60);

  simple_array = new_array().sort((a, b) => a - b);
  binary_array = simple_array.slice();

  search_for = simple_array[simple_array.length / 2 + 10];

  simple_graph = new Graph(0, 0, w, h/2, 4);
  binary_graph = new Graph(0, h/2, w, h/2, 4);

  simple = new SimpleGraph(binary_array, search_for, simple_graph);
  binary = new BinaryGraph(simple_array, search_for, binary_graph);

  simple_graph.drawBackground();
  binary_graph.drawBackground();

  textSize(fontSize);
  textAlign(CENTER, CENTER);
}

var addFrames = 1;

function draw() {
  if (!simple.finished) {
    simple.draw();
    simple.step();
    simple.graph.drawWords();
  }

  if (!binary.finished) {
    binary.draw();
    binary.step();
    binary.graph.drawWords();
  }

  if(binary.finished && simple.finished) { 
    if(addFrames == 0) {
      simple.draw();
      simple.step();
      binary.draw();
      binary.step();
      noLoop();
    } else {
      addFrames--;
    }
  }
} 

function new_array(){
  l = h / 2 - 10;
  return Array.from({length: l}, () => Math.floor(Math.random() * l ));
}

function Graph(x, y, w, h, border) {
  this.border = border;
  this.x = x + this.border;
  this.y = y + this.border;
  this.w = w - this.border * 2;
  this.h = h - this.border * 2;
  this.iteration = 0;

  this.drawBackground = () => {
    fill(255);
    rect(this.x, this.y, this.w, this.h);
  }

  this.drawWords = () => {
    fill(255);
    rect(this.x, this.y, 200, this.x + 50);

    fill(0);
    textAlign(LEFT);
    text(this.iteration, this.x + 25, this.y + 25);
  }

  this.draw_array = (array, search, finished, below, above) => {
    fill(51);
    width = this.w / array.length;
    for (var i = 0, len = array.length; i < len; i++) {
      if(array[i] == search && finished) {
        fill(255,0,0);
      } else if(above <= i || below >= i) {
        fill(0,255,0);
      }
      height = this.h - this.h + array[i]
      rect(this.x + (i * width), this.y + (this.h - height), width, height);
      fill(51);
    }
  }
}

function SimpleGraph(array, search_for, graph) {
  this.array = array;
  this.search_for = search_for;
  this.marker = 0;
  this.finished = false;
  this.max_checked = this.marker;
  this.graph = graph;
  
  this.draw = () => {
    this.graph.draw_array(this.array, this.search_for, this.finished, this.max_checked);
  }

  this.step = () => {
    if(!this.finished) {
      this.marker += 1;
      this.max_checked = this.marker;
      if(this.search_for == this.array[this.marker]) {
        console.log('Simple: DONE');
        this.finished = true;
      }
      this.graph.iteration++;
    }
  }
}

function BinaryGraph(array, search_for, graph) {
  this.graph = graph;
  this.array = array;
  this.search_for = search_for;
  this.marker = Math.floor(this.array.length / 2);
  this.finished = false;
  this.checked_above = this.array.length;
  this.checked_below = 0;

  this.draw = () => {
    this.graph.draw_array(this.array, this.search_for, this.finished, this.checked_below, this.checked_above);
  }

  this.step = () => {
    if(!this.finished) {
      current = this.array[this.marker];
      old = this.marker;
      if(current == this.search_for) {
        console.log('Binary: DONE');
        this.finished = true;
      } else if(current > this.search_for) {
        this.checked_above = old;
        this.marker = this.checked_below + Math.floor((this.checked_above - this.checked_below) / 2);
        if(old == this.marker){
          this.marker -= 1;
        }
        if(this.marker < 0) {
          this.marker = 0;
        }
      } else {
        this.checked_below = old;
        this.marker = this.checked_below + Math.floor((this.checked_above - this.checked_below) / 2);
        if(old == this.marker){
          this.marker += 1;
        }
        if(this.marker > this.array.length) {
          this.marker = this.array.length;
        }
      }
      this.graph.iteration++;
    }
  }
}

