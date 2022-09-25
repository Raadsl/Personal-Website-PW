from flask import Flask, render_template, request
import os
print('tryna run')
app = Flask('app')


# ======================= MAIN PAGES =======================

@app.route('/')
def index():
  return render_template("index.html")

@app.route('/about')
def about():
  return render_template("about.html")

@app.route('/projects')
def projects():
  return render_template("projects.html")

@app.route('/whatsthis')
def whatsthis():
  return render_template("what_is_this.html")


  
# ======================= CONTACT =======================
  
@app.route('/contact')
def contact():
  return render_template(
        '/contact/contact.html',
        user_id=request.headers['X-Replit-User-Id'],
        user_name=request.headers['X-Replit-User-Name']
    )

@app.route('/contact/succes')
def succes():
  return render_template(
        '/contact/succes.html',
        user_id=request.headers['X-Replit-User-Id'],
        user_name=request.headers['X-Replit-User-Name']
    )

@app.route('/contact/fail')
def fail():
  return render_template("/contact/failed.html")

# ======================= SCHOOL =======================
  
@app.route('/school/')
def schoolmain():
  return render_template("/school/schoolindex.html")

@app.route('/school/calc')
def calc():
  return render_template("/school/calculator.html")

@app.route('/school/chat')
def schoolchat():
  return render_template("/school/chat.html")

  
# ======================= ERRORS =======================
  
@app.errorhandler(404)
def page_not_found(e):
    return render_template('/errors/404.html'), 404

@app.errorhandler(500)
def internal_error(e):
    return render_template('/errors/500.html'), 500

@app.errorhandler(418)
def teacupcoffee(e):
    return render_template('/errors/418.html'), 418

@app.route('/418')
def foureighteen():
  return render_template("/errors/418.html")


# ======================= RUN/START =======================

if __name__ == "__main__":
    print('Goog. Server is online!')
    from waitress import serve
    serve(app, host="0.0.0.0", port=8080)

#app.run(host='0.0.0.0', port=8080) <-- old development flask thing
