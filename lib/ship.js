(function () {
  if (typeof Asteroids === "undefined") {
    window.Asteroids = {};
  }

  var Ship = window.Asteroids.Ship = function (args) {
    var newArgs = {
      // pos: args.game.randomPosition(),
      pos: [500,500],
      radius: Ship.RADIUS,
      color: Ship.COLOR,
      vel: [0,0],
      game: args.game
    };

    Asteroids.MovingObject.call(this, newArgs);
  };

  Ship.RADIUS = 25;
  Ship.COLOR = "blue";

  Asteroids.Util.inherits(Ship, Asteroids.MovingObject);

  Ship.prototype.relocate = function() {
    this.pos = this.game.randomPosition();
    this.vel = [0,0];
  };

  Ship.prototype.power = function (impulse) {
    this.vel[0] += impulse[0];
    this.vel[1] += impulse[1];

  };

  Ship.prototype.fireBullet = function() {
    var bullet = new Asteroids.Bullet({pos: this.pos.slice(),
                                       vel: this.vel.slice(),
                                       game: this.game});
    this.game.bullets.push(bullet);
  };

  Ship.prototype.draw = function (ctx) {
    ctx.fillStyle = this.color;

    ctx.fillStyle="blue";
    ctx.beginPath();
    // Draw a triangle location for each corner from x:y 100,110 -> 200,10 -> 300,110 (it will return to first point)
    ctx.moveTo(this.pos[0],this.pos[1]);
    ctx.lineTo(this.pos[0] + 15,this.pos[1] - 30);
    ctx.lineTo(this.pos[0] + 30 ,this.pos[1]);
    ctx.closePath();

    ctx.strokeStyle="white";
    ctx.lineWidth = 7;
      ctx.stroke();
      ctx.fill();
  };

})();
