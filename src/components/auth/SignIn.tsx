"use client";
import { signIn, signOut, useSession } from "next-auth/react";
import { Button } from "../ui/button";

export default function SignIn() {
  const { data: session, status } = useSession();

  if (status === "loading") return <div>Loading...</div>;

  if (session) {
    return (
      <div className="flex items-center gap-x-4">
        Signed in as {session.user?.email} <br />
        <Button variant={"destructive"} onClick={() => signOut()}>
          Sign out
        </Button>
      </div>
    );
  }
  return (
    <div className="flex items-center gap-x-4">
      Not signed in <br />
      <Button onClick={() => signIn()}>Sign in</Button>
    </div>
  );
}
