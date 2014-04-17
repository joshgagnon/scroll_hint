 (function($) {
      var plugin_name = 'scroll_hint';
      var percentage;
      var methods = {
        init: function(options) {
          options = options || {};
          var self = this;
          return this.each(function() {
            var $this = $(this),
              data = $this.data(plugin_name),
              overflow;
            // If the plugin hasn't been initialized yet
            if (!data) {
                var bottom = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAAwCAYAAADQMxCBAAAABmJLR0QA/wD/AP+gvaeTAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAB3RJTUUH3gMaAyko71GTnAAAABl0RVh0Q29tbWVudABDcmVhdGVkIHdpdGggR0lNUFeBDhcAAAA1SURBVAjXY2BgYGBgePr0KTMTAwMDKxMDAwMbnIXGxc8iSTEai42JgYGBBZVLkkVosjgl2AAOYgQKrYUSigAAAABJRU5ErkJggg==';
                var top = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAAwCAYAAADQMxCBAAAABmJLR0QA/wD/AP+gvaeTAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAB3RJTUUH3gMaAywCSZ2uDwAAABl0RVh0Q29tbWVudABDcmVhdGVkIHdpdGggR0lNUFeBDhcAAAAzSURBVAjXncw7CgAgDETBIfe/Zi4RReysgojN8tifzFyBCowj1Xhd0M06qsC8HrzSbxlsbc8xD0Ge+G4AAAAASUVORK5CYII=';
              if($this.innerHeight() < this.scrollHeight){
                var south = $('<div/>')
                  .css({position: 'absolute', bottom: 0, left:0, right:0, height:"48px",
                    'background-image':
                    "url('"+bottom+"')",
                    'background-repeat' : 'repeat-x ',
                  });
                $this.parent().append(south);
                  var north = $('<div/>')
                  .css({position: 'absolute', top: $this.css('top') || 0, left:0, right:0, height:"48px",
                    'background-image':
                    "url('"+top+"')",
                    'background-repeat' : 'repeat-x ',
                  });
                  north.hide();
                $this.parent().append(north);
                $this.data(plugin_name, {
                  divs: [north, south]
                });
                $this.on('scroll.scroll_hint', function(){
                  if($this.scrollTop() < 3){
                    north.fadeOut();
                  }
                  else{
                    north.fadeIn();
                  }
                  if($this.scrollTop() ===  this.scrollHeight - $this.outerHeight()){
                    south.fadeOut();
                  }
                  else{
                    south.fadeIn();
                  }
                });
              }
            }
          });
        },
        destroy: function() {
          return this.each(function() {
            var $this = $(this),
              data = $this.data(plugin_name);
            if (data) {
              data.divs.forEach(function(el){
                el.remove();
              });
              $this.off('scroll.scroll_hint');
              $this.removeData(plugin_name);
            }
          });
        }
      };

      $.fn[plugin_name] = function(method) {
        // Method calling logic
        if (methods[method]) {
          return methods[method].apply(this, Array.prototype.slice.call(arguments, 1));
        } else if (typeof method === 'object' || !method) {
          return methods.init.apply(this, arguments);
        } else {
          $.error('Method ' + method + ' does not exist');
        }
      };

    })(jQuery);
