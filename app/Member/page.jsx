import { getServerSession } from "next-auth";
import options from "../api/auth/[...nextauth]/option";
import { redirect } from "next/navigation";

const MamberPage = async () => {
  const session = await getServerSession(options);
  if (!session) {
    redirect("/api/auth/signin?callbackUrl=/Member");
  }
  return (
    <div>
      <h1>Member server Session</h1>
      <p>{session?.user?.email}</p>
      <p>{session?.user?.role}</p>
    </div>
  );
};

export default MamberPage;
