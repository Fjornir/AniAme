import { log } from "console";
import React from "react";
import MainAnimePage from "./pages/mainPage";
import DetailedAnimePage from "./pages/detailedAnimePage";
import "./style/main.scss";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ScrollToTop from "./common/scrollToTop";
import Header from "./components/header";
import AnimeListPage from "./pages/listAnimePage";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Header></Header>
        <div className="content-width">
          <ScrollToTop />
          <Routes>
            <Route path="AniAme" element={<MainAnimePage />} />
            <Route
              path="/anime/search"
              element={<AnimeListPage key={window.location.pathname} />}
            />
            <Route
              path="anime/:id"
              element={<DetailedAnimePage key={window.location.pathname} />}
            />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
