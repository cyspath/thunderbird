(function () {
  if (typeof Thunderbird === "undefined") {
    window.Thunderbird = {};
  }

  var Ship = window.Thunderbird.Ship = function (args) {
    var newArgs = {
      pos: [310,560],
      radius: Ship.RADIUS,
      color: Ship.COLOR,
      vel: [0,0],
      game: args.game
    };
    Thunderbird.MovingObject.call(this, newArgs);
    this.name = "ship";
  };

  Ship.RADIUS = 30;
  Ship.COLOR = "blue";
  Thunderbird.Util.inherits(Ship, Thunderbird.MovingObject);

  Ship.prototype.power = function (movement) {
    this.vel[0] = 0;
    this.vel[1] = 0;
    this.vel[0] += movement[0];
    this.vel[1] += movement[1];
  };


  Ship.prototype.collidedWith = function (otherObject) {
    if (otherObject.name === "shipBullet") { return false; }

    var rSum = this.radius + otherObject.radius;
    var distance = Math.sqrt( Math.pow(this.pos[0] - otherObject.pos[0], 2) + Math.pow(this.pos[1] - otherObject.pos[1], 2) )
    return (rSum >= distance) ? true : false;
  };


  Ship.prototype.draw = function (ctx) {
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

    //ship draw
    var image = new Image();
    image.src = "http://res.cloudinary.com/djdfz4a67/image/upload/c_scale,w_100/v1440723449/Spaceship1_ltlahs.png"
    ctx.drawImage(image, this.pos[0] - 50, this.pos[1] - 53);
  };


  Ship.prototype.move = function() {

    this.vel[0] = this.vel[0] * 0.98
    this.vel[1] = this.vel[1] * 0.98

    this.pos[0] = this.game.wrapShip(this.pos[0] + this.vel[0]);
    this.pos[1] = this.game.wrapShip(this.pos[1] + this.vel[1]);

  };

  Ship.prototype.fireBullet = function() {
    var posX = this.pos[0]
    var posY = this.pos[1]

    var bulletLeft = new Thunderbird.Bullet({pos: [posX - 20, posY],
                                       vel: this.vel.slice(),
                                       game: this.game});

   var bulletRight = new Thunderbird.Bullet({pos: [posX + 20, posY],
                                      vel: this.vel.slice(),
                                      game: this.game});

    // this.game.bullets.push(bulletLeft);
    // this.game.bullets.push(bulletRight);

    this.game.array.push(bulletLeft);
    this.game.array.push(bulletRight);
  };



})();
