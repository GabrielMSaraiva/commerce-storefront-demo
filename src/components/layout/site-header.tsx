"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  MapPin,
  Menu,
  Search,
  ShoppingCart,
  User,
  X,
} from "lucide-react";
import { useForm } from "react-hook-form";

import { AnnouncementBar } from "@/components/layout/announcement-bar";
import { WellnessMarketLogo } from "@/components/brand/wellness-market-logo";
import { CartButton } from "@/components/cart/cart-button";
import { Button, buttonVariants } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { legalNavLinks, navLinks } from "@/content/navigation";
import {
  searchFormSchema,
  type SearchFormValues,
} from "@/lib/forms/schemas";
import { cn } from "@/lib/utils";

const headerUtilityActionClassName =
  "text-primary-foreground transition-colors hover:bg-white/10 hover:text-primary-foreground focus-visible:ring-white/40 active:bg-white/15";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 bg-primary text-primary-foreground shadow-md">
      <AnnouncementBar />
      <div className="mx-auto lg:hidden">
        <div className="relative flex h-16 items-center justify-between px-4">
          <MobileMenu />

          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
            <WellnessMarketLogo compact />
          </div>

          <div className="ml-auto flex items-center gap-2">
            <Link
              href="/minha-conta"
              className={cn(
                buttonVariants({ variant: "ghost", size: "icon-lg" }),
                headerUtilityActionClassName,
              )}
              aria-label="Entrar"
            >
              <User className="size-5" />
            </Link>
            <CartButton className={headerUtilityActionClassName} />
          </div>
        </div>

        <div className="px-4 pb-3">
          <HeaderSearchForm variant="mobile" />
        </div>
      </div>

      <div className="mx-auto hidden max-w-7xl items-center gap-3 px-4 py-3 lg:flex lg:gap-6 lg:px-8">
        <WellnessMarketLogo />

        <HeaderSearchForm variant="desktop" />

        <div className="ml-auto hidden items-center gap-2 text-sm md:flex">
          <Link
            href="/minha-conta"
            className={cn(
              buttonVariants({ variant: "ghost", size: "lg" }),
              headerUtilityActionClassName,
            )}
          >
            <User className="size-4" />
            Entrar
          </Link>
          <CartButton className={headerUtilityActionClassName} />
        </div>

        <MobileMenu />
      </div>

      <nav className="hidden border-t border-white/15 lg:block">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-2 overflow-x-auto px-4 md:px-8">
          <div className="flex items-center gap-1">
            {navLinks.map((link, index) => (
              <Link
                key={link}
                href="/#produtos"
                className={cn(
                  "whitespace-nowrap border-b-2 px-3 py-2.5 text-xs font-medium transition-opacity hover:opacity-100",
                  index === 0
                    ? "border-white opacity-100"
                    : "border-transparent opacity-90",
                )}
              >
                {link}
              </Link>
            ))}
          </div>
          <Link
            href="/#local"
            className="hidden items-center gap-1.5 whitespace-nowrap px-3 py-2.5 text-xs opacity-90 transition-opacity hover:opacity-100 md:flex"
          >
            <MapPin className="size-3.5" />
            Informe seu CEP
          </Link>
        </div>
      </nav>
    </header>
  );
}

