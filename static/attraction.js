const btn1= document.getElementById("btn1");
const btn2= document.getElementById("btn2");
btn1.addEventListener('click', function onClick(event) {
    btn1.style.backgroundColor = '#448899';
    btn2.style.backgroundColor = '#FFFFFF';
    const text7= document.getElementById('text7');
    text7.textContent="新台幣 2000 元";
   
});
btn2.addEventListener('click', function onClick1(event) {
    btn2.style.backgroundColor = '#448899';
    btn1.style.backgroundColor = '#FFFFFF';
    const text7= document.getElementById('text7');
    text7.textContent="新台幣 2500 元";
    

});


console.log(window.location)
fetch("/api" +window.location.pathname ,{
})
.then(function(response){
    
    return response.json();

}).then(function(result){
    const showans=result["data"][0];
    //console.log(result)
    //console.log(showans)
    var img=document.querySelector('.photo');
    let name= document.querySelector('.name');
    let place= document.querySelector('.place');
    let description= document.querySelector('.info');
    let address= document.querySelector('.address');
    let transport= document.querySelector('.transport');
    let eletext= document.createElement('div');
    name.textContent=showans['name'];
    name.appendChild(eletext);
    description.textContent=showans['description'];
    description.appendChild(eletext);
    address.textContent=showans['address'];
    address.appendChild(eletext);
    transport.textContent=showans['transport'];
    transport.appendChild(eletext);
    img.src=showans['images'][0];
    place.textContent= showans['category']+' '+"at"+' '+showans['mrt'];
    place.appendChild(eletext);
    console.log(showans['images'])
    let imgArr= showans['images'];
    for (let index in imgArr) {
        let doteEle= document.getElementsByClassName("dote")[0];
        doteEle.innerHTML += `<span οnclick="lun(${index})"></span>`;
    }
    let j;
    lun= function(i){
        let spEle= document.getElementsByClassName("dote")[0].children;
        if(i== "next") {
            for (let index in imgArr) {
                if (spEle[imgArr.length - 1].style.backgroundColor == "white") {
                    i=0;
                }
                else if (spEle[index].style.backgroundColor == "white") {
                    i= index - 0 + 1;
                }
            }      

        }
        if (i == "previous") {
            for (let index in imgArr) {
                if (spEle[0].style.backgroundColor == "white") {
                    i= imgArr.length -1;
                }
                else if (spEle[index].style.backgroundColor == "white") {
                    i= index - 1;
                }
            }
        }
        for (let index in imgArr) {
            spEle[index].style.backgroundColor= "rgba(255, 255, 255, 0.5)";
        }
        clearInterval(j);
        document.getElementsByClassName("photo")[0].src= `${imgArr[i]}`;
        spEle[i].style.backgroundColor= "white";
        
    }
    lun(0);

});
document.addEventListener("DOMContentLoaded", event =>{
    console.log("yes_check")
    event.preventDefault();
    fetch("/api/user/auth",{
        method:'GET',
    }).then(res=>res.json())
    .catch(error=>{
        console.error('error',error)
    })
    .then(response =>{
        console.log(response)
        check_response=JSON.stringify(response)
        if(check_response == JSON.stringify({"data": "null"})){
            document.getElementById('item2').style.display='block';
            document.getElementsByName('enter_email')[0].value="";
            document.getElementsByName('enter_pwd')[0].value="";
            document.getElementById('item3').style.display='none';
        }
        else{
            document.getElementById('item2').style.display='none';
            document.getElementById('item3').style.display='block';
        }

    })
})



var signin_back= document.getElementById('signin_back');
var background= document.getElementById('background');
var item2= document.getElementById('item2');
item2.addEventListener('click', function(){
    signin_back.style.display ='block';
    background.style.display = 'block';
    return false;
})

