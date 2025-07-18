import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ScrollArea } from "@/components/ui/scroll-area";

interface VendorWithMessages {
  id: string;
  name: string;
  profilePhoto?: string;
  lastMessage: string;
  lastMessageTime: string;
  hasUnread?: boolean;
}

// Mock vendor data with messages
const mockVendorsByBooking: Record<string, VendorWithMessages[]> = {
  "BK-2024-001": [
    {
      id: "V001",
      name: "Premium Transport Co.",
      lastMessage: "I'll be there 15 minutes early with a luxury sedan.",
      lastMessageTime: "2 hours ago",
      hasUnread: true
    },
    {
      id: "V002",
      name: "Elite Car Services",
      lastMessage: "Available for your booking. Professional service guaranteed.",
      lastMessageTime: "1 day ago",
      hasUnread: false
    }
  ],
  "BK-2024-002": [
    {
      id: "V003",
      name: "Swift Bike Delivery",
      lastMessage: "Ready to pick up your package. ETA 10 minutes.",
      lastMessageTime: "1 day ago",
      hasUnread: false
    },
    {
      id: "V004",
      name: "City Courier Express",
      lastMessage: "Package delivery completed successfully.",
      lastMessageTime: "2 days ago",
      hasUnread: false
    }
  ],
  "BK-2024-003": [
    {
      id: "V005",
      name: "Heavy Haul Logistics",
      lastMessage: "Moving completed successfully! All items delivered safely.",
      lastMessageTime: "3 days ago",
      hasUnread: false
    }
  ],
  "BK-2024-004": [
    {
      id: "V006",
      name: "Metro Cab Company",
      lastMessage: "Booking confirmed for tomorrow at 2 PM",
      lastMessageTime: "5 hours ago",
      hasUnread: true
    },
    {
      id: "V007",
      name: "Quick Rides",
      lastMessage: "Driver assigned. Will contact you shortly.",
      lastMessageTime: "6 hours ago",
      hasUnread: false
    }
  ],
  "BK-2024-005": [
    {
      id: "V008",
      name: "Luxury Fleet Services",
      lastMessage: "Sorry, we need to cancel due to vehicle issues",
      lastMessageTime: "1 week ago",
      hasUnread: false
    }
  ]
};

// Mock booking details
const mockBookingDetails: Record<string, any> = {
  "BK-2024-001": {
    id: "BK-2024-001",
    serviceType: "Luxury Car",
    fromLocation: "Downtown Hotel",
    toLocation: "Airport Terminal 2",
    startDate: "Jan 15, 2024",
    endDate: "Jan 15, 2024",
    status: "ongoing"
  },
  "BK-2024-002": {
    id: "BK-2024-002",
    serviceType: "Bike Delivery",
    fromLocation: "Central Station",
    toLocation: "Business District",
    startDate: "Jan 16, 2024",
    endDate: "Jan 17, 2024",
    status: "pending"
  },
  "BK-2024-003": {
    id: "BK-2024-003",
    serviceType: "Truck Moving",
    fromLocation: "Warehouse A",
    toLocation: "Distribution Center",
    startDate: "Jan 12, 2024",
    endDate: "Jan 12, 2024",
    status: "completed"
  },
  "BK-2024-004": {
    id: "BK-2024-004",
    serviceType: "Cab Ride",
    fromLocation: "Shopping Mall",
    toLocation: "Residential Area",
    startDate: "Jan 18, 2024",
    endDate: "Jan 18, 2024",
    status: "confirmed"
  },
  "BK-2024-005": {
    id: "BK-2024-005",
    serviceType: "Luxury Car",
    fromLocation: "Business Center",
    toLocation: "Airport",
    startDate: "Jan 10, 2024",
    endDate: "Jan 10, 2024",
    status: "dropped"
  }
};

export default function VendorListPage() {
  const { bookingId } = useParams<{ bookingId: string }>();
  const navigate = useNavigate();

  const booking = bookingId ? mockBookingDetails[bookingId] : null;
  const vendors = bookingId ? mockVendorsByBooking[bookingId] || [] : [];

  const handleVendorClick = (vendorId: string) => {
    navigate(`/booking/${bookingId}/vendor/${vendorId}/chat`);
  };

  const handleBackClick = () => {
    navigate("/");
  };

  if (!booking) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-xl font-medium text-foreground mb-2">Booking not found</h2>
          <Button onClick={handleBackClick} variant="outline">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Bookings
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <Button 
            onClick={handleBackClick} 
            variant="ghost" 
            className="mb-4 p-0 h-auto text-muted-foreground hover:text-foreground"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Bookings
          </Button>
          
          <div className="space-y-2">
            <h1 className="text-2xl font-semibold text-foreground">
              {booking.serviceType} - {booking.id}
            </h1>
            <p className="text-muted-foreground">
              {booking.fromLocation} → {booking.toLocation}
            </p>
            <p className="text-sm text-muted-foreground">
              {booking.startDate} - {booking.endDate}
            </p>
          </div>
        </div>

        {/* Vendors List */}
        <div className="mb-4">
          <h2 className="text-lg font-medium text-foreground mb-4">
            Vendors ({vendors.length})
          </h2>
        </div>

        <ScrollArea className="h-[calc(100vh-200px)]">
          <div className="space-y-4">
            {vendors.map((vendor) => (
              <Card 
                key={vendor.id}
                className="p-6 cursor-pointer transition-all duration-200 hover:shadow-md border-border"
                onClick={() => handleVendorClick(vendor.id)}
              >
                <div className="flex items-center space-x-4">
                  {/* Avatar */}
                  <div className="relative">
                    <Avatar className="h-12 w-12">
                      <AvatarImage src={vendor.profilePhoto} alt={vendor.name} />
                      <AvatarFallback className="bg-muted text-muted-foreground font-medium">
                        {vendor.name.split(' ').map(n => n[0]).join('').slice(0, 2)}
                      </AvatarFallback>
                    </Avatar>
                    {vendor.hasUnread && (
                      <div className="absolute -top-1 -right-1 w-3 h-3 bg-primary rounded-full"></div>
                    )}
                  </div>

                  {/* Vendor Info */}
                  <div className="flex-1 min-w-0">
                    <h3 className="font-medium text-foreground mb-1">{vendor.name}</h3>
                    <p className="text-sm text-muted-foreground truncate mb-1">
                      {vendor.lastMessage}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {vendor.lastMessageTime}
                    </p>
                  </div>

                  {/* Unread indicator */}
                  {vendor.hasUnread && (
                    <div className="flex-shrink-0">
                      <div className="w-2 h-2 bg-primary rounded-full"></div>
                    </div>
                  )}
                </div>
              </Card>
            ))}
          </div>
        </ScrollArea>

        {vendors.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted-foreground">No vendors available for this booking</p>
          </div>
        )}
      </div>
    </div>
  );
}