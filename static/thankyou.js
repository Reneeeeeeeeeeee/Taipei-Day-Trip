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
});
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
const firstpage= document.getElementById('left');
firstpage.addEventListener('click', event=>{
    event.preventDefault();
    location.replace("http://18.221.31.109:3000/")
})

let params= new URLSearchParams(document.location.search);
let number= params.get("number")
const orderno= document.getElementById('orderno').textContent="Order No. :"+ number;

