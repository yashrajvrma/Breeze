import { Button } from "../../ui/button";
import { ArrowRightIcon, ArrowUp } from "lucide-react";
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
      // className="absolute  right-1.5 bottom-1.5 h-7 w-7"
      className="absolute top-2 right-2 h-7 w-7 bg-blue-500 text-neutral-50 hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed rounded-lg"
    >
      <ArrowRightIcon className="h-4 w-4 text-neutral-50" />
    </Button>
  );
}
