import { Button } from "@/components/ui/button";
import { useCreatePlaceMutation } from "@/lib/api";
import { toast } from "sonner";

export default function CreateHotelPage(){
    const [createPlace,{isLoading}] = useCreatePlaceMutation();

    const handleClick =async() => {
        try {
         toast.loading("Creating places...");
         await createPlace({
            name: "Sunset Soirée Beach",
            location: "Maldives",
            suitableFor: ["Engagement", "Wedding", "Surprise Party"],
            image: "https://www.paperlesspost.com/blog/wp-content/uploads/00_16BeachBirthdyIdeas_Hero.png",
            description: "A serene white-sand beach venue that glows at sunset, perfect for romantic proposals, intimate weddings, or surprise celebrations. Natural ambiance and ocean backdrop set the mood.",
            rating: 4.9,
            reviews: 120,
            price: 1500,
            services: [
                "Food Service",
                 "Guest Rooms",
                 "Bar Service",
                 "Photography",
                "Live Music",
            ],
         }).unwrap();
         toast.success("Place created sucessfully");
        } catch (error) {
            toast.success("Place creation fail")
        }
    };
    return(
        <main className="container mx-auto px-4 py-8 min-h-screen">
            <h1 className="text-2xl font-bold">Create a place</h1>
            <div className="mt-4">
                <Button onClick={handleClick}>Create place</Button>
            </div>
        </main>
        
    )
}