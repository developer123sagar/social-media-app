import Image from "next/image";
import Link from "next/link";
import { Metadata } from "next";

import SignUpForm from "@/components/auth/SignUpForm";

export const metadata: Metadata = {
  title: "Sign Up",
};

const SignUp = () => {
  return (
    <main className="flex-center h-screen p-5">
      <div className="flex h-full max-h-[40rem] w-full max-w-[64rem] overflow-hidden rounded-2xl bg-card shadow-2xl">
        <div className="w-full space-y-10 overflow-y-auto p-10 md:w-1/2">
          <div className="space-y-1 text-center">
            <h1 className="text-3xl font-bold">
              Sign up to <span className="text-primary">Twittee</span>
            </h1>
            <p className="text-muted-foreground">
              A place to share your thoughts freely.
            </p>
          </div>
          <div className="space-y-5">
            <SignUpForm />
            <Link href="/signin" className="block text-center hover:underline">
              Already have an account? Log in
            </Link>
          </div>
        </div>
        <Image
          src="/signup-image.jpg"
          alt=""
          className="hidden w-1/2 object-cover md:block"
          width={500}
          height={500}
        />
      </div>
    </main>
  );
};

export default SignUp;
