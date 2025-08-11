import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { BrowserRouter, Routes, Route } from "react-router-dom"; // ✅ use react-router-dom
import Homepage from "./pages/home.page";
import Rootlayout from "./Layout/root-layout";
import Mainlayout from "./Layout/main.layout";
import Placespage from "./pages/places.page";
import Placepage from "./pages/place.page";
import SignUpPage from "./pages/sign-up.page";
import Signinpage from "./pages/sign-in.page";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        {/* Root layout */}
        <Route element={<Rootlayout />}>
          {/* Main layout */}
          <Route element={<Mainlayout />}>
            <Route path="/" element={<Homepage />} />
            <Route path="/places" element={<Placespage />} />
            <Route path="/places/:id" element={<Placepage />} />
          </Route>

          {/* Auth routes (not inside Mainlayout) */}
          <Route path="/sign-in" element={<Signinpage />} />
          <Route path="/sign-up" element={<SignUpPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </StrictMode>
);
