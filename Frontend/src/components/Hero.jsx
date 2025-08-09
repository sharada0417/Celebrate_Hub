import { Sparkle, Sparkles } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";

function Hero(){
   return(
 <div className="">
    {/*Hero content*/}
    <div className="relative z-10 flex flex-col items-center text-white justify-center px-8 pt-32 pb32">
      <h1 className="text-4xl md:text-6xl font-bold mb-8 text-center">
         Find Your party place
      </h1>
      <p className="text-xl mb-12 text-center max-w-2xl">
         Describe your dream party destionation and experince , and we'll find the prefect place for you
      </p>

      {/*serch form*/}
      <form
         className="w-full max-w-3xl bg-black/10 backdrop-blur-md lg:h-16 round-full p-2 flex items-center"
      >
         <Input
            type="text"
            placeholder = "Describe your desingn, expreince , or hotel..."
            className = "flex-grow bg-transparent lg:text-lg text-white placeholder:text-white/50 border-none outline-none focus:border-none focus:outline-none focus-visible:ring-0"
         />
         <Button
            type="submit"
            className="rounded-full w-48 flex items-center gap-x-2 lg:h-12"
         >
            <Sparkles
               style={{ width: "20px" , height:"20px"}}
               className="mr-2 animate-pulse text-orange-600"
            />
            <span className="lg:text-lg">AI Search</span>
         </Button>
      </form>
    </div>
 </div>
   )
}
export default Hero;