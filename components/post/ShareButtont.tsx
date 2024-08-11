import { Link, Send } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useToast } from "../ui/use-toast";

export default function ShareButton({
  postUrl,
}: {
  postUrl: string;
}) {
  const { toast } = useToast();

  function copyPostUrl() {
    const initialUrl =
      process.env.NODE_ENV === "development"
        ? "http://localhost:3000"
        : "https://twittee.vercel.app";

    const completeUrl = `${initialUrl}/${postUrl}`;

    navigator.clipboard
      .writeText(completeUrl)
      .then(() => {
        toast({
          description: "Copied successfully",
        });
      })
      .catch((err) => {
        toast({
          description: "Failed while copying",
          variant: "destructive",
        });
      });
  }

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <div className="flex cursor-pointer items-center gap-2">
            <Send className="size-4 cursor-pointer" />
            <span className="hidden text-sm font-medium sm:inline">Share</span>
          </div>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem onClick={copyPostUrl}>
            <span className="flex cursor-pointer items-center gap-3 text-primary">
              <Link className="size-4" />
              Copy link
            </span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
}
