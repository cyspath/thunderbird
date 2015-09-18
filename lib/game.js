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


    this.ship = new Thunderbird.Ship({ game: this });

    //holds array of bullets
    this.bullets = [];
    this.aliens = [];

    this.allEnemiesGenerated = false;
    this.score = 0;

    // holds array of asteriods objects
    this.addAllAsteroids();
    this.asteroids = this.addAsteroids.bind(this)();

    this.stages = ["two", "three"]
  };

  Game.prototype.enemiesExist = function () {
    if (this.allEnemiesGenerated === false) { return true; }
    var enemiesExist = false;
    this.array.forEach(function (obj) {
      if (obj.name === "enemy") {
        enemiesExist = true;
      }
    }.bind(this));
    return enemiesExist;
  };

  Game.prototype.addAllAsteroids = function () {
    console.log("StageOne...");
    var n = 0
    var interval = setInterval(function (){
      this.addAsteroid();
      n += 1;
      // n max ~ 16
      if (n >= 10) {
        this.allEnemiesGenerated = true;
        clearInterval(interval);
      }
    }.bind(this), 100)
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
    $('.score').html(this.score);

    ctx.clearRect(0, 0, this.DIM_X, this.DIM_Y);
    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, 700, 700);

    this.bgs.forEach(function(bg) { bg.draw(ctx); })

    var lost = true;
    var won = true
    this.array.forEach(function (obj) {
      obj.draw(ctx);
      if (obj.name === "ship") { lost = false; }
      if (obj.name === "enemy") { won = false; }

    }.bind(this));

    if (lost === true) { this.gameLost(); }
    if (won === true && !!this.finalStage === true) { this.gameWonMsg(); }

    var enemiesExist = this.enemiesExist();
    if (enemiesExist === false) {
      this.stagecleared();
      this.allEnemiesGenerated = false;
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

          //****after collision - scenario 1 - first obj is a enemy
          if (arr[i].name === "enemy") {
            var enemy = arr[i];

            //if enemy collids ship, ship will lose life/shield
            if (arr[j].name === "ship" && arr[i].life > arr[j].life) {
              var shipExplode = new Thunderbird.ShipExplode({ pos: this.ship.pos, vel: this.ship.vel, game: this })
              //remove ship from arr
              this.array.splice(j, 1);
              //add explosion
              this.array.push(shipExplode);
              enemy.life -= 1;
            } else if (arr[j].name === "ship" && arr[i].life <= arr[j].life) {
              arr[j].life -= 1;
              enemy.life -= 1;
            } else if (arr[j].name === "shipBullet") {
              //remove bullet
              this.array.splice(j, 1);
              enemy.life -= 1;
            }

            //ship is destroyed if life is gone.
            if (this.ship.life <= 0) {
              //give explosion a position
              var shipExplode = new Thunderbird.ShipExplode({ pos: this.ship.pos, vel: this.ship.vel, game: this })
              //remove ship from arr
              this.array.splice(j, 1);
              //add explosion
              this.array.push(shipExplode);
            }

            // remove enemy if enemy hp is zero
            if (enemy.life <= 0) {
              //give explosion a position
              var shipExplode = new Thunderbird.ShipExplode({ pos: enemy.pos, vel: enemy.vel, game: enemy.game })
              //score
              this.scoreUpdate(enemy);
              //remove enemy from arr
              this.array.splice(i, 1);
              //add explosion
              this.array.push(shipExplode);
            }
          } else if (arr[i].name === "ship") {
            var enemy = arr[j]

            //if ship collids enemy, ship will lose life/shield
            if (arr[j].name === "enemy" && arr[i].life < arr[j].life) {
              var shipExplode = new Thunderbird.ShipExplode({ pos: this.ship.pos, vel: this.ship.vel, game: this })
              //remove ship from arr
              this.array.splice(i, 1);
              //add explosion
              this.array.push(shipExplode);
              enemy.life -= 1;
            } else if (arr[j].name === "enemy" && arr[i].life >= arr[j].life) {
              arr[i].life -= 1;
              enemy.life -= 1;
            } else {
              //remove bullet
              this.array.splice(j, 1);
              arr[i].life -= 1;
            }

            //ship is destroyed if life is gone.
            if (this.ship.life <= 0) {
              //give explosion a position
              var shipExplode = new Thunderbird.ShipExplode({ pos: this.ship.pos, vel: this.ship.vel, game: this })
              //remove ship from arr
              this.array.splice(i, 1);
              //add explosion
              this.array.push(shipExplode);
            }

            // remove enemy if enemy hp is zero
            if (enemy.life <= 0) {
              //give explosion a position
              var shipExplode = new Thunderbird.ShipExplode({ pos: enemy.pos, vel: enemy.vel, game: enemy.game })
              //score
              this.scoreUpdate(enemy);
              //remove enemy from arr
              this.array.splice(j, 1);
              //add explosion
              this.array.push(shipExplode);
            }
            //****
          }


        }

      }
    }
  };

  Game.prototype.scoreUpdate = function (enemy) {
    if (enemy.class === "asteroid") {
      this.score += 100;
    } else if (enemy.class === "speeder") {
      this.score += 200;
    } else if (enemy.class === "behemoth") {
      this.score += 2000;
    } else {
      return null;
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
    $('.game-over-msg').text("GAME OVER");
    $('.game-over-msg').addClass("stage1-end");

    setTimeout(function () {
      $('.restart-btn').addClass("visible")
    }, 1500)

    this.updateHighestScore();

  };


    Game.prototype.gameWonMsg = function () {
      $('.game-over-msg').text("YOU WON!!!");
      $('.game-over-msg').addClass("stage1-end");

      setTimeout(function () {
        $('.restart-btn').addClass("visible")
      }, 1500)

      this.updateHighestScore();

    };

  Game.prototype.stagecleared = function () {

    $('.game-over-msg').text("Stage Cleared");
    $('.game-over-msg').addClass("stage1-end");
    //next Stage
    var timeOut = setTimeout(function(){
      $('.game-over-msg').removeClass("stage1-end");
      $('.game-over-msg').addClass("stage2-start");
      // $('.game-over-msg').removeClass("game-over-msg");


      var alienOneTimeout = setTimeout(function() {
        $('.game-over-msg').removeClass("stage2-start");

        if (this.stages.indexOf("two") !== -1) {
          console.log("Stage " + this.stages[0]);
          this.addStageTwoEnemies();
          this.stages[0] = "done";
        } else if (this.stages.indexOf("three") !== -1) {
          console.log("Stage " + this.stages[1]);
          this.addStageThreeEnemies();
          this.stages[1] = "done";
        } else if (!!this.finalStage === false){
          console.log("Boss Stage");
          this.addStageTwoEnemies()
          this.array.push(new Thunderbird.AlienBoss({
            pos: [350, 100],
            game: this
          }))
          this.allEnemiesGenerated = true;
          this.finalStage = true;

        }

        clearInterval(alienOneTimeout);

      }.bind(this), 2000)

    }.bind(this), 1000)
  };

 Game.prototype.addStageTwoEnemies = function () {
   var n = 0;
   var interval = setInterval(function (){
     this.addEnemyShips(1);
     n += 1;
     // n ~ 3
     if (n >= 3) {
       this.allEnemiesGenerated = true;
       clearInterval(interval);
      }
   }.bind(this), 1500)
 };


 Game.prototype.addStageThreeEnemies = function () {
   var n = 0;
   var interval = setInterval(function (){
     this.addEnemyShips(1);
     n += 1;
     // n ~ 5
     if (n >= 5) {
       this.allEnemiesGenerated = true;
       clearInterval(interval);
      }
   }.bind(this), 1000)
 };

 Game.prototype.updateHighestScore = function () {
   if (localStorage["HIGHSCORES"] !== undefined) {
     var oldScore = parseInt(localStorage["HIGHSCORES"])
     if (this.score > oldScore) {
       alert("New high score!")
       localStorage["HIGHSCORES"] = this.score;
     }
   } else {
     localStorage["HIGHSCORES"] = 0;
   }
   var score = localStorage["HIGHSCORES"];
   $('.highest-score-text').text('Your Highest Score: ' + score)
 };


})();
