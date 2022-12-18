from flask import Flask, render_template
import os

# just a basic Flask server so that it runs in the browser
app = Flask(__name__)
PORT = int(os.environ.get("PORT", 5000))

@app.route("/")
def home():
    return render_template("index.html");

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=PORT)