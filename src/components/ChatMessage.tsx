import { cn } from "@/lib/utils";

export interface Message {
  id: string;
  content: string;
  timestamp: string;
  isVendor: boolean;
}

interface ChatMessageProps {
  message: Message;
}

export function ChatMessage({ message }: ChatMessageProps) {
  return (
    <div className={cn(
      "flex w-full mb-4",
      message.isVendor ? "justify-start" : "justify-end"
    )}>
      <div className={cn(
        "max-w-[75%] rounded-lg px-4 py-2 shadow-sm",
        message.isVendor 
          ? "bg-chat-vendor border border-border" 
          : "bg-chat-customer border border-primary/20"
      )}>
        <p className="text-sm text-foreground leading-relaxed">{message.content}</p>
        <p className={cn(
          "text-xs mt-1",
          message.isVendor ? "text-muted-foreground" : "text-primary/70"
        )}>
          {message.timestamp}
        </p>
      </div>
    </div>
  );
}