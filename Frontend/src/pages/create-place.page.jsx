import CreatePlaceForm from "@/components/CreatePlaceForm";

export default function CreatePlacePage() {
  return (
    <main className="container mx-auto px-4 py-8 min-h-screen">
      <h2 className="text-3xl md:text-4xl font-bold mb-4">Create a Place</h2>
      <CreatePlaceForm />
    </main>
  );
}
