const { GoogleGenerativeAI, FunctionCallingMode } = require("@google/generative-ai");

const genAIkey = process.env.genAIkey;
const genAI = new GoogleGenerativeAI(genAIkey);

let chatHistory = [];
const ChatControll = async (req, res) => {
    const prompt = req.body.inputMessage;
    //console.log(req.user);
    async function getCurrentWeather(description) {
        let ans = '34 degree celcius'

        return { ans }; // Return the determined zodiac sign
    }

    const getCurrentWeatherDescription = {
        name: "ChatControll",
        parameters: {
            type: "OBJECT",
            description: "Get the current weather.",
            properties: {
                description: {
                    type: "STRING",
                    description: "Light level from 0 to 100. Zero is off and 100 is full brightness.",
                },
                
            },
            required: ["description"],
        },
    };


    try {

        const model = genAI.getGenerativeModel({
            model: "gemini-1.5-flash",
            // tools: [getCurrentWeatherDescription]

        });


        chatHistory.push({
            role: "user",
            parts: [
                { text: prompt },
                { text: "You are an AI assistant of MyChamber application" }, { text: `Mychamber is a application for doctor to manage their chamber` },
                { text: `currently you are serving a doctor called${req.user.Name} and his other informations are ${JSON.stringify(req.user)}. ` }
            ]
        });

        const chat = await model.startChat({
            history: chatHistory,
            generationConfig: {
                maxOutputTokens: 100,
            },
            enableAutomaticFunctionCalling: true,

        });

        const result = await chat.sendMessage(prompt);
        const response = await result.response;
        const text = await response.text();


        res.json(text);

    } catch (error) {
        console.log(error);
    }
}

module.exports = { ChatControll }