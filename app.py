from flask import Flask, render_template, request, redirect, url_for

app = Flask(__name__)


@app.route('/')
def main():
  return redirect('/index')

@app.route('/index')
def index():
  return render_template('index_cover.html')

@app.route('/morning_map')
def morning_map():
	return render_template('morning_10_map.html')


if __name__ == '__main__':
  app.run(debug=True, host='0.0.0.0')
  #app.run(port=33507)
