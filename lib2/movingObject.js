(function () {
  if (typeof Thunderbird === "undefined") {
    window.Thunderbird = {};
  }

  var MovingObject = window.Thunderbird.MovingObject = function (args) {
    this.pos = args.pos;
    this.vel = args.vel;
    this.radius = args.radius;
    this.color = args.color;
    this.game = args.game;
  };

  MovingObject.prototype.collidedWith = function (otherObject) {
    var rSum = this.radius + otherObject.radius;
    var distance = Math.sqrt( Math.pow(this.pos[0] - otherObject.pos[0], 2) + Math.pow(this.pos[1] - otherObject.pos[1], 2) )
    return (rSum >= distance) ? true : false;
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


  MovingObject.prototype.move = function() {
    this.pos[0] = this.game.wrap(this.pos[0] + this.vel[0]);
    this.pos[1] = this.game.wrap(this.pos[1] + this.vel[1]);
  };



})();
