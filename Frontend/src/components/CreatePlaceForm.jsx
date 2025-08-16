"use client";
import React from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useCreatePlaceMutation } from "@/lib/api.js";
import { toast } from "sonner";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { Textarea } from "./ui/textarea";
import { Badge } from "./ui/badge";

// ✅ Zod validation schema
const formSchema = z.object({
  name: z.string().min(2, "Place name is required"),
  location: z.string().min(2, "Location is required"),
  image: z.string().url("Enter a valid image URL"),
  description: z.string().min(10, "Description must be at least 10 characters"),
  price: z.coerce.number().positive("Price must be greater than 0"),
  suitableFor: z.array(z.string()).min(1, "Select at least one option"),
  services: z.array(z.string()).min(1, "Select at least one service"),
});

const suitableForOptions = [
  "Wedding",
  "Engagement",
  "Birthday Party",
  "Surprise Party",
  "Bridal Shower",
  "Bachelorette Party",
  "Corporate Retreat",
  "Wellness Celebration",
  "Anniversary",
  "Proposal",
];

const servicesOptions = [
  "Food Service",
  "Guest Rooms",
  "Bar Service",
  "Photography",
  "Live Music",
  "Event Decor",
  "Guided Tours",
  "Yoga Sessions",
  "Wine Tasting",
  "Private Chef",
];

const CreatePlaceForm = () => {
  const [createPlace, { isLoading }] = useCreatePlaceMutation();

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      location: "",
      image: "",
      description: "",
      price: "",
      suitableFor: [],
      services: [],
    },
  });

  const handleSubmit = async (values) => {
    try {
      toast.loading("Creating place...");
      await createPlace(values).unwrap();
      toast.success("Place created successfully!");
      form.reset();
    } catch (error) {
      toast.error("Place creation failed");
    }
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleSubmit)}
        className="w-1/2 space-y-6"
      >
        {/* Name */}
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Place Name</FormLabel>
              <FormControl>
                <Input placeholder="Enter place name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Location */}
        <FormField
          control={form.control}
          name="location"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Location</FormLabel>
              <FormControl>
                <Input placeholder="Enter location" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Image */}
        <FormField
          control={form.control}
          name="image"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Image URL</FormLabel>
              <FormControl>
                <Input placeholder="https://example.com/image.jpg" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Description */}
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Write a short description..."
                  rows={4}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Price */}
        <FormField
          control={form.control}
          name="price"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Price ($)</FormLabel>
              <FormControl>
                <Input type="number" placeholder="Enter price" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Suitable For (multi-select with badges) */}
        <FormField
          control={form.control}
          name="suitableFor"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Suitable For</FormLabel>
              <Select
                onValueChange={(val) =>
                  !field.value.includes(val) &&
                  field.onChange([...field.value, val])
                }
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select events" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {suitableForOptions.map((opt) => (
                    <SelectItem key={opt} value={opt}>
                      {opt}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <div className="flex flex-wrap gap-2 mt-2">
                {field.value.map((item, idx) => (
                  <Badge
                    key={idx}
                    onClick={() =>
                      field.onChange(field.value.filter((v) => v !== item))
                    }
                    className="cursor-pointer"
                  >
                    {item} ✕
                  </Badge>
                ))}
              </div>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Services (multi-select with badges) */}
        <FormField
          control={form.control}
          name="services"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Services</FormLabel>
              <Select
                onValueChange={(val) =>
                  !field.value.includes(val) &&
                  field.onChange([...field.value, val])
                }
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select services" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {servicesOptions.map((service) => (
                    <SelectItem key={service} value={service}>
                      {service}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <div className="flex flex-wrap gap-2 mt-2">
                {field.value.map((item, idx) => (
                  <Badge
                    key={idx}
                    onClick={() =>
                      field.onChange(field.value.filter((v) => v !== item))
                    }
                    className="cursor-pointer"
                  >
                    {item} ✕
                  </Badge>
                ))}
              </div>
              <FormMessage />
            </FormItem>
          )}
        />

        <div>
          <Button type="submit" disabled={isLoading}>
            {isLoading ? "Creating..." : "Create Place"}
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default CreatePlaceForm;
