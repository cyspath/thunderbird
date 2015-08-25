(function () {
  if (typeof Asteroids === "undefined") {
    window.Asteroids = {};
  }

  var Asteroid = window.Asteroids.Asteroid = function(args) {
    var newArgs = {
      pos: args.pos,
      radius: [20, 35, 60][Math.floor(Math.random() * 5)],
      color: ["#EFC997", "#f3d9b6", "#bfa078"][Math.floor(Math.random() * 3)],
      vel: Asteroids.Util.randomVec(1),
      game: args.game
    };

    Asteroids.MovingObject.call(this, newArgs);
  };

  Asteroids.Util.inherits(Asteroid, Asteroids.MovingObject);

  Asteroid.prototype.collideWith = function(otherObject) {
    if (otherObject instanceof Asteroids.Ship) {
      otherObject.relocate();
    }
    else if (otherObject instanceof Asteroids.Bullet) {
      this.radius = 0
      console.log("as hit bullet")
    }
  };

})();
