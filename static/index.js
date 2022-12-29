
    const first= fetch('/api/attractions?' + new URLSearchParams({
        page: 0,
    }),{
    })
    .then(function(response){
        return response.json();
    }).then(function data(result){
        const output=result["data"];
        console.log(output[0]['id']);
        let nextPage=result["nextPage"];
        history.pushState({'nextPage': nextPage},null);
        let detail= document.querySelectorAll('.detail');
        let eletext= document.createElement('div');
        let detail2= document.querySelectorAll('.detail2');
        let name= document.querySelectorAll('.name');
        var img=document.querySelectorAll("#photo1");
        var a= document.querySelectorAll('.a');
        //let a= document.createElement('a');
                
        for(let i=0; i<output.length; i++){
            detail[i].textContent= output[i]['mrt'];
            detail[i].appendChild(eletext);
            detail2[i].textContent= output[i]['category'];
            detail2[i].appendChild(eletext)
            img[i].src=output[i]['images'][0];
            name[i].textContent= output[i]['name'];
            name[i].appendChild(eletext);
            const ID=output[i]['id'];
            console.log(ID)
            const link= "http://18.221.31.109:3000/attraction/"+ID;
            console.log(link)
            a[i].href=link
            //mainphoto[i].onclick="window.location="+link;
            //mainphoto[i].appendChild(a);

           

        }
        console.log("first")
        console.log(history.state.nextPage)
        console.log(history.state.catesnextpage)
        
        
    });

    

    function closest(e, t){ 
        return !e? false : e === t ? true : closest(e.parentNode, t);
    }
    const subsearch= document.getElementById('subsearch');
    const search= document.getElementById('input');
    search.addEventListener('click', function(e) {
        fetch("api/categories",{  
        })
        .then(function(response){
            return response.json();
        }).then(function(ans){
            const outcome= ans["data"];
            let elecates= document.createElement('div')
            let cates= document.querySelectorAll('.cates')
            for (let x=0; x<9; x++){
                cates[x].textContent=outcome[x];
                cates[x].appendChild(elecates);
            }
        });
        subsearch.style.visibility= 'visible';
        e.stopPropagation();
    });

    document.body.addEventListener('click', function(e){
        if (!closest(e.target, subsearch)){
            subsearch.style.visibility = 'hidden';

        }
    });
    const input= document.createElement('input')
    const cates= document.querySelectorAll('.cates');
    const cateid=document.getElementById('cates')
    for (let i=0; i<cates.length; i++){
        cates[i].addEventListener('click', function(){
        search.value= cates[i].textContent 
        subsearch.style.visibility= 'hidden'
        } )
    }

    let debounceTimeout= null;
    var btn= document.getElementById("mybtn");
    btn.addEventListener('click', cData);
    document.addEventListener("DOMContentLoaded", test);
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
    
     
    //observer.unobserve(document.getElementById("footer"));
    

    function test(){
        let options ={
            root: null,
            rootMargin: "0px",
            threshold:0.25
        };
        const observer= new IntersectionObserver(handleIntersection, options);
        observer.observe(document.querySelector(".footer"));
        firstData();
        console.log("THROUGH")
        
        
    };

    function handleIntersection(entries) {
        
        if (search.value == '' && entries[0].isIntersecting) {
            console.warn("something is intersecting with the viewport");

            getData(); 
            observer.unobserve(document.querySelector(".footer"));
            console.log("last")
        }
        if (search.value != '' && history.state.catesnextpage != "null" && entries[0].isIntersecting) {
            console.warn("something is intersecting with the viewport");
            afterData()
            console.log(history.state.catesnextpage);
            console.log("last");    
            observer.unobserve(document.querySelector(".footer"));
        }
    
    }



    function firstData() { 
        console.log("IM FIRSTDATA") 
            
        fetch('/api/attractions?' + new URLSearchParams({
            page: history.state.nextPage,
        }) ,{
        })
        .then(function(response){
            //console.log(entry)
            return response.json();
        }).then(result =>{
            result.data.forEach( item => {
                console.log(result.nextPage);
                const nextPage=result.nextPage;
                history.replaceState({'nextPage': nextPage},null);
                
                const main= document.querySelector(".main")
                const a= document.createElement('a');
                a.classList.add('a');
                const ID= item.id;
                console.log(ID)
                const link= "http://18.221.31.109:3000/attraction/"+ID;
                console.log(link)
                a.href= link
                main.append(a);

                const mainphotos= document.createElement('div')
                mainphotos.classList.add("mainphoto");
                a.append(mainphotos);
                

                const mainphoto= document.querySelector(".mainphoto")
                let img= document.createElement('img');
                img.src= item.images[0];
                mainphotos.appendChild(img);
                
                let back= document.createElement('div');
                back.classList.add("back");
                mainphotos.appendChild(back);

                let content= document.createElement('div');
                content.classList.add("content");
                mainphotos.appendChild(content);

                let name= document.createElement('div');
                name.textContent=item.name
                name.classList.add("name");
                back.appendChild(name);

                let detail= document.createElement('div');
                detail.textContent=item.mrt;
                detail.classList.add("detail");
                content.appendChild(detail);

                let detail2= document.createElement('div');
                detail2.textContent=item.category;
                detail2.classList.add("detail2");
                content.appendChild(detail2);
                

                
            });
        
         
            console.log(history.state.nextPage);   
        
            
        });
        
        

    
    }   

    function getData() {  
        console.log("fetch some data");
        fetch('/api/attractions?' + new URLSearchParams({
            page: history.state.nextPage,
        }) ,{
        })
        .then(function(response){
            //console.log(entry)
            return response.json();
        }).then(result =>{
            result.data.forEach( item => {
                console.log(result.nextPage);
                const nextPage=result.nextPage;
                history.replaceState({'nextPage': nextPage},null)
                const main= document.querySelector(".main")
                const a= document.createElement('a');
                a.classList.add('a');
                const ID= item.id;
                console.log(ID)
                const link= "http://18.221.31.109:3000/attraction/"+ID;
                console.log(link)
                a.href= link
                main.append(a);

                const mainphotos= document.createElement('div')
                mainphotos.classList.add("mainphoto");
                a.append(mainphotos);

                const mainphoto= document.querySelector(".mainphoto")
                let img= document.createElement('img');
                img.src= item.images[0];
                mainphotos.appendChild(img);
                
                let back= document.createElement('div');
                back.classList.add("back");
                mainphotos.appendChild(back);

                let content= document.createElement('div');
                content.classList.add("content");
                mainphotos.appendChild(content);

                let name= document.createElement('div');
                name.textContent=item.name
                name.classList.add("name");
                back.appendChild(name);

                let detail= document.createElement('div');
                detail.textContent=item.mrt;
                detail.classList.add("detail");
                content.appendChild(detail);

                let detail2= document.createElement('div');
                detail2.textContent=item.category;
                detail2.classList.add("detail2");
                content.appendChild(detail2);
                return nextPage;
                
                
            });
        
        
            
        });      
        
        console.log(history.state) 
    }         
    
    function cData() {
        fetch('/api/attractions?' + new URLSearchParams({
            page: 0,
            keyword: search.value,
        }),{
        })
        .then(function(response){
            return response.json();
        }).then(function(result){
            const showans=result["data"];
            const nextPage=result["nextPage"];
            history.pushState({'catesnextpage':nextPage},null);
            console.log(history.state.catesnextpage);
            var mainphoto=  document.getElementsByClassName('mainphoto')
            //console.log(mainphoto)
            if (showans && showans.length<12 ){
                let detail= document.querySelectorAll('.detail');
                let eletext= document.createElement('div');
                let detail2= document.querySelectorAll('.detail2');
                let name= document.querySelectorAll('.name');
                var img=document.querySelectorAll("#photo1");
                var a= document.querySelectorAll('a');
                

                
                for(let i=0; i<showans.length; i++){
                        a[i].style.display= '';
                        //mainphoto[i].style.display= ''
                        detail[i].textContent= showans[i]["mrt"];
                        detail[i].appendChild(eletext);
                        detail2[i].textContent= showans[i]['category'];
                        detail2[i].appendChild(eletext)
                        img[i].src=showans[i]['images'][0];
                        name[i].textContent= showans[i]['name'];
                        name[i].appendChild(eletext);
                        const ID=showans[i]['id'];
                        console.log(ID)
                        const link= "http://18.221.31.109:3000/attraction/"+ID;
                        console.log(link)
                        a[i].href=link
                        //mainphoto[i].style.visibility='visible';
                        a[i].style.visibility='visible';
                        
                        
                    }
                for(let j=showans.length;  ;j++){
                    //mainphoto[j].style.display= 'none';
                    a[j].style.display='none';
                    //console.log(mainphoto[j])
                }   
            }
            else if (showans && showans.length==12){
                let detail= document.querySelectorAll('.detail');
                let eletext= document.createElement('div');
                let detail2= document.querySelectorAll('.detail2');
                let name= document.querySelectorAll('.name');
                var img=document.querySelectorAll("#photo1");
                var a= document.querySelectorAll('a');
                
                for(let i=0; i<showans.length; i++){
                        a[i].style.display= '';
                        //mainphoto[i].style.display= ''
                        detail[i].textContent= showans[i]["mrt"];
                        detail[i].appendChild(eletext);
                        detail2[i].textContent= showans[i]['category'];
                        detail2[i].appendChild(eletext)
                        img[i].src=showans[i]['images'][0];
                        name[i].textContent= showans[i]['name'];
                        name[i].appendChild(eletext);
                        const ID=showans[i]['id'];
                        console.log(ID)
                        const link= "http://18.221.31.109:3000/attraction/"+ID;
                        console.log(link)
                        a[i].href=link
                        //mainphoto[i].style.visibility='visible';
                        a[i].style.visibility='visible';     
                        
                    }
                for(let x=showans.length;  ; x++){
                    //mainphoto[x].style.display= 'none';
                    a[x].style.display='none';
                }
               
            }     
            else if(result["error"]= true){
                window.alert("No matching results")
            }
            
            
        })
    };

    function afterData() {
        console.log("can fetch")
        fetch('/api/attractions?' + new URLSearchParams({
            page: history.state.catesnextpage,
            keyword: search.value,
        }),{
        })
        .then(function(response){
            console.log("can")
            return response.json();
        }).then(result => {
            result.data.forEach( item => {   
                const nextPage=result.nextPage;
                console.log("catee:",nextPage);
                history.replaceState({'catesnextpage':nextPage},null);
                console.log(history.state.catesnextpage)
                const main= document.querySelector(".main")
                const a= document.createElement('a');
                a.classList.add('a');
                const ID= item.id;
                console.log(ID)
                const link= "http://18.221.31.109:3000/attraction/"+ID;
                console.log(link)
                a.href= link
                main.append(a);
            
                const mainphotos= document.createElement('div')
                mainphotos.classList.add("mainphoto");
                a.append(mainphotos);
    
                const mainphoto= document.querySelector(".mainphoto")
                let img= document.createElement('img');
                img.src= item.images[0];
                mainphotos.appendChild(img);
    
                let back= document.createElement('div');
                back.classList.add("back");
                mainphotos.appendChild(back);
    
                let content= document.createElement('div');
                content.classList.add("content");
                mainphotos.appendChild(content);
    
                let name= document.createElement('div');
                name.textContent=item.name
                name.classList.add("name");
                back.appendChild(name);
    
                let detail= document.createElement('div');
                detail.textContent=item.mrt;
                detail.classList.add("detail");
                content.appendChild(detail);
    
                let detail2= document.createElement('div');
                detail2.textContent=item.category;
                detail2.classList.add("detail2");
                content.appendChild(detail2);
                
            });
            console.log("DONE");
        });
    }; 
    
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

    //const form= document.getElementById('form');
   
  
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
                document.getElementById('signin_error').style.color= 'red'
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
    })

    
        

    

        

  
        
    
    
    
   
















//const subsearch= document.getElementById('subsearch');
//const search= document.getElementById('input');






//function insert(){
    //const cates= document.getElementById('cates');
    //const cate= document.querySelectorAll('.cates')
    //const search= document.getElementById('input');
    //if (cates.click){
        //search.innerHTML= cate
    //}

//}




