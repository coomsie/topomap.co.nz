/* 
 * L.TileLayer.LocalCache : A tile layer using SQL Storage, if available.
 */

L.TileLayer.LocalCache = L.TileLayer.extend({
    options: {
        minZoom: 0,
        maxZoom: 18,
        tileSize: 256,
        subdomains: 'abc',
        errorTileUrl: '',
        attribution: '',
        opacity: 1,
        scheme: 'xyz',
        noWrap: false,
        unloadInvisibleTiles: L.Browser.mobileWebkit,
        updateWhenIdle: L.Browser.mobileWebkit
    },
    
    initialize: function(url, tilestorage, options) {
        this._url = url;
        this.tilestorage = storage;

        if (typeof this.options.subdomains == 'string') {
            this.options.subdomains = this.options.subdomains.split('');
        }
        L.Util.setOptions(this, options);
    },

    _loadTile: function(tile, tilePoint, zoom) {
        tile._layer = this;
        tile.onload = this._tileOnLoad;
        tile.onerror = this._tileOnError;
        this.getTileUrl(tile, tilePoint, zoom);
    },

    getTileUrl: function(tile, tilePoint, zoom) {
        var subdomains = this.options.subdomains,
                     s = this.options.subdomains[(tilePoint.x + tilePoint.y) % subdomains.length];
        var fallback = this._url
                           .replace('{s}', s)
                           .replace('{z}', zoom)
                           .replace('{x}', tilePoint.x)
                           .replace('{y}', tilePoint.y);
        this.tilestorage.loadTile(tile, zoom, tilePoint.x, tilePoint.y, fallback);
    }
});



/* 
 *  $.TileStorage : A tile SQL storage. (using Jquery, TODO: rewrite for Leaflet class model!)
 */
(function($){
    $.TileStorage = function(options) {
        var self = this;

        var settings = $.extend({
            dbname: 'TilesDB',
            version: '1.0',
            comment: 'Leaflet Tile Database',
            size: 20000
        }, options || {});
        
        self.db = null;

        self.initTiles = function (reset) {
            self.db = openDatabase(settings.dbname, settings.version, settings.comment, settings.size);
            if(!self.db) {
                alert('Database open failed.');
            }
            if (reset) {
                console.log("Creating tables...");
                self.db.transaction(function(tx) {
                    tx.executeSql("DROP TABLE tiles;", [], function(tx, result) {}, function(tx, error) {});
                    tx.executeSql("CREATE TABLE tiles (z INT, x INT, y INT, data TEXT);", [], 
                        function(tx, result) {
                            console.log('Database created.');
                        }, 
                        function(tx, error) {
                            self.__dbError(error);
                        }
                    );
                });
            }
        };

        self.storeTiles = function (data) {
            if (!self.db) {
                self.initTiles(true);
            }
            var nbtiles = 0;
            $(data.tiles).each(function (index, value) {
                var z = value.tile[0], 
                    x = value.tile[1], 
                    y = value.tile[2],
                    tiledata = "data:" + data.mimetype + ";base64," + value.data;
                self._storeTile(z, x, y, tiledata, function(tx, result) {
                    nbtiles++;
                });
            });
            console.log("Stored " + nbtiles + "/" + data.tiles.length + " tiles.");
        };

        self._storeTile = function (z, x, y, data, success) {
            self.db.transaction(function (tx) {
                    tx.executeSql("INSERT INTO tiles (z, x, y, data) VALUES (?, ?, ?, ?);", [z, x, y, data], 
                        success, 
                        function(tx, error) {
                            self.__dbError(error);
                        }
                    );
            });
        };

        self.loadTile = function (tile, z, x, y, fallback) {
            if (!self.db) {
                self.initTiles();
            }
            self.db.transaction(function (tx) {
                tx.executeSql("SELECT data FROM tiles WHERE z = ? AND x = ? AND y = ?", [z, x, y], 
                    function(tx, result) {
                        if (result.rows.length > 0) {
                        	tile.style.border = 'dotted 1px blue';
                            tile.src = result.rows.item(0).data;
                        }
                        else {
                        	tile.style.border = 'dotted 1px red';
                            tile.src = fallback;
                        }
                    }, 
                    function(tx, error) {
                        self.__dbError(error);
                    }
                );
            });
        };
        
        
        self.__dbError = function (err) {
            console.log(err);
        };
   };
})(jQuery);

