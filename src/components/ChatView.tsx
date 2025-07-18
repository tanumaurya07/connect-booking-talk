import { useRef, useEffect } from "react";
import { CalendarDays, MapPin, ArrowRight } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ChatMessage, Message } from "./ChatMessage";
import { ChatInput } from "./ChatInput";
import { Booking } from "./BookingCard";
import { Vendor } from "./VendorCard";

interface ChatViewProps {
  booking: Booking;
  vendor: Vendor;
  messages: Message[];
  onSendMessage: (message: string) => void;
}

const statusColors = {
  confirmed: "bg-status-confirmed text-white",
  pending: "bg-status-pending text-white",
  completed: "bg-status-completed text-white"
};

export function ChatView({ booking, vendor, messages, onSendMessage }: ChatViewProps) {
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  return (
    <div className="flex flex-col h-full">
      {/* Booking Summary Header */}
      <Card className="m-4 mb-2 p-4 bg-gradient-to-r from-primary/5 to-accent/5 border-primary/20">
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-muted-foreground">
              Chat with {vendor.name} • #{booking.id}
            </span>
            <Badge className={statusColors[booking.status]} variant="secondary">
              {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
            </Badge>
          </div>
          
          <h3 className="font-semibold text-foreground">{booking.serviceType}</h3>
          
          <div className="flex items-center space-x-2 text-sm text-muted-foreground">
            <MapPin className="h-4 w-4 flex-shrink-0" />
            <span className="truncate">{booking.fromLocation}</span>
            <ArrowRight className="h-3 w-3 flex-shrink-0" />
            <span className="truncate">{booking.toLocation}</span>
          </div>
          
          <div className="flex items-center space-x-2 text-sm text-muted-foreground">
            <CalendarDays className="h-4 w-4 flex-shrink-0" />
            <span>{booking.startDate} – {booking.endDate}</span>
          </div>
        </div>
      </Card>

      {/* Messages Area */}
      <ScrollArea className="flex-1 px-4">
        <div className="space-y-1">
          {messages.map((message) => (
            <ChatMessage key={message.id} message={message} />
          ))}
          <div ref={messagesEndRef} />
        </div>
      </ScrollArea>

      {/* Chat Input */}
      <ChatInput onSendMessage={onSendMessage} />
    </div>
  );
}