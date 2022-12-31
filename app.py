from flask import *
from flask import Flask, request, json, jsonify, make_response
from flask_mysqldb import MySQL,MySQLdb
import mysql.connector
from mysql.connector import pooling
from datetime import datetime
import jwt
import tappay
import requests

connectionpool= mysql.connector.pooling.MySQLConnectionPool(pool_name="mysqlpool",pool_reset_session=True,host="localhost",password="reneechen1203", user="root", database="website1",)
conn=connectionpool.get_connection()
print(connectionpool.pool_name)
print(connectionpool.pool_size)
#conn=mysql.connector.connect(host="localhost",password="reneechen1203", user="root", database="website",) 
app=Flask(__name__ ,static_url_path='/Users/renee/Desktop/taipei-day-trip/static', )
app.config["JSON_AS_ASCII"]=False
app.config["TEMPLATES_AUTO_RELOAD"]=True
app.config["JSON_SORT_KEYS"]=False
app.config["JWT_SECRET_KEY"]='my_secret_key'
app.secret_key="secret"
app.config['JWT_TOKEN_LOCATION'] = ['cookies']

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
	#print(get)
	if get:
		cur.execute("SELECT*FROM data WHERE id=%s",(attractionId,))
		show=cur.fetchall()
		s1= [s['images'] for s in show]
		#print(s1)
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

@app.route("/api/user", methods=["POST"])
def register():
	print("fetched")
	result=request.get_json()
	name=result['signup_name']
	email=result['signup_email']
	password=result['signup_pwd']
	if name != "" and email != "" and password !="":
		cur= conn.cursor(dictionary=True)
		cur.execute("SELECT*FROM user WHERE email=%s", (email,))
		account= cur.fetchone()
		print(account)
		if account:
			print("error")
			return jsonify({"error":True, "message":"Member account already exists"})
		else:
			print("true")
			cur.execute("INSERT INTO user(name,email,password) VALUE(%s,%s,%s)", (name,email,password))
			conn.commit()
			return jsonify({"ok":True})
	else: 
		return jsonify({"error": True, "message":"Please fill up the missing columns"})
@app.route("/api/user/auth", methods=["GET", "PUT", "DELETE"])
def current():
	if request.method == "GET":
		get_cookie= request.cookies.get("token")
		print("get_cookie" ,get_cookie)
		if get_cookie != None:
			de_token= jwt.decode(
				get_cookie,
				app.config["JWT_SECRET_KEY"],
				algorithms=['HS256'])
			print("de_token",de_token)
			return jsonify({"data": de_token})
		else:
			return jsonify({"data": "null"})
	elif request.method == "PUT":
		signin= request.get_json()
		email= signin['enter_email']
		password= signin['enter_pwd']
		print(email,password)
		cur= conn.cursor(dictionary=True)
		cur.execute("SELECT*FROM user WHERE email=%s AND password=%s",(email, password))
		account=cur.fetchone()
		if account:
			print(account)
			id= account['id']
			name= account['name']
			payload_data={
				"id": id,
				"name": name,
				"email": email,	
			}
			token= jwt.encode(
				payload_data,
				app.config["JWT_SECRET_KEY"])
			print(token)
			res= make_response(jsonify({"ok":True}))
			res.set_cookie("token",token, max_age=604800, path="/",)
			
			return res
		else:
			return jsonify({
				"error":True, "message" : "Incorrect email or password"
			})
	elif request.method == "DELETE":
		theres= make_response(jsonify({"ok":True}))
		theres.set_cookie("token"," ", expires=0)
		return theres
