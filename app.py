from flask import Flask, render_template, request, redirect, url_for
import numpy as np
import pickle

from bokeh.charts import Histogram, Bar
from bokeh.embed import components
from bokeh.plotting import figure

from bokeh.resources import INLINE
from bokeh.util.string import encode_utf8
from bokeh.models.widgets import CheckboxButtonGroup, RadioButtonGroup, Select
from bokeh.models import CustomJS, Legend, ColumnDataSource, HoverTool, Range1d
from bokeh.models.widgets.layouts import HBox




app = Flask(__name__)



def histogram_figure_all():
	df = pickle.load(open("static/bike_may2016.p", "r"))
	TOOLS = 'box_zoom,crosshair,resize,reset'
	hist = Histogram(df[df['Ride dist'] < 6], values='Ride dist', #color='End dist', 
						toolbar_location='above', responsive=True, 
						bins = 40, density=True, legend='top_right', tools=TOOLS, plot_width=1000, plot_height=400)
	script, div  = components(hist)
	return script, div


def histogram_figure():
	df = pickle.load(open("static/bike_may2016.p", "r"))
	TOOLS = 'box_zoom,crosshair,resize,reset'
	temp = df[df['Ride dist'] < 6]
	hist = Histogram(temp[(temp['Hour'] >= 6) & (temp['Hour'] <= 9)], values='Ride dist', color='End dist', 
						toolbar_location='above', responsive=True, 
						bins = 40, density=True, legend='top_right', tools=TOOLS, plot_width=1000, plot_height=400)
	script, div  = components(hist)
	return script, div




@app.route('/')
def main():
  return redirect('/index')

@app.route('/index')
def index():
  script1, div1 = histogram_figure_all()
  script2, div2 = histogram_figure()
  return render_template('index_cover.html', plot_script1=script1, plot_div1=div1, 
  						plot_script2=script2, plot_div2=div2)

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
           data['x'] = data[cb_obj.get('value')];
           source.trigger('change');"""

	callbackx = CustomJS(args=dict(source=source), code=codex)

	fig = figure( width=800 , height=400 )

	fig.line(x="x", y="y", line_width=4, line_color="#F46D43", line_alpha=0.6, source=source)

	DEFAULT_X = ['Distance', 'Duration']

	xaxis_select = Select(title="Y axis:", value="Distance",
                         options=DEFAULT_X, callback=callbackx)

	
	
	#line_dist = fig.line( x='Hour' , y='Ride dist' , source=source , line_width=1  , line_dash='solid' , legend='Ride dist' , line_alpha=0.8 )
	#line_dura = fig.line( x='Hour' , y='Duration (ms)' , source=source , line_width=1 , line_dash='solid' , legend='Ride duration' , line_alpha=0.8 )
	
	#fig.legend.location = 'top_left'


	layout = HBox(xaxis_select, fig, width=800)

	script, div = components( layout )

	return render_template( 'interact.html' , #plot_label=app.ticker_symbol ,
    	js_resources=INLINE.render_js() ,
    	css_resources=INLINE.render_css() ,
    	plot_script=script ,
    	plot_div=div )
    	#checkbox_div=div['checkbox_div'] )
    	#radiobox_div=div['radiobox_div'] )


if __name__ == '__main__':
  app.run(debug=True, host='0.0.0.0')
  #app.run(port=33507)
