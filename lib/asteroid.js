(function () {
  if (typeof Thunderbird === "undefined") {
    window.Thunderbird = {};
  }

  var Asteroid = window.Thunderbird.Asteroid = function(args) {
    this.pos = args.pos;
    this.radius = 20;
    this.color = "#EFC997";
    this.vel = [0, (2 + Math.floor(Math.random() * 2))];
    this.game = args.game;
    this.name = "enemy";

    this.life = 1;

    this.sx = Math.floor(Math.random() * 8) * 64
    this.sy = Math.floor(Math.random() * 8) * 64
  };

  Thunderbird.Util.inherits(Asteroid, Thunderbird.MovingObject);

  Asteroid.prototype.move = function() {
    this.pos[1] = this.pos[1] + this.vel[1];

    if (this.pos[1] >= 900) {
      this.pos[1] = -200;
    }

    if (this.pos[1] === -200) {
      this.pos[0] = Math.floor(Math.random() * (this.game.DIM_X))
    }
  };

  Asteroid.prototype.collidedWith = function (otherObject) {
    if (otherObject.name === "enemy") { return false; }
    if (otherObject.name === "explosion") { return false; }


    var rSum = this.radius + otherObject.radius;
    var distance = Math.sqrt( Math.pow(this.pos[0] - otherObject.pos[0], 2) + Math.pow(this.pos[1] - otherObject.pos[1], 2) )
    return (rSum >= distance) ? true : false;
  };

  Asteroid.prototype.draw = function () {
    // ctx.fillStyle = "#000000";
    // ctx.beginPath();
    // ctx.arc(
    //   this.pos[0],
    //   this.pos[1],
    //   this.radius,
    //   0,
    //   2 * Math.PI,
    //   false
    // );
    // ctx.strokeStyle="white";
    // ctx.lineWidth = 1;
    // ctx.stroke();
    // ctx.fill();

    var image = new Image();
    image.src = "http://res.cloudinary.com/djdfz4a67/image/upload/c_scale,w_512/v1440734799/asteroid_01_no_moblur_iwak31.png"
    ctx.drawImage(image, 0, this.sy, 64, 64, this.pos[0] - 30, this.pos[1] - 30, 64, 64);

  };

})();