@app.route("/api/booking", methods=["GET","POST","DELETE"])
def application():
	if request.method == "POST":
		get_cookie= request.cookies.get("token")
		print("get_cookie" ,get_cookie)
		if get_cookie != None:
			info=request.get_json()
			print(info)
			attractionId= info['attractionId']
			date= info['date']
			time= info['time']
			price= info['price']
			if attractionId != " " and date != " " and time != "null" and price != " ": 
				payload_booking={
					"attractionId":attractionId,
					"date":date,
					"time":time,
					"price":price,
				}
				booking_token= jwt.encode(
					payload_booking,
					app.config["JWT_SECRET_KEY"])
				print(booking_token)
				res= make_response(jsonify({"ok": True}))
				res.set_cookie("booking_token", booking_token, max_age=604800, path="/",)
				return res
			elif attractionId == ' ' or date == ' ' or time == "null" or price == ' ':
				return jsonify({"error": True, "message": "ERROR INPUT DETAIL"})
		elif get_cookie == None:
			return jsonify({"error":True, "message":"NOT LOGIN ERROR"})
		else:
			return jsonify({"error":True, "message":"SERVER ERROR"}),500

	elif request.method == "GET":
		get_cookie= request.cookies.get("booking_token")
		print("get_cookie" ,get_cookie)
		if get_cookie != None:
			de_token= jwt.decode(
				get_cookie,
				app.config["JWT_SECRET_KEY"],
				algorithms=['HS256'])
			print("de_token",de_token)
			Id=de_token['attractionId']
			booking_date=de_token['date']
			booking_time=de_token['time']
			booking_price=de_token['price']
			if booking_date != '' and booking_time != '' and booking_price != '':
				cur= conn.cursor(dictionary=True)
				cur.execute("SELECT*FROM data WHERE id=%s",(Id,))
				attraction_data=cur.fetchall()
				s1= [s['images'] for s in attraction_data]
				x=0
				i=0
				for x in range (len(s1)):
					json_s1=json.loads(s1[x])
					attraction_data[x]['images']= json_s1
					x=x+1
					#print("attraction_data:" ,attraction_data)
					id= attraction_data[0]['id']
					name= attraction_data[0]['name']
					address= attraction_data[0]['address']
					image= attraction_data[0]['images'][0]
					attraction_info={
						"id":id,
						"name":name,
						"address":address,
						"image":image,
					}
					token_data={
						"date": booking_date,
						"time": booking_time,
						"price": int(booking_price),
					}
					#print(attraction_info)
					#print(token_data)
					return jsonify({"data":{"attraction": attraction_info,"date": booking_date,
						"time": booking_time,
						"price": int(booking_price),}})
			else:
				return jsonify({"error": True, "message": "ERROR INPUT DETAIL"})
		else:
			return jsonify({"data": "null"})
	elif request.method == "DELETE":
		get_cookie= request.cookies.get("booking_token")
		print("get_cookie" ,get_cookie)
		if get_cookie != None:
			theres= make_response(jsonify({"ok":True}))
			theres.set_cookie("booking_token"," ", expires=0)
			return theres
		elif get_cookie == None:
			return jsonify({"error": True, "message": "USER NOT LOGIN ERROR"})
@app.route("/api/order", methods=["POST"])
def reservation():
	appointment= request.get_json()
	contact=appointment['order']['contact']
	prime=appointment['prime']
	phone=contact['phone']
	name=contact['contact_name']
	email=contact['contact_email']
	price=appointment['order']['price']
	now= datetime.now()
	payURL = "https://sandbox.tappaysdk.com/tpc/payment/pay-by-prime"
	payByPrime = {
		"prime": prime,
		"partner_key":
		"partner_Gx47ZHkGIgqjYt3LF7tIjXFAdMKUW2p6xDs5GDPCStlBLCS7u6Bz4Cc1",
		"merchant_id":
		"reneechen1203_CTBC",
		"order_number":now,
		"detail":"TapPay Test",
		"amount":price,
		"cardholder":contact,
		"remember":True
	}
	result= requests.post(payURL,headers={
		"Content-Type":"application/json",
		"x-api-key":"partner_Gx47ZHkGIgqjYt3LF7tIjXFAdMKUW2p6xDs5GDPCStlBLCS7u6Bz4Cc1"	
	},data=json.dumps(payByPrime))
	
	return jsonify({"ok":True})
@app.route("/api/order/<int:OrderNumber>", methods=["GET"])
def order_info():
	return

		


		
		





	





app.run(port=3000, host="0.0.0.0")