function HeaderSearchForm({ variant }: { variant: "desktop" | "mobile" }) {
  const router = useRouter();
  const form = useForm<SearchFormValues>({
    resolver: zodResolver(searchFormSchema),
    defaultValues: {
      query: "",
    },
  });

  function handleSubmit({ query }: SearchFormValues) {
    router.push(`/?busca=${encodeURIComponent(query.trim())}#produtos`);
  }

  if (variant === "mobile") {
    return (
      <form
        className="relative"
        onSubmit={form.handleSubmit(handleSubmit)}
      >
        <Input
          type="search"
          placeholder="Busque na coleção"
          className="h-11 rounded-full border-white/50 bg-white pl-4 pr-12 text-sm text-foreground placeholder:text-muted-foreground focus-visible:ring-white/40"
          aria-invalid={Boolean(form.formState.errors.query)}
          {...form.register("query")}
        />
        <Button
          type="submit"
          size="icon-lg"
          className="absolute right-1 top-1/2 -translate-y-1/2 rounded-full bg-primary text-primary-foreground ring-2 ring-white hover:bg-primary/90"
          aria-label="Buscar"
        >
          <Search className="size-5" />
        </Button>
      </form>
    );
  }

  return (
    <form
      className="relative hidden flex-1 md:block"
      onSubmit={form.handleSubmit(handleSubmit)}
    >
      <Search className="pointer-events-none absolute left-4 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
      <Input
        type="search"
        placeholder="Buscar produtos, categorias e coleções..."
        className="h-11 rounded-full border-white/30 bg-white pl-11 pr-28 text-sm text-foreground placeholder:text-muted-foreground focus-visible:ring-white/40"
        aria-invalid={Boolean(form.formState.errors.query)}
        {...form.register("query")}
      />
      <Button
        type="submit"
        size="lg"
        className="absolute right-1 top-1/2 -translate-y-1/2 rounded-full text-xs font-bold"
      >
        Buscar
      </Button>
    </form>
  );
}

function MobileMenu() {
  return (
    <Sheet modal="trap-focus">
      <SheetTrigger
        render={
          <Button
            type="button"
            variant="ghost"
            size="icon-lg"
            className={cn(headerUtilityActionClassName, "lg:hidden")}
          />
        }
        aria-label="Abrir menu"
      >
        <Menu className="size-5" />
      </SheetTrigger>
      <SheetContent
        className="w-[86vw] max-w-sm gap-0 border-r-0 bg-background p-0"
        side="left"
        showCloseButton={false}
      >
        <SheetHeader className="bg-primary p-4 text-primary-foreground">
          <div className="flex items-center justify-between gap-4">
            <SheetTitle className="text-primary-foreground">
              <WellnessMarketLogo compact />
            </SheetTitle>
            <SheetClose
              render={
                <Button
                  type="button"
                  variant="ghost"
                  size="icon-lg"
                  className={headerUtilityActionClassName}
                />
              }
              aria-label="Fechar menu"
            >
              <X className="size-5" />
            </SheetClose>
          </div>
        </SheetHeader>

        <div className="px-4 py-5">
          <div>
            <div className="text-xs font-bold uppercase tracking-wider text-primary">
              Categorias
            </div>
            <div className="mt-3 grid gap-1">
              {navLinks.map((link) => (
                <Link
                  key={link}
                  href="/#produtos"
                  className="rounded-lg px-3 py-3 text-sm font-semibold text-foreground hover:bg-accent hover:text-accent-foreground"
                >
                  {link}
                </Link>
              ))}
            </div>
          </div>

          <Separator className="my-5" />

          <div>
            <div className="text-xs font-bold uppercase tracking-wider text-primary">
              Institucional
            </div>
            <div className="mt-3 grid gap-1">
              {legalNavLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="rounded-lg px-3 py-3 text-sm font-semibold text-foreground hover:bg-accent hover:text-accent-foreground"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          <Separator className="my-5" />

          <div className="grid gap-2 text-sm">
            <Link
              className="flex items-center gap-3 rounded-lg px-3 py-3 font-medium hover:bg-muted"
              href="/minha-conta"
            >
              <User className="size-4 text-primary" />
              Entrar
            </Link>
            <Link
              className="flex items-center gap-3 rounded-lg px-3 py-3 font-medium hover:bg-muted"
              href="/carrinho"
            >
              <ShoppingCart className="size-4 text-primary" />
              Carrinho
            </Link>
            <Link
              className="flex items-center gap-3 rounded-lg px-3 py-3 font-medium hover:bg-muted"
              href="/#local"
            >
              <MapPin className="size-4 text-primary" />
              Informe seu CEP
            </Link>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
