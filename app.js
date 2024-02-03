const BASE_URL ="https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies";

 const dropdowns=document.querySelectorAll(".dropdown select");
 const btn=document.querySelector("form button");
 const fromCurr=document.querySelector(".from select");
 const toCurr=document.querySelector(".to select");
 const msg=document.querySelector(".msg");
 const msg2=document.querySelector(".msg2");



 for(let select of dropdowns){
        for(currCode in countryList){
            let newOption = document.createElement("option");
            newOption.innerText=currCode;
            newOption.value=currCode;

            if(select.name ==="from" && currCode==="USD"){
                newOption.selected="selected";
            }
            else if(select.name ==="to" && currCode==="INR"){
                newOption.selected="selected";
            }
            select.append(newOption);
        }


        select.addEventListener("change",(evt)=>{
            updateflag(evt.target);//evt.target is sending the info of place in which user has clicked in options
        });
 }




const updateflag=(element)=>{

    let currCode=element.value;
    let countryCode=countryList[currCode];
    let newSrc=`https://flagsapi.com/${countryCode}/flat/64.png`;
    let img=element.parentElement.querySelector("img");//parent element of element is <div class="select-container"> and its child is <img></img> tag
    img.src=newSrc;

}


btn.addEventListener("click",async (evt)=>{
    evt.preventDefault();//removes all by default work which happens when button is clicked for e.g. page refresh, adding something in url, etc
    let amount=document.querySelector(".amount input");
    let amtVal = amount.value;
    if(amtVal===""||amtVal<0){
        amtVal=1;
        amount.value=amtVal;
    } 

    const URL=`${BASE_URL}/${fromCurr.value.toLowerCase()}/${toCurr.value.toLowerCase()}.json`;
    let response=await fetch(URL);
    let data=await response.json();
    let dateupdate=data["date"];
    let rate=data[toCurr.value.toLowerCase()];
    let finalAmount =amtVal*rate;
    msg.innerText=`${amtVal} ${fromCurr.value}=${finalAmount}${toCurr.value}`;
    msg2.innerText=`Data Updated on ${dateupdate}`;
    
});