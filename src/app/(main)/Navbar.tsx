import SerchField from "@/components/SerchField";
import UserButton from "@/components/UserButton";
import Link from "next/link";
import React from "react";

export default function Navbar() {
  

  return(
   <header className="sticky top-0 bg-card z-10 shadow-sm">
    <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-center gap-5 px-5 py-3"> 
        <Link href={"/"} className="text-2xl font-bold text-primary">bugbook</Link>
        <SerchField/>
        <UserButton className="sm:ms-auto"/>
    </div>

   </header> 
  )
  
}
