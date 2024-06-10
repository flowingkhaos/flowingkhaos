import Image from "next/image";
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex justify-center items-center h-screen px-4">
      <div className="flex flex-col md:flex-row justify-center items-center space-y-6 md:space-y-0 md:space-x-12">
        {/* Left Div for Text */}
        <div className="flex flex-col justify-center items-center space-y-6 text-center">
          <h1 className="text-4xl md:text-6xl leading-10 font-extrabold text-primary">
            Page Not Found
          </h1>
          <p className="text-xl md:text-2xl">
            We couldn&#39;t locate the page you&#39;re looking for :(
          </p>
          <Link href="/home" className="hover:underline">
            Bring me home!
          </Link>
          <Link href="/blog" className="hover:underline">
            Bring me back to the blog!
          </Link>
        </div>

        {/* Right Div for Image */}
        <div className="w-[300px] md:w-[550px] h-[300px] md:h-[550px]">
          <Image
            src="/svg/noresult.svg"
            alt="No results"
            width={300}
            height={300}
          />
        </div>
      </div>
    </div>
  );
}
