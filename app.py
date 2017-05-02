from flask import Flask, render_template, request, redirect, url_for
import numpy as np
import pickle
import heapq
import folium
from geopy.distance import vincenty
from geopy.geocoders import Nominatim, GoogleV3

from bokeh.charts import Histogram, Bar
from bokeh.embed import components
from bokeh.plotting import figure

from bokeh.resources import INLINE
from bokeh.util.string import encode_utf8
from bokeh.models.widgets import CheckboxButtonGroup, RadioButtonGroup, Select, Slider
from bokeh.models import CustomJS, Legend, ColumnDataSource, HoverTool, Range1d, Toggle, BoxAnnotation
from bokeh.models.layouts import HBox

from sklearn import base
from sklearn.pipeline import Pipeline
from sklearn import preprocessing
from sklearn.ensemble import RandomForestRegressor
from sklearn.model_selection import ShuffleSplit, GridSearchCV
from sklearn.externals import joblib

#from LatLongTransformer import LatLongTransformer


############### transformer class for random forest regression estimator pipeline

metro_loc = pickle.load(open('static/metro_loc_flat.p', 'r'))
census_dict = pickle.load(open('static/census_data.p', 'r'))
bike_loc = pickle.load(open("static/bike_location.p", "rb"))


class LatLongTransformer(base.BaseEstimator, base.TransformerMixin):
    
    def __init__(self, metro_loc_flat = metro_loc, census = census_dict, bike_loc = bike_loc):
        self.metro_loc_flat = metro_loc_flat
        self.bike_loc = bike_loc
        self.census = census
        self.census_props = census_props
        
    def n_closest_metro_distance(self, x, n):
        """this will return the distance to the n closest metro stations"""
        h = []
        for k2, v2 in self.metro_loc_flat.items():
            heapq.heappush(h, vincenty((x[0], x[1]), v2).miles)
        return sorted(heapq.nsmallest(n, h))[:n]

    def n_closest_bike_distance(self, x, n):
        """this will return the distance to the n closest bike stations"""
        h = []
        for k2, v2 in self.bike_loc.items():
            temp = vincenty((x[0], x[1]), v2).miles 
            if temp > 0:
                heapq.heappush(h, temp)
        return sorted(heapq.nsmallest(n, h))[:n]
    
    def bike_density(self, x, radius):
        """Determine the number of bike stands within the given radius of the given point(x)"""
        density = 0
        for v in self.bike_loc.values():
            if vincenty((x[0], x[1]), v).miles <= radius:
                density += 1
        return density

    def closest_census_tract(self, lat, lon, prop = ['pop_dens', 'h_dens']): 
        """this will return the prop value for the closest census tract
        this function will need to be updated to make it more general for property names"""
        h = []
        for k,v in self.census.items():
            temp_props = [v[ii] for ii in self.census_props]
            dist = vincenty((lat, lon),(v['lat'], v['lon'])).miles
            heapq.heappush(h, (dist, temp_props))
        return heapq.nsmallest(1,h)[0][1]
        #return [heapq.nsmallest(1,h)[0][1], heapq.nsmallest(1,h)[0][2]]
        
    def fit(self, X, y=None):
        return self
    
    def transform(self, X):
        """This needs a list of tuples even if only one location is being transformed
        e.g. X = [(latitude, longitude)]"""
        features_all = []
        
        for ii in X:
            features = []
            features.extend(self.n_closest_metro_distance(ii, 2)) # metro 2 (list)
            features.append(self.bike_density(x = ii, radius = 0.75)) # number of bike stands within radius (int)
            features.extend(self.n_closest_bike_distance(ii, 10)) # n nearest bike stands (list)
            features.extend(self.closest_census_tract(ii[0], ii[1])) # features from closest census tract (list)
            features_all.append(features)
        
        return features_all


########################## now create app






app = Flask(__name__)

app.vars = {}



