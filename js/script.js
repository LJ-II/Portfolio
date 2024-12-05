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

            /*const chatBody = document.querySelector(".chat-body");
            const messageInput = document.querySelector(".message-input");
            const sendMessageButton = document.querySelector("#send-message");
            const fileInput = document.querySelector("#file-input");
            const fileUploadWrapper = document.querySelector(".file-upload-wrapper");
            const fileCancelButton = document.querySelector("#file-cancel");
            const chatbotToggler = document.querySelector("#chatbot-toggler");
            const closeChatbot = document.querySelector("#close-chatbot");

            // API setup
            const API_KEY = "AIzaSyC3MJvbzNyNoJirWTcUAzN3zrhzugmvkTc";
            const API_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${API_KEY}`;

            const userData =
            {
                message: null,
                file:
                {
                    data: null,
                    mime_type: null
                }
            }

            const chatHistory = [];
            const initialInputHeight = messageInput.scrollHeight;

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

                // Add user message to chat history
                chatHistory.push({
                    role: "user",
                    parts:[{ text: userData.message }, ...(userData.file.data ? [{ inline_data: userData.file }] : [])]
                    });

                //API request options
                const requestOptions =
                {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(
                    {
                        contents: chatHistory
                    })
                } 
                try
                {
                    // Fetch bot response from API
                    const response = await fetch(API_URL, requestOptions);
                    const data = await response.json();
                    if (!response.ok) throw new Error(data.error.message);

                    // Extract and display bot's response text
                    */ //const apiResponseText = data.candidates[0].content.parts[0].text.replace(/\*\*(.*?)\*\*/g, "$1").trim();
                   /* messageElement.innerText = apiResponseText;

                    // Add bot response to chat history
                    chatHistory.push({
                        role: "model",
                        parts:[{ text: apiResponseText }]
                    });
                }
                catch (error)
                {
                    // Handle error in API response
                    console.log(error);
                    messageElement.innerText = error.message;
                    messageElement.style.color = "#ff0000";
                }
                finally
                {
                    // Reset user's file data, removing the thinking indicator and scroll chat to the bottom
                    userData.file = {};
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
                fileUploadWrapper.classList.remove("file-uploaded");
                messageInput.dispatchEvent(new Event("input"));

                //Create and display user message
                const messageContent = `<div class="message-text"></div>${userData.file.data ? `<img src="data:${userData.file.mime_type};base64,${userData.file.data}" class="attachment" />` : ""}`;
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
                if (e.key === "Enter" && userMessage && !e.shiftKey && window.innerWidth > 768)
                {
                    handleOutgoingMessage(e);
                }
            });

            // Adjust input field height dynamically
            messageInput.addEventListener("input", () => 
            {
                messageInput.style.height = `${initialInputHeight}px`;
                messageInput.style.height = `${messageInput.scrollHeight}px`;
                document.querySelector(".chat-form").style.borderRadius = messageInput.scrollHeight > initialInputHeight ? "15px" : "32px";
            });

            // Handle file input change and preview the selected file
            fileInput.addEventListener("change", () => 
            {
                const file = fileInput.files[0];
                if (!file) return;

                const reader = new FileReader();
                reader.onload = (e) => 
                {
                    fileUploadWrapper.querySelector("img").src = e.target.result;
                    fileUploadWrapper.classList.add("file-uploaded");
                    const base64String = e.target.result.split(",")[1];

                    // Store file data in userData
                    userData.file =
                    {
                        data: base64String,
                        mime_type: file.type
                    }
                    fileInput.value = "";
                }

                reader.readAsDataURL(file);
            });

            // Cancel file upload
            fileCancelButton.addEventListener("click", () => 
            {
                userData.file = {};
                fileUploadWrapper.classList.remove("file-uploaded");
            });

            // Initialize emoji picker and handle emoji selection
            const picker = new EmojiMart.Picker(
            {
                theme: "light",
                skinTonePosition: "none",
                previewPosition: "none",
                onEmojiSelect: (emoji) =>
                {
                    const { selectionStart: start, selectionEnd: end } = messageInput;
                    messageInput.setRangeText(emoji.native, start, end, "end");
                    messageInput.focus();
                },
                onClickOutside: (e) => 
                {
                    if (e.target.id === "emoji-picker")
                    {
                        document.body.classList.toggle("show-emoji-picker");
                    }
                    else
                    {
                        document.body.classList.remove("show-emoji-picker");
                    }
                }
            });

            document.querySelector(".chat-form").appendChild(picker);

            sendMessageButton.addEventListener("click", (e) => handleOutgoingMessage(e));

            document.querySelector("#file-upload").addEventListener("click", () => fileInput.click());

            chatbotToggler.addEventListener("click", () => document.body.classList.toggle("show-chatbot"));

            closeChatbot.addEventListener("click", () => document.body.classList.remove("show-chatbot")); */


            const chatBody = document.querySelector(".chat-body");
            const messageInput = document.querySelector(".message-input");
            const sendMessageButton = document.querySelector("#send-message");
            const fileInput = document.querySelector("#file-input");
            const fileUploadWrapper = document.querySelector(".file-upload-wrapper");
            const fileCancelButton = document.querySelector("#file-cancel");
            const chatbotToggler = document.querySelector("#chatbot-toggler");
            const closeChatbot = document.querySelector("#minimize-chatbot");
           
            // API setup
            const API_KEY = "AIzaSyC3MJvbzNyNoJirWTcUAzN3zrhzugmvkTc";
            const API_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${API_KEY}`;
           
            const userData = {
                message: null,
                file: {
                    data: null,
                    mime_type: null
                }
            };
           
            const chatHistory = [];
            const initialInputHeight = messageInput.scrollHeight;
           
            const dialogResponses = {
                "hello": "Hello! How can I assist you today?",
                "how are you": "I'm just a bot, but I'm here to help you!",
                "experience": "Here's my experience: <br> 1. Customer Relationship Management Intern at SITA SOC (2021) <br> 2. Technical Consultant Trainee at SITA SOC (2022–2024) <br> 3. Currently at CAPACITI-JHB.",
                "skills": "I excel in Java (89%), C# (70%), Database Administration (93%), and JavaScript (80%).",
                "contact": "You can email me at lucas.tladi@outlook.com or call me at +27 66 082 7261.",
                "services": "Our Application Development service involves understanding core programming concepts like variables, loops, functions, and object-oriented programming. We work with languages such as Java, Python, or JavaScript and tools like Visual Studio Code and Git. You can practice coding skills through simple projects like to-do apps, calculators, and contact forms. <br><br> Our Web Development service focuses on building web pages or projects like personal portfolios or blogs. We use frameworks like Bootstrap for faster development, browser developer tools for debugging, and host projects on platforms like GitHub Pages, Netlify, or Vercel. <br><br> Our Network Configuration service covers fundamental networking concepts, including protocols like TCP/IP, HTTP, and DNS. We ensure network security and efficient data flow, using tools like ping, traceroute, and Wireshark. We troubleshoot issues and set up user permissions for secure access. <br><br> Our Database Management service includes working with relational databases (MySQL, PostgreSQL) and NoSQL databases (MongoDB). We focus on optimizing performance using joins, indexes, and constraints. We manage databases, configure DBMS, and implement user authentication and access controls. <br><br> Our Security Administration service includes setting up firewalls, antivirus software, and intrusion detection/prevention systems (IDS/IPS). We ensure data protection with encryption, multi-factor authentication (MFA), and respond to security breaches. We also keep up with the latest vulnerabilities and cybersecurity news.",
                "education": "I hold a Bachelor of Science in Information Technology from North-West University. My studies focused on programming languages like Java and C#, data structures, and databases. I also specialize in Networking, Operating Systems, Decision Support Systems, and Systems Analysis & Design. This well-rounded skill set prepares me to tackle challenges in software development, data management, and system design.",
                "about": "As a novice in application development, I face challenges and have areas for improvement. While some may criticize or highlight flaws, I see these as opportunities for growth. By addressing these concerns and aligning my goals with meaningful improvement, I aim for greater satisfaction and progress.",
                "where are you located?": "We are located at 19 Ameshoff Street, Braamfontein, Johannesburg.",
                "profile": "Welcome to my portfolio website! It showcases my work and skills in software development, web design, and IT solutions. Here, you'll find details about my academic background, technical expertise, and various projects I've worked on. Feel free to explore my experience, skills, and the services I offer, as well as get in touch with me for potential opportunities or collaborations.",
                "socials": "You can connect with me on social media! Follow me on Twitter (@LuK____1) for updates and insights or check out my projects on GitHub (LJ-II). I'd love to connect!",
                // Add more predefined responses here
            };

           
            // Create message element with dynamic classes and return it
            const createMessageElement = (content, ...classes) => {
                const div = document.createElement("div");
                div.classList.add("message", ...classes);
                div.innerHTML = content;
                return div;
            };
           
            // Generate bot response using API
            const generateBotResponse = async (userMessage) => {
                // Add user message to chat history
                chatHistory.push({
                    role: "user",
                    parts: [{ text: userMessage }]
                });
           
                // API request options
                const requestOptions = {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                        contents: chatHistory
                    })
                };
           
                try {
                    // Fetch bot response from API
                    const response = await fetch(API_URL, requestOptions);
                    const data = await response.json();
                    if (!response.ok) throw new Error(data.error.message);
           
                    // Extract and display bot's response text
                    const apiResponseText = data.candidates[0].content.replace(/\*\*(.*?)\*\*/g, "$1").trim();
                    return apiResponseText;
                } catch (error) {
                    return "I'm sorry, I couldn't understand that. Can you please rephrase?";
                }
            };
           
            // Handle send message button click
            sendMessageButton.addEventListener("click", async () => {
                const userMessage = messageInput.value;
                if (userMessage.trim() === "") return;
           
                const userMessageDiv = createMessageElement(userMessage, "user-message");
                chatBody.appendChild(userMessageDiv);
                chatBody.scrollTop = chatBody.scrollHeight;
           
                messageInput.value = "";
           
                let botResponse;
                if (dialogResponses[userMessage.toLowerCase()]) {
                    botResponse = dialogResponses[userMessage.toLowerCase()];
                } else {
                    botResponse = await generateBotResponse(userMessage);
                }
           
                const messageContent = `<svg class="bot-avatar" xmlns="http://www.w3.org/2000/svg" width="50" height="50" viewBox="0 0 1024 1024">
                                            <path d="M738.3 287.6H285.7c-59 0-106.8 47.8-106.8 106.8v303.1c0 59 47.8 106.8 106.8 106.8h81.5v111.1c0 .7.8 1.1 1.4.7l166.9-110.6 41.8-.8h117.4l43.6-.4c59 0 106.8-47.8 106.8-106.8V394.5c0-59-47.8-106.9-106.8-106.9zM351.7 448.2c0-29.5 23.9-53.5 53.5-53.5s53.5 23.9 53.5 53.5-23.9 53.5-53.5 53.5-53.5-23.9-53.5-53.5zm157.9 267.1c-67.8 0-123.8-47.5-132.3-109h264.6c-8.6 61.5-64.5 109-132.3 109zm110-213.7c-29.5 0-53.5-23.9-53.5-53.5s23.9-53.5 53.5-53.5 53.5 23.9 53.5 53.5-23.9 53.5-53.5 53.5zM867.2 644.5V453.1h26.5c19.4 0 35.1 15.7 35.1 35.1v121.1c0 19.4-15.7 35.1-35.1 35.1h-26.5zM95.2 609.4V488.2c0-19.4 15.7-35.1 35.1-35.1h26.5v191.3h-26.5c-19.4 0-35.1-15.7-35.1-35.1zM561.5 149.6c0 23.4-15.6 43.3-36.9 49.7v44.9h-30v-44.9c-21.4-6.5-36.9-26.3-36.9-49.7 0-28.6 23.3-51.9 51.9-51.9s51.9 23.3 51.9 51.9z"></path>
                                        </svg>
                                        <div class="message-text">${botResponse}</div>`;
                const incomingMessageDiv = createMessageElement(messageContent, "bot-message");
                chatBody.appendChild(incomingMessageDiv);
                chatBody.scrollTo({ top: chatBody.scrollHeight, behavior: "smooth" });
            });
           
            // Handle enter key press in message input
            messageInput.addEventListener("keypress", (e) => {
                if (e.key === "Enter") {
                    sendMessageButton.click();
                }
            });
 
            // Adjust input field height dynamically
            messageInput.addEventListener("input", () =>
            {
                messageInput.style.height = `${initialInputHeight}px`;
                messageInput.style.height = `${messageInput.scrollHeight}px`;
                document.querySelector(".chat-form").style.borderRadius = messageInput.scrollHeight > initialInputHeight ? "15px" : "32px";
            });
 
            // Handle file input change and preview the selected file
            fileInput.addEventListener("change", () =>
            {
                const file = fileInput.files[0];
                if (!file) return;
 
                const reader = new FileReader();
                reader.onload = (e) =>
                {
                    fileUploadWrapper.querySelector("img").src = e.target.result;
                    fileUploadWrapper.classList.add("file-uploaded");
                    const base64String = e.target.result.split(",")[1];
 
                    // Store file data in userData
                    userData.file =
                    {
                        data: base64String,
                        mime_type: file.type
                    }
                    fileInput.value = "";
                }
 
                reader.readAsDataURL(file);
            });
 
            // Cancel file upload
            fileCancelButton.addEventListener("click", () =>
            {
                userData.file = {};
                fileUploadWrapper.classList.remove("file-uploaded");
            });
 
            // Initialize emoji picker and handle emoji selection
            const picker = new EmojiMart.Picker(
            {
                theme: "light",
                skinTonePosition: "none",
                previewPosition: "none",
                onEmojiSelect: (emoji) =>
                {
                    const { selectionStart: start, selectionEnd: end } = messageInput;
                    messageInput.setRangeText(emoji.native, start, end, "end");
                    messageInput.focus();
                },
                onClickOutside: (e) =>
                {
                    if (e.target.id === "emoji-picker")
                    {
                        document.body.classList.toggle("show-emoji-picker");
                    }
                    else
                    {
                        document.body.classList.remove("show-emoji-picker");
                    }
                }
            });
 
            document.querySelector(".chat-form").appendChild(picker);
 
            sendMessageButton.addEventListener("click", (e) => handleOutgoingMessage(e));
 
            document.querySelector("#file-upload").addEventListener("click", () => fileInput.click());
 
            chatbotToggler.addEventListener("click", () => 
            {
                document.body.classList.toggle("show-chatbot");
                clearChatHistory(); // Clear the chat messages
            });
 
            closeChatbot.addEventListener("click", () => document.body.classList.remove("show-chatbot"));

            // Function to clear chat messages
  function clearChatHistory() {
    chatBody.innerHTML = `
      <div class="message bot-message">
        <svg class="bot-avatar" xmlns="http://www.w3.org/2000/svg" width="50" height="50" viewBox="0 0 1024 1024">
          <path d="M738.3 287.6H285.7c-59 0-106.8 47.8-106.8 106.8v303.1c0 59 47.8 106.8 106.8 106.8h81.5v111.1c0 .7.8 1.1 1.4.7l166.9-110.6 41.8-.8h117.4l43.6-.4c59 0 106.8-47.8 106.8-106.8V394.5c0-59-47.8-106.9-106.8-106.9zM351.7 448.2c0-29.5 23.9-53.5 53.5-53.5s53.5 23.9 53.5 53.5-23.9 53.5-53.5 53.5-53.5-23.9-53.5-53.5zm157.9 267.1c-67.8 0-123.8-47.5-132.3-109h264.6c-8.6 61.5-64.5 109-132.3 109zm110-213.7c-29.5 0-53.5-23.9-53.5-53.5s23.9-53.5 53.5-53.5 53.5 23.9 53.5 53.5-23.9 53.5-53.5 53.5zM867.2 644.5V453.1h26.5c19.4 0 35.1 15.7 35.1 35.1v121.1c0 19.4-15.7 35.1-35.1 35.1h-26.5zM95.2 609.4V488.2c0-19.4 15.7-35.1 35.1-35.1h26.5v191.3h-26.5c-19.4 0-35.1-15.7-35.1-35.1zM561.5 149.6c0 23.4-15.6 43.3-36.9 49.7v44.9h-30v-44.9c-21.4-6.5-36.9-26.3-36.9-49.7 0-28.6 23.3-51.9 51.9-51.9s51.9 23.3 51.9 51.9z"></path>
        </svg>
        <div class="message-text">Hey there 👋 <br /> How can I help you today?</div>
      </div>
    `;
  }


            
        