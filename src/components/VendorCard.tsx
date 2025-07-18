import { MessageCircle } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export interface Vendor {
  id: string;
  name: string;
  profilePhoto?: string;
  serviceInfo: string;
  hasActiveChat?: boolean;
}

interface VendorCardProps {
  vendor: Vendor;
  onClick?: () => void;
}

export function VendorCard({ vendor, onClick }: VendorCardProps) {
  return (
    <Card className="p-4 transition-all duration-200 hover:shadow-[var(--shadow-hover)] bg-gradient-to-br from-card to-secondary/10">
      <div className="flex items-center space-x-4">
        {/* Avatar */}
        <Avatar className="h-12 w-12">
          <AvatarImage src={vendor.profilePhoto} alt={vendor.name} />
          <AvatarFallback className="bg-primary/10 text-primary font-medium">
            {vendor.name.split(' ').map(n => n[0]).join('').slice(0, 2)}
          </AvatarFallback>
        </Avatar>

        {/* Vendor Info */}
        <div className="flex-1 min-w-0">
          <h3 className="font-semibold text-foreground truncate">{vendor.name}</h3>
          <p className="text-sm text-muted-foreground truncate">{vendor.serviceInfo}</p>
        </div>

        {/* Chat Button */}
        <Button 
          onClick={onClick}
          variant={vendor.hasActiveChat ? "default" : "outline"}
          size="sm"
          className="flex-shrink-0"
        >
          <MessageCircle className="h-4 w-4 mr-2" />
          {vendor.hasActiveChat ? "Continue Chat" : "Start Chat"}
        </Button>
      </div>
    </Card>
  );
}