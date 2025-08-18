import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import BookingForm from "./BookingForm";
import { useState } from "react";

export function BookingDialog({ placeName, placeId, onSubmit, isLoading }) {
  const [open, setOpen] = useState(false);

  // Wait for the parent onSubmit (which returns a promise). Close only on success.
  const handleBookingSubmit = async (bookingData) => {
    try {
      // onSubmit should return a promise (your Placepage handler does)
      await onSubmit(bookingData);
      setOpen(false);
    } catch (err) {
      // keep the dialog open on error so user can retry
      // optionally show error (parent already handles toast)
      console.error("Booking failed:", err);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button size="lg">Book Now</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Book Your Stay</DialogTitle>
          <DialogDescription>
            Complete the form below to book your stay at {placeName}.
          </DialogDescription>
        </DialogHeader>

        {/* pass placeId down so BookingForm can include it in the payload */}
        <BookingForm
          onSubmit={handleBookingSubmit}
          isLoading={isLoading}
          placeId={placeId}
        />
      </DialogContent>
    </Dialog>
  );
}
