(function () {
  if (window.Thunderbird === undefined) {
    window.Thunderbird = {};
  }

  var Game = window.Thunderbird.Game = function(DIM_X, DIM_Y, NUM_ASTEROIDS) {

    this.DIM_X = DIM_X; this.DIM_Y = DIM_Y; this.NUM_ASTEROIDS = NUM_ASTEROIDS;

    // holds array of asteriods objects
    this.asteroids = this.addAsteroids.bind(this)();

    this.ship = new Thunderbird.Ship({ game: this });

    //holds array of bullets
    this.bullets = [];

  };

  Game.prototype.addAsteroids = function () {
    var asteroids = [];
    for (var i = 0; i < this.NUM_ASTEROIDS; i++) {
      asteroids.push(new Thunderbird.Asteroid({
        pos: this.randomPosition(),
        game: this
      }))
    }
    return asteroids;
  };

  Game.prototype.randomPosition = function () {
    var x = Math.floor(Math.random() * this.DIM_X);
    var y = -(Math.floor(Math.random() * this.DIM_Y));
    return [x, y];
  };

  Game.prototype.draw = function (ctx) {
    ctx.clearRect(0, 0, this.DIM_X, this.DIM_Y);
    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, 700, 700);

    this.allObjects().forEach(function (obj) {
      obj.draw(ctx);
    });
  };

  Game.prototype.step = function () {
    this.moveObjects();
    //need to check collisions
  };

  Game.prototype.moveObjects = function () {
    this.allObjects().forEach(function(obj) {
      obj.move();
    }.bind(this))
  };

  Game.prototype.wrap = function (pos) {
    if (pos > 700) { pos -= 700; }
    return pos;
  };

  Game.prototype.wrapShip = function (pos) {
    if (pos > 660) {
      pos = 660;
    } else if (pos < 10) {
      pos = 10;
    }
    return pos;
  };

  Game.prototype.allObjects = function () {
    return this.asteroids.concat(this.ship)//.concat(this.bullets);
  };







})();