var signintext1= document.getElementById('signintext1');
var singup_back= document.getElementById('signup_back');
signintext1.addEventListener('click', function(){
    signin_back.style.display= 'none';
    singup_back.style.display= 'block';
    return false;
})
var closeBtn= document.getElementById('closeBtn');
closeBtn.addEventListener('click',function(){
    signin_back.style.display='none';
    background.style.display= 'none';
    return false;
})
var signuptext1= document.getElementById('signuptext1');
signuptext1.addEventListener('click', function(){
    signin_back.style.display= 'block';
    singup_back.style.display= 'none';
    return false;
})
var closeBtn1= document.getElementById('closeBtn1');
closeBtn1.addEventListener('click',function(){
    singup_back.style.display= 'none';
    background.style.display= 'none';
    return false;
})

const form= document.querySelector('.form');
form.addEventListener('submit', event=>{
    event.preventDefault();
    const formData= new FormData(form);
    const data= Object.fromEntries(formData);
    
    fetch("/api/user", {
        method: 'POST',
        headers:{
            'Content-Type':'application/json'
        },
        body: JSON.stringify(data)
    }).then(res => res.json())
    .catch(error=>{
        console.error('error',error)
        document.getElementById('signup_error').textContent="SERVER ERROR"
        document.getElementById('signup_error').style.display='block'
        document.getElementById('signup').style.height= '345px';
    })
    .then(response=> {
        console.log(response)
        data_response= JSON.stringify(response)
        console.log(data_response)
        console.log(JSON.stringify({"ok":true}))
        if (data_response == JSON.stringify({"ok":true})){
            console.log('ok')
            document.getElementsByName('signup_name')[0].value="";
            document.getElementsByName('signup_email')[0].value="";
            document.getElementsByName('signup_pwd')[0].value="";
            document.getElementById('signup_error').textContent="Registration Success"
            document.getElementById('signup_error').style.color= 'black'
            document.getElementById('signup_error').style.display='block'
            document.getElementById('signup').style.height= '345px';
        }
        else if (data_response == JSON.stringify({"error":true, "message":"Member account already exists"})){
            console.log("error1")
            document.getElementById('signup_error').textContent="Member account already exists"
            document.getElementById('signup_error').style.color= 'red'
            document.getElementById('signup_error').style.display='block'
            document.getElementById('signup').style.height= '345px';
        }
        else if (data_response == JSON.stringify({"error": true, "message":"Please fill up the missing columns"})){
            console.log('error2')
            document.getElementById('signup_error').textContent="Please fill up the missing columns"
            document.getElementById('signup_error').style.color= 'red'
            document.getElementById('signup_error').style.display='block'
            document.getElementById('signup').style.height= '345px';
        }
    })
})
    
const form1= document.querySelector('.form1');
form1.addEventListener('submit', event=>{
    event.preventDefault();
    const formData1= new FormData(form1)
    const data1= Object.fromEntries(formData1)
    
    fetch("/api/user/auth", {
        method:'PUT',
        headers:{
            'Content-Type':'application/json'
        },
        body: JSON.stringify(data1)
    }).then(res=>res.json())
    .catch(error=>{
        console.error('error',error)
    })
    .then(response => {
        console.log(response)
        signin_response=JSON.stringify(response)
        console.log(data1)
        if(signin_response == JSON.stringify({"ok":true})){
            document.getElementById('signin_back').style.display= 'none';
            document.getElementById('background').style.display= 'none';
            document.getElementById('item2').style.display='none'; 
            document.getElementById('item3').style.display='block';
            document.location.history.go(-1);     
        }
        else if (signin_response == JSON.stringify({
            "error":true, "message" : "Incorrect email or password"
        })){
            document.getElementById('signin_error').textContent= "Incorrect email or password"
            document.getElementById('signin_error').style.display='block'
            document.getElementById('signin').style.height= '290px';
        }
        
        
    })
    

});
const logout_btn= document.getElementById('item3')
    logout_btn.addEventListener('click', event=>{
        event.preventDefault();
        fetch("/api/user/auth",{
            method: 'DELETE',
        }).then(res=>res.json())
        .catch(error=>{
            console.error('error',error)
        })
        .then(response => {
            console.log(response)
            logout_response=JSON.stringify(response)
            if (logout_response == JSON.stringify({"ok":true})){
                document.getElementById('item2').style.display='block';
                document.getElementsByName('enter_email')[0].value="";
                document.getElementsByName('enter_pwd')[0].value="";
                document.getElementById('item3').style.display='none';
                document.location.history.go(-1);  
            }

        })
    });
