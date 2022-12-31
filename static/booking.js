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
            location.replace("http://18.221.31.109:3000/")
        }
        else{
            document.getElementById('item2').style.display='none';
            document.getElementById('item3').style.display='block';
            let intro= document.querySelector('.intro');
            let ele= document.createElement('div')
            intro.textContent= "您好，" + response['data']['name'] + "，待預訂的行程如下：";
            intro.appendChild(ele);
            let hello= document.querySelector('.hello');
            hello.textContent= "您好，" + response['data']['name'] + "，待預訂的行程如下：";
            hello.appendChild(ele);
            fetch("/api/booking",{
                method:'GET',
            }).then(res=>res.json())
            .catch(error=>{
                console.error('error',error)
            })
            .then(response =>{
                console.log(response)
                check_response=JSON.stringify(response)
                if(check_response == JSON.stringify({"error": true, "message": "ERROR INPUT DETAIL"})){
                    document.getElementById('first_section').style.display='none';
                    document.getElementById('second_section').style.display='none';
                    document.getElementById('third_section').style.display='none';
                    document.getElementById('fourth_section').style.display='none';
                    document.getElementById('footer').style.display='none';
                    document.getElementById('footer1').style.display='block';
                    document.getElementById('hr').style.display='none';
                    document.getElementById('hr1').style.display='none';
                    document.getElementById('hr2').style.display='none';
                    document.getElementById('no_booking').style.display='block';
                    document.getElementById('body').style.gridTemplateRows='1fr 1fr';
                }
                else if (check_response != JSON.stringify({"data": "null"})){
                    const data= response['data']
                    const attraction= response['data']['attraction']
                    const id= attraction['id']
                    const exact_time= data['time']
                    if (exact_time == "morning") {
                        const appointment= "早上 9 點到下午 4 點"
                        var img= document.querySelector('#booking_photo');
                        let booking_detail= document.querySelector('.booking_detail');
                        let booking_date= document.querySelector('.booking_date');
                        let booking_time= document.querySelector('.booking_time');
                        let booking_fee= document.querySelector('.booking_fee');
                        let booking_address= document.querySelector('.booking_address');
                        let totalcost= document.querySelector('.totalcost');
                        let elediv= document.createElement('div');
                    
                        img.src=String(attraction['image'])
                        booking_detail.textContent= "台北一日遊："+ attraction['name'];
                        booking_detail.appendChild(elediv);
                        booking_date.textContent=data['date'];
                        booking_date.appendChild(elediv);
                        booking_time.textContent=appointment;
                        booking_time.appendChild(elediv);
                        booking_fee.textContent="新台幣"+" "+data['price']+" "+"元";
                        booking_fee.appendChild(elediv);
                        booking_address.textContent=attraction['address'];
                        booking_address.appendChild(elediv);
                        totalcost.textContent="總價：新台幣"+" "+data['price']+" "+"元";
                        totalcost.appendChild(elediv);

                    }
                    else if(exact_time == "afternoon"){
                        const appointment1= "下午 4 點到晚上 11 點"
                        var img= document.querySelector('#booking_photo');
                        let booking_detail= document.querySelector('.booking_detail');
                        let booking_date= document.querySelector('.booking_date');
                        let booking_time= document.querySelector('.booking_time');
                        let booking_fee= document.querySelector('.booking_fee');
                        let booking_address= document.querySelector('.booking_address');
                        let totalcost= document.querySelector('.totalcost');
                        let elediv= document.createElement('div');
                    
                        img.src=String(attraction['image'])
                        booking_detail.textContent= "台北一日遊："+ attraction['name'];
                        booking_detail.appendChild(elediv);
                        booking_date.textContent=data['date'];
                        booking_date.appendChild(elediv);
                        booking_time.textContent=appointment1;
                        booking_time.appendChild(elediv);
                        booking_fee.textContent="新台幣"+" "+data['price']+" "+"元";
                        booking_fee.appendChild(elediv);
                        booking_address.textContent=attraction['address'];
                        booking_address.appendChild(elediv);
                        totalcost.textContent="總價：新台幣"+" "+data['price']+" "+"元";
                        totalcost.appendChild(elediv);
                    }
                    
                }
                else {
                    document.getElementById('first_section').style.display='none';
                    document.getElementById('second_section').style.display='none';
                    document.getElementById('third_section').style.display='none';
                    document.getElementById('fourth_section').style.display='none';
                    document.getElementById('footer').style.display='none';
                    document.getElementById('footer1').style.display='block';
                    document.getElementById('hr').style.display='none';
                    document.getElementById('hr1').style.display='none';
                    document.getElementById('hr2').style.display='none';
                    document.getElementById('no_booking').style.display='block';
                    document.getElementById('body').style.gridTemplateRows='1fr 1fr';
                    
                 
                }
                
            })
        }

    })
});

