from flask import Flask, render_template, request, redirect, url_for
import numpy as np
import pickle

from bokeh.charts import Histogram
from bokeh.embed import components
from bokeh.plotting import figure

app = Flask(__name__)



def histogram_figure_all():
	df = pickle.load(open("static/bike_may2016.p", "r"))
	TOOLS = 'box_zoom,crosshair,resize,reset'
	hist = Histogram(df[df['Ride dist'] < 6], values='Ride dist', #color='End dist', 
						toolbar_location='above', responsive=True, 
						bins = 40, density=True, legend='top_right', tools=TOOLS, plot_width=700, plot_height=400)
	script, div  = components(hist)
	return script, div


def histogram_figure():
	df = pickle.load(open("static/bike_may2016.p", "r"))
	TOOLS = 'box_zoom,crosshair,resize,reset'
	hist = Histogram(df[df['Ride dist'] < 6], values='Ride dist', color='End dist', 
						toolbar_location='above', responsive=True, 
						bins = 40, density=True, legend='top_right', tools=TOOLS, plot_width=700, plot_height=400)
	script, div  = components(hist)
	return script, div



@app.route('/')
def main():
  return redirect('/index')

@app.route('/index')
def index():
  #script1, div1 = histogram_figure_all()
  script2, div2 = histogram_figure()
  return render_template('index_cover.html', #plot_script1=script1, plot_div1=div1, 
  						plot_script2=script2, plot_div2=div2)

@app.route('/morning_map')
def morning_map():
	return render_template('morning_10_map.html')

@app.route('/evening_map')
def evening_map():
	return render_template('evening_10_map.html')

@app.route('/near_map')
def near_map():
	return render_template('metro_nearbikes_map.html')

@app.route('/all_map')
def all_map():
	return render_template('all_stations_map.html')


if __name__ == '__main__':
  app.run(debug=True, host='0.0.0.0')
  #app.run(port=33507)
