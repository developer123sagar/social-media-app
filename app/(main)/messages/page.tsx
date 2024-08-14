import Chat from "@/components/messages/Chat";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Messages",
};

export default function Page() {
  return <Chat />;
}