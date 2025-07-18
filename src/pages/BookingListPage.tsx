import { useNavigate } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";

export interface BookingWithMessages {
  id: string;
  serviceType: string;
  fromLocation: string;
  toLocation: string;
  startDate: string;
  endDate: string;
  status: "confirmed" | "pending" | "completed" | "dropped" | "ongoing";
  lastMessage: string;
  lastMessageSender: "customer" | "vendor";
  lastMessageTime: string;
  vendorName?: string;
}

// Mock data with message information
const mockBookings: BookingWithMessages[] = [
  {
    id: "BK-2024-001",
    serviceType: "Luxury Car",
    fromLocation: "Downtown Hotel",
    toLocation: "Airport Terminal 2",
    startDate: "Jan 15, 2024",
    endDate: "Jan 15, 2024",
    status: "ongoing",
    lastMessage: "I'll be there 15 minutes early with a luxury sedan.",
    lastMessageSender: "vendor",
    lastMessageTime: "2 hours ago",
    vendorName: "Premium Transport Co."
  },
  {
    id: "BK-2024-002",
    serviceType: "Bike Delivery",
    fromLocation: "Central Station",
    toLocation: "Business District",
    startDate: "Jan 16, 2024",
    endDate: "Jan 17, 2024",
    status: "pending",
    lastMessage: "What time should I pick up the package?",
    lastMessageSender: "customer",
    lastMessageTime: "1 day ago"
  },
  {
    id: "BK-2024-003",
    serviceType: "Truck Moving",
    fromLocation: "Warehouse A",
    toLocation: "Distribution Center",
    startDate: "Jan 12, 2024",
    endDate: "Jan 12, 2024",
    status: "completed",
    lastMessage: "Thank you! Everything looks great. Excellent service!",
    lastMessageSender: "customer",
    lastMessageTime: "3 days ago",
    vendorName: "Heavy Haul Logistics"
  },
  {
    id: "BK-2024-004",
    serviceType: "Cab Ride",
    fromLocation: "Shopping Mall",
    toLocation: "Residential Area",
    startDate: "Jan 18, 2024",
    endDate: "Jan 18, 2024",
    status: "confirmed",
    lastMessage: "Booking confirmed for tomorrow at 2 PM",
    lastMessageSender: "vendor",
    lastMessageTime: "5 hours ago"
  },
  {
    id: "BK-2024-005",
    serviceType: "Luxury Car",
    fromLocation: "Business Center",
    toLocation: "Airport",
    startDate: "Jan 10, 2024",
    endDate: "Jan 10, 2024",
    status: "dropped",
    lastMessage: "Sorry, we need to cancel due to vehicle issues",
    lastMessageSender: "vendor",
    lastMessageTime: "1 week ago"
  }
];

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

export default function BookingListPage() {
  const navigate = useNavigate();

  const handleBookingClick = (bookingId: string) => {
    navigate(`/booking/${bookingId}/vendors`);
  };

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <h1 className="text-2xl font-semibold text-foreground mb-2">My Bookings</h1>
          <p className="text-muted-foreground">Select a booking to view vendor communications</p>
        </div>

        <ScrollArea className="h-[calc(100vh-160px)]">
          <div className="space-y-4">
            {mockBookings.map((booking) => (
              <Card 
                key={booking.id}
                className="p-6 cursor-pointer transition-all duration-200 hover:shadow-md border-border"
                onClick={() => handleBookingClick(booking.id)}
              >
                <div className="space-y-4">
                  {/* Header with Booking ID and Status */}
                  <div className="flex items-center justify-between">
                    <h3 className="font-medium text-foreground">{booking.id}</h3>
                    <Badge className={`${getStatusColor(booking.status)} capitalize`}>
                      {booking.status}
                    </Badge>
                  </div>

                  {/* Service and Location */}
                  <div>
                    <h4 className="font-medium text-foreground mb-1">{booking.serviceType}</h4>
                    <p className="text-sm text-muted-foreground">
                      {booking.fromLocation} → {booking.toLocation}
                    </p>
                  </div>

                  {/* Dates */}
                  <div className="text-sm text-muted-foreground">
                    {booking.startDate} - {booking.endDate}
                  </div>

                  {/* Last Message */}
                  <div className="border-t border-border pt-3 mt-3">
                    <div className="flex items-start justify-between">
                      <div className="flex-1 min-w-0">
                        <p className="text-sm text-muted-foreground truncate">
                          {booking.lastMessage}
                        </p>
                        <div className="flex items-center gap-2 mt-1">
                          <span className="text-xs text-muted-foreground">
                            {booking.lastMessageSender === "vendor" ? 
                              (booking.vendorName || "Vendor") : "You"}
                          </span>
                          <span className="text-xs text-muted-foreground">•</span>
                          <span className="text-xs text-muted-foreground">
                            {booking.lastMessageTime}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </ScrollArea>
      </div>
    </div>
  );
}