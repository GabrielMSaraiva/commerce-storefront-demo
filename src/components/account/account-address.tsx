"use client";

import { useState } from "react";
import { MapPin, Plus } from "lucide-react";

import { AccountAddressCard } from "@/components/account/account-address-card";
import { AccountAddressDeleteDialog } from "@/components/account/account-address-delete-dialog";
import { AccountAddressForm } from "@/components/account/account-address-form";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { accountAddresses } from "@/content/account";
import type { AccountAddress as AccountAddressData } from "@/lib/account-addresses";
import type { AccountAddressFormValues } from "@/lib/forms/schemas";

export function AccountAddress() {
  const [addresses, setAddresses] =
    useState<AccountAddressData[]>(accountAddresses);
  const [editingAddress, setEditingAddress] =
    useState<AccountAddressData | null>(null);
  const [deletingAddress, setDeletingAddress] =
    useState<AccountAddressData | null>(null);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [statusMessage, setStatusMessage] = useState("");

  function handleAddAddress() {
    setEditingAddress(null);
    setIsFormOpen(true);
  }

  function handleEditAddress(address: AccountAddressData) {
    setEditingAddress(address);
    setIsFormOpen(true);
  }

  function handleSubmit(values: AccountAddressFormValues) {
    if (editingAddress) {
      setAddresses((currentAddresses) =>
        currentAddresses.map((address) =>
          address.id === editingAddress.id
            ? { id: address.id, ...values }
            : address,
        ),
      );
      setStatusMessage("Endereço atualizado.");
      setIsFormOpen(false);
      return;
    }

    setAddresses((currentAddresses) => [
      ...currentAddresses,
      {
        id: globalThis.crypto.randomUUID(),
        ...values,
      },
    ]);
    setStatusMessage("Endereço adicionado.");
    setIsFormOpen(false);
  }

  function handleRemoveAddress() {
    if (!deletingAddress) {
      return;
    }

    setAddresses((currentAddresses) =>
      currentAddresses.filter(
        (address) => address.id !== deletingAddress.id,
      ),
    );
    setDeletingAddress(null);
    setStatusMessage("Endereço removido.");
  }

  function handleCancelForm() {
    setEditingAddress(null);
    setIsFormOpen(false);
  }

  if (isFormOpen) {
    return (
      <AccountAddressForm
        key={editingAddress?.id ?? "new-address"}
        address={editingAddress}
        onCancel={handleCancelForm}
        onSubmit={handleSubmit}
      />
    );
  }

  return (
    <section className="grid min-w-0 gap-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div className="grid gap-2">
          <h2 className="text-2xl font-bold md:text-3xl">Meus endereços</h2>
          <p className="max-w-2xl wrap-break-word text-sm leading-6 text-muted-foreground">
            Estes endereços ficam disponíveis na finalização da compra. Você
            pode alterá-los a qualquer momento.
          </p>
        </div>
        <Button
          type="button"
          size="lg"
          className="self-start w-fit rounded-xl font-bold"
          onClick={handleAddAddress}
        >
          <Plus className="size-4" />
          Adicionar endereço
        </Button>
      </div>

      {addresses.length > 0 ? (
        <div className="grid gap-4 lg:grid-cols-2">
          {addresses.map((address) => (
            <AccountAddressCard
              key={address.id}
              address={address}
              onEdit={() => handleEditAddress(address)}
              onRemove={() => setDeletingAddress(address)}
            />
          ))}
        </div>
      ) : (
        <Card className="rounded-xl border-dashed p-0">
          <CardContent className="flex min-h-64 flex-col items-center justify-center p-6 text-center">
            <div className="grid size-12 place-items-center rounded-full bg-primary/10 text-primary">
              <MapPin className="size-5" />
            </div>
            <h3 className="mt-4 font-bold">Nenhum endereço cadastrado</h3>
            <p className="mt-2 max-w-sm text-sm leading-6 text-muted-foreground">
              Adicione um endereço para agilizar as próximas compras.
            </p>
            <Button
              type="button"
              size="lg"
              className="mt-5 rounded-xl font-bold"
              onClick={handleAddAddress}
            >
              <Plus className="size-4" />
              Adicionar endereço
            </Button>
          </CardContent>
        </Card>
      )}

      <p className="sr-only" aria-live="polite">
        {statusMessage}
      </p>

      <AccountAddressDeleteDialog
        address={deletingAddress}
        onCancel={() => setDeletingAddress(null)}
        onConfirm={handleRemoveAddress}
      />
    </section>
  );
}
