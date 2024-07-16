import Link from "next/link";

const Footer = () => {
  return (
    <footer className=" rounded-lg shadow bg-gray-900 mt-4">
      <div className="w-full max-w-screen-xl mx-auto p-4 md:py-8">
        <hr className="my-6 sm:mx-auto border-gray-700 lg:my-8" />
        <Link
          href="/"
          className="flex flex-col w-fit items-center  bg-red-800 p-1 ml-1"
        >
          <div className="text-white font-black text-[25px] lg:text-[30px]">
            TEST
          </div>
          <div className="text-white text-[7px] lg:text-[8px]">
            LANGUAGE TESTS
          </div>
        </Link>
        <span className="block text-sm  sm:text-center text-gray-400">
          © 2024 😎
        </span>
      </div>
    </footer>
  );
};

export default Footer;