def histogram_figure_all():
	df = pickle.load(open("static/bike_may2016.p", "r"))
	TOOLS = 'box_zoom,crosshair,resize,reset'
	df.rename(columns={'Ride dist':'Ride diststance (miles)'}, inplace=True)
	hist = Histogram(df[df['Ride diststance (miles)'] < 6], values='Ride diststance (miles)', #color='End dist', 
						toolbar_location='above', responsive=True,
						bins = 40, density=True, legend='top_right', tools=TOOLS, plot_width=1000, plot_height=400)
	script, div  = components(hist)
	return script, div


def histogram_figure():
	df = pickle.load(open("static/bike_may2016.p", "r"))
	TOOLS = 'box_zoom,crosshair,resize,reset'
	temp = df[df['Ride dist'] < 6]
	temp.rename(columns={'Ride dist':'Ride diststance (miles)'}, inplace=True)
	hist = Histogram(temp[(temp['Hour'] >= 6) & (temp['Hour'] <= 9)], values='Ride diststance (miles)', color='End dist', 
						toolbar_location='above', responsive=True,
						bins = 40, density=True, legend='top_right', tools=TOOLS, plot_width=1000, plot_height=400)
	script, div  = components(hist)
	return script, div


##########################

#randomforestpipe = joblib.load( 'static/rfr_pipe_new.joblib.pkl' )
randomforestpipe =  pickle.load(open("static/RandomForestPipe_20170430.p", "r"))

##########################


@app.route('/')
def main():
  return redirect('/index')

@app.route('/index')
def index():
  #script1, div1 = histogram_figure_all()
  #script2, div2 = histogram_figure()
  #return render_template('index_cover.html', plot_script1=script1, plot_div1=div1, 
  #						plot_script2=script2, plot_div2=div2)
  return render_template('index_cover.html')

@app.route('/info')
def info():
  #script1, div1 = histogram_figure_all()
  #script2, div2 = histogram_figure()
  #return render_template('jumbotron.html', plot_script1=script1, plot_div1=div1, 
  						#plot_script2=script2, plot_div2=div2)
  return render_template('jumbotron.html')

@app.route('/predict_prompt')
def predict_prompt():
	return render_template('predict_input.html')

@app.route('/predict_result', methods=['POST'])
def predict_result():
	app.vars['address'] = request.form['address']
	app.vars['format'] = request.form['input_format']
	app.vars['map_wanted'] = request.form['map_wanted']
	if app.vars['format'] == 'Address':
		geolocator = GoogleV3()
		location = geolocator.geocode(app.vars['address'])
		lat, lon, address = location.latitude, location.longitude, location.address

	if app.vars['format'] == 'LatLong':
		lat, lon = [float(x.strip()) for x in app.vars['address'].split(',')]
		geolocator = GoogleV3()
		location = geolocator.geocode(app.vars['address'])
		address = location.address
	
	prediction = int(randomforestpipe.predict([[lat, lon]]))

	if app.vars['map_wanted'] == 'yes':
		map_object = folium.Map(location=[lat, lon], zoom_start=14, tiles="Stamen toner")
		folium.Marker((lat, lon), popup= (address + 'test'), icon=folium.Icon(color='green')).add_to(map_object)
		for k, v in bike_loc.items():
			folium.Marker(v, popup= k, icon=folium.Icon(color='blue')).add_to(map_object)
		folium.Map.save(map_object, "templates/test_map_output.html")


	return render_template('predict_output.html', address = address, prediction = prediction, 
		lat = lat, lon = lon)

@app.route('/morning_map')
def morning_map():
	return render_template('morning_10_map.html')

@app.route('/heatmap')
def heatmap():
	return render_template('heatmap1_endstation.html')

@app.route('/evening_map')
def evening_map():
	return render_template('evening_10_map.html')

@app.route('/near_map')
def near_map():
	return render_template('metro_nearbikes_map.html')

