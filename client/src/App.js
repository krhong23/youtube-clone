import React from "react";
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";

import LandingPage from "./components/views/LandingPage/LandingPage";
import LoginPage from "./components/views/LoginPage/LoginPage";
import RegisterPage from "./components/views/RegisterPage/RegisterPage";
import VideoUploadPage from "./components/views/VideoUploadPage/VideoUploadPage";
import VideoDetailPage from "./components/views/VideoDetailPage/VideoDetailPage";

function App() {
    return (
        // react-router-dom
        // v5 Switch component
        // v6 Routes element
        <Router>
            <div>
                <Routes>
                    <Route path="/" element={<LandingPage/>}/>
                    <Route path="/login" element={<LoginPage/>}/>
                    <Route path="/register" element={<RegisterPage/>}/>
                    <Route path="/video/upload" element={<VideoUploadPage/>}/>
                    <Route path="/video/:videoId" element={<VideoDetailPage/>}/>
                </Routes>
            </div>
        </Router>
    );
}

export default App;
