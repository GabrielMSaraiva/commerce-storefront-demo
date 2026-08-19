"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button, buttonVariants } from "@/components/ui/button";
import { slides } from "@/content/home/slides";
import { cn } from "@/lib/utils";

export function HeroCarousel() {
  const [activeSlide, setActiveSlide] = useState(0);

  useEffect(() => {
    const timer = window.setInterval(() => {
      setActiveSlide((current) => (current + 1) % slides.length);
    }, 5500);

    return () => window.clearInterval(timer);
  }, []);

  return (
    <section id="top" className="bg-background pt-5 md:pt-6">
      <div className="mx-auto max-w-7xl px-4 md:px-8">
        <div className="relative overflow-hidden rounded-xl">
          <div className="relative grid min-h-[460px] md:min-h-97.5">
            {slides.map((item, index) => (
              <div
                key={item.title}
                className={cn(
                  "relative col-start-1 row-start-1 min-h-[460px] transition-opacity duration-700 md:min-h-97.5",
                  index === activeSlide
                    ? "z-10 opacity-100"
                    : "z-0 pointer-events-none opacity-0",
                )}
              >
                <Image
                  src={item.image}
                  alt=""
                  fill
                  priority={index === 0}
                  sizes="(max-width: 768px) 100vw, 1200px"
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-[linear-gradient(95deg,oklch(0.34_0.12_18/.92)_0%,oklch(0.45_0.11_18/.72)_45%,oklch(0.55_0.05_220/.18)_100%)]" />
                <div className="relative z-10 flex min-h-[460px] max-w-2xl flex-col justify-center gap-3 px-5 py-9 pb-16 text-white sm:px-7 md:min-h-97.5 md:px-12 md:py-12">
                  <Badge className="w-fit bg-white text-primary hover:bg-white">
                    {item.tag}
                  </Badge>
                  <h1 className="max-w-xl text-3xl font-black leading-tight md:text-5xl">
                    {item.title}
                  </h1>
                  <p className="text-xl font-bold md:text-3xl">{item.price}</p>
                  <p className="max-w-md text-sm text-white/90 md:text-base">
                    {item.description}
                  </p>
                  <a
                    className={cn(
                      buttonVariants({ size: "lg" }),
                      "mt-2 w-fit rounded-full bg-white font-bold text-primary hover:bg-white/90",
                    )}
                    href="#produtos"
                  >
                    {item.cta}
                  </a>
                </div>
              </div>
            ))}
          </div>

          <div className="absolute bottom-4 left-1/2 z-20 flex -translate-x-1/2 gap-1.5">
            {slides.map((item, index) => (
              <Button
                key={item.title}
                type="button"
                variant="ghost"
                aria-label={`Slide ${index + 1}`}
                onClick={() => setActiveSlide(index)}
                className={cn(
                  "h-2 rounded-full p-0 transition-all hover:bg-white/80",
                  index === activeSlide ? "w-6 bg-white" : "w-2 bg-white/50",
                )}
              />
            ))}
          </div>

          <Button
            type="button"
            variant="secondary"
            size="icon-lg"
            className="absolute bottom-4 right-16 z-20 hidden rounded-full bg-white/85 text-foreground hover:bg-white md:inline-flex"
            aria-label="Slide anterior"
            onClick={() =>
              setActiveSlide(
                (current) => (current - 1 + slides.length) % slides.length,
              )
            }
          >
            <ChevronLeft className="size-5" />
          </Button>
          <Button
            type="button"
            variant="secondary"
            size="icon-lg"
            className="absolute bottom-4 right-4 z-20 hidden rounded-full bg-white/85 text-foreground hover:bg-white md:inline-flex"
            aria-label="Próximo slide"
            onClick={() =>
              setActiveSlide((current) => (current + 1) % slides.length)
            }
          >
            <ChevronRight className="size-5" />
          </Button>
        </div>
      </div>
    </section>
  );
}
