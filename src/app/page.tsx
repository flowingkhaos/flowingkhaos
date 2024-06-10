// Import necessary modules
"use client";
import { useEffect, Suspense } from "react";
import { useRouter } from "next/navigation";
import { useSearchParams } from "next/navigation";
import DecryptLoader from "@/components/loaders/DecryptLoader";

// Create a component to handle the search params logic
function PageComponent() {
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    // Check if the user is accessing the root URL (no slug parameter)
    if (!searchParams?.get("slug")) {
      // Redirect to the 'home' page if there's no 'slug'
      router.replace("/home");
    }
  }, [router, searchParams]);

  // If the `slug` is not present, assume the redirect will happen
  if (!searchParams?.get("slug")) {
    return <DecryptLoader />;
  }

  // Rest of your code remains unchanged, using searchParams.get('slug') if needed...
  return <DecryptLoader />;
}

// Wrap the PageComponent in Suspense as the default export
export default function Page() {
  return (
    <section className="flex justify-center items-center h-screen px-4">
      <div className="flex flex-col md:flex-row justify-center items-center space-y-6 md:space-y-0 md:space-x-12">
        <Suspense fallback={<DecryptLoader />}>
          <PageComponent />
        </Suspense>
      </div>
    </section>
  );
}
