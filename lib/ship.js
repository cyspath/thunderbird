(function () {
  if (typeof Thunderbird === "undefined") {
    window.Thunderbird = {};
  }

  var Ship = window.Thunderbird.Ship = function (args) {
    var newArgs = {
      pos: [350,560],
      color: Ship.COLOR,
      vel: [0,0],
      game: args.game
    };
    Thunderbird.MovingObject.call(this, newArgs);
    this.name = "ship";
    this.life = 3;
    this.radius = 50;

    this.decelerateX = false;
    this.decelerateY = false;

    this.preload();


  };

  Ship.RADIUS = 30;
  Ship.COLOR = "blue";
  Thunderbird.Util.inherits(Ship, Thunderbird.MovingObject);

  Ship.prototype.preload = function () {
    this.shieldFull = "http://res.cloudinary.com/djdfz4a67/image/upload/c_scale,w_110/v1440974121/shipShieldFull_jwokam.png"
    this.shieldFaded = "http://res.cloudinary.com/djdfz4a67/image/upload/c_scale,w_110/v1440974199/shipShieldFaded_u82gaz.png";
    this.shipImage = new Image();
    this.shipImage.src = "assets/images/ship.png"

  };

  Ship.prototype.powerX = function (movement) {
    this.vel[0] = 0;
    this.vel[0] += movement[0];
  };

  Ship.prototype.powerY = function (movement) {
    this.vel[1] = 0;
    this.vel[1] += movement[1];
  };


  Ship.prototype.collidedWith = function (otherObject) {
    if (otherObject.name === "shipBullet") { return false; }
    if (otherObject.name === "explosion") { return false; }

    var rSum = this.radius + otherObject.radius;
    var distance = Math.sqrt( Math.pow(this.pos[0] - otherObject.pos[0], 2) + Math.pow(this.pos[1] - otherObject.pos[1], 2) )
    return (rSum >= distance) ? true : false;
  };


  Ship.prototype.draw = function (ctx) {
    // ctx.beginPath();
    // ctx.arc(
    //   this.pos[0],
    //   this.pos[1],
    //   35,
    //   0,
    //   2 * Math.PI,
    //   false
    // );
    // ctx.strokeStyle="white";
    // ctx.lineWidth = 1;
    // ctx.stroke();

    //ship draw
    ctx.drawImage(this.shipImage, this.pos[0] - 50, this.pos[1] - 53);

    //shield draw
    image = new Image();
    if (this.life === 3) { image.src = this.shieldFull; } else if (this.life === 2 ) { image.src = this.shieldFaded; } else if (this.life === 1 ) { this.radius = 35}
    ctx.drawImage(image, this.pos[0] - 54, this.pos[1] - 54);
  };


  Ship.prototype.move = function() {

    if (this.decelerateY === true ) {
      this.vel[1] = this.vel[1] * 0.95
      if (Math.round(this.vel[1]) === 0) {
        this.vel[1] = 0
        this.decelerateY = false;
      }
    }

    if (this.decelerateX === true ) {
      this.vel[0] = this.vel[0] * 0.95
      if (Math.round(this.vel[0]) === 0) {
        this.vel[0] = 0
        this.decelerateX = false;
      }
    }

    this.pos[0] = this.game.wrapShip(this.pos[0] + this.vel[0]);
    this.pos[1] = this.game.wrapShip(this.pos[1] + this.vel[1]);

  };

  Ship.prototype.fireBullet = function() {
    if (this.game.array.indexOf(this) != -1) {
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
    }
  };



})();
