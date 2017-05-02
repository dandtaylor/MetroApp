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
      };var element = document.getElementById("d769d52d-06de-4836-a749-47e68cc1f3b4");
      if (element == null) {
        console.log("Bokeh: ERROR: autoload.js configured with elementid 'd769d52d-06de-4836-a749-47e68cc1f3b4' but no matching script tag was found. ")
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
                var docs_json = {"d6194309-5922-4b07-8530-1f708a053403":{"roots":{"references":[{"attributes":{"formatter":{"id":"a9dfb298-9b5f-49fd-a3a5-7607dedfe6aa","type":"BasicTickFormatter"},"plot":{"id":"83f9cc8c-5c9d-4530-b024-b41b1d1cabfd","subtype":"Figure","type":"Plot"},"ticker":{"id":"ef11b00f-ef80-4422-8b47-6f567388dffc","type":"BasicTicker"}},"id":"3093688d-997d-452f-a6b3-e995bdb41c23","type":"LinearAxis"},{"attributes":{"callback":null},"id":"5f45322f-75fc-45e6-b280-02153bcfe800","type":"DataRange1d"},{"attributes":{"callback":null},"id":"2f9fb70d-e409-429b-bab7-42f58c825da2","type":"DataRange1d"},{"attributes":{"dimension":1,"plot":{"id":"83f9cc8c-5c9d-4530-b024-b41b1d1cabfd","subtype":"Figure","type":"Plot"},"ticker":{"id":"20935111-bbd6-4de7-8f10-3f0ac4e41643","type":"BasicTicker"}},"id":"b9c88054-ae6d-494a-8882-fd916e7d510e","type":"Grid"},{"attributes":{},"id":"5e80217b-8a7e-4da0-a733-0fd0c1f9b91a","type":"BasicTickFormatter"},{"attributes":{},"id":"20935111-bbd6-4de7-8f10-3f0ac4e41643","type":"BasicTicker"},{"attributes":{},"id":"a9dfb298-9b5f-49fd-a3a5-7607dedfe6aa","type":"BasicTickFormatter"},{"attributes":{"data_source":{"id":"1c613e96-54f8-44f0-8515-fb79d15ef2d9","type":"ColumnDataSource"},"glyph":{"id":"9ca9b9eb-1965-43a3-b691-cda27eea1c0d","type":"VBar"},"hover_glyph":null,"nonselection_glyph":{"id":"61e57bd2-a27c-4239-92c9-907739f1e748","type":"VBar"},"selection_glyph":null},"id":"775c6686-d72b-4da6-8445-726170f60c8b","type":"GlyphRenderer"},{"attributes":{"plot":null,"text":""},"id":"b167b4a0-fdd5-4ad4-9f19-bc7748c4d47a","type":"Title"},{"attributes":{},"id":"ef11b00f-ef80-4422-8b47-6f567388dffc","type":"BasicTicker"},{"attributes":{"callback":null,"column_names":["Importance","index","feature"],"data":{"Importance":[0.020371207230073393,0.023856719401963277,0.10442085852901904,0.01063916639240351,0.018486557025146174,0.01447140838451297,0.023676186790367027,0.042871668818085885,0.04985049376531864,0.03260427195941971,0.028488309092453038,0.034929129837485744,0.06166087162094014,0.008221105336993075,0.007934775743919521,0.0034186018695069637,0.006452773277461457,0.004396679796583196,0.004672707234680554,0.024770286169104865,0.01488022712363783,0.0567170353329349,0.014671674479975796,0.007059155409719261,0.002056362987440219,0.0054107552613850765,0.007883544002034467,0.004185352880661929,0.006049644439499837,0.006045959868505437,0.005136089124038023,0.0053133073656428395,0.09380312787088037,0.007868214699067962,0.007349278624593593,0.0055250504018866135,0.005156009609027535,0.008824133393279069,0.005545143170027797,0.005507917305443232,0.006278418687945022,0.006739501120104983,0.01303820602334928,0.00798041256914866,0.012239918073839107,0.00873299610444202,0.1133497072544499,0.012848707001819665,0.007857092635120234,0.009753278904661218],"feature":["closest Metro station","2nd closest metro","bike station density","closest bike stand","2nd closest bike stand","3rd closest bike stand","4th closest bike stand","5th closest bike stand","6th closest bike stand","7th closest bike stand","8th closest bike stand","9th closest bike stand","10th closest bike stand","ave household size","population density","rental vacancy rate","unemployment rate","median age","total population","% of population with access to 2 vehicles","% of population with access to 1 vehicle","% of population with no vehicle","% of population with access to 3 or more vehicles","median household data","% of population with single male head of household w/ children","mean household income","% of population married couple w/ children","vacant housing units","median mortgage","housing units owner/renter occupied","median value of owner occupied units","20 or more housing units per structure","% of population walking to work","% of population in same house as last year","% of population with bachelors or higher","median rent cost","% of families below poverty line","5 to 9 housing units per structure","10 to 19 housing units per structure","% of population with high school or higher","1 unit detached housing structure","1 unit attached housing structure","2 unit housing units in structure","3 or 4 housing units in structure","% of population with single female head of household w/ children","% non-family households","% of population commute by car","housing unit density","% of population commute by public transportation","% of population commute by carpool"],"index":[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49]}},"id":"1c613e96-54f8-44f0-8515-fb79d15ef2d9","type":"ColumnDataSource"},{"attributes":{},"id":"93f78840-7fb6-47f0-8e2f-56882cc71d2b","type":"ToolEvents"},{"attributes":{"plot":{"id":"83f9cc8c-5c9d-4530-b024-b41b1d1cabfd","subtype":"Figure","type":"Plot"},"ticker":{"id":"ef11b00f-ef80-4422-8b47-6f567388dffc","type":"BasicTicker"}},"id":"14fbcc69-42bb-4729-9808-dbb7a2cf485a","type":"Grid"},{"attributes":{"callback":null,"plot":{"id":"83f9cc8c-5c9d-4530-b024-b41b1d1cabfd","subtype":"Figure","type":"Plot"},"tooltips":[["feature","@feature"]]},"id":"177f0f04-42a3-48c3-93e9-b9662a4821c2","type":"HoverTool"},{"attributes":{"below":[{"id":"3093688d-997d-452f-a6b3-e995bdb41c23","type":"LinearAxis"}],"left":[{"id":"1d2a93d8-a80e-4cce-91e7-9cd561e17cac","type":"LinearAxis"}],"plot_height":400,"plot_width":800,"renderers":[{"id":"3093688d-997d-452f-a6b3-e995bdb41c23","type":"LinearAxis"},{"id":"14fbcc69-42bb-4729-9808-dbb7a2cf485a","type":"Grid"},{"id":"1d2a93d8-a80e-4cce-91e7-9cd561e17cac","type":"LinearAxis"},{"id":"b9c88054-ae6d-494a-8882-fd916e7d510e","type":"Grid"},{"id":"775c6686-d72b-4da6-8445-726170f60c8b","type":"GlyphRenderer"}],"title":{"id":"b167b4a0-fdd5-4ad4-9f19-bc7748c4d47a","type":"Title"},"tool_events":{"id":"93f78840-7fb6-47f0-8e2f-56882cc71d2b","type":"ToolEvents"},"toolbar":{"id":"5e32a3a2-71fe-4935-8655-e10e87553134","type":"Toolbar"},"x_range":{"id":"2f9fb70d-e409-429b-bab7-42f58c825da2","type":"DataRange1d"},"y_range":{"id":"5f45322f-75fc-45e6-b280-02153bcfe800","type":"DataRange1d"}},"id":"83f9cc8c-5c9d-4530-b024-b41b1d1cabfd","subtype":"Figure","type":"Plot"},{"attributes":{"active_drag":"auto","active_scroll":"auto","active_tap":"auto","tools":[{"id":"177f0f04-42a3-48c3-93e9-b9662a4821c2","type":"HoverTool"}]},"id":"5e32a3a2-71fe-4935-8655-e10e87553134","type":"Toolbar"},{"attributes":{"fill_color":{"value":"#1f77b4"},"line_color":{"value":"#1f77b4"},"top":{"field":"Importance"},"width":{"value":0.5},"x":{"field":"index"}},"id":"9ca9b9eb-1965-43a3-b691-cda27eea1c0d","type":"VBar"},{"attributes":{"formatter":{"id":"5e80217b-8a7e-4da0-a733-0fd0c1f9b91a","type":"BasicTickFormatter"},"plot":{"id":"83f9cc8c-5c9d-4530-b024-b41b1d1cabfd","subtype":"Figure","type":"Plot"},"ticker":{"id":"20935111-bbd6-4de7-8f10-3f0ac4e41643","type":"BasicTicker"}},"id":"1d2a93d8-a80e-4cce-91e7-9cd561e17cac","type":"LinearAxis"},{"attributes":{"fill_alpha":{"value":0.1},"fill_color":{"value":"#1f77b4"},"line_alpha":{"value":0.1},"line_color":{"value":"#1f77b4"},"top":{"field":"Importance"},"width":{"value":0.5},"x":{"field":"index"}},"id":"61e57bd2-a27c-4239-92c9-907739f1e748","type":"VBar"}],"root_ids":["83f9cc8c-5c9d-4530-b024-b41b1d1cabfd"]},"title":"Bokeh Application","version":"0.12.4"}};
                var render_items = [{"docid":"d6194309-5922-4b07-8530-1f708a053403","elementid":"d769d52d-06de-4836-a749-47e68cc1f3b4","modelid":"83f9cc8c-5c9d-4530-b024-b41b1d1cabfd"}];
                
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
