from flask import *
from flask import Flask, request, json, jsonify
from flask_mysqldb import MySQL,MySQLdb
import mysql.connector
conn=mysql.connector.connect(host="localhost",password="reneechen1203", user="root", database="website",) 
app=Flask(__name__ ,static_url_path='/Users/renee/Desktop/taipei-day-trip/static', )
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
		
		per_page=12 
		page=request.args.get('page',type=int, default=0)
		offset= page*per_page
		next_page=page+1
		#cur.execute("SELECT * FROM data")
		#total=cur.fetchall()
		cur=conn.cursor(dictionary=True)
		cur.execute("SELECT*FROM data LIMIT %s OFFSET %s", (per_page, offset,))
		data=cur.fetchall()
		cur.close()
		t1= [t['images'] for t in data]
		x=0
		i=0
		for x in range (len(t1)):
			json_image=json.loads(t1[x])
			data[x]['images']= json_image
			x=x+1
		return jsonify({"nextPage":next_page, "data":data})
	elif keyword != None:
		per_page=12
		page=request.args.get('page',type=int, default=0)
		offset= page*per_page
		next_page=page+1
		sql="SELECT *FROM data WHERE category=%s OR LOCATE(%s, name)>0 LIMIT %s  OFFSET %s"
		val=(keyword,keyword,per_page,offset,)
		cur=conn.cursor(dictionary=True)
		cur.execute(sql, val)
		row=cur.fetchall()
		cur.close()
		if row:
			num=[n['id'] for n in row]
			r1= [r['images'] for r in row]
			x=0
			i=0
			for x in range (len(r1)):
				json_r1=json.loads(r1[x])
				row[x]['images']=json_r1
				x=x+1
			if (len(num)< per_page):
				return jsonify({"nextPage": "null", "data":row})
			else:
				return jsonify({"nextPage":next_page, "data":row})
		else:
			return jsonify({"error": True, "message":"Sever encountered an unexpected condition" })
		

@app.route("/api/attraction/<int:attractionId>", methods=["GET"])
def attractid(attractionId):
	cur=conn.cursor(dictionary=True)
	cur.execute("SELECT*FROM data WHERE id=%s",(attractionId,))
	get=cur.fetchone()
	cur.close()
	print(get)
	if get:
		cur.execute("SELECT*FROM data WHERE id=%s",(attractionId,))
		show=cur.fetchall()
		s1= [s['images'] for s in show]
		x=0
		i=0
		for x in range (len(s1)):
			json_s1=json.loads(s1[x])
			show[x]['images']= json_s1
			x=x+1
		return ({"data":show})
	elif get == None:
		return jsonify({"error":True, "message":"Id Not Found"})
	else:
		return jsonify({"error":True, "message": "Sever Error"})

@app.route("/api/categories", methods=["GET"])
def categories():
	cur=conn.cursor()
	cur.execute("SELECT category FROM data GROUP BY category")
	cat=cur.fetchall()
	
	cats=[x for xs in cat for x in xs]
	if cat:
		return jsonify({"data": cats})
	else:
		return jsonify({"error":True, "message":"Sever Error"})

app.run(port=3000, host="0.0.0.0")