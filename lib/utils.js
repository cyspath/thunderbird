(function () {
  if (typeof Asteroids === "undefined") {
    window.Asteroids = {};
  }
  if (typeof Asteroids.Util === "undefined") {
    window.Asteroids.Util = {};
  }

  Asteroids.Util.randomVec = function(length) {
    var result = [];
    for (var i = 0; i < 2; i++) {

      if ( Math.floor(Math.random() * 2) === 0 ) {
        var x = 0 - Math.random() * length
      } else {
        var x = Math.random() * length
      }
      result.push(x);
    };
    return result;
  };

  Asteroids.Util.inherits = function (ChildClass, ParentClass) {
    function Surrogate() {};
    Surrogate.prototype = ParentClass.prototype;
    ChildClass.prototype = new Surrogate();
    ChildClass.prototype.constructor = ChildClass;
  };

})();
