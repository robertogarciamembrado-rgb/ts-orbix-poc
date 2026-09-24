"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import PartnerWizard from "@/components/PartnerWizard";
import { ArrowLeft } from "lucide-react";

export default function RegistroPartnerPage() {
  return (
    <div className="min-h-screen bg-slate-50 py-12 px-4 sm:px-6 flex flex-col justify-center items-center font-sans">
      <div className="w-full max-w-3xl mb-6 flex items-center justify-between">
        <Link
          href="/"
          className="text-slate-600 hover:text-orbix-navy text-xs sm:text-sm font-semibold flex items-center gap-1.5 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" /> Volver al Inicio
        </Link>
        <Link href="/" className="flex items-center">
          <Image
            alt="TS Orbix Logo"
            className="object-contain"
            height={36}
            src="/cropped-cropped-cropped-ORBIXHA-scaled-1-e1786624753942.png"
            width={130}
            priority
          />
        </Link>
      </div>
      <PartnerWizard onComplete={() => (window.location.href = "/cuenta/dashboard")} />
    </div>
  );
}
