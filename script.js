
const APIKey = "AIzaSyDaqC-aj2p_-SmwdBDfF44Uzynl_baksGc";
const APIURL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${APIKey}`;

function fetchResults(event) {
    event.preventDefault(); 
    let chat = document.getElementById("text-input").value;
    console.log(chat);
    AppendMessage("user", chat);
    document.getElementById("text-input").value = "";
    document.getElementsByClassName("header")[0].style.display = "none";
    let chatArea = document.getElementById("chatArea");
    fetchApiResponse(chat); 
}

async function fetchApiResponse(chat) {
    const resp = await fetch(APIURL, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            contents: [
                {
                    parts: [
                        {
                            text: chat,
                        },
                    ],
                },
            ],
        }),
    });
    
    const response = await resp.json();
    AppendMessage("Gemini",
        response.candidates[0].content.parts[0].text.replace(/\*\*(.*?)\*\*/g, 
            "$1"
        )
    )
   document.getElementById("loading").remove();

}


function AppendMessage(sender, chat) {
    const msgElement = document.createElement("div");
    msgElement.className = `message ${sender}`;
    msgElement.innerHTML = `<p>${chat}</p>`;

    chatArea.appendChild(msgElement);
    if(sender=== "user") {
        const loading = document.createElement("div");
        loading.className = "loading Gemini";
        loading.id = "loading";
        loading.innerText = "Loading...";
        chatArea.appendChild(loading);
    }
    chatArea.scrollTo({
    top: chatArea.scrollHeight,
    behavior: 'smooth'
});


}

function toggle() {
    document.body.classList.toggle("dark");
    const isDark = document.body.classList.contains("dark");
    if(isDark){
     document.getElementById("theme-toggle").innerText = "☀️"; 
    }else{
     document.getElementById("theme-toggle").innerText = "🌙"; 
    }
    
}