const booking_btn= document.getElementById('item1')
booking_btn.addEventListener('click', event=>{
    event.preventDefault();
    console.log("booking_btn")
    fetch("/api/user/auth",{
        method:'GET',
    }).then(res=>res.json())
    .catch(error=>{
        console.error('error',error)
    })
    .then(response =>{
        console.log(response)
        check_response=JSON.stringify(response)
        if(check_response == JSON.stringify({"data": "null"})){
            document.getElementById('item2').style.display='block';
            document.getElementsByName('enter_email')[0].value="";
            document.getElementsByName('enter_pwd')[0].value="";
            document.getElementById('item3').style.display='none';
            document.getElementById('signin_back').style.display='block';
            document.getElementById('background').style.display= 'block';
        }
        else{
            document.getElementById('item2').style.display='none';
            document.getElementById('item3').style.display='block';
            location.replace("http://18.221.31.109:3000/booking");
        }

    })
});
const start_booking= document.getElementById('btn3')


start_booking.addEventListener('click', event=>{
    event.preventDefault();
    fetch("/api/user/auth",{
        method:'GET',
    }).then(res=>res.json())
    .catch(error=>{
        console.error('error',error)
    })
    .then(response =>{
        console.log(response)
        check_response=JSON.stringify(response)
        if(check_response == JSON.stringify({"data": "null"})){
            document.getElementById('item2').style.display='block';
            document.getElementsByName('enter_email')[0].value="";
            document.getElementsByName('enter_pwd')[0].value="";
            document.getElementById('item3').style.display='none';
            document.getElementById('signin_back').style.display='block';
            document.getElementById('background').style.display= 'block';

        }
        else{
            document.getElementById('item2').style.display='none';
            document.getElementById('item3').style.display='block';
            const attractionId= location.pathname.split("/attraction/")[1];
            console.log(attractionId)
            const date= document.getElementsByName('date')[0].value;
            console.log(date)
            const price= document.getElementById('text7').textContent.split(" ")[1];
            console.log(price)
            if(price == 2000){
                const time= "morning"
                const data={
                    "attractionId": attractionId,
                    "date": date,
                    "time": time,
                    "price": price
                }
                fetch("/api/booking",{
                    method: 'POST',
                    headers:{
                        'Content-Type':'application/json'
                    },
                    body: JSON.stringify(data)
                }).then(res => res.json())
                .catch(error=>{
                    console.error('error',error)
                })
                .then(response=>{
                    console.log(response)
                    logout_response=JSON.stringify(response)
                    if (logout_response == JSON.stringify({"ok":true})){
                        location.replace("http://18.221.31.109:3000/booking")
                    }
                })
            }
            else if(price == 2500){
                const time1= "afternoon"
                const data={
                    "attractionId": attractionId,
                    "date": date,
                    "time": time1,
                    "price": price
                }
                fetch("/api/booking",{
                    method: 'POST',
                    headers:{
                        'Content-Type':'application/json'
                    },
                    body: JSON.stringify(data)
                }).then(res => res.json())
                .catch(error=>{
                    console.error('error',error)
                })
                .then(response=>{
                    console.log(response)
                    logout_response=JSON.stringify(response)
                    if (logout_response == JSON.stringify({"ok":true})){
                        location.replace("http://18.221.31.109:3000/booking")
                    }
                })
            }   
        }

    })
})
