import { CreditCard, Pencil, Trash2, Truck } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  getAccountAddressLabel,
  type AccountAddress,
} from "@/lib/account-addresses";

type AccountAddressCardProps = {
  address: AccountAddress;
  onEdit: () => void;
  onRemove: () => void;
};

export function AccountAddressCard({
  address,
  onEdit,
  onRemove,
}: AccountAddressCardProps) {
  const Icon = address.type === "billing" ? CreditCard : Truck;

  return (
    <Card className="rounded-xl p-0">
      <CardContent className="p-5 md:p-6">
        <div className="flex items-start justify-between gap-3">
          <div className="flex min-w-0 items-start gap-3">
            <div className="grid size-10 shrink-0 place-items-center rounded-xl bg-primary/10 text-primary">
              <Icon className="size-5" />
            </div>
            <div className="min-w-0">
              <h3 className="font-bold">
                {getAccountAddressLabel(address.type)}
              </h3>
              <p className="mt-1 text-xs text-muted-foreground">
                Disponível na finalização da compra
              </p>
            </div>
          </div>

          <div className="flex shrink-0 items-center gap-1">
            <Button
              type="button"
              variant="ghost"
              size="sm"
              className="rounded-lg text-primary"
              onClick={onEdit}
            >
              <Pencil className="size-3.5" />
              <span className="hidden sm:inline">Editar</span>
              <span className="sr-only sm:hidden">Editar endereço</span>
            </Button>
            <Button
              type="button"
              variant="ghost"
              size="icon"
              className="rounded-lg text-muted-foreground hover:text-destructive"
              aria-label={`Remover ${getAccountAddressLabel(address.type).toLowerCase()}`}
              onClick={onRemove}
            >
              <Trash2 className="size-4" />
            </Button>
          </div>
        </div>

        <address className="mt-5 space-y-2 wrap-break-word text-sm not-italic leading-6">
          <div className="font-bold">{address.name}</div>
          <div>{address.street}</div>
          <div>
            {address.city} - {address.state}
          </div>
          <div>CEP {address.postalCode}</div>
          <div className="pt-1 text-muted-foreground">{address.phone}</div>
        </address>
      </CardContent>
    </Card>
  );
}
