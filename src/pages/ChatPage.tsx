import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, ChevronDown, ChevronUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ChatInput } from "@/components/ChatInput";
import { ChatMessage, Message } from "@/components/ChatMessage";

// Mock data
const mockBookingDetails: Record<string, any> = {
  "BK-2024-001": {
    id: "BK-2024-001",
    serviceType: "Luxury Car",
    fromLocation: "Downtown Hotel",
    toLocation: "Airport Terminal 2",
    startDate: "Jan 15, 2024",
    endDate: "Jan 15, 2024",
    time: "10:00 AM",
    status: "ongoing"
  }
};

const mockVendorDetails: Record<string, any> = {
  "V001": {
    id: "V001",
    name: "Premium Transport Co.",
    profilePhoto: "",
  }
};

const mockMessages: Record<string, Message[]> = {
  "BK-2024-001-V001": [
    {
      id: "M1",
      content: "Hello! I'm your assigned driver for the airport transfer. I'll be there 15 minutes early with a luxury sedan.",
      timestamp: "2:30 PM",
      isVendor: true
    },
    {
      id: "M2",
      content: "Perfect! What's the license plate number?",
      timestamp: "2:32 PM",
      isVendor: false
    },
    {
      id: "M3",
      content: "License plate: LUX-789. I'll be in the hotel lobby wearing a blue uniform.",
      timestamp: "2:33 PM",
      isVendor: true
    },
    {
      id: "M4",
      content: "Great, I'll be down in 5 minutes. Thank you!",
      timestamp: "2:35 PM",
      isVendor: false
    }
  ]
};

const getStatusColor = (status: string) => {
  switch (status) {
    case "confirmed": return "bg-emerald-100 text-emerald-800 border-emerald-200";
    case "pending": return "bg-amber-100 text-amber-800 border-amber-200";
    case "completed": return "bg-slate-100 text-slate-600 border-slate-200";
    case "ongoing": return "bg-blue-100 text-blue-800 border-blue-200";
    case "dropped": return "bg-red-100 text-red-800 border-red-200";
    default: return "bg-slate-100 text-slate-600 border-slate-200";
  }
};

export default function ChatPage() {
  const { bookingId, vendorId } = useParams<{ bookingId: string; vendorId: string }>();
  const navigate = useNavigate();
  const [isBookingDetailsExpanded, setIsBookingDetailsExpanded] = useState(false);
  const [messages, setMessages] = useState<Message[]>(
    bookingId && vendorId ? mockMessages[`${bookingId}-${vendorId}`] || [] : []
  );

  const booking = bookingId ? mockBookingDetails[bookingId] : null;
  const vendor = vendorId ? mockVendorDetails[vendorId] : null;

  const handleBackClick = () => {
    navigate(`/booking/${bookingId}/vendors`);
  };

  const handleSendMessage = (content: string) => {
    const newMessage: Message = {
      id: `M${Date.now()}`,
      content,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      isVendor: false
    };

    setMessages(prev => [...prev, newMessage]);
  };

  if (!booking || !vendor) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-xl font-medium text-foreground mb-2">Chat not found</h2>
          <Button onClick={handleBackClick} variant="outline">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Vendors
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <div className="border-b border-border bg-card/50">
        <div className="p-4">
          <Button 
            onClick={handleBackClick} 
            variant="ghost" 
            size="sm"
            className="mb-3 p-0 h-auto text-muted-foreground hover:text-foreground"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Vendors
          </Button>
          
          {/* Vendor Header */}
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Avatar className="h-10 w-10">
                <AvatarImage src={vendor.profilePhoto} alt={vendor.name} />
                <AvatarFallback className="bg-muted text-muted-foreground font-medium">
                  {vendor.name.split(' ').map((n: string) => n[0]).join('').slice(0, 2)}
                </AvatarFallback>
              </Avatar>
              <div>
                <h2 className="font-medium text-foreground">{vendor.name}</h2>
                <p className="text-sm text-muted-foreground">{booking.serviceType}</p>
              </div>
            </div>
            
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsBookingDetailsExpanded(!isBookingDetailsExpanded)}
              className="text-muted-foreground hover:text-foreground"
            >
              {isBookingDetailsExpanded ? (
                <ChevronUp className="h-4 w-4" />
              ) : (
                <ChevronDown className="h-4 w-4" />
              )}
            </Button>
          </div>
        </div>

        {/* Expandable Booking Details */}
        {isBookingDetailsExpanded && (
          <div className="px-4 pb-4">
            <Card className="p-4 bg-background">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-foreground">Booking Details</span>
                  <Badge className={`${getStatusColor(booking.status)} capitalize text-xs`}>
                    {booking.status}
                  </Badge>
                </div>
                
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-muted-foreground">Booking ID:</span>
                    <p className="font-medium text-foreground">{booking.id}</p>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Service:</span>
                    <p className="font-medium text-foreground">{booking.serviceType}</p>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Date:</span>
                    <p className="font-medium text-foreground">{booking.startDate}</p>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Time:</span>
                    <p className="font-medium text-foreground">{booking.time}</p>
                  </div>
                </div>
                
                <div>
                  <span className="text-muted-foreground text-sm">Pickup Location:</span>
                  <p className="font-medium text-foreground">{booking.fromLocation}</p>
                  <p className="text-sm text-muted-foreground mt-1">
                    → {booking.toLocation}
                  </p>
                </div>
              </div>
            </Card>
          </div>
        )}
      </div>

      {/* Messages */}
      <ScrollArea className="flex-1 p-4">
        <div className="max-w-4xl mx-auto space-y-4">
          {messages.map((message) => (
            <ChatMessage key={message.id} message={message} />
          ))}
        </div>
      </ScrollArea>

      {/* Input */}
      <div className="border-t border-border">
        <div className="max-w-4xl mx-auto">
          <ChatInput onSendMessage={handleSendMessage} />
        </div>
      </div>
    </div>
  );
}