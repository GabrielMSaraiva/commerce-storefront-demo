import type { AccountAddressFormValues } from "@/lib/forms/schemas";

export type AccountAddress = AccountAddressFormValues & {
  id: string;
};

export function getAccountAddressLabel(type: AccountAddress["type"]) {
  return type === "billing" ? "Endereço de cobrança" : "Endereço de entrega";
}