const delete_appointment= document.querySelector('#delete_icon');
delete_appointment.addEventListener('click', event=>{
    event.preventDefault();
    fetch("api/booking", {
        method:'DELETE',
    }).then(res=>res.json())
    .catch(error=>{
        console.error('error',error)
    })
    .then(response=>{
        console.log(response)
        remove_response=JSON.stringify(response)
        if(remove_response == JSON.stringify({"ok":true})){
            location.reload();
        }
    })
})
const firstpage= document.getElementById('left');
firstpage.addEventListener('click', event=>{
    event.preventDefault();
    location.replace("http://18.221.31.109:3000/")
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

const submitButton= document.getElementById('pay_btn');
const contact_form= document.querySelector('.contact_form');



TPDirect.setupSDK(127106,"app_z4tLBdl9W2ssIixsqlTt2nA6yVQgqlvbqRaKVgXuVj6VUMShHbYwHj3VjXyV","sandbox")
var fields = {
    number:{
        element: '#card_number',
        placeholder:'**** **** **** ****'
    },
    expirationDate: {
        element: document.getElementById('card_expiration_date'),
        placeholder: 'MM / YY'
    },
    ccv: {
        element: '#card_ccv',
        placeholder: '後三碼'
    }

}
TPDirect.card.setup({
    fields: fields,
    styles: {
        // Style all elements
        'input': {
            'color': 'gray'
        },
        // Styling ccv field
        'input.ccv': {
            'font-size': '16px'
        },
        // Styling expiration-date field
        'input.expiration-date': {
            // 'font-size': '16px'
        },
        // Styling card-number field
        'input.card-number': {
             'font-size': '16px'
        },
        // style focus state
        ':focus': {
             'color': 'black'
        },
        // style valid state
        '.valid': {
            'color': 'green'
        },
        // style invalid state
        '.invalid': {
            'color': 'red'
        },
        // Media queries
        // Note that these apply to the iframe, not the root window.
        
    },
    // 此設定會顯示卡號輸入正確後，會顯示前六後四碼信用卡卡號
    isMaskCreditCardNumber: true,
    maskCreditCardNumberRange: {
        beginIndex: 6, 
        endIndex: 11
    }
})

TPDirect.card.onUpdate(function (update) {
    update.canGetPrime === true
    // --> you can call TPDirect.card.getPrime()
    
    if (update.canGetPrime) {
        
        // Enable submit Button to get prime.
        submitButton.removeAttribute('disabled')
    } else {
        // Disable submit Button to get prime.
        submitButton.setAttribute('disabled', true)
    }
                                            
    //cardTypes = ['mastercard', 'visa', 'jcb', 'amex', 'unknown']
    if (update.cardType === 'visa') {
        // Handle card type visa.
    }

    // number 欄位是錯誤的
    if (update.status.number === 2) {
        //setNumberFormGroupToError()
    } else if (update.status.number === 0) {
        //setNumberFormGroupToSuccess()
    } else {
       // setNumberFormGroupToNormal()
    }
    
    if (update.status.expiry === 2) {
        //setNumberFormGroupToError()
    } else if (update.status.expiry === 0) {
        //setNumberFormGroupToSuccess()
    } else {
        //setNumberFormGroupToNormal()
    }
    
    if (update.status.ccv === 2) {
       // setNumberFormGroupToError()
    } else if (update.status.ccv === 0) {
       // setNumberFormGroupToSuccess()
    } else {
       // setNumberFormGroupToNormal()
    }
})
submitButton.addEventListener('click' ,onSubmit)
function onSubmit(event) {
    event.preventDefault()

    // 取得 TapPay Fields 的 status
    const tappayStatus = TPDirect.card.getTappayFieldsStatus()

    // 確認是否可以 getPrime
    if (tappayStatus.canGetPrime === false) {
        alert('can not get prime')
        return
    }

    // Get prime
    TPDirect.card.getPrime((result) => {
        if (result.status !== 0) {
            alert('get prime error ' + result.msg)
            return
        }
        alert('get prime 成功，prime: ' + result.card.prime)
        console.log(result.card.prime)
        const prime= result.card.prime; 
        let attraction_price= document.querySelector('.booking_fee').textContent;
        const price= attraction_price.split(' ')[1];
        
        let attraction_name= document.querySelector('.booking_detail').textContent;
        const name= attraction_name.split('台北一日遊：').pop();
        const address= document.querySelector('.booking_address').textContent;
        const image= document.getElementById('booking_photo').src;
        
        
        

        const formData2= new FormData(contact_form)
        const contact= Object.fromEntries(formData2)
        fetch("/api/booking",{
            method:'GET',
        }).then(res=>res.json())
        .catch(error=>{
            console.error('error',error)
        })
        .then(response =>{
            console.log(response)
            check_response=JSON.stringify(response)
            const data= response['data']
            const attraction= response['data']['attraction']
            const id= attraction['id']
            const time= data['time']
            const date= data['date'] 
            const post_body={
                "prime": prime,
                "order":{
                    "price":price,
                    "trip":{
                        "attraction":{
                            "id":id,
                            "name":name,
                            "address":address,
                            "image":image
                        },
                        "date":date,
                        "time":time 
                    },
                    "contact":contact
                }
            }
            console.log(post_body)
            fetch("api/order",{
                method:'POST',
                headers:{
                    'Content-Type':'application/json'
                },
                body: JSON.stringify(post_body)
            }).then(res=>res.json())
            .catch(error=>{
                console.error('error',error)
            })
            .then(response=>{
                console.log(response)
                payment_response=JSON.stringify(response)
                const status= response['data']['payment']['status'];
                const number= response['data']['number'];
                if (status == 0 ){
                    var url= new URL('http://18.221.31.109:3000/thankyou?');
                    var search_params= url.searchParams;
                    search_params.set('number',number);
                    url.search= search_params.toString();
                    var new_url= url.toString();
                    console.log(new_url);
                    location.replace(new_url)                 
                }

            
            })

        })
        
        // send prime to your server, to pay with Pay by Prime API .
        //Pay By Prime Docs: https://docs.tappaysdk.com/tutorial/zh/back.html#pay-by-prime-api
    })
}