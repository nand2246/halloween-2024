"use client";

import { usePathname } from "next/navigation";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function NavBar() {
  const pathname = usePathname();
  const router = useRouter();

  const [page, setPage] = useState(pathname);

  function handleNav(pageName) {
    setPage(pageName);
    router.push(pageName);
  }

  function NavItem({ path, children }) {
    return (
      <button className=" mx-2 p-1 rounded-md " onClick={() => handleNav(path)}>
        {children}
      </button>
    );
  }

  return (
    <div className="m-2 p-2 outline-black outline outline-2 rounded-md">
      <div className="flex">
        <div className="flex-1 text-center md:text-left m-auto">
          <p className="font-semibold">selinand&#39;s halloween 2024</p>
        </div>
        <div className="hidden md:block flex-1 text-center">
          <NavItem path="/">home</NavItem>
          <NavItem path="/attendees">attendees</NavItem>
          <NavItem path="/cocktails">cocktails</NavItem>
          <NavItem path="/volunteer">volunteer</NavItem>
          <NavItem path="/costumes/ideas">costume ideas</NavItem>
        </div>
        <div className="hidden md:block flex-1"></div>
      </div>
    </div>
  );
}
