from flask import Flask, render_template
app = Flask('app')

@app.route('/')
def index():
  return render_template("index.html")

@app.route('/about')
def about():
  return render_template("about.html")

@app.route('/projects')
def projects():
  return render_template("projects.html")

@app.route('/calc')
def calc():
  return render_template("/school/calculator.html")

@app.route('/whatsthis')
def whatsthis():
  return render_template("what_is_this.html")

if __name__ == "__main__":
    from waitress import serve
    serve(app, host="0.0.0.0", port=8080)
#app.run(host='0.0.0.0', port=8080) <-- old development flask thing
