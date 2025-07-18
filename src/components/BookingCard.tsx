import { CalendarDays, MapPin, ArrowRight } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

export interface Booking {
  id: string;
  serviceType: string;
  fromLocation: string;
  toLocation: string;
  startDate: string;
  endDate: string;
  status: 'confirmed' | 'pending' | 'completed';
}

interface BookingCardProps {
  booking: Booking;
  isSelected?: boolean;
  onClick?: () => void;
}

const statusColors = {
  confirmed: "bg-status-confirmed text-white",
  pending: "bg-status-pending text-white",
  completed: "bg-status-completed text-white"
};

export function BookingCard({ booking, isSelected, onClick }: BookingCardProps) {
  return (
    <Card 
      className={cn(
        "p-4 cursor-pointer transition-all duration-200 hover:shadow-[var(--shadow-hover)]",
        "border-border bg-gradient-to-br from-card to-secondary/20",
        isSelected && "ring-2 ring-primary shadow-[var(--shadow-active)]"
      )}
      onClick={onClick}
    >
      <div className="space-y-3">
        {/* Header with ID and Status */}
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium text-muted-foreground">
            #{booking.id}
          </span>
          <Badge className={statusColors[booking.status]} variant="secondary">
            {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
          </Badge>
        </div>

        {/* Service Type */}
        <h3 className="font-semibold text-foreground">{booking.serviceType}</h3>

        {/* Route */}
        <div className="flex items-center space-x-2 text-sm text-muted-foreground">
          <MapPin className="h-4 w-4 flex-shrink-0" />
          <span className="truncate">{booking.fromLocation}</span>
          <ArrowRight className="h-3 w-3 flex-shrink-0" />
          <span className="truncate">{booking.toLocation}</span>
        </div>

        {/* Dates */}
        <div className="flex items-center space-x-2 text-sm text-muted-foreground">
          <CalendarDays className="h-4 w-4 flex-shrink-0" />
          <span>{booking.startDate} – {booking.endDate}</span>
        </div>
      </div>
    </Card>
  );
}