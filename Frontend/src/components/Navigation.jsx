import { Globe } from "lucide-react";
import { Button } from "./ui/button";
import { Link } from "react-router-dom";

function Navigation() {
  return (
    <nav className="z-10 bg-orange-500 flex items-center justify-between px-8 text-white py-4">
      <div className="flex items-center space-x-8">
        <Link to="/" className="text-2xl font-bold">
          Celebrate Hub
        </Link>
        <div className="hidden md:flex space-x-3">
        <Link to={`/`} className="transition-colors hover:text-orange-900">
          Home
        </Link>
        <Link to={`/places`} className="transtion-colors">
          Place
        </Link>
      </div>
      </div>
      
      <div className="flex items-center space-x-4">
        <Button variant="ghost" className="text-white">
          <Globe className="h-5 w-5 mr-2" />
          EN
        </Button>
        <Button variant="ghost" className="bg-orange-900 text-white">
          <Link to="/sign-in">Log In</Link>
        </Button>
        <Button variant="ghost" className="text-white">
          <Link href="/sign-up">Sign Up</Link>
        </Button>
      </div>
    </nav>
  );
}

export default Navigation;
