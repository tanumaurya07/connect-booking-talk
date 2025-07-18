import { useState } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { BookingCard, Booking } from "./BookingCard";
import { VendorCard, Vendor } from "./VendorCard";
import { ChatView } from "./ChatView";
import { Message } from "./ChatMessage";

// Mock data
const mockBookings: Booking[] = [
  {
    id: "BK-2024-001",
    serviceType: "Luxury Car",
    fromLocation: "Downtown Hotel",
    toLocation: "Airport Terminal 2",
    startDate: "Jan 15, 2024",
    endDate: "Jan 15, 2024",
    status: "confirmed"
  },
  {
    id: "BK-2024-002",
    serviceType: "Bike Delivery",
    fromLocation: "Central Station",
    toLocation: "Business District",
    startDate: "Jan 16, 2024",
    endDate: "Jan 17, 2024",
    status: "pending"
  },
  {
    id: "BK-2024-003",
    serviceType: "Truck Moving",
    fromLocation: "Warehouse A",
    toLocation: "Distribution Center",
    startDate: "Jan 12, 2024",
    endDate: "Jan 12, 2024",
    status: "completed"
  },
  {
    id: "BK-2024-004",
    serviceType: "Cab Ride",
    fromLocation: "Shopping Mall",
    toLocation: "Residential Area",
    startDate: "Jan 18, 2024",
    endDate: "Jan 18, 2024",
    status: "confirmed"
  }
];

const mockVendors: Record<string, Vendor[]> = {
  "BK-2024-001": [
    {
      id: "V001",
      name: "Premium Transport Co.",
      serviceInfo: "Luxury vehicle specialist • 4.9★",
      hasActiveChat: true
    },
    {
      id: "V002",
      name: "Elite Car Services",
      serviceInfo: "Professional chauffeur service • 4.8★",
      hasActiveChat: false
    }
  ],
  "BK-2024-002": [
    {
      id: "V003",
      name: "Swift Bike Delivery",
      serviceInfo: "Fast & reliable delivery • 4.7★",
      hasActiveChat: false
    },
    {
      id: "V004",
      name: "City Courier Express",
      serviceInfo: "Same-day delivery specialists • 4.6★",
      hasActiveChat: false
    }
  ],
  "BK-2024-003": [
    {
      id: "V005",
      name: "Heavy Haul Logistics",
      serviceInfo: "Professional moving services • 4.8★",
      hasActiveChat: true
    }
  ],
  "BK-2024-004": [
    {
      id: "V006",
      name: "Metro Cab Company",
      serviceInfo: "24/7 taxi service • 4.5★",
      hasActiveChat: false
    },
    {
      id: "V007",
      name: "Quick Rides",
      serviceInfo: "Affordable & punctual • 4.4★",
      hasActiveChat: false
    }
  ]
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
    }
  ],
  "BK-2024-003-V005": [
    {
      id: "M4",
      content: "Moving completed successfully! All items were delivered safely to the distribution center.",
      timestamp: "Jan 12, 4:45 PM",
      isVendor: true
    },
    {
      id: "M5",
      content: "Thank you! Everything looks great. Excellent service!",
      timestamp: "Jan 12, 5:02 PM",
      isVendor: false
    }
  ]
};

export function BookingChatInterface() {
  const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null);
  const [selectedVendor, setSelectedVendor] = useState<Vendor | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);

  const handleBookingSelect = (booking: Booking) => {
    setSelectedBooking(booking);
    setSelectedVendor(null);
    setMessages([]);
  };

  const handleVendorSelect = (vendor: Vendor) => {
    setSelectedVendor(vendor);
    const chatKey = `${selectedBooking?.id}-${vendor.id}`;
    setMessages(mockMessages[chatKey] || []);
  };

  const handleSendMessage = (content: string) => {
    if (!selectedBooking || !selectedVendor) return;

    const newMessage: Message = {
      id: `M${Date.now()}`,
      content,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      isVendor: false
    };

    setMessages(prev => [...prev, newMessage]);
  };

  return (
    <div className="h-screen bg-background flex">
      {/* Left Panel - Booking List */}
      <div className="w-80 border-r border-border bg-card/50">
        <div className="p-4 border-b border-border">
          <h2 className="text-lg font-semibold text-foreground">My Bookings</h2>
          <p className="text-sm text-muted-foreground">Select a booking to view vendors</p>
        </div>
        <ScrollArea className="h-[calc(100vh-80px)]">
          <div className="p-4 space-y-3">
            {mockBookings.map((booking) => (
              <BookingCard
                key={booking.id}
                booking={booking}
                isSelected={selectedBooking?.id === booking.id}
                onClick={() => handleBookingSelect(booking)}
              />
            ))}
          </div>
        </ScrollArea>
      </div>

      {/* Center Panel - Vendor List */}
      <div className="w-96 border-r border-border bg-background">
        {selectedBooking ? (
          <>
            <div className="p-4 border-b border-border">
              <h2 className="text-lg font-semibold text-foreground">Available Vendors</h2>
              <p className="text-sm text-muted-foreground">
                Vendors for booking #{selectedBooking.id}
              </p>
            </div>
            <ScrollArea className="h-[calc(100vh-80px)]">
              <div className="p-4 space-y-3">
                {mockVendors[selectedBooking.id]?.map((vendor) => (
                  <VendorCard
                    key={vendor.id}
                    vendor={vendor}
                    onClick={() => handleVendorSelect(vendor)}
                  />
                ))}
              </div>
            </ScrollArea>
          </>
        ) : (
          <div className="flex items-center justify-center h-full text-center p-8">
            <div>
              <div className="text-4xl mb-4">📋</div>
              <h3 className="text-lg font-medium text-foreground mb-2">Select a Booking</h3>
              <p className="text-sm text-muted-foreground">
                Choose a booking from the left panel to view available vendors
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Right Panel - Chat */}
      <div className="flex-1 bg-background">
        {selectedBooking && selectedVendor ? (
          <ChatView
            booking={selectedBooking}
            vendor={selectedVendor}
            messages={messages}
            onSendMessage={handleSendMessage}
          />
        ) : (
          <div className="flex items-center justify-center h-full text-center p-8">
            <div>
              <div className="text-4xl mb-4">💬</div>
              <h3 className="text-lg font-medium text-foreground mb-2">
                {selectedBooking ? "Select a Vendor" : "Ready to Chat"}
              </h3>
              <p className="text-sm text-muted-foreground max-w-md">
                {selectedBooking 
                  ? "Choose a vendor from the center panel to start or continue your conversation"
                  : "Select a booking and vendor to start chatting about your service needs"
                }
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}