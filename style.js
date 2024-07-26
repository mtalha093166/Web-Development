    const BASE_URL = "https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@2024-03-06/v1/currencies";

    const dropdowns = document.querySelectorAll(".dropdown select");
    const btn = document.querySelector("button");
    const msg = document.querySelector(".msg");
    const fromCurr = document.querySelector(".from select");
    const toCurr = document.querySelector(".to select");
    window.addEventListener("load",()=>{
        updateExchangeRate();
    })
    for(let select of dropdowns)
    {
        for(currCode in  countryList){

            let newOption = document.createElement("option");
            newOption.innerText = currCode ;
            newOption.value = currCode;
            if(select.name === "from" && currCode === "USD"){
                newOption.selected = "selected";
            }
            else if(select.name === "to" && currCode === "PKR")
                {
                newOption.selected = "selected";
            }
            select.append(newOption);
        }
        select.addEventListener("change",(evt)=>{
                updateFlag(evt.target)
            })
        }
        const updateFlag = (element)=>{
                let currCode = element.value;
        let countryCode = countryList[currCode];
        let newSrc = `https://flagsapi.com/${countryCode}/flat/64.png`;
        let img = element.parentElement.querySelector("img");
        img.src = newSrc;
    }

btn.addEventListener("click",async (evt)=>{
        evt.preventDefault();
        updateExchangeRate();
})
const updateExchangeRate = async()=>{
    let amount = document.querySelector(".amount input");
    let amtVal = amount.value ;
    if(amtVal === "" || amtVal <1)
    {
        amtVal =1;
        amount.value = "1" ;
    }

    // console.log(fromCurr.value,toCurr.value);
    const URL = `${BASE_URL}/${fromCurr.value.toLowerCase()}/${toCurr.value.toLowerCase()}.json`;
    let response = await fetch(URL);
    let data = response.json();
    let rate = data[toCurr.toCurr.value.toLowerCase()];

    let finalAmount = amtVal * rate ;
    msg.innerText = `${amtVal} = ${finalAmount} ${toCurr.value}`;

}

