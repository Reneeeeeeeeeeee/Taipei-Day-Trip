from flask import *
from flask import Flask, request, json, jsonify
from flask_mysqldb import MySQL,MySQLdb
import mysql.connector
import keyring 
pw= keyring.get_password("mysql","root")
conn=mysql.connector.connect(host="localhost",password=pw, user="root", database="website",) 
app=Flask(__name__)
app.config["JSON_AS_ASCII"]=False
app.config["TEMPLATES_AUTO_RELOAD"]=True
app.config["JSON_SORT_KEYS"]=False

# Pages
@app.route("/")
def index():
	return render_template("index.html")
@app.route("/attraction/<id>")
def attraction(id):
	return render_template("attraction.html")
@app.route("/booking")
def booking():
	return render_template("booking.html")
@app.route("/thankyou")
def thankyou():
	return render_template("thankyou.html")
@app.route("/api/attractions", methods=["GET"])
def attractions():
	keyword=request.args.get('keyword', None)
	if keyword == None:
		cur=conn.cursor(dictionary=True)
		per_page=12 
		page=request.args.get(get_page_parameter(),type=int, default=0)
		offset= page*per_page
		next_page=page+1
		cur.execute("SELECT * FROM data")
		total=cur.fetchall()
		cur.execute("SELECT*FROM data LIMIT %s OFFSET %s", (per_page, offset,))
		data=cur.fetchall()
		return jsonify({"nextPage":next_page, "data":data})
	elif keyword != None:
		cur=conn.cursor(dictionary=True)
		per_page=12 
		page=request.args.get(get_page_parameter(),type=int, default=0)
		offset= page*per_page
		next_page=page+1
		sql="SELECT *FROM data WHERE category=%s OR LOCATE(%s, name)>0 LIMIT %s  OFFSET %s"
		val=(keyword,keyword,per_page,offset,)
		cur.execute(sql, val)
		row=cur.fetchall()
		cur.close()
		return jsonify({"nextPage":next_page, "data":row})
	else:
		return jsonify({"error": True, "message":"Sever encountered an unexpected condition" })

@app.route("/api/attraction/<int:attractionId>", methods=["GET"])
def attractid(attractionId):
	cur=conn.cursor(dictionary=True)
	cur.execute("SELECT*FROM data WHERE id=%s",(attractionId,))
	get=cur.fetchone()
	print(get)
	if get:
		cur.execute("SELECT*FROM data WHERE id=%s",(attractionId,))
		show=cur.fetchall()
		return jsonify({"data":show})
	elif get == None:
		return jsonify({"error":True, "message":"Id Not Found"})
	else:
		return jsonify({"error":True, "message": "Sever Error"})

@app.route("/api/categories", methods=["GET"])
def categories():
	cur=conn.cursor()
	cur.execute("SELECT category FROM data GROUP BY category")
	cat=cur.fetchall()
	if cat:
		return jsonify({"data": cat})
	else:
		return jsonify({"error":True, "message":"Sever Error"})

app.run(port=3000, host="0.0.0.0")