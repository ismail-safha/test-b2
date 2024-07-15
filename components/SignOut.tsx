"use client";

import { signOut } from "next-auth/react";

const handleSignOut = () => {
  signOut({ callbackUrl: "/" });
};

const SignOut = () => {
  return (
    <button type="button" onClick={handleSignOut}>
      Sign out
    </button>
  );
};

export default SignOut;
