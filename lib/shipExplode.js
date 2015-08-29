(function () {
  if (typeof Thunderbird === "undefined") {
    window.Thunderbird = {};
  }

  var ShipExplode = window.Thunderbird.ShipExplode = function (args) {
    this.pos = args.pos;
    this.vel = args.vel;
    this.game = args.game;
    this.name = "explosion"

    this.initiateExplosion = true;
    this.frames = [[0,0], [520, 0], [0, 260], [0, 260], [260, 260], [260, 260], [520, 260], [520, 260], [520, 260], [520, 260], [0, 520], [0, 520], [0, 520], [0, 520], [0, 520], [0, 520], [260, 520], [520, 520]]
    this.n = 0;
    this.frame = [0,0];
  };

  ShipExplode.prototype.collidedWith = function () {
    return false;
  };

  ShipExplode.prototype.draw = function () {

    var interval = setInterval(function() {
      if (this.initiateExplosion === true) {
        this.frame = this.frames[this.n];
        if (this.n <= 16) {
          this.n += 1;
        } else {
          var thisIdx = this.game.array.indexOf(this);
          if (this.game.array[thisIdx] === this) {
            this.game.array.splice(thisIdx, 1);
          }
          clearInterval(interval);
        }
      }
    }.bind(this), 200)

    if (this.n >= 8) {
    }

    //ship draw
    var image = new Image();
    image.src = "http://res.cloudinary.com/djdfz4a67/image/upload/v1440731405/explode780_ncoaw7.png"
    ctx.drawImage(image, this.frame[0], this.frame[1], 260, 260, this.pos[0] - 130, this.pos[1] - 130, 260, 260);

  //   var timeout = setTimeout(function() {
  //     if (this.sx === 0 && this.sy === 0) { this.sx = 260; return null }
  //     setTimeout(function() {
  //       if (this.sx === 260 && this.sy === 0) { this.sx = 520; return null }
  //       setTimeout(function() {
  //         if (this.sx === 520 && this.sy === 0) { this.sx = 0; this.sy = 260; return null }
  //         setTimeout(function() {
  //           if (this.sx === 0 && this.sy === 260) { this.sx = 260; this.sy = 260; return null }
  //           setTimeout(function() {
  //             if (this.sx === 260 && this.sy === 260) { this.sx = 520; this.sy = 260; return null }
  //             setTimeout(function() {
  //               if (this.sx === 520 && this.sy === 260) { this.sx = 0; this.sy = 520; return null }
  //               setTimeout(function() {
  //                 if (this.sx === 0 && this.sy === 520) { this.sx = 260; this.sy = 520; return null }
  //                 setTimeout(function() {
  //                   if (this.sx === 260 && this.sy === 520) { this.sx = 520; this.sy = 520; return null }
  //                   setTimeout(function() {
  //                     //delete this explosion from game array
  //                     var thisIdx = this.game.array.indexOf(this)
  //                     this.game.array.splice(thisIdx, 1)
  //                     clearTimeout(timeout)
  //                     //game over
  //                   }.bind(this), 50)
  //                 }.bind(this), 70)
  //               }.bind(this), 70)
  //             }.bind(this), 50)
  //           }.bind(this), 50)
  //         }.bind(this), 50)
  //       }.bind(this), 50)
  //     }.bind(this), 50)
  //   }.bind(this), 50)
  };

  ShipExplode.prototype.move = function() {

    this.vel[0] = this.vel[0] * 0.98
    this.vel[1] = this.vel[1] * 0.98

    this.pos[0] = this.game.wrapShip(this.pos[0] + this.vel[0]);
    this.pos[1] = this.game.wrapShip(this.pos[1] + this.vel[1]);
  };

})();




// img	Source image object	Sprite sheet
// sx	Source x	Frame index times frame width
// sy	Source y	0
// sw	Source width	Frame width
// sh	Source height	Frame height
// dx	Destination x	0
// dy	Destination y	0
// dw	Destination width	Frame width
// dh	Destination height	Frame height
