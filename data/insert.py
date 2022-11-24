import json 
import re
from flask import Flask
from flask_mysqldb import MySQL,MySQLdb
import mysql.connector
import keyring 
pw= keyring.get_password("mysql","root")
conn=mysql.connector.connect(host="localhost",password=pw, user="root", database="website",) 
with open('/Users/renee/Desktop/taipei-day-trip/data/taipei-attractions.json','r')as f:
    data=json.load(f)
content=data['result']['results']
urls=[entry['file'] for entry in content]
name=[material['name'] for material in content]
i=0
while i < len(urls):
    s=urls[i]
    result=re.split(r'(?=https)',s)
    result.pop(0)
    #image= result.filter( )
    #images=list(filter(lambda x:x.endswith('.jpg''.JPG'),result))
    
    #for extension in [".jpg", ".JPG"]:
        #images=[a for a in result if a.endswith(extension)]
    ans= [a for a in result if a.endswith(('jpg', 'JPG', 'PNG', 'png'))]
    json_string=json.dumps(ans)
    print("images:",json_string)
    n=name[i]
    print(n)
    #cur=conn.cursor()
    #cur.execute("UPDATE data SET images= %s WHERE name= %s",(json_string, n))
    #conn.commit()
            #images.append(a)
            #json_string=json.dumps(images)
            #cur=conn.cursor()
            #cur.execute("UPDATE data SET images= %s",(json_string))
            #val=(images)
            #cur.execute(sql,val)
        #print(images)
    i=i+1


#cur.execute("SELECT*FROM data")
#show= cur.fetchall()
#for row in show:
    #print(row)
    #print("\n")
#cur.execute("ALTER TABLE data MODIFY COLUMN transport VARCHAR(2083)")
#cur.execute("CREATE TABLE data (id INT PRIMARY KEY AUTO_INCREMENT, name VARCHAR(255) NOT NULL, category VARCHAR(255) NOT NULL, description VARCHAR(2083), address VARCHAR(255) NOT NULL, transport VARCHAR(2083), mrt VARCHAR(255), lat INT NOT NULL, lng INT NOT NULL, images VARCHAR(2083))")
#for material in content:
   # print("lng:",material['longitude'])
    #cur=conn.cursor()
    #cur.execute("UPDATE data SET lng= %s WHERE name=%s", (material['longitude'], material['name']))
    #cur.execute("INSERT INTO data (name, category, description, address, transport, mrt, lat, lng) VALUES (%s,%s,%s,%s,%s,%s,%s,%s)", (material['name'], material['CAT'], material['description'], material['address'], material['direction'], material['MRT'], material['latitude'], material['longitude']))
    #conn.commit()
