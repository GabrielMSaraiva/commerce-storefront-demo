"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowLeft } from "lucide-react";
import { useForm } from "react-hook-form";

import { AccountAddressFormFields } from "@/components/account/account-address-form-fields";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import type { AccountAddress } from "@/lib/account-addresses";
import {
  accountAddressSchema,
  type AccountAddressFormValues,
} from "@/lib/forms/schemas";

type AccountAddressFormProps = {
  address: AccountAddress | null;
  onCancel: () => void;
  onSubmit: (values: AccountAddressFormValues) => void;
};

const emptyAddress: AccountAddressFormValues = {
  type: "delivery",
  name: "",
  postalCode: "",
  street: "",
  city: "",
  state: "",
  phone: "",
};

export function AccountAddressForm({
  address,
  onCancel,
  onSubmit,
}: AccountAddressFormProps) {
  const form = useForm<AccountAddressFormValues>({
    resolver: zodResolver(accountAddressSchema),
    defaultValues: getAddressFormValues(address),
  });

  return (
    <section className="grid min-w-0 gap-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div className="grid gap-2">
          <h2 className="text-2xl font-bold md:text-3xl">
            {address ? "Editar endereço" : "Adicionar endereço"}
          </h2>
          <p className="max-w-2xl text-sm leading-6 text-muted-foreground">
            {address
              ? "Atualize os dados usados na sua conta."
              : "Cadastre um endereço para usar na finalização da compra."}
          </p>
        </div>

        <Button
          type="button"
          size="lg"
          className="self-start rounded-xl font-bold"
          onClick={onCancel}
        >
          <ArrowLeft className="size-4" />
          Voltar para endereços
        </Button>
      </div>

      <Card className="w-full rounded-xl p-0">
        <CardContent className="p-5 md:p-6">
          <form
            className="grid gap-6"
            noValidate
            onSubmit={form.handleSubmit(onSubmit)}
          >
            <AccountAddressFormFields form={form} />

            <div className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
              <Button
                type="button"
                variant="outline"
                size="lg"
                className="rounded-xl font-bold"
                onClick={onCancel}
              >
                Cancelar
              </Button>
              <Button
                type="submit"
                size="lg"
                className="rounded-xl font-bold"
              >
                {address ? "Salvar alterações" : "Adicionar endereço"}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </section>
  );
}

function getAddressFormValues(
  address: AccountAddress | null,
): AccountAddressFormValues {
  if (!address) {
    return emptyAddress;
  }

  return {
    type: address.type,
    name: address.name,
    postalCode: address.postalCode,
    street: address.street,
    city: address.city,
    state: address.state,
    phone: address.phone,
  };
}
