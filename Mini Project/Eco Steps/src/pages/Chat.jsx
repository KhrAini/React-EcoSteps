import React, { useState } from "react";
import { GoogleGenerativeAI, HarmCategory, HarmBlockThreshold } from "@google/generative-ai";
import { marked } from "marked";
import pattern from "../assets/pattern.png";

function App() {
  const [inputUser, setInputUser] = useState("");
  const [messages, setMessages] = useState([
    { role: "ai", text: "Halo! Aku Eko, apa yang bisa aku bantu?" },
  ]);
  const [isLoading, setIsLoading] = useState(false);

  const apiKey = "AIzaSyAtY1guHkiZvVBXhnT-05mbn0gEe5iscfw";
  const genAI = new GoogleGenerativeAI(apiKey);
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash-latest" });

  const generationConfig = {
    temperature: 1,
    topP: 0.95,
    topK: 64,
    maxOutputTokens: 1000,
    responseMimeType: "text/plain",
  };

  const safetySettings = [
    {
      category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT,
      threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
    },
    {
      category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT,
      threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
    },
  ];

  const isEnvironmentRelated = (question) => {
    const keywords = [
      "lingkungan",
      "eco",
      "pemanasan global",
      "deforestasi",
      "hutan",
      "laut",
      "konservasi",
      "polusi",
      "menjaga",
      "pencemaran",
      "sampah",
    ];
    return keywords.some((keyword) =>
      question.toLowerCase().includes(keyword)
    );
  };

  const handlePromptSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    if (!isEnvironmentRelated(inputUser)) {
      const fallbackMessage =
        inputUser.toLowerCase().includes("siapa kamu") ||
        inputUser.toLowerCase().includes("siapa namamu")
          ? "Saya adalah Eko, asisten kamu di EcoSteps. Saya di sini untuk membantu dengan isu-isu lingkungan dan menjaga kelestarian alam!"
          : "Mohon masukkan pertanyaan terkait lingkungan, ekosistem, atau isu-isu hijau.";

      setMessages((prevMessages) => [
        ...prevMessages,
        { role: "ai", text: fallbackMessage },
      ]);
      setIsLoading(false);
      setInputUser("");
      return;
    }

    const themedPrompt = `Namamu adalah Eko. Jawab hanya jika pertanyaan terkait lingkungan, menjaga kelestarian sungai, pantai, hutan, atau isu hijau seperti pemanasan global, konservasi hutan, pencemaran, atau polusi: ${inputUser}`;

    setMessages((prevMessages) => [
      ...prevMessages,
      { role: "user", text: inputUser },
    ]);
    setInputUser("");

    try {
      const chatSession = model.startChat({
        generationConfig,
        safetySettings,
        history: [],
      });

      const result = await chatSession.sendMessage(themedPrompt);
      const markdownResponse = result.response.text();
      const htmlResponse = marked(markdownResponse);

      setMessages((prevMessages) => [
        ...prevMessages,
        { role: "ai", text: htmlResponse },
      ]);
    } catch (error) {
      console.error("Error:", error);
      setMessages((prevMessages) => [
        ...prevMessages,
        { role: "ai", text: "Terjadi kesalahan saat menghubungi AI." },
      ]);
    }

    setIsLoading(false);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      handlePromptSubmit(e);
    }
  };

  return (
    <div
      className="flex flex-col items-center justify-start text-center max-w-full w-full mx-auto mt-0 min-h-screen py-8 px-4 md:px-8 box-border bg-[#c1d1c5] text-green-200"
      style={{
        backgroundImage: `url(${pattern})`,
        backgroundRepeat: "repeat",
        backgroundSize: "100%",
      }}
    >
      <div className="flex flex-col flex-grow w-full max-w-lg space-y-5 mb-4 pt-12 pb-6">
        <ul className="space-y-5">
          {messages.map((message, index) => (
            <li
              key={index}
              className={`flex gap-x-2 sm:gap-x-4 ${
                message.role === "user" ? "justify-end" : "justify-start"
              }`}
            >
              <div
                className={`border-[#42632d] ${
                  message.role === "ai"
                    ? "bg-[#42632d] text-left"
                    : "bg-[#42632d]"
                } rounded-2xl p-3 sm:p-4`}
              >
                <p
                  className="text-sm sm:text-base text-white"
                  dangerouslySetInnerHTML={{ __html: message.text }}
                />
              </div>
            </li>
          ))}
        </ul>
      </div>
      <div className="w-full max-w-lg fixed bottom-0 left-1/2 transform -translate-x-1/2 p-4 bg-transparent">
        <div className="flex space-x-2">
          <input
            type="text"
            value={inputUser}
            onChange={(e) => setInputUser(e.target.value)}
            onKeyDown={handleKeyDown}
            className="border-2 border-[#79896f] text-[#42632d] font-semibold placeholder-[#96a88b] py-2 px-4 rounded-full focus:outline-none focus:border-[#42632d] w-full"
            placeholder="Tanyakan sesuatu pada Eko!"
          />
          <button
            onClick={handlePromptSubmit}
            className="rounded-full border-2 border-transparent bg-[#00703c] hover:bg-black text-white font-medium py-1 px-3 md:py-2 md:px-6 transition duration-300"
            disabled={isLoading}
          >
            {isLoading ? "Memproses..." : "Kirim"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;
