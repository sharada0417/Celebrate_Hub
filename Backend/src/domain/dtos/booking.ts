import z from "zod";

export const CreateBookingDTO = z.object({
  placeId: z.string(), 
  userId: z.string(),  
  CheckIn: z.string(),
  CheckOut: z.string(),
  PartyType: z.array(z.enum(["Couple Party", "Crowd Party", "Mixed"])),
});

