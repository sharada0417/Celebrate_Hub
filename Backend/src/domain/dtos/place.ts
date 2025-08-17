import { z } from "zod";

export const CreatePlaceDTO = z.object({
  name: z.string(),
  location: z.string(),
  suitableFor: z.array(z.string()), 
  image: z.string(), 
  description: z.string(),
  price: z.string(), 
  services: z.array(z.string()), 
});

