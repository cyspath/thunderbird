(function () {
  if (typeof Thunderbird === "undefined") {
    window.Thunderbird = {};
  }

  var AlienBullet = window.Thunderbird.AlienBullet = function(args) {
    var newArgs = {
      pos: args.pos,
      radius: 3,
      color: "white",
      vel: [0, 7],
      game: args.game
    };

    Thunderbird.MovingObject.call(this, newArgs);
    this.name = "alienBullet";
    // this.pos[1] -= 20;
  };

  Thunderbird.Util.inherits(AlienBullet, Thunderbird.MovingObject);

  AlienBullet.prototype.collidedWith = function (otherObject) {
    if (otherObject.name === "enemy") { return false; }
    if (otherObject.name === "alienBullet") { return false; }
    if (otherObject.name === "explosion") { return false; }

    var rSum = this.radius + otherObject.radius;
    var distance = Math.sqrt( Math.pow(this.pos[0] - otherObject.pos[0], 2) + Math.pow(this.pos[1] - otherObject.pos[1], 2) )
    return (rSum >= distance) ? true : false;
  };

  AlienBullet.prototype.move = function() {
    this.pos[0] += this.vel[0];
    this.pos[1] += this.vel[1];
  };

  AlienBullet.prototype.draw = function () {
    ctx.fillStyle = "#ffffff";
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
    ctx.fill();

    var image = new Image();
    image.src = "http://res.cloudinary.com/djdfz4a67/image/upload/c_scale,h_12,w_17/a_90/v1440832718/redLaserRay_n3ewm2.png"
    ctx.drawImage(image,this.pos[0] - 5, this.pos[1] - 5);

  };


})();
