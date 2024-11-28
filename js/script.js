/* ================================== typing animation ================================== */
var typed = new Typed(".typing", 
{
    strings:["","Application Developer", "Web Developer", "Back-End Developer", "Security Administrator"],
    typeSpeed:100,
    BackSpeed:60,
    loop:true
})
/* ================================== aside ================================== */
const nav = document.querySelector(".nav"),
    navList = nav.querySelectorAll("li"),
    totalNavList = navList.length,
    allSection = document.querySelectorAll(".section"),
    totalSection = allSection.length;
    for (let i = 0; i < totalNavList; i++)
    {
        const a = navList[i].querySelector("a");
        a.addEventListener("click", function()
        {
            removeBackSection();
            for (let j = 0; j < totalNavList; j++)
            {
                if (navList[j].querySelector("a").classList.contains("active"))
                {
                    addBackSection(j);
                    //allSection[j].classList.add("back-section");
                }
                navList[j].querySelector("a").classList.remove("active");
            }
            this.classList.add("active")
            showSection(this);
            if (window.innerWidth < 1200)
            {
                asideSectionTogglerBtn();
            }
        })
    }
    function removeBackSection()
    {
        for (let i = 0; i < totalSection; i++)
            {
                allSection[i].classList.remove("back-section");
            }
    }
    function addBackSection(num)
    {
        allSection[num].classList.add("back-section");
    }
    function showSection(element)
    {
        for (let i = 0; i < totalSection; i++)
        {
            allSection[i].classList.remove("active");
        }
        const target = element.getAttribute("href").split("#")[1];
        document.querySelector("#" + target).classList.add("active")
    }
    function updateNav(element)
    {
        for (let i = 0; i < totalNavList; i++)
        {
            navList[i].querySelector("a").classList.remove("active");
            const target = element.getAttribute("href").split("#")[1];
            if (target === navList[i].querySelector("a").getAttribute("href").split("#")[1])
            {
                navList[i].querySelector("a").classList.add("active");
            }
        }
    }
    /* ================================== aside ================================== */
    document.querySelector(".hire-me").addEventListener("click", function()
    {
        const sectionIndex = this.getAttribute("data-section-index");
        //console.log(sectionIndex)
        showSection(this);
        updateNav(this);
        removeBackSection();
        addBackSection(sectionIndex);
    })
    const navTogglerBtn = document.querySelector(".nav-toggler"),
            aside = document.querySelector(".aside");
            navTogglerBtn.addEventListener("click", () => 
            {
                asideSectionTogglerBtn();
            })
            function asideSectionTogglerBtn()
            {
                aside.classList.toggle("open");
                navTogglerBtn.classList.toggle("open");
                for (let i = 0; i < totalSection; i++)
                {
                    allSection[i].classList.toggle("open");
                }
            }
        

            const readMoreButton = document.querySelector('.btn2'); // Use the existing class name
            const hiddenTimelineItems = document.querySelector('.concealed-timeline-items');

            readMoreButton.addEventListener('click', () => {
            if (hiddenTimelineItems.classList.contains('hidden')) {
                hiddenTimelineItems.classList.remove('hidden');
                readMoreButton.textContent = 'Show Less';
            } else {
                hiddenTimelineItems.classList.add('hidden');
                readMoreButton.textContent = 'Read More';
            }
            });

            /* ================================== chatbot ================================== */

            const chatBody = document.querySelector(".chat-body");
            const messageInput = document.querySelector(".message-input");
            const sendMessageButton = document.querySelector("#send-message");

            // API setup
            const API_KEY = "AIzaSyC3MJvbzNyNoJirWTcUAzN3zrhzugmvkTc";
            const API_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${API_KEY}`;

            const userData =
            {
                message: null
            }

            // Create message element with dynamic classes and return it
            const createMessageElement = (content, ...classes) =>
            {
                const div = document.createElement("div");
                div.classList.add("message", ...classes);
                div.innerHTML = content;
                return div;
            }

            // Generate bot response using API
            const generateBotResponse = async (incomingMessageDiv) => 
            {
                const messageElement = incomingMessageDiv.querySelector(".message-text");

                //API request options
                const requestOptions =
                {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(
                    {
                        contents: [{
                            parts:[{ text: userData.message }]
                            }]
                    })
                } 
                try
                {
                    // Fetch bot response from API
                    const response = await fetch(API_URL, requestOptions);
                    const data = await response.json();
                    if (!response.ok) throw new Error(data.error.message);

                    // Extract and display bot's response text
                    const apiResponseText = data.candidates[0].content.parts[0].text.replace(/\*\*(.*?)\*\*/g, "$1").trim();
                    messageElement.innerText = apiResponseText;
                }
                catch (error)
                {
                    console.log(error);
                }
                finally
                {
                    incomingMessageDiv.classList.remove("thinking");
                    chatBody.scrollTo({ top: chatBody.scrollHeight, behavior: "smooth" });
                }
            }

            // Handle outgoing user messages
            const handleOutgoingMessage = (e) => 
            {
                e.preventDefault();
                userData.message = messageInput.value.trim();
                messageInput.value = "";

                //Create and display user message
                const messageContent = `<div class="message-text"></div>`;
                const outgoingMessageDiv = createMessageElement(messageContent, "user-message");
                outgoingMessageDiv.querySelector(".message-text").textContent = userData.message;
                chatBody.appendChild(outgoingMessageDiv);
                chatBody.scrollTo({ top: chatBody.scrollHeight, behavior: "smooth" });

                //Simulate bot response with thinking indicator after a delay
                setTimeout(() => 
                {
                    const messageContent = `<svg class="bot-avatar" xmlns="http://www.w3.org/2000/svg" width="50" height="50" viewBox="0 0 1024 1024">
                                        <path d="M738.3 287.6H285.7c-59 0-106.8 47.8-106.8 106.8v303.1c0 59 47.8 106.8 106.8 106.8h81.5v111.1c0 .7.8 1.1 1.4.7l166.9-110.6 41.8-.8h117.4l43.6-.4c59 0 106.8-47.8 106.8-106.8V394.5c0-59-47.8-106.9-106.8-106.9zM351.7 448.2c0-29.5 23.9-53.5 53.5-53.5s53.5 23.9 53.5 53.5-23.9 53.5-53.5 53.5-53.5-23.9-53.5-53.5zm157.9 267.1c-67.8 0-123.8-47.5-132.3-109h264.6c-8.6 61.5-64.5 109-132.3 109zm110-213.7c-29.5 0-53.5-23.9-53.5-53.5s23.9-53.5 53.5-53.5 53.5 23.9 53.5 53.5-23.9 53.5-53.5 53.5zM867.2 644.5V453.1h26.5c19.4 0 35.1 15.7 35.1 35.1v121.1c0 19.4-15.7 35.1-35.1 35.1h-26.5zM95.2 609.4V488.2c0-19.4 15.7-35.1 35.1-35.1h26.5v191.3h-26.5c-19.4 0-35.1-15.7-35.1-35.1zM561.5 149.6c0 23.4-15.6 43.3-36.9 49.7v44.9h-30v-44.9c-21.4-6.5-36.9-26.3-36.9-49.7 0-28.6 23.3-51.9 51.9-51.9s51.9 23.3 51.9 51.9z"></path>
                                    </svg>
                                    <div class="message-text">
                                        <div class="thinking-indicator">
                                            <div class="dot"></div>
                                            <div class="dot"></div>
                                            <div class="dot"></div>
                                        </div>
                                    </div>`;
                    const incomingMessageDiv = createMessageElement(messageContent, "bot-message", "thinking");
                    
                    chatBody.appendChild(incomingMessageDiv);
                    chatBody.scrollTo({ top: chatBody.scrollHeight, behavior: "smooth" });
                    generateBotResponse(incomingMessageDiv);
                }, 600);
            }

            //Handle enter key press for sending messages
            messageInput.addEventListener("keydown", (e) => 
            {
                const userMessage = e.target.value.trim();
                if (e.key === "Enter" && userMessage)
                {
                    handleOutgoingMessage(e);
                }
            });

            sendMessageButton.addEventListener("click", (e) => handleOutgoingMessage(e))