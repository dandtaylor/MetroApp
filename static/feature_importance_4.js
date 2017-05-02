(function() {
  var fn = function() {
    
    (function(global) {
      function now() {
        return new Date();
      }
    
      var force = false;
    
      if (typeof (window._bokeh_onload_callbacks) === "undefined" || force === true) {
        window._bokeh_onload_callbacks = [];
        window._bokeh_is_loading = undefined;
      }
    
    
      
      
    
      function run_callbacks() {
        window._bokeh_onload_callbacks.forEach(function(callback) { callback() });
        delete window._bokeh_onload_callbacks
        console.info("Bokeh: all callbacks have finished");
      }
    
      function load_libs(js_urls, callback) {
        window._bokeh_onload_callbacks.push(callback);
        if (window._bokeh_is_loading > 0) {
          console.log("Bokeh: BokehJS is being loaded, scheduling callback at", now());
          return null;
        }
        if (js_urls == null || js_urls.length === 0) {
          run_callbacks();
          return null;
        }
        console.log("Bokeh: BokehJS not loaded, scheduling load and callback at", now());
        window._bokeh_is_loading = js_urls.length;
        for (var i = 0; i < js_urls.length; i++) {
          var url = js_urls[i];
          var s = document.createElement('script');
          s.src = url;
          s.async = false;
          s.onreadystatechange = s.onload = function() {
            window._bokeh_is_loading--;
            if (window._bokeh_is_loading === 0) {
              console.log("Bokeh: all BokehJS libraries loaded");
              run_callbacks()
            }
          };
          s.onerror = function() {
            console.warn("failed to load library " + url);
          };
          console.log("Bokeh: injecting script tag for BokehJS library: ", url);
          document.getElementsByTagName("head")[0].appendChild(s);
        }
      };var element = document.getElementById("d67a3eea-ca4e-4ba9-be3d-470be9a99f1e");
      if (element == null) {
        console.log("Bokeh: ERROR: autoload.js configured with elementid 'd67a3eea-ca4e-4ba9-be3d-470be9a99f1e' but no matching script tag was found. ")
        return false;
      }
    
      var js_urls = ["https://cdn.pydata.org/bokeh/release/bokeh-0.12.4.min.js", "https://cdn.pydata.org/bokeh/release/bokeh-widgets-0.12.4.min.js"];
    
      var inline_js = [
        function(Bokeh) {
          Bokeh.set_log_level("info");
        },
        
        function(Bokeh) {
          (function() {
            var fn = function() {
              Bokeh.safely(function() {
                var docs_json = {"c54c6281-0e0e-40c4-b14b-65eec9c150c7":{"roots":{"references":[{"attributes":{"data_source":{"id":"64dd2a04-e6e3-4c59-8048-7a074376309d","type":"ColumnDataSource"},"glyph":{"id":"25f98008-ab93-455a-89c5-5bad750eb947","type":"VBar"},"hover_glyph":null,"nonselection_glyph":{"id":"61caec41-8728-4789-a373-8b2f6d7074aa","type":"VBar"},"selection_glyph":null},"id":"44263d38-0505-4cf8-8bef-85e70f239ea2","type":"GlyphRenderer"},{"attributes":{"formatter":{"id":"59b8e47a-f9e0-4277-9ec9-ca69a99efc28","type":"BasicTickFormatter"},"plot":{"id":"8f261e69-cdb4-4623-9ad8-87e9e9c4bafa","subtype":"Figure","type":"Plot"},"ticker":{"id":"3854c91a-0504-4bb8-b168-7702e8320a49","type":"BasicTicker"}},"id":"f0d664cc-151a-4a2a-85a8-9dc373b27128","type":"LinearAxis"},{"attributes":{"formatter":{"id":"b714dcc7-988b-4bcb-9d11-4ee4ab79f67c","type":"BasicTickFormatter"},"plot":{"id":"8f261e69-cdb4-4623-9ad8-87e9e9c4bafa","subtype":"Figure","type":"Plot"},"ticker":{"id":"66f58492-ae69-460c-a94c-93686d549a9a","type":"BasicTicker"}},"id":"0281396f-ad9b-4e4f-a0df-d492fa690202","type":"LinearAxis"},{"attributes":{},"id":"59b8e47a-f9e0-4277-9ec9-ca69a99efc28","type":"BasicTickFormatter"},{"attributes":{},"id":"b714dcc7-988b-4bcb-9d11-4ee4ab79f67c","type":"BasicTickFormatter"},{"attributes":{},"id":"3854c91a-0504-4bb8-b168-7702e8320a49","type":"BasicTicker"},{"attributes":{},"id":"66f58492-ae69-460c-a94c-93686d549a9a","type":"BasicTicker"},{"attributes":{"fill_alpha":{"value":0.1},"fill_color":{"value":"#1f77b4"},"line_alpha":{"value":0.1},"line_color":{"value":"#1f77b4"},"top":{"field":"Importance"},"width":{"value":0.5},"x":{"field":"index"}},"id":"61caec41-8728-4789-a373-8b2f6d7074aa","type":"VBar"},{"attributes":{},"id":"792155fc-95c8-49de-aef4-a261640aa712","type":"ToolEvents"},{"attributes":{"callback":null,"column_names":["Importance","index","feature"],"data":{"Importance":[0.020371207230073393,0.023856719401963277,0.10442085852901904,0.01063916639240351,0.018486557025146174,0.01447140838451297,0.023676186790367027,0.042871668818085885,0.04985049376531864,0.03260427195941971,0.028488309092453038,0.034929129837485744,0.06166087162094014,0.008221105336993075,0.007934775743919521,0.0034186018695069637,0.006452773277461457,0.004396679796583196,0.004672707234680554,0.024770286169104865,0.01488022712363783,0.0567170353329349,0.014671674479975796,0.007059155409719261,0.002056362987440219,0.0054107552613850765,0.007883544002034467,0.004185352880661929,0.006049644439499837,0.006045959868505437,0.005136089124038023,0.0053133073656428395,0.09380312787088037,0.007868214699067962,0.007349278624593593,0.0055250504018866135,0.005156009609027535,0.008824133393279069,0.005545143170027797,0.005507917305443232,0.006278418687945022,0.006739501120104983,0.01303820602334928,0.00798041256914866,0.012239918073839107,0.00873299610444202,0.1133497072544499,0.012848707001819665,0.007857092635120234,0.009753278904661218],"feature":["closest Metro station","2nd closest metro","bike station density","closest bike stand","2nd closest bike stand","3rd closest bike stand","4th closest bike stand","5th closest bike stand","6th closest bike stand","7th closest bike stand","8th closest bike stand","9th closest bike stand","10th closest bike stand","ave household size","population density","rental vacancy rate","unemployment rate","median age","total population","% of population with access to 2 vehicles","% of population with access to 1 vehicle","% of population with no vehicle","% of population with access to 3 or more vehicles","median household data","% of population with single male head of household w/ children","mean household income","% of population married couple w/ children","vacant housing units","median mortgage","housing units owner/renter occupied","median value of owner occupied units","20 or more housing units per structure","% of population walking to work","% of population in same house as last year","% of population with bachelors or higher","median rent cost","% of families below poverty line","5 to 9 housing units per structure","10 to 19 housing units per structure","% of population with high school or higher","1 unit detached housing structure","1 unit attached housing structure","2 unit housing units in structure","3 or 4 housing units in structure","% of population with single female head of household w/ children","% non-family households","% of population commute by car","housing unit density","% of population commute by public transportation","% of population commute by carpool"],"index":[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49]}},"id":"64dd2a04-e6e3-4c59-8048-7a074376309d","type":"ColumnDataSource"},{"attributes":{"below":[{"id":"0281396f-ad9b-4e4f-a0df-d492fa690202","type":"LinearAxis"}],"left":[{"id":"f0d664cc-151a-4a2a-85a8-9dc373b27128","type":"LinearAxis"}],"plot_height":400,"plot_width":1000,"renderers":[{"id":"0281396f-ad9b-4e4f-a0df-d492fa690202","type":"LinearAxis"},{"id":"bb7cac78-b4b6-4642-a675-9f2cd48399fb","type":"Grid"},{"id":"f0d664cc-151a-4a2a-85a8-9dc373b27128","type":"LinearAxis"},{"id":"c5592662-6938-421b-a654-c319ae607a0c","type":"Grid"},{"id":"44263d38-0505-4cf8-8bef-85e70f239ea2","type":"GlyphRenderer"}],"sizing_mode":"scale_width","title":{"id":"aed8849c-abf4-4b5e-a938-f99a54eea862","type":"Title"},"tool_events":{"id":"792155fc-95c8-49de-aef4-a261640aa712","type":"ToolEvents"},"toolbar":{"id":"1efa74ab-b4cc-4cfc-b160-623329cf785c","type":"Toolbar"},"toolbar_location":"above","x_range":{"id":"4e373850-dd38-4f7e-bfac-b93f7ed3d675","type":"DataRange1d"},"y_range":{"id":"7dec2e50-49dd-4bb3-9003-971b992cfac7","type":"DataRange1d"}},"id":"8f261e69-cdb4-4623-9ad8-87e9e9c4bafa","subtype":"Figure","type":"Plot"},{"attributes":{"dimension":1,"plot":{"id":"8f261e69-cdb4-4623-9ad8-87e9e9c4bafa","subtype":"Figure","type":"Plot"},"ticker":{"id":"3854c91a-0504-4bb8-b168-7702e8320a49","type":"BasicTicker"}},"id":"c5592662-6938-421b-a654-c319ae607a0c","type":"Grid"},{"attributes":{"callback":null},"id":"7dec2e50-49dd-4bb3-9003-971b992cfac7","type":"DataRange1d"},{"attributes":{"callback":null,"plot":{"id":"8f261e69-cdb4-4623-9ad8-87e9e9c4bafa","subtype":"Figure","type":"Plot"},"tooltips":[["feature","@feature"]]},"id":"4dafadf2-baff-498b-8a68-75ec4cd512a6","type":"HoverTool"},{"attributes":{"plot":null,"text":""},"id":"aed8849c-abf4-4b5e-a938-f99a54eea862","type":"Title"},{"attributes":{"fill_color":{"value":"#1f77b4"},"line_color":{"value":"#1f77b4"},"top":{"field":"Importance"},"width":{"value":0.5},"x":{"field":"index"}},"id":"25f98008-ab93-455a-89c5-5bad750eb947","type":"VBar"},{"attributes":{"callback":null},"id":"4e373850-dd38-4f7e-bfac-b93f7ed3d675","type":"DataRange1d"},{"attributes":{"plot":{"id":"8f261e69-cdb4-4623-9ad8-87e9e9c4bafa","subtype":"Figure","type":"Plot"},"ticker":{"id":"66f58492-ae69-460c-a94c-93686d549a9a","type":"BasicTicker"}},"id":"bb7cac78-b4b6-4642-a675-9f2cd48399fb","type":"Grid"},{"attributes":{"active_drag":"auto","active_scroll":"auto","active_tap":"auto","tools":[{"id":"4dafadf2-baff-498b-8a68-75ec4cd512a6","type":"HoverTool"}]},"id":"1efa74ab-b4cc-4cfc-b160-623329cf785c","type":"Toolbar"}],"root_ids":["8f261e69-cdb4-4623-9ad8-87e9e9c4bafa"]},"title":"Bokeh Application","version":"0.12.4"}};
                var render_items = [{"docid":"c54c6281-0e0e-40c4-b14b-65eec9c150c7","elementid":"d67a3eea-ca4e-4ba9-be3d-470be9a99f1e","modelid":"8f261e69-cdb4-4623-9ad8-87e9e9c4bafa"}];
                
                Bokeh.embed.embed_items(docs_json, render_items);
              });
            };
            if (document.readyState != "loading") fn();
            else document.addEventListener("DOMContentLoaded", fn);
          })();
        },
        function(Bokeh) {
          console.log("Bokeh: injecting CSS: https://cdn.pydata.org/bokeh/release/bokeh-0.12.4.min.css");
          Bokeh.embed.inject_css("https://cdn.pydata.org/bokeh/release/bokeh-0.12.4.min.css");
          console.log("Bokeh: injecting CSS: https://cdn.pydata.org/bokeh/release/bokeh-widgets-0.12.4.min.css");
          Bokeh.embed.inject_css("https://cdn.pydata.org/bokeh/release/bokeh-widgets-0.12.4.min.css");
        }
      ];
    
      function run_inline_js() {
        
        for (var i = 0; i < inline_js.length; i++) {
          inline_js[i](window.Bokeh);
        }
        
      }
    
      if (window._bokeh_is_loading === 0) {
        console.log("Bokeh: BokehJS loaded, going straight to plotting");
        run_inline_js();
      } else {
        load_libs(js_urls, function() {
          console.log("Bokeh: BokehJS plotting callback run at", now());
          run_inline_js();
        });
      }
    }(this));
  };
  if (document.readyState != "loading") fn();
  else document.addEventListener("DOMContentLoaded", fn);
})();
