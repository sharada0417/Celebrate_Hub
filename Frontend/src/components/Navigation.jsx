import { Globe } from "lucide-react";
import { Button } from "./ui/button";

function Navigation() {
  return (
    <nav className="z-10 bg-orange-500 flex items-center justify-between px-8 text-white py-4">
      <div className="flex items-center space-x-8">
        <a href="/" className="text-2xl font-bold">
          Celebrate Hub
        </a>
        <div className="hidden md:flex space-x-3">
        <a href="/" className="transition-colors hover:text-orange-900">
          Home
        </a>
      </div>
      </div>
      
      <div className="flex items-center space-x-4">
        <Button variant="ghost" className="text-white">
          <Globe className="h-5 w-5 mr-2" />
          EN
        </Button>
        <Button variant="ghost" className="bg-orange-900 text-white">
          <a href="/sign-in">Log In</a>
        </Button>
        <Button variant="ghost" className="text-white">
          <a href="/sign-up">Sign Up</a>
        </Button>
      </div>
    </nav>
  );
}

export default Navigation;
