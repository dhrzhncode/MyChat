function send(){
    var input = document.getElementById("msgFeild");
    var inputValue = input.value;
    if (!inputValue) return;

    const chat = document.getElementById("chat");

    let temp = document.createElement("div");
    temp.setAttribute('class', 'userMsg');
    temp.innerText = inputValue;
    chat.appendChild(temp);
    chat.scrollTop = chat.scrollHeight;
    
    input.value = "";

    const aiMsgDiv = document.createElement("div");
    aiMsgDiv.setAttribute("class", "aiMsg typing");
    aiMsgDiv.innerText = "Typing...";
    chat.appendChild(aiMsgDiv);
    chat.scrollTop = chat.scrollHeight;

    const API = "your_Gemini_API"; //paste yout API key here!
    const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${API}`;

    const payload = {
        contents: [{
            parts: [{
                text: `You are a professional but friendly sales manager for "d-tech mobiles", an e-commerce store(physical and virtual store) for mobile accessories located in Gandhipuram 100 Feet Road, Coimbatore. our mobile number:9012345678. Reply to the customer query: "${inputValue}" in one short, single-line message only. Be polite, supportive, and softly persuasive to buy more products. Our return policy (10 days, no damage, as per global consumer law) only when relevant. Do not use lists, stars, or bold text. Use emojis only if necessary for friendliness. #note: ensure respect use respectfull tone like your talking to your manager and continuvity from above chat and previous chat and once started with greeting don't keep on greeting everytime. maintain english, if needed use tanglish or if the message was in tamil repply them in tamil, but don't reply customer with english mixed tamil, continue with tone and language you used in previous chat/message`
            }]
        }]
    };
    fetch(url,{
        method: 'POST',
        headers:{
            'Content-Type':'application/json'
        },
        body: JSON.stringify(payload)
    })
    .then(response => response.json())
    .then(data => {
        aiMsgDiv.classList.remove("typing");
        const aiText = data.candidates[0].content.parts[0].text || "No Response, Server Busy";
        aiMsgDiv.innerHTML = aiText;
        chat.scrollTop = chat.scrollHeight;
    })
    .catch(error => {
        let errorMsgDiv = document.createElement("div");
        errorMsgDiv.setAttribute('class','aiMsg');
        errorMsgDiv.innerHTML = "Error: Could not get response";
        document.getElementById("chat").appendChild(errorMsgDiv);
        chat.scrollTop = chat.scrollHeight;
        console.error("Maka Error maka",error)
    });
}