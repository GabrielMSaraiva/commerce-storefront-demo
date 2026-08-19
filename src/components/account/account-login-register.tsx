"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, type FieldError } from "react-hook-form";

import { PasswordInput } from "@/components/shared/password-input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  accountLoginSchema,
  accountRegisterEmailSchema,
  type AccountLoginFormValues,
  type AccountRegisterEmailFormValues,
} from "@/lib/forms/schemas";
import { cn } from "@/lib/utils";

type AccountAuthMode = "login" | "register";

export function AccountLoginRegister() {
  const router = useRouter();
  const [mode, setMode] = useState<AccountAuthMode>("login");

  const loginForm = useForm<AccountLoginFormValues>({
    resolver: zodResolver(accountLoginSchema),
    defaultValues: {
      identifier: "",
      password: "",
      remember: false,
    },
  });

  const registerForm = useForm<AccountRegisterEmailFormValues>({
    resolver: zodResolver(accountRegisterEmailSchema),
    defaultValues: {
      email: "",
    },
  });

  function handleLoginSubmit() {
    router.push("/minha-conta/pedidos");
  }

  function handleRegisterSubmit() {
    registerForm.reset();
    setMode("login");
  }

  return (
    <section className="mx-auto grid w-full max-w-[30rem] gap-4">
      <div className="min-h-20">
        <h2 className="text-2xl font-bold md:text-3xl">
          {mode === "login" ? "Bem-vindo de volta" : "Criar conta"}
        </h2>
        <p className="mt-2 text-sm leading-6 text-muted-foreground">
          {mode === "login"
            ? "Acesse sua conta para ver pedidos, endereço e perfil."
            : "Leva menos de um minuto. Você recebe um link por e-mail para definir sua senha."}
        </p>
      </div>

      <div className="flex h-12 rounded-xl bg-muted p-1">
        <button
          type="button"
          className={cn(
            "h-full flex-1 rounded-lg text-sm font-bold transition",
            mode === "login"
              ? "bg-white text-foreground shadow-sm"
              : "text-muted-foreground hover:text-foreground",
          )}
          onClick={() => setMode("login")}
        >
          Entrar
        </button>
        <button
          type="button"
          className={cn(
            "h-full flex-1 rounded-lg text-sm font-bold transition",
            mode === "register"
              ? "bg-white text-foreground shadow-sm"
              : "text-muted-foreground hover:text-foreground",
          )}
          onClick={() => setMode("register")}
        >
          Criar conta
        </button>
      </div>

      {mode === "login" ? (
        <>
          <Card className="rounded-xl">
            <CardHeader className="sr-only">
              <CardTitle>Acessar conta</CardTitle>
            </CardHeader>
            <CardContent className="p-6 md:p-8">
              <form
                className="grid gap-5"
                onSubmit={loginForm.handleSubmit(handleLoginSubmit)}
              >
                <div className="grid gap-2">
                  <Label htmlFor="account-login">
                    Nome de usuário ou e-mail{" "}
                    <span className="text-primary">*</span>
                  </Label>
                  <Input
                    id="account-login"
                    autoComplete="username"
                    className="h-11 rounded-xl"
                    aria-invalid={Boolean(loginForm.formState.errors.identifier)}
                    {...loginForm.register("identifier")}
                  />
                  <FieldErrorMessage
                    error={loginForm.formState.errors.identifier}
                  />
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="account-password">
                    Senha <span className="text-primary">*</span>
                  </Label>
                  <PasswordInput
                    id="account-password"
                    autoComplete="current-password"
                    className="h-11 rounded-xl"
                    aria-invalid={Boolean(loginForm.formState.errors.password)}
                    {...loginForm.register("password")}
                  />
                  <FieldErrorMessage
                    error={loginForm.formState.errors.password}
                  />
                </div>

                <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                  <label className="flex items-center gap-2 text-sm text-muted-foreground">
                    <input
                      type="checkbox"
                      className="size-4 rounded border-input accent-primary"
                      {...loginForm.register("remember")}
                    />
                    Lembrar de mim
                  </label>
                  <button
                    type="button"
                    className="w-fit text-sm font-bold text-primary underline-offset-4 hover:underline"
                  >
                    Esqueci minha senha
                  </button>
                </div>

                <Button type="submit" size="lg" className="rounded-xl font-bold">
                  Acessar minha conta
                </Button>
              </form>
            </CardContent>
          </Card>

          <p className="text-center text-sm text-muted-foreground">
            Ainda não tem conta?{" "}
            <button
              type="button"
              className="font-bold text-primary underline-offset-4 hover:underline"
              onClick={() => setMode("register")}
            >
              Cadastre-se
            </button>
          </p>
        </>
      ) : (
        <>
          <Card className="rounded-xl">
            <CardHeader className="sr-only">
              <CardTitle>Criar conta</CardTitle>
            </CardHeader>
            <CardContent className="p-6 md:p-8">
              <form
                className="grid gap-5"
                onSubmit={registerForm.handleSubmit(handleRegisterSubmit)}
              >
                <div className="grid gap-2">
                  <Label htmlFor="account-register-email">
                    E-mail <span className="text-primary">*</span>
                  </Label>
                  <Input
                    id="account-register-email"
                    type="email"
                    autoComplete="email"
                    className="h-11 rounded-xl"
                    placeholder="nome@email.com"
                    aria-invalid={Boolean(registerForm.formState.errors.email)}
                    {...registerForm.register("email")}
                  />
                  <FieldErrorMessage error={registerForm.formState.errors.email} />
                </div>

                <Button type="submit" size="lg" className="rounded-xl font-bold">
                  Criar conta
                </Button>

                <p className="text-xs leading-6 text-muted-foreground">
                  Seus dados pessoais serão usados para gerenciar o acesso à sua
                  conta e melhorar sua experiência, conforme nossa{" "}
                  <Link
                    href="/politica-de-privacidade"
                    className="font-bold text-primary underline-offset-4 hover:underline"
                  >
                    política de privacidade
                  </Link>
                  .
                </p>
              </form>
            </CardContent>
          </Card>

          <p className="text-center text-sm text-muted-foreground">
            Já tem uma conta?{" "}
            <button
              type="button"
              className="font-bold text-primary underline-offset-4 hover:underline"
              onClick={() => setMode("login")}
            >
              Entrar
            </button>
          </p>
        </>
      )}
    </section>
  );
}

function FieldErrorMessage({ error }: { error?: FieldError }) {
  if (!error?.message) {
    return null;
  }

  return <p className="text-xs font-medium text-destructive">{error.message}</p>;
}
