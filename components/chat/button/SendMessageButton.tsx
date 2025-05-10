import { Button } from "../../ui/button";
import { ArrowUp } from "lucide-react";
import { experimental_useFormStatus as useFormStatus } from "react-dom";

interface Message {
  inputMessage: string;
  isLoading: boolean;
}

export default function SendMessageButton({
  inputMessage,
  isLoading,
}: Message) {
  const { pending } = useFormStatus();

  return (
    <Button
      size="icon"
      type="submit"
      disabled={pending || !inputMessage.trim() || isLoading}
      className="absolute right-1.5 bottom-1.5 h-7 w-7"
    >
      <ArrowUp className="h-4 w-4" />
    </Button>
  );
}
