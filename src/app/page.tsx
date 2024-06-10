"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSearchParams } from "next/navigation";
import DecryptLoader from "@/components/loaders/DecryptLoader";

export default function Page() {
  const router = useRouter();
  const [searchParams]: string | any = useSearchParams();

  useEffect(() => {
    //? Check if the user is accessing the root URL (no slug parameter)
    if (!searchParams?.get("slug")) {
      // Redirect to the 'home' page.
      router.replace("/home");
    }
  }, [router, searchParams]); // Dependency array to re-run this effect when `searchParams` changes

  //! If the `slug` is not present, we can assume the redirect will happen,
  //! so we can return null or a loading state here.
  if (!searchParams?.get("slug")) {
    return (
      <section className="flex justify-center items-center h-screen px-4">
        <div className="flex flex-col md:flex-row justify-center items-center space-y-6 md:space-y-0 md:space-x-12">
          <DecryptLoader />
        </div>
      </section>
    );
  }

  // Rest of your code remains unchanged, using searchParams.get('slug') if needed...

  // ...
}
