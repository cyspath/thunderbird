(function () {
  if (typeof Thunderbird === "undefined") {
    window.Thunderbird = {};
  }

  var AlienBossLazer = window.Thunderbird.AlienBossLazer = function(args) {
    var newArgs = {
      pos: args.pos,
      radius: 9,
      color: "white",
      vel: args.vel,
      game: args.game
    };

    Thunderbird.MovingObject.call(this, newArgs);
    this.name = "alienBullet";
    this.life = 1;
  };

  Thunderbird.Util.inherits(AlienBossLazer, Thunderbird.MovingObject);

  AlienBossLazer.prototype.collidedWith = function (otherObject) {
    if (otherObject.name === "enemy") { return false; }
    if (otherObject.name === "alienBullet") { return false; }
    if (otherObject.name === "shipBullet") { return false; }
    if (otherObject.name === "explosion") { return false; }

    var rSum = this.radius + otherObject.radius;
    var distance = Math.sqrt( Math.pow(this.pos[0] - otherObject.pos[0], 2) + Math.pow(this.pos[1] - otherObject.pos[1], 2) )
    return (rSum >= distance) ? true : false;
  };

  AlienBossLazer.prototype.move = function() {
    this.pos[0] += this.vel[0];
    this.pos[1] += this.vel[1];
  };

  AlienBossLazer.prototype.draw = function () {

    ctx.beginPath();
    ctx.arc(
      this.pos[0],
      this.pos[1],
      this.radius,
      0,
      2 * Math.PI,
      false
    );
    ctx.strokeStyle="white";
    ctx.lineWidth = 1;
    ctx.stroke();

    var image = new Image();
    image.src = "http://res.cloudinary.com/djdfz4a67/image/upload/v1441003600/redlazerball_ippgul.png"
    ctx.drawImage(image,this.pos[0] - 15, this.pos[1] - 15);

  };


})();
