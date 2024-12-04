import Link from "next/link";

const Navbar = () => {
  return (
    <nav className="flex justify-evenly text-lg font-serif px-12 py-1">
      <Link href={"/restaurants"} className=" text-white hover:text-cyan-100">
        Restaurants
      </Link>
      <Link href={"/hotels"} className=" text-white hover:text-cyan-100">
        Hotels
      </Link>
      <Link href={"/courses"} className=" text-white hover:text-cyan-100">
        Golf Courses
      </Link>
      <Link href={"/parks"} className=" text-white hover:text-cyan-100">
        Parks
      </Link>
    </nav>
  );
};

export default Navbar;
