(function () {
  if (typeof Asteroids === "undefined") {
    window.Asteroids = {};
  }

  // var Asteroids = window.Asteroids = window.Asteroids || {};

  var MovingObject = window.Asteroids.MovingObject = function (args) {
    this.pos = args.pos;
    this.vel = args.vel;
    this.radius = args.radius;
    this.color = args.color;
    this.game = args.game;
  };

  MovingObject.prototype.draw = function (ctx) {
    ctx.fillStyle = this.color;
    ctx.beginPath();
    ctx.arc(
      this.pos[0],
      this.pos[1],
      this.radius,
      0,
      2 * Math.PI,
      false
    );

    
    ctx.strokeStyle="white";
    ctx.lineWidth = 1;
    ctx.stroke();
    ctx.fill();
  };

  // MovingObject.prototype.draw = function (ctx) {
  //   ctx.fillStyle = this.color;
  //
  //   ctx.fillStyle="#A2322E";
  //   ctx.beginPath();
  //   // Draw a triangle location for each corner from x:y 100,110 -> 200,10 -> 300,110 (it will return to first point)
  //   ctx.moveTo(this.pos[0],this.pos[1]);
  //   ctx.lineTo(this.pos[0] + 10,this.pos[1] - 10);
  //   ctx.lineTo(this.pos[0] + 20 ,this.pos[1]);
  //   ctx.closePath();
  //
  //   ctx.strokeStyle="white";
  //     ctx.stroke();
  //     ctx.fill();
  // };

  MovingObject.prototype.move = function() {
    this.pos[0] = this.game.wrap(this.pos[0] + this.vel[0]);
    this.pos[1] = this.game.wrap(this.pos[1] + this.vel[1]);
  };

  MovingObject.prototype.isCollidedWith = function(otherObject) {
    var radiusSum = this.radius + otherObject.radius;
    var distance = Math.sqrt(Math.pow(this.pos[0] - otherObject.pos[0], 2) +
                              Math.pow(this.pos[1] - otherObject.pos[1], 2));
    return (radiusSum >= distance) ? true : false;
  };

  MovingObject.prototype.collideWith = function() { console.log("basecase collided")};


})();
