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
      };var element = document.getElementById("e1e6ecb3-02da-4e80-a55f-c0a1f4638706");
      if (element == null) {
        console.log("Bokeh: ERROR: autoload.js configured with elementid 'e1e6ecb3-02da-4e80-a55f-c0a1f4638706' but no matching script tag was found. ")
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
                var docs_json = {"0e9232fc-649e-46c0-a9b8-033771934be1":{"roots":{"references":[{"attributes":{"plot":{"id":"b8cdb367-9aef-424d-8476-8efa53a71ffe","subtype":"Figure","type":"Plot"}},"id":"6e948cff-a42a-4213-b197-6bc3388a7ea1","type":"WheelZoomTool"},{"attributes":{"callback":null},"id":"0aa47e95-e5d3-49ef-bcc2-9346606c92a4","type":"DataRange1d"},{"attributes":{"bottom_units":"screen","fill_alpha":{"value":0.5},"fill_color":{"value":"lightgrey"},"left_units":"screen","level":"overlay","line_alpha":{"value":1.0},"line_color":{"value":"black"},"line_dash":[4,4],"line_width":{"value":2},"plot":null,"render_mode":"css","right_units":"screen","top_units":"screen"},"id":"56a2ce64-d171-4799-8a59-0ee355bc2855","type":"BoxAnnotation"},{"attributes":{"plot":null,"text":""},"id":"2fdf7d56-515e-4a7d-aaa5-5484b0e76db7","type":"Title"},{"attributes":{},"id":"87272c9b-c4f1-44ac-ac02-d144fb4ebf83","type":"BasicTickFormatter"},{"attributes":{"overlay":{"id":"56a2ce64-d171-4799-8a59-0ee355bc2855","type":"BoxAnnotation"},"plot":{"id":"b8cdb367-9aef-424d-8476-8efa53a71ffe","subtype":"Figure","type":"Plot"}},"id":"1c115d3c-7b50-4e97-9935-2a64945d040d","type":"BoxZoomTool"},{"attributes":{},"id":"ebe702fe-5184-4c68-a3ff-045a65f71fbb","type":"BasicTickFormatter"},{"attributes":{"plot":{"id":"b8cdb367-9aef-424d-8476-8efa53a71ffe","subtype":"Figure","type":"Plot"},"ticker":{"id":"01817770-9231-4e5a-8937-86e684d14e7d","type":"BasicTicker"}},"id":"e728e7c8-c0c2-4918-926e-bfff30c59669","type":"Grid"},{"attributes":{"active_drag":"auto","active_scroll":"auto","active_tap":"auto","tools":[{"id":"82670171-10b2-4691-8cf3-f96589d00ce1","type":"PanTool"},{"id":"6e948cff-a42a-4213-b197-6bc3388a7ea1","type":"WheelZoomTool"},{"id":"1c115d3c-7b50-4e97-9935-2a64945d040d","type":"BoxZoomTool"},{"id":"fd40444b-3b86-428c-b7fc-b687d0d71366","type":"SaveTool"},{"id":"4253d7b5-d446-40aa-89bd-837789477809","type":"ResetTool"},{"id":"28b92e7f-ef9d-4060-8328-6594aabb8b00","type":"HelpTool"}]},"id":"b1d90ce6-ff5e-4cd0-8b6e-5929ef4ac68f","type":"Toolbar"},{"attributes":{},"id":"c4ff9027-e756-470f-8f85-e92144a5c5ec","type":"ToolEvents"},{"attributes":{"plot":{"id":"b8cdb367-9aef-424d-8476-8efa53a71ffe","subtype":"Figure","type":"Plot"}},"id":"4253d7b5-d446-40aa-89bd-837789477809","type":"ResetTool"},{"attributes":{"callback":null},"id":"019f2808-ffbc-4782-9daf-82cf83adf3e8","type":"DataRange1d"},{"attributes":{"formatter":{"id":"ebe702fe-5184-4c68-a3ff-045a65f71fbb","type":"BasicTickFormatter"},"plot":{"id":"b8cdb367-9aef-424d-8476-8efa53a71ffe","subtype":"Figure","type":"Plot"},"ticker":{"id":"01817770-9231-4e5a-8937-86e684d14e7d","type":"BasicTicker"}},"id":"0b1583d7-d486-4c9c-8f2b-cb43ee57d66c","type":"LinearAxis"},{"attributes":{"plot":{"id":"b8cdb367-9aef-424d-8476-8efa53a71ffe","subtype":"Figure","type":"Plot"}},"id":"fd40444b-3b86-428c-b7fc-b687d0d71366","type":"SaveTool"},{"attributes":{},"id":"c000d226-9465-428c-9762-c082a3c6f4fd","type":"BasicTicker"},{"attributes":{"formatter":{"id":"87272c9b-c4f1-44ac-ac02-d144fb4ebf83","type":"BasicTickFormatter"},"plot":{"id":"b8cdb367-9aef-424d-8476-8efa53a71ffe","subtype":"Figure","type":"Plot"},"ticker":{"id":"c000d226-9465-428c-9762-c082a3c6f4fd","type":"BasicTicker"}},"id":"a6268401-8f32-47d3-b523-ec7fb05b2674","type":"LinearAxis"},{"attributes":{"plot":{"id":"b8cdb367-9aef-424d-8476-8efa53a71ffe","subtype":"Figure","type":"Plot"}},"id":"28b92e7f-ef9d-4060-8328-6594aabb8b00","type":"HelpTool"},{"attributes":{},"id":"01817770-9231-4e5a-8937-86e684d14e7d","type":"BasicTicker"},{"attributes":{"below":[{"id":"0b1583d7-d486-4c9c-8f2b-cb43ee57d66c","type":"LinearAxis"}],"left":[{"id":"a6268401-8f32-47d3-b523-ec7fb05b2674","type":"LinearAxis"}],"plot_height":400,"plot_width":1000,"renderers":[{"id":"0b1583d7-d486-4c9c-8f2b-cb43ee57d66c","type":"LinearAxis"},{"id":"e728e7c8-c0c2-4918-926e-bfff30c59669","type":"Grid"},{"id":"a6268401-8f32-47d3-b523-ec7fb05b2674","type":"LinearAxis"},{"id":"e36cd6ea-f76d-400f-8309-278e4da70169","type":"Grid"},{"id":"56a2ce64-d171-4799-8a59-0ee355bc2855","type":"BoxAnnotation"}],"sizing_mode":"scale_width","title":{"id":"2fdf7d56-515e-4a7d-aaa5-5484b0e76db7","type":"Title"},"tool_events":{"id":"c4ff9027-e756-470f-8f85-e92144a5c5ec","type":"ToolEvents"},"toolbar":{"id":"b1d90ce6-ff5e-4cd0-8b6e-5929ef4ac68f","type":"Toolbar"},"toolbar_location":"above","x_range":{"id":"0aa47e95-e5d3-49ef-bcc2-9346606c92a4","type":"DataRange1d"},"y_range":{"id":"019f2808-ffbc-4782-9daf-82cf83adf3e8","type":"DataRange1d"}},"id":"b8cdb367-9aef-424d-8476-8efa53a71ffe","subtype":"Figure","type":"Plot"},{"attributes":{"dimension":1,"plot":{"id":"b8cdb367-9aef-424d-8476-8efa53a71ffe","subtype":"Figure","type":"Plot"},"ticker":{"id":"c000d226-9465-428c-9762-c082a3c6f4fd","type":"BasicTicker"}},"id":"e36cd6ea-f76d-400f-8309-278e4da70169","type":"Grid"},{"attributes":{"plot":{"id":"b8cdb367-9aef-424d-8476-8efa53a71ffe","subtype":"Figure","type":"Plot"}},"id":"82670171-10b2-4691-8cf3-f96589d00ce1","type":"PanTool"}],"root_ids":["b8cdb367-9aef-424d-8476-8efa53a71ffe"]},"title":"Bokeh Application","version":"0.12.4"}};
                var render_items = [{"docid":"0e9232fc-649e-46c0-a9b8-033771934be1","elementid":"e1e6ecb3-02da-4e80-a55f-c0a1f4638706","modelid":"b8cdb367-9aef-424d-8476-8efa53a71ffe"}];
                
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
