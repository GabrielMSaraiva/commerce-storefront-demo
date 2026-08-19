"use client";

import { type ComponentProps } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { Save } from "lucide-react";
import { useForm, type FieldError } from "react-hook-form";

import { PasswordInput } from "@/components/shared/password-input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { accountUser } from "@/content/account";
import {
  accountProfileSchema,
  type AccountProfileFormValues,
} from "@/lib/forms/schemas";

export function AccountProfile() {
  const form = useForm<AccountProfileFormValues>({
    resolver: zodResolver(accountProfileSchema),
    criteriaMode: "all",
    defaultValues: {
      firstName: accountUser.firstName,
      lastName: accountUser.lastName,
      displayName: accountUser.displayName,
      email: accountUser.email,
      phone: accountUser.phone,
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
  });

  function handleSubmit() {
    form.reset({
      ...form.getValues(),
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    });
  }

  return (
    <section className="grid min-w-0 gap-6">
      <div className="grid gap-2">
        <h2 className="text-2xl font-bold md:text-3xl">Meu perfil</h2>
        <p className="max-w-2xl wrap-break-word text-sm leading-6 text-muted-foreground">
          Mantenha seus dados atualizados para agilizar o atendimento e a
          emissão de notas fiscais.
        </p>
      </div>

      <form className="grid gap-4" onSubmit={form.handleSubmit(handleSubmit)}>
        <Card className="rounded-xl p-0">
          <CardContent className="grid gap-5 p-5 md:p-6">
            <div>
              <h3 className="font-bold">Dados pessoais</h3>
              <p className="mt-2 text-sm leading-6 text-muted-foreground">
                Usamos essas informações nas notas fiscais e no contato sobre
                seus pedidos.
              </p>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <Field
                id="first-name"
                label="Nome"
                required
                error={form.formState.errors.firstName}
                inputProps={{
                  autoComplete: "given-name",
                  className: "h-11 rounded-xl",
                  ...form.register("firstName"),
                }}
              />
              <Field
                id="last-name"
                label="Sobrenome"
                required
                error={form.formState.errors.lastName}
                inputProps={{
                  autoComplete: "family-name",
                  className: "h-11 rounded-xl",
                  ...form.register("lastName"),
                }}
              />
            </div>

            <Field
              id="display-name"
              label="Nome de exibição"
              required
              description="É assim que seu nome aparece na conta e nas avaliações de produtos."
              error={form.formState.errors.displayName}
              inputProps={{
                autoComplete: "name",
                className: "h-11 rounded-xl",
                ...form.register("displayName"),
              }}
            />

            <div className="grid gap-4 md:grid-cols-2">
              <Field
                id="profile-email"
                label="E-mail"
                required
                error={form.formState.errors.email}
                inputProps={{
                  type: "email",
                  autoComplete: "email",
                  className: "h-11 rounded-xl",
                  ...form.register("email"),
                }}
              />
              <Field
                id="profile-phone"
                label="Celular"
                required
                error={form.formState.errors.phone}
                inputProps={{
                  type: "tel",
                  autoComplete: "tel",
                  className: "h-11 rounded-xl",
                  ...form.register("phone"),
                }}
              />
            </div>

            <Button
              type="submit"
              size="lg"
              className="w-fit rounded-xl font-bold"
            >
              <Save className="size-4" />
              Salvar dados pessoais
            </Button>
          </CardContent>
        </Card>

        <Card className="rounded-xl p-0">
          <CardContent className="grid gap-5 p-5 md:p-6">
            <div>
              <h3 className="font-bold">Senha e segurança</h3>
              <p className="mt-2 text-sm leading-6 text-muted-foreground">
                Altere sua senha somente se quiser. Deixe os campos em branco
                para manter a senha atual.
              </p>
            </div>

            <PasswordField
              id="current-password"
              label="Senha atual"
              autoComplete="current-password"
              error={form.formState.errors.currentPassword}
              registerProps={form.register("currentPassword")}
            />

            <div className="grid gap-4 md:grid-cols-2">
              <PasswordField
                id="new-password"
                label="Nova senha"
                autoComplete="new-password"
                error={form.formState.errors.newPassword}
                registerProps={form.register("newPassword")}
              />
              <PasswordField
                id="confirm-password"
                label="Confirmar nova senha"
                autoComplete="new-password"
                error={form.formState.errors.confirmPassword}
                registerProps={form.register("confirmPassword")}
              />
            </div>

            <Button
              type="submit"
              size="lg"
              className="w-fit rounded-xl font-bold"
            >
              Alterar senha
            </Button>
          </CardContent>
        </Card>
      </form>
    </section>
  );
}

type FieldProps = {
  description?: string;
  error?: FieldError;
  id: string;
  inputProps: ComponentProps<typeof Input>;
  label: string;
  required?: boolean;
};

function Field({
  description,
  error,
  id,
  inputProps,
  label,
  required,
}: FieldProps) {
  return (
    <div className="grid gap-2">
      <Label htmlFor={id}>
        {label} {required ? <span className="text-primary">*</span> : null}
      </Label>
      <Input id={id} aria-invalid={Boolean(error)} {...inputProps} />
      {description ? (
        <p className="text-xs leading-5 text-muted-foreground">{description}</p>
      ) : null}
      <FieldErrorMessage error={error} />
    </div>
  );
}

type PasswordFieldProps = {
  autoComplete: string;
  error?: FieldError;
  id: string;
  label: string;
  registerProps: ComponentProps<typeof Input>;
};

function PasswordField({
  autoComplete,
  error,
  id,
  label,
  registerProps,
}: PasswordFieldProps) {
  return (
    <div className="grid gap-2">
      <Label htmlFor={id}>{label}</Label>
      <PasswordInput
        id={id}
        autoComplete={autoComplete}
        className="h-11 rounded-xl"
        aria-invalid={Boolean(error)}
        hideLabel="Ocultar senha"
        showLabel="Mostrar senha"
        {...registerProps}
      />
      <FieldErrorMessage error={error} />
    </div>
  );
}

function FieldErrorMessage({ error }: { error?: FieldError }) {
  if (!error) {
    return null;
  }

  const typeMessages = Object.values(error.types ?? {})
    .flatMap((message) => (Array.isArray(message) ? message : [message]))
    .filter(
      (message): message is string =>
        typeof message === "string" && message.length > 0,
    );
  const messages = Array.from(
    new Set(typeMessages.length > 0 ? typeMessages : [error.message]),
  ).filter((message): message is string => Boolean(message));

  if (messages.length === 0) {
    return null;
  }

  return (
    <div className="grid gap-1">
      {messages.map((message) => (
        <p key={message} className="text-xs font-medium text-destructive">
          {message}
        </p>
      ))}
    </div>
  );
}
