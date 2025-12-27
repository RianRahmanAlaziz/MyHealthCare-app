"use client";

import "@/style/css/home.css"
import { useEffect, useState } from 'react'
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "motion/react";
import { Heart, UserCheck, Shield, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function home() {
  const router = useRouter();
  useEffect(() => {
    document.title = "HealthCare Research";
  }, []);
  const onComplete = () => {
    router.push("/auth/informed-consent");
  };

  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      icon: Heart,
      title: "Selamat Datang",
      description:
        "Platform penelitian kesehatan untuk pasien dan perawat",
      color: "from-blue-400 to-blue-600",
    },
    {
      icon: UserCheck,
      title: "Partisipasi Anda Penting",
      description:
        "Kontribusi Anda membantu meningkatkan kualitas perawatan",
      color: "from-teal-400 to-teal-600",
    },
    {
      icon: Shield,
      title: "Data Anda Aman",
      description:
        "Kami menjaga privasi dan kerahasiaan informasi Anda dengan standar tertinggi",
      color: "from-blue-500 to-teal-500",
    },
  ];

  const handleNext = () => {
    if (currentSlide < slides.length - 1) {
      setCurrentSlide(currentSlide + 1);
    } else {
      onComplete();
    }
  };

  const handleSkip = () => {
    onComplete();
  };

  const slide = slides[currentSlide];
  const Icon = slide.icon;

  return (

    <div className="min-h-screen bg-linear-to-br from-blue-50 via-teal-50 to-white">
      <div className="min-h-screen flex flex-col items-center justify-between p-6 py-12">
        {/* Skip Button */}
        <div className="w-full max-w-md flex justify-end">
          <button
            onClick={handleSkip}
            className="text-blue-600 hover:text-blue-700 px-4 py-2 cursor-pointer"
          >
            Lewati
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 flex flex-col items-center justify-center w-full max-w-md">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentSlide}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
              className="text-center"
            >
              {/* Icon */}
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                className={`inline-flex items-center justify-center w-32 h-32 bg-linear-to-br ${slide.color} rounded-full mb-8 shadow-2xl`}
              >
                <Icon className="w-16 h-16 text-white" />
              </motion.div>

              {/* Title */}
              <motion.h1
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="text-blue-900 mb-4"
              >
                {slide.title}
              </motion.h1>

              {/* Description */}
              <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="text-blue-600 px-6"
              >
                {slide.description}
              </motion.p>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Bottom Section */}
        <div className="w-full max-w-md space-y-6">
          {/* Dots */}
          <div className="flex justify-center gap-2">
            {slides.map((_, index) => (
              <div
                key={index}
                className={`h-2 rounded-full transition-all duration-300 ${index === currentSlide
                  ? "w-8 bg-linear-to-r from-blue-500 to-teal-500"
                  : "w-2 bg-blue-200"
                  }`}
              />
            ))}
          </div>

          {/* Next Button */}
          <Button
            onClick={handleNext}
            className="w-full h-14 cursor-pointer rounded-xl bg-linear-to-r from-blue-500 to-teal-500 hover:from-blue-600 hover:to-teal-600 text-white shadow-lg"
          >
            {currentSlide < slides.length - 1 ? "Lanjut" : "Mulai"}
            <ChevronRight className="ml-2 w-5 h-5" />
          </Button>
        </div>
      </div>
    </div>
  )
}
