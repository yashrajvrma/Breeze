import { Textarea } from "../ui/textarea";
import { Button } from "../ui/button";
import { MoveRight } from "lucide-react";
import { createChatSession } from "@/app/actions/session";
import CreateChatButton from "./button/CreateChatButton";

export default async function HomeChatLayout() {
  // const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
  //   e.preventDefault();

  //   try {
  //     const response = await axios.post("/api/chat/session", {
  //       userId: userId,
  //       message: message,
  //     });
  //     if (response.data) {
  //       const chatId = response.data?.chatId;
  //       console.log("id", chatId);
  //       router.push(`/chat/${chatId}`);
  //       console.log("after push");
  //     }
  //   } catch (error) {
  //     console.log(`error ${error}`);
  //   }

  // };

  // const createChat = async (formData: FormData) => {
  //   await createChatSession(formData);
  // };

  return (
    <div className="flex justify-center items-center align-middle font-sans h-screen">
      <div className="flex flex-col items-center align-middle text-center">
        <div className="text-5xl font-semibold text-foreground">
          What do you want to build?
        </div>
        <div className="mt-2 text-lg font-normal text-muted-foreground">
          Prompt, create and edit word documents .
        </div>
        <div className="w-[500px] mt-7">
          <form action={createChatSession} className="relative">
            <Textarea
              name="message"
              placeholder="How can Breeze help you today?"
              className="font-medium text-sm p-5 min-h-[150px] max-h-[600px] resize-none focus:outline-none w-full"
              rows={1}
              required
            />
            {/* <Button
              size="icon"
              type="submit"
              className="absolute top-4 right-4 h-9 w-9 bg-cyan-500 hover:bg-cyan-600"
            >
              <MoveRight className="h-5 w-5 text-foreground" />
              <span className="sr-only">Send message</span>
            </Button> */}
            <CreateChatButton />
          </form>
        </div>
      </div>
    </div>
  );
}
