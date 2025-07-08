import React from "react";
import { Routes, Route} from "react-router-dom";
import ChatBot from "./pages//Chatbot";

function App() {
    return (
        <div style={{ minHeight: "1000vh" }}>
            <Routes>
                <Route path="/" element={<ChatBot/>} />
            </Routes>
        </div>
    );
}

export default App;