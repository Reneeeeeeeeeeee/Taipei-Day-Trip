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




