"use client";

import { useRouter } from "next/navigation";
import { motion } from "framer-motion";

export default function NavBar() {
  const router = useRouter();

  function handleNav(pageName) {
    router.push(pageName);
  }

  function NavItem({ path, children }) {
    return (
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.8 }}
        className="mx-1 p-1"
        onClick={() => handleNav(path)}
      >
        {children}
      </motion.button>
    );
  }

  return (
    <div className="fixed flex top-3 left-3 right-3 p-2 rounded-md outline outline-black outline-2 bg-background-secondary z-50">
      <div className="flex-1 max-w-80 text-center lg:text-left m-auto">
        <p className="font-normal">selinand&#39;s halloween 2024</p>
      </div>
      <div className="flex-1 hidden lg:block text-center">
        <NavItem path="/">home</NavItem>
        <NavItem path="/cocktails">cocktails</NavItem>
        <NavItem path="/volunteer">volunteer</NavItem>
        <NavItem path="/costumes">costume ideas</NavItem>
      </div>
      <div className="hidden lg:block flex-1 max-w-80"></div>
    </div>
  );
}
