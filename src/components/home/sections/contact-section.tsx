"use client";

import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { Mail, MessageCircle, Phone, Send, User } from "lucide-react";
import { useForm } from "react-hook-form";

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar";
import { SectionHeading } from "@/components/home/components/section-heading";
import { Button, buttonVariants } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { business } from "@/config/business";
import { consultants } from "@/content/home/consultants";
import {
  contactFormSchema,
  type ContactFormValues,
} from "@/lib/forms/schemas";
import { cn } from "@/lib/utils";

export function ContactSection() {
  const [statusMessage, setStatusMessage] = useState("");
  const form = useForm<ContactFormValues>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      message: "",
    },
  });

  function handleSubmit() {
    setStatusMessage("Mensagem validada em modo mock.");
    form.reset();
  }

  return (
    <section id="contato" className="py-12">
      <div className="mx-auto max-w-7xl px-4 md:px-8">
        <SectionHeading
          align="center"
          eyebrow="Demonstração"
          eyebrowVariant="badge"
          title="Explore os fluxos"
          description="Atalhos para conhecer o catálogo, o carrinho, a área da conta e a validação de formulários desta demonstração."
        />

        <div className="mb-10 grid grid-cols-2 gap-3 sm:grid-cols-4">
          {consultants.map((consultant) => (
            <Card
              key={consultant.name}
              className="h-full min-h-59 items-center gap-0 p-4 text-center transition hover:shadow-(--shadow-elevated)"
            >
              <Avatar className="size-24 ring-2 ring-primary">
                {consultant.image ? (
                  <AvatarImage src={consultant.image} alt={consultant.name} />
                ) : null}
                <AvatarFallback className="bg-accent text-lg font-black text-primary">
                  {consultant.initials}
                </AvatarFallback>
              </Avatar>
              <CardHeader className="min-h-14.5 w-full items-center gap-0 px-3 py-0 pt-4">
                <CardTitle className="text-sm font-bold">
                  {consultant.name}
                </CardTitle>
                <CardDescription className="whitespace-nowrap text-xs leading-4">
                  {consultant.role}
                </CardDescription>
              </CardHeader>
              <CardContent className="mt-auto w-full px-1 pt-4">
                <a
                  href={consultant.contactHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={cn(
                    buttonVariants({ size: "sm" }),
                    "w-full rounded-full text-xs font-bold",
                  )}
                >
                  <MessageCircle className="size-3" />
                  {consultant.contactLabel}
                </a>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid gap-5 lg:grid-cols-[1fr_360px]">
          <Card className="gap-0 p-6 md:p-8">
            <CardHeader className="px-0 pb-4">
              <CardTitle className="text-lg font-bold">
                Envie uma mensagem
              </CardTitle>
              <CardDescription className="text-xs">
                Preencha o formulário para testar validação e feedback. Nenhum
                dado será enviado.
              </CardDescription>
            </CardHeader>
            <CardContent className="px-0">
              <form
                className="grid gap-4"
                onSubmit={form.handleSubmit(handleSubmit)}
              >
                <div className="grid gap-1.5">
                  <Label htmlFor="name">Nome completo</Label>
                  <Input
                    id="name"
                    autoComplete="name"
                    placeholder="Seu nome"
                    className="h-11 rounded-xl"
                    aria-invalid={Boolean(form.formState.errors.name)}
                    {...form.register("name")}
                  />
                  <FieldErrorMessage message={form.formState.errors.name?.message} />
                </div>
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="grid gap-1.5">
                    <Label htmlFor="email">E-mail</Label>
                    <Input
                      id="email"
                      type="email"
                      autoComplete="email"
                      placeholder="seu@email.com"
                      className="h-11 rounded-xl"
                      aria-invalid={Boolean(form.formState.errors.email)}
                      {...form.register("email")}
                    />
                    <FieldErrorMessage message={form.formState.errors.email?.message} />
                  </div>
                  <div className="grid gap-1.5">
                    <Label htmlFor="phone">Telefone</Label>
                    <Input
                      id="phone"
                      type="tel"
                      autoComplete="tel"
                      placeholder="(00) 00000-0000"
                      className="h-11 rounded-xl"
                      aria-invalid={Boolean(form.formState.errors.phone)}
                      {...form.register("phone")}
                    />
                    <FieldErrorMessage message={form.formState.errors.phone?.message} />
                  </div>
                </div>
                <div className="grid gap-1.5">
                  <Label htmlFor="message">Mensagem</Label>
                  <Textarea
                    id="message"
                    rows={4}
                    placeholder="Como podemos ajudar?"
                    className="rounded-xl"
                    aria-invalid={Boolean(form.formState.errors.message)}
                    {...form.register("message")}
                  />
                  <FieldErrorMessage message={form.formState.errors.message?.message} />
                </div>
                <Button
                  type="submit"
                  size="lg"
                  className="w-fit rounded-full font-bold"
                >
                  <Send className="size-4" />
                  Enviar mensagem
                </Button>
                {statusMessage ? (
                  <p className="rounded-lg border bg-muted px-4 py-3 text-sm text-muted-foreground">
                    {statusMessage}
                  </p>
                ) : null}
              </form>
            </CardContent>
          </Card>

          <aside className="rounded-xl bg-primary p-6 text-primary-foreground md:p-8">
            <div className="flex items-center gap-2 text-sm font-bold">
              <User className="size-4" />
              Sobre esta demo
            </div>
            <p className="mt-2 text-xs text-primary-foreground/85">
              Projeto fictício de portfólio, sem vendas ou atendimento real.
            </p>
            <ul className="mt-6 space-y-5 text-sm">
              {[
                {
                  ...business.contacts.servicePhone,
                  icon: Phone,
                },
                {
                  ...business.contacts.whatsapp,
                  icon: MessageCircle,
                },
                {
                  ...business.contacts.email,
                  icon: Mail,
                },
              ].map((item) => (
                <li key={item.label} className="flex items-start gap-3">
                  <div className="grid size-9 shrink-0 place-items-center rounded-full bg-white/15">
                    <item.icon className="size-4" />
                  </div>
                  <div>
                    <div className="text-xs font-bold uppercase tracking-wider text-primary-foreground/75">
                      {item.label}
                    </div>
                    <a
                      href={item.href}
                      target={item.href.startsWith("http") ? "_blank" : undefined}
                      rel={
                        item.href.startsWith("http")
                          ? "noopener noreferrer"
                          : undefined
                      }
                      className="text-sm font-semibold underline-offset-4 hover:underline"
                    >
                      {item.display}
                    </a>
                  </div>
                </li>
              ))}
            </ul>
          </aside>
        </div>
      </div>
    </section>
  );
}

function FieldErrorMessage({ message }: { message?: string }) {
  if (!message) {
    return null;
  }

  return <p className="text-xs font-medium text-destructive">{message}</p>;
}
