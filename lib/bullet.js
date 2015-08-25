(function () {
  if (typeof Asteroids === "undefined") {
    window.Asteroids = {};
  }

  var Bullet = window.Asteroids.Bullet = function(args) {
    var newArgs = {
      pos: args.pos,
      radius: 3,
      color: "white",
      vel: args.vel,
      game: args.game
    };

    Asteroids.MovingObject.call(this, newArgs);
  };

  Asteroids.Util.inherits(Bullet, Asteroids.MovingObject);

  Bullet.prototype.move = function() {
    this.pos[0] += this.vel[0];
    this.pos[1] += this.vel[1];
  };


})();
