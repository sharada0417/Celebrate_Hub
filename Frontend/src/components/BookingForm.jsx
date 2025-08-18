import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { DatePicker } from "./DatePicker";
import { addDays } from "date-fns";

// zod schema: checkIn/checkOut are Dates, partyType is a string enum
const formSchema = z
  .object({
    checkIn: z.date({
      required_error: "Check-in date is required",
    }),
    checkOut: z.date({
      required_error: "Check-out date is required",
    }),
    partyType: z.enum(["Couple Party", "Crowd Party", "Mixed"]),
  })
  .refine((data) => data.checkOut > data.checkIn, {
    message: "Check-out date must be after check-in date",
    path: ["checkOut"],
  });

export default function BookingForm({ onSubmit, isLoading, placeId }) {
  const tomorrow = addDays(new Date(), 1);

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      checkIn: new Date(),
      checkOut: tomorrow,
      partyType: "Couple Party",
    },
  });

  // convert to backend shape and call parent onSubmit
  const handleSubmit = (values) => {
    // backend expects: placeId, userId (server sets), CheckIn, CheckOut, PartyType (array)
    const payload = {
      placeId, // passed from parent BookingDailog
      CheckIn: values.checkIn.toISOString(),
      CheckOut: values.checkOut.toISOString(),
      PartyType: [values.partyType], // our schema uses single select — store as array to match Mongoose schema
    };

    return onSubmit(payload);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="checkIn"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>Check-in Date</FormLabel>
              <DatePicker field={field} />
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="checkOut"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>Check-out Date</FormLabel>
              <DatePicker field={field} />
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="partyType"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Party Type</FormLabel>
              <FormControl>
                <select
                  value={field.value}
                  onChange={(e) => field.onChange(e.target.value)}
                  className="w-full p-2 border rounded"
                >
                  <option value="Couple Party">Couple Party</option>
                  <option value="Crowd Party">Crowd Party</option>
                  <option value="Mixed">Mixed</option>
                </select>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" className="w-full" disabled={isLoading}>
          {isLoading ? "Booking..." : "Book Now"}
        </Button>
      </form>
    </Form>
  );
}