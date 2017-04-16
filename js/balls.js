var frame=0;
var images = {};

var loadImages = function(sources, callback){
	var nb = 0;
	var loaded = 0;
	var imgs = {};
	for(var i in sources){
		nb++;
		imgs[i] = new Image();
		imgs[i].src = sources[i];
		imgs[i].onload = function(){
			loaded++;
			if(loaded == nb){
				callback(imgs);
			}
		}
	}
}


var Ball = function(json)
{
	this.x = Math.round((1200-256) * Math.random());
	this.y = Math.round((700-256) * Math.random());
	this.width = 256;
	this.height = 256;
	this.x_velocity = 10 * Math.random();
	this.y_velocity = 10 * Math.random();
	this.init(json);
}

Ball.prototype.init = function(json){
	for (var i in json)
	{
		this[i] = json[i];
	}
}

Ball.prototype.update = function(){
	this.x+=this.x_velocity;
	this.y+=this.y_velocity;
}

var Game = function()
{
	this.canvas = document.querySelector("#balls");
	this.ctx = this.canvas.getContext("2d");
	this.width = this.canvas.width;
	this.height = this.canvas.height;
	this.bals =[];
	this.score = 0;
}

Game.prototype.score = function (text)
{
	this.ctx.fillText(text,10,10);
}


Game.prototype.start = function()
{


for(var i =0;i<4;i++)
this.bals.push(new Ball);

}

Game.prototype.update = function()
{
	var self = this;

	for (i in this.bals){
		this.bals[i].update();
	 	if (((this.bals[i].x  +this.bals[i].width) > this.width) || (this.bals[i].x < 0)) this.bals[i].x_velocity *=-1;
	 	if (((this.bals[i].y + this.bals[i].height) > this.height) || (this.bals[i].y < 0)) this.bals[i].y_velocity *=-1;
	}
	frame++;
	setTimeout(function(){self.update()},5);
}

Game.prototype.display = function(){
var self = this;
this.ctx.clearRect(0,0,this.width,this.height);
//this.score("x:" + this.bals[0].x + " y:" + this.bals[0].y);
for (i in this.bals){	
this.ctx.drawImage(images.ball,this.bals[i].x,this.bals[i].y,this.bals[i].width,this.bals[i].height)
}
setTimeout(function(){self.display()},20);
}

window.onload = function(){
var sprites = {
		ball:"./img/ball.png"
			}
var g = new Game();
loadImages(sprites, function(imgs){
		images = imgs;
g.start();
g.update();
g.display();
});
}

