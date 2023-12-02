from flask import Flask, render_template, request, redirect, url_for


UPLOAD_FOLDER = '/savedfiles'


app = Flask(__name__)
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER



@app.route('/')
def fileSave():
	return render_template("index.html")

@app.route('/get')

def fileGet():
	return render_template("get.html")

@app.route('/file_save.php', methods=['post'])
def php():
	return render_template("file_save.php")