@app.route('/all_map')
def all_map():
	return render_template('all_stations_map.html')

@app.route('/test_map_output')
def test_map_output():
	return render_template('test_map_output.html')


# Interactive figure
@app.route('/interact')
def interacting():

	df = pickle.load(open("static/interact_df1.p", "r"))
	temp = df.reset_index()

	hours = temp["Hour"]
	distance = temp['Ride dist']
	duration = temp['Duration (ms)']

	source = ColumnDataSource(
    data=dict(x=hours, y=distance, distance=distance, duration=duration))

	codex = """
           var data = source.get('data');
           data['y'] = data[cb_obj.get('value')];
           source.trigger('change');
           """

	callbackx = CustomJS(args=dict(source=source), code=codex)

	fig = figure( width=800 , height=400 )

	fig.line(x="x", y="y", line_width=4, line_color="#F46D43", line_alpha=0.6, source=source)

	DEFAULT_X = ['distance', 'duration']

	xaxis_select = Select(title="Y axis:", value="distance",
                         options=DEFAULT_X, callback=callbackx)



	layout = HBox(xaxis_select, fig, width=800)

	script, div = components( layout )

	return render_template( 'interact.html' ,
    	js_resources=INLINE.render_js() ,
    	css_resources=INLINE.render_css() ,
    	plot_script=script ,
    	plot_div=div )


@app.route('/interact2')
def interacting2():
	df = pickle.load(open("static/interact_df1.p", "r"))
	temp = df.reset_index()

	hours = temp["Hour"]
	distance = temp['Ride dist']
	duration = temp['Duration (ms)']

	source = ColumnDataSource(
    data=dict(x=hours, y=distance, distance=distance, duration=duration))

	codex = """
           var data = source.get('data');
           data['y'] = data[cb_obj.get('value')];
           source.trigger('change');
           """

	callbackx = CustomJS(args=dict(source=source), code=codex)

	fig = figure( width=800 , height=400 )

	fig.vbar(x='x', width=0.5, bottom=0, top='y', line_width=4, line_color="#F46D43", line_alpha=0.8, source=source)

	DEFAULT_X = ['distance', 'duration']

	xaxis_select = Select(title="Y axis:", value="distance",
                         options=DEFAULT_X, callback=callbackx)


	layout = HBox(xaxis_select, fig, width=800)

	script, div = components( layout )

	return render_template( 'interact.html' ,
    	js_resources=INLINE.render_js() ,
    	css_resources=INLINE.render_css() ,
    	plot_script=script ,
    	plot_div=div )

@app.route('/interact3')
def interact3():
	df = pickle.load(open("static/interact_df1.p", "r"))
	temp = df.reset_index()

	hours = temp["Hour"]
	distance = temp['Ride dist']
	duration = temp['Duration (ms)']

	source = ColumnDataSource(
    data=dict(x=hours, y=distance, distance=distance, duration=duration))
	
	callback = CustomJS(args=dict(source=source), code="""
        var data = source.data;
        var f = cb_obj.value
        x = data['x']
        y = data['y']
        for (i = 0; i < x.length; i++) {
            y[i] = Math.pow(y[i], f)
        }
        source.trigger('change');
    	""")

	slider = Slider(start=0.1, end=4, value=1, step=.1, title="power", callback=callback)


	fig = figure( width=800 , height=400 )

	fig.vbar(x='x', width=0.5, bottom=0, top='y', line_width=4, line_color="#F46D43", line_alpha=0.8, source=source)

	DEFAULT_X = ['distance', 'duration']

	layout = HBox(slider, fig, width=800)

	script, div = components( layout )

	return render_template( 'interact.html' ,
    	js_resources=INLINE.render_js() ,
    	css_resources=INLINE.render_css() ,
    	plot_script=script ,
    	plot_div=div )

if __name__ == '__main__':
  app.run(debug=True, host='0.0.0.0')
  #app.run(port=33507)
