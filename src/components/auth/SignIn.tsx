"use client";

import { signIn, signOut, useSession } from "next-auth/react";

export default function SignIn() {
  const { data: session, status } = useSession();

  if (status === "loading") return <div>Loading...</div>;

  if (session) {
    return (
      <div className="flex items-center gap-x-4">
        Signed in as {session.user?.email ?? session.user?.name} <br />
        <div className="w-1/2 sm:w-24 flex items-center justify-center bg-maroon">
          <button onClick={() => signOut()} className="button-maroon">
            Sign out
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex items-center gap-x-4">
      Not signed in <br />
      <div className="w-1/2 sm:w-24 flex items-center justify-center bg-cream">
        <button onClick={() => signIn()} className="button-gray">
          Sign in
        </button>
      </div>
    </div>
  );
}
