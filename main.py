from flask import Flask, render_template, jsonify, request,  redirect #flask
import os #envirin and more
import string #random strings
import json #handle json
import random, time, requests #random thing + time
from os import environ
# limit url shorten usage:
from flask_limiter import Limiter
from flask_limiter.util import get_remote_address

print('tryna run')

app = Flask('app')
app.config['JSON_SORT_KEYS'] = False
limiter = Limiter(
    app,
    key_func=get_remote_address,
    storage_uri="memory://",
)


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
@limiter.limit("5/second")
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

# ======================= URL SHORTENER =======================

def genID():
  S = int(5)
  ran = ''.join(random.choices("-" + string.hexdigits + "-" + string.hexdigits + "-" + string.hexdigits + "-" + string.hexdigits + "-" + string.hexdigits, k = S))
  id = str(ran)
  return id



def saveIDS(id, url):
    f1 = open(os.getenv('path'), "r")
    preData = f1.read()
    f1.close()

    newData = f'"{id}": "{url}"'
  
    f3 = open(os.getenv('path'), "w")
    f3.write(f"{newData},\n{preData}")
    f3.close()
  
    f4 = open(os.getenv('path'), "r")
    damta = f4.read()
    f4.close()
  
    print(damta)

def getID(id):
    f = open(os.getenv('path'), "r")
    data = '{' + f.read() + '}'
    idsList = json.loads(data)
    print(str(idsList))
    f.close()
    url = f'{idsList[f"{id}"]}'
    return url
  
app.config['JSON_SORT_KEYS'] = False

@app.route('/redirect')
def shortenerhome():
    return render_template("/shortener/redirecthome.html")

@app.route('/r')
def reditest():
  return render_template("/shortener/redirecthome.html")
  

@app.route('/r/dash')
def dashboard():
  return render_template("/shortener/redirectdashboard.html")
  
  
@app.route("/r/<id>")
def urlshortredirect(id):
    return redirect(getID(id))


@app.route("/create")
@limiter.limit("5/second")
def createurl():
    url = str(request.args.get("url"))
    if url != "None" and url != "" and url != " ":
        id = genID()
        print(id)
        saveIDS(id, url)
        data = {
            "created": "true",
            "short_url": f"https://rdsl.ga/r/{id}",
            "short_url_id": id,
            "long_url": f"{url}"
        }
        return jsonify(data)
    else:
        data = {
            "created": "false",
            "short_url": "",
            "short_url_id": "",
            "long_url": ""
        }
        return jsonify(data)
# some code from Ifreaku | replit.com/@shoty
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