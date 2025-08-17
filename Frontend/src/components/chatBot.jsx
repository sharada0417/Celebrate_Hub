import React, { useState } from "react";
import { useSendMessageMutation } from "@/lib/api";
import { Form, FormField, FormItem, FormControl } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";

const ChatBot = () => {
  const [messages, setMessages] = useState([
    { role: "assistant", content: "🎉 Hi! I’m your Celebrate Hub assistant. How can I help you plan your perfect party today?" }
  ]);
  const [sendMessage, { isLoading }] = useSendMessageMutation();

  // ✅ Create useForm instance
  const form = useForm({ defaultValues: { message: "" } });

  const handleSend = async (values) => {
    if (!values.message.trim()) return;

    const newMessages = [...messages, { role: "user", content: values.message }];
    setMessages(newMessages);
    form.reset();

    try {
      const response = await sendMessage(newMessages).unwrap();
      setMessages(response.messages);
    } catch (error) {
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: "⚠️ Please ask relevant questions." },
      ]);
    }
  };

  return (
    <div className="w-full max-w-md mx-auto p-3 border rounded-xl shadow-md bg-white flex flex-col h-[500px]">
      <h2 className="text-lg font-bold mb-2 text-center text-orange-600">💬 Celebrate Hub ChatBot</h2>
      
      {/* Chat messages */}
      <div className="flex-1 overflow-y-auto mb-2 space-y-2 p-2 bg-orange-50 rounded-lg text-sm">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`p-2 rounded-lg max-w-[75%] ${
              msg.role === "user"
                ? "bg-orange-600 text-white ml-auto"
                : "bg-gray-200 text-black"
            }`}
          >
            {msg.content}
          </div>
        ))}
        {isLoading && (
          <div className="p-2 bg-gray-200 text-gray-600 rounded-lg w-fit text-xs">Typing...</div>
        )}
      </div>

      {/* Input form */}
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSend)} className="flex space-x-2 items-center">
          <FormField
            control={form.control} // ✅ pass control
            name="message"
            render={({ field }) => (
              <FormItem className="flex-1">
                <FormControl>
                  <Input
                    {...field}
                    type="text"
                    placeholder="Type your message..."
                    className="text-sm"
                  />
                </FormControl>
              </FormItem>
            )}
          />
          <Button
            type="submit"
            disabled={isLoading}
            className="bg-orange-600 text-white px-3 py-1 rounded-lg hover:bg-orange-700 text-sm"
          >
            Send
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default ChatBot;
