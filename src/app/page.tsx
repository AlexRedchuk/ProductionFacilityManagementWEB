"use client"
import Image from "next/image";
import { useRouter } from "next/router";
import { useLayoutEffect } from "react";


export default function Home() {
  const router = useRouter();
  useLayoutEffect(() => {
      router.push("/contracts");
  }, []);

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      
    </main>
  );
}
