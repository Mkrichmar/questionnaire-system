import { useSession } from "next-auth/react";
import Navbar from "../src/components/Navbar";
import QuestionnaireSelection from "./questionnaire-selection";

export default function QuestionnairePage() {
  const { data: session, status } = useSession();

  if (status === "loading") {
    return <p>Loading...</p>;
  }

  if (status === "unauthenticated") {
    return <p>Access Denied. Please log in.</p>;
  }

  return (
    <div>
        <Navbar/>
      <h1>Home Page</h1>
      <p>Welcome, {session?.user?.name || session?.user?.email || "User"}</p>
      <QuestionnaireSelection/>
    </div>
  );
}