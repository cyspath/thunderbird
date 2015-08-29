(function () {
  if (window.Thunderbird === undefined) {
    window.Thunderbird = {};
  }

  var Game = window.Thunderbird.Game = function(DIM_X, DIM_Y, NUM_ASTEROIDS) {

    this.DIM_X = DIM_X;
    this.DIM_Y = DIM_Y;
    this.NUM_ASTEROIDS = NUM_ASTEROIDS;

    // generate backgrounds
    this.bgs = [ new Thunderbird.Background({ game: this, pos: [0, -700], imgIdx: 0, bgWidth: 700, bgHeight: 700 }), new Thunderbird.Background({ game: this, pos: [0, 0], imgIdx: 1, bgWidth: 700, bgHeight: 700 }) ];

    // holds array of asteriods objects
    this.asteroids = this.addAsteroids.bind(this)();

    this.ship = new Thunderbird.Ship({ game: this });

    //holds array of bullets
    this.bullets = [];
    this.aliens = [];

    this.stageIsDone = false;

  };

  Game.prototype.addAsteroid = function () {
    var asteroid = new Thunderbird.Asteroid({
      pos: this.randomPosition(),
      game: this
    })
    this.asteroids.push(asteroid);
    this.array.push(asteroid);
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

  Game.prototype.addEnemyShips = function (n) {
    var aliens = [];
    for (var i = 0; i < n; i++) {
      aliens.push(new Thunderbird.AlienOne({
        pos: [Math.floor(Math.random() * 540 + 80), -50],
        vel: [0, 4],
        game: this
      }))
    }
    this.array = this.array.concat(aliens)
    return aliens;
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

    var lost = true;
    var won = true;

    this.bgs.forEach(function(bg) {
      bg.draw(ctx);
    })

    this.array.forEach(function (obj) {
      obj.draw(ctx);

      if (obj.name === "ship") { lost = false; }
      if (obj.name === "enemy") { won = false; }
    }.bind(this));

    if (lost === true) { this.gameLost(); }
    if (won === true && this.stageIsDone === false) {
      this.stageIsDone = true;
      this.stagecleared();
    }

  };

  Game.prototype.step = function () {
    this.moveBackground();
    this.moveObjects();
    this.checkCollisions();
  };

  //move obj
  Game.prototype.moveObjects = function () {
    if (this.array == undefined) { this.allObjects(); }

    for (var i = 0; i < this.array.length; i++) {
      var obj = this.array[i];
      //move it
      obj.move();
      //remove out of bound bullet
      if (obj.name === "shipBullet" && obj.pos[1] <= -5) {
        this.array.splice(i--, 1);
      }

      if (obj.name === "alienBullet" && obj.pos[1] >= 710) {
        this.array.splice(i--, 1);
      }
    }
  };

  //move bkg
  Game.prototype.moveBackground = function () {

    for (var i = 0; i < this.bgs.length; i++) {
      var obj = this.bgs[i];
      //move it
      obj.move();
    }
  };


  //check collisiaon
  Game.prototype.checkCollisions = function () {
    var arr = this.array;
    for (var i = 0; i < arr.length - 1; i++) {
      for (var j = i + 1; j < arr.length; j++) {

        if (arr[i].collidedWith(arr[j])) {

          if (arr[i].name === "enemy" || arr[j].name === "enemy") {
            if (arr[i].name === "enemy") { var enemy = arr[i]; var idx = i; } else if (arr[j].name === "enemy") { var enemy = arr[j]; var idx = j ; }
            //give explosion a position
            var shipExplode = new Thunderbird.ShipExplode({ pos: enemy.pos, vel: enemy.vel, game: enemy.game })
            //remove enemy from arr
            this.array.splice(i, 1);
            this.array.splice(j - 1, 1);

            //add explosion
            this.array.push(shipExplode);

          } else if (arr[i].name === "ship" || arr[j].name === "ship") {
            if (arr[i].name === "ship") { var ship = arr[i]; var idx = i; } else if (arr[j].name === "ship") { var ship = arr[j]; var idx = j; }
            //give explosion a position
            var shipExplode = new Thunderbird.ShipExplode({ pos: ship.pos, vel: ship.vel, game: ship.game })
            //remove ship from arr
            this.array.splice(idx, 1);
            //add explosion
            this.array.push(shipExplode);
          }


        }

      }
    }
  };

  Game.prototype.wrap = function (pos) {
    if (pos > 900) { pos -= 900; }
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
    this.array = this.asteroids.concat(this.ship).concat(this.bullets)

    return this.array
  };

  Game.prototype.gameLost = function () {
    console.log("Game over, you lost.");
    $('.game-over-msg').text("GAME OVER");
    $('.game-over-msg').addClass("stage1-end");
    // debugger
  };

  Game.prototype.stagecleared = function () {
    console.log("You won, all enemies eliminated.");
    $('.game-over-msg').text("Stage Cleared");
    $('.game-over-msg').addClass("stage1-end");
    //next Stage
    var timeOut = setTimeout(function(){
      $('.game-over-msg').removeClass("stage1-end");
      $('.game-over-msg').addClass("stage2-start");
      // $('.game-over-msg').removeClass("game-over-msg");


      var alienOneTimeout = setTimeout(function() {
        $('.game-over-msg').removeClass("stage2-start");

        var n = 0;
        var alienOneInterval = setInterval(function() {
          this.addEnemyShips(1)
          n += 1;
          if (n >= 5) { clearInterval(alienOneInterval); }
          this.stageIsDone = false;
        }.bind(this), 1700)

        // clearTimeout(alienOneTimeout);
        // clearTimeout(timeOut);
      }.bind(this), 2000)

    }.bind(this), 3000)
  };








})();
