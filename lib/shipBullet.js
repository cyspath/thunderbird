(function () {
  if (typeof Thunderbird === "undefined") {
    window.Thunderbird = {};
  }

  var Bullet = window.Thunderbird.Bullet = function(args) {
    var newArgs = {
      pos: args.pos,
      radius: 3,
      color: "white",
      vel: [0, -10],
      game: args.game
    };

    Thunderbird.MovingObject.call(this, newArgs);
    this.name = "shipBullet";
    this.pos[1] -= 20;

    this.life = 1;

    this.preload();
  };

  Thunderbird.Util.inherits(Bullet, Thunderbird.MovingObject);

  Bullet.prototype.preload = function () {
    this.image = new Image();
    this.image.src = "assets/images/shiplazer.png"
  };

  Bullet.prototype.collidedWith = function (otherObject) {
    if (otherObject.name === "ship") { return false; }
    if (otherObject.name === "alienBullet") { return false; }
    if (otherObject.name === "shipBullet") { return false; }
    if (otherObject.name === "explosion") { return false; }

    var rSum = this.radius + otherObject.radius;
    var distance = Math.sqrt( Math.pow(this.pos[0] - otherObject.pos[0], 2) + Math.pow(this.pos[1] - otherObject.pos[1], 2) )
    return (rSum >= distance) ? true : false;
    return false
  };

  Bullet.prototype.move = function() {
    this.pos[0] += this.vel[0];
    this.pos[1] += this.vel[1];
  };

  Bullet.prototype.draw = function () {
    ctx.drawImage(this.image,this.pos[0] - 5, this.pos[1] - 5);
  };


})();
