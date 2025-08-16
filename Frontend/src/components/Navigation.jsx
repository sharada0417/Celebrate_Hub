import { Globe } from "lucide-react";
import { Button } from "./ui/button";
import { Link } from "react-router-dom";
import { SignedIn, SignedOut, SignOutButton, UserButton } from "@clerk/clerk-react";

function Navigation() {
  return (
    <nav className="z-10 bg-orange-500 flex items-center justify-between px-8 text-white py-4">
      {/* Left side - Logo and Links */}
      <div className="flex items-center space-x-8">
        <Link to="/" className="text-2xl font-bold">
          Celebrate Hub
        </Link>
        
        <div className="hidden md:flex space-x-3 mr-5">
          <SignedIn>
          <Link to={`/places/create`} className="transition-colors hover:text-orange-900">
            Create Place
          </Link>
          </SignedIn>
        </div>
      </div>
      
      {/* Right side - Language & Authentication */}
      <div className="flex items-center space-x-4">
        {/* Language Button */}
        <Button variant="ghost" className="text-white">
          <Globe className="h-5 w-5 mr-2" />
          EN
        </Button>

        {/* Signed out buttons */}
        <SignedOut>
          <Button asChild variant="ghost" className="text-white">
            <Link to="/sign-in">Log In</Link>
          </Button>
          <Button asChild variant="ghost" className="text-white">
            <Link to="/sign-up">Sign Up</Link>
          </Button>
        </SignedOut>

        {/* Signed in buttons */}
        <SignedIn>
          {/* User profile button */}
          <UserButton />
          {/* Optional account link */}
          <Button  variant="ghost"  className="bg-orange-800 hover:bg-orange-700 text-white">
            <Link to="/account">My Account</Link>
          </Button>

          {/* Sign out button */}
          <SignOutButton>
            <Button variant="ghost" className="text-white">
              Log Out
            </Button>
          </SignOutButton>
        </SignedIn>
      </div>
    </nav>
  );
}

export default Navigation;
