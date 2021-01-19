function () {
  "use strict";
  var scale = window.devicePixelRatio ? window.devicePixelRatio : 1;
  scale = Math.round(scale);
  scale = Math.max(1, scale);
  scale = Math.min(3, scale);
  var DEFAULT_ICAO = 'B738';
  var DEFAULT_CONFIGURATION = 'yellow_25';
  /**     
   * Sprite Configuration class     
   * 
   * @param {Object} params     
   * */
  var SpriteConfiguration = function (response) {
    var configuration = this;
    this.response = response;
    var getIconByAircraft = function (aircraft) {
      var iconIcaos = Object.keys(configuration.response.icons);
      // Match by ICAO
      if (iconIcaos.indexOf(aircraft) !== -1) {
        return configuration.response.icons[aircraft];
      }
      // Match by alias
      for (var i = 0; i < iconIcaos.length; i++) {
        var iconIcao = iconIcaos[i];
        var currentIcon = configuration.response.icons[iconIcao];
        if (currentIcon.aliases.indexOf(aircraft) !== -1) {
          return currentIcon;
        }
      }
      // Fallback to default
      return configuration.response.icons[DEFAULT_ICAO];
    };
    var getRotatedFrame = function (frame, rotation) {
      var step = configuration.response.rotationDegrees;
      var rounded = Math.round(rotation / step) * step;
      return frame[rounded] ? frame[rounded] : frame[0];
    };
    var cache = {};
    this.getIcon = function (iconParams) {
      var aircraft = iconParams.aircraft;
      var rotation = iconParams.rotation;
      var iteration = iconParams.iteration;
      var icon = getIconByAircraft(aircraft);
      var frame = icon.frames[iteration % icon.frames.length];
      var rotatedFrame = frame[0];
      if (icon.rotates) {
        rotatedFrame = getRotatedFrame(frame, rotation);
      }
      var cacheKey = rotatedFrame.x + '_' + rotatedFrame.y + '_' + rotatedFrame.w + '_' + rotatedFrame.h;
      if (!cache[cacheKey]) {
        var scaled = {
          x: rotatedFrame.x / scale,
          y: rotatedFrame.y / scale,
          w: rotatedFrame.w / scale,
          h: rotatedFrame.h / scale,
        };
        var baseUrl = 'https://images.flightradar24.com/assets/aircraft/cached/';
        cache[cacheKey] = {
          url: baseUrl + configuration.response.url,
          scaledSize: new google.maps.Size(configuration.response.w / scale, configuration.response.h / scale),
          size: new google.maps.Size(scaled.w, scaled.h),
          origin: new google.maps.Point(scaled.x, scaled.y),
          anchor: new google.maps.Point(scaled.w / 2, scaled.h / 2),
          _framesNo: icon.frames.length,
        };
      }
      return cache[cacheKey];
    };
  };

  var allSizes = ['xlarge', 'large', 'normal', 'small'];
  var allColors = ['yellow', 'red', 'blue'];
  var loadCachedConfiguration = function (key) {
    try {
      var cached = JSON.parse(window.localStorage.getItem('sprite_' + key));
      if (!cached || cached !== Object(cached)) {
        throw new TypeError('Not an object');
      }
      return cached;
    } catch (e) {
      return null;
    }
  };
  var storeCachedConfiguration = function (key, body) {
    try {
      window.localStorage.setItem('sprite_' + key, JSON.stringify(body));
      return true;
    } catch (e) {
      return false;
    }
  };
  var configurations = {};
  var loadConfiguration = function (color, size) {
    return new Promise(function (resolve, reject) {
      var resolved = false;
      var key = color + '_' + size;
      var cached = loadCachedConfiguration(key);
      if (cached) {
        configurations[key] = new SpriteConfiguration(cached);
        resolve();
        resolved = true;
      }
      var url = "/aircraft-icons/sprite";
      url += "?size=" + size;
      url += "&scale=" + scale;
      url += "&color=" + color;
      url += "&shadow=yes";
      fetch(url, { method: "GET" })
        .then(function (response) {
          response.json().then(function (response) {
            configurations[key] = new SpriteConfiguration(response);
            storeCachedConfiguration(key, response);
            if (!resolved) {
              resolve();
            }
          }).catch(function (e) {
            if (!resolved) {
              reject(e);
            }
          });
        }).catch(function (e) {
          if (!resolved) {
            reject(e);
          }
        });
    });
  };
  /**     
   * Converts the size from literal to pixels
   * 
   * @param {String} size     
   * @returns {Integer}     
   */
  var sizeToPixels = function (size) {
    var sizeMap = {
      xlarge: 80,
      large: 35,
      normal: 30,
      small: 25
    }; return sizeMap[size] ? sizeMap[size] : sizeMap.normal;
  };
  window.AircraftIcon = {
    /**         
     * The loaded configurations
     * @param {String} color
     * @param {String} size
     * @returns {SpriteConfiguration}
     */
    getConfiguration: function (color, size) {
      var key = color + '_' + sizeToPixels(size);
      return configurations[key] ? configurations[key] : configurations[DEFAULT_CONFIGURATION];
    },
    /**
     * Loads all the possible sprites
     * @returns {Promise}         
     */
    loadAll: function () {
      promises = [];
      for (var i = 0; i < allSizes.length; i++) {
        for (var j = 0; j < allColors.length; j++) {
          var size = allSizes[i];
          var color = allColors[j];
          promises.push(loadConfiguration(color, sizeToPixels(size)));
        }
      }
      return Promise.all(promises).then(function () { moduleLoaded('aircraft-icon') });
    },
  };
}
