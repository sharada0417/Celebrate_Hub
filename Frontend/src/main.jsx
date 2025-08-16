import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { BrowserRouter, Routes, Route } from "react-router-dom"; 
import Homepage from "./pages/home.page";
import Rootlayout from "./Layout/root-layout";
import Mainlayout from "./Layout/main.layout";
import Placespage from "./pages/places.page";
import Placepage from "./pages/place.page";
import SignUpPage from "./pages/sign-up.page";
import Signinpage from "./pages/sign-in.page";
import { Provider } from "react-redux";
import { store } from "./lib/store";
// import CreatePlacePage from "./pages/create-place.page";
import { ClerkProvider } from "@clerk/clerk-react";
import ProtectedLayout from "./Layout/protected.layout";
import AccountPage from "./pages/account.page";
import CreatePlaceForm from "./components/CreatePlaceForm";
import CreatePlacePage from "./pages/create-place.page";

const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

if (!PUBLISHABLE_KEY) {
  throw new Error("Add your Clerk Publishable key to the .env or .env.local file");
}

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ClerkProvider publishableKey={PUBLISHABLE_KEY}>
      <Provider store={store}>
        <BrowserRouter>
          <Routes>
            {/* Root layout */}
            <Route element={<Rootlayout />}>
              {/* Main layout */}
              <Route element={<Mainlayout />}>
                <Route path="/" element={<Homepage />} />
                <Route path="/places" element={<Placespage />} />
                <Route path="/places/:id" element={<Placepage />} />
              {/* Protected routes */}
              <Route element={<ProtectedLayout />}>
                <Route path="/account" element={<AccountPage />} />
                <Route path="/places/create" element={<CreatePlacePage/>} />
              </Route> 
              </Route>

              {/* Auth routes */}
              <Route path="/sign-in" element={<Signinpage />} />
              <Route path="/sign-up" element={<SignUpPage />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </Provider>
    </ClerkProvider>
  </StrictMode>
);
