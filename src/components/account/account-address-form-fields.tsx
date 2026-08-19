import type { ComponentProps } from "react";
import {
  Controller,
  useFormState,
  type UseFormReturn,
} from "react-hook-form";

import { FormFieldError } from "@/components/shared/form-field-error";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type { AccountAddressFormValues } from "@/lib/forms/schemas";

type AccountAddressFormFieldsProps = {
  form: UseFormReturn<AccountAddressFormValues>;
};

export function AccountAddressFormFields({
  form,
}: AccountAddressFormFieldsProps) {
  const { errors } = useFormState({ control: form.control });

  return (
    <div className="grid gap-5">
      <div className="grid gap-2">
        <Label htmlFor="address-type">Finalidade</Label>
        <Controller
          control={form.control}
          name="type"
          render={({ field, fieldState }) => (
            <>
              <Select
                value={field.value}
                onValueChange={(value) => field.onChange(value)}
              >
                <SelectTrigger
                  id="address-type"
                  className="w-full rounded-xl data-[size=default]:h-11"
                  aria-invalid={Boolean(fieldState.error)}
                  aria-describedby={
                    fieldState.error ? "address-type-error" : undefined
                  }
                >
                  <SelectValue>
                    {field.value === "billing"
                      ? "Endereço de cobrança"
                      : "Endereço de entrega"}
                  </SelectValue>
                </SelectTrigger>
                <SelectContent align="start">
                  <SelectItem value="delivery">
                    Endereço de entrega
                  </SelectItem>
                  <SelectItem value="billing">
                    Endereço de cobrança
                  </SelectItem>
                </SelectContent>
              </Select>
              <FormFieldError
                id="address-type-error"
                message={fieldState.error?.message}
              />
            </>
          )}
        />
      </div>

      <AddressInputField
        id="address-name"
        label="Nome do destinatário"
        autoComplete="name"
        error={errors.name?.message}
        inputProps={form.register("name")}
      />

      <AddressInputField
        id="address-postal-code"
        label="CEP"
        inputMode="numeric"
        autoComplete="postal-code"
        placeholder="00000-000"
        error={errors.postalCode?.message}
        inputProps={form.register("postalCode")}
      />

      <AddressInputField
        id="address-street"
        label="Endereço completo"
        autoComplete="street-address"
        placeholder="Rua, número e complemento"
        error={errors.street?.message}
        inputProps={form.register("street")}
      />

      <div className="grid gap-5 sm:grid-cols-2">
        <AddressInputField
          id="address-city"
          label="Cidade"
          autoComplete="address-level2"
          error={errors.city?.message}
          inputProps={form.register("city")}
        />
        <AddressInputField
          id="address-state"
          label="Estado"
          autoComplete="address-level1"
          error={errors.state?.message}
          inputProps={form.register("state")}
        />
      </div>

      <AddressInputField
        id="address-phone"
        label="Telefone"
        type="tel"
        inputMode="tel"
        autoComplete="tel"
        placeholder="(00) 00000-0000"
        error={errors.phone?.message}
        inputProps={form.register("phone")}
      />
    </div>
  );
}

type AddressInputFieldProps = Omit<
  ComponentProps<typeof Input>,
  "aria-invalid" | "id"
> & {
  error?: string;
  id: string;
  inputProps: ComponentProps<typeof Input>;
  label: string;
};

function AddressInputField({
  error,
  id,
  inputProps,
  label,
  ...props
}: AddressInputFieldProps) {
  const errorId = `${id}-error`;

  return (
    <div className="grid gap-2">
      <Label htmlFor={id}>{label}</Label>
      <Input
        {...props}
        {...inputProps}
        id={id}
        className="h-11 rounded-xl"
        aria-invalid={Boolean(error)}
        aria-describedby={error ? errorId : undefined}
      />
      <FormFieldError id={errorId} message={error} />
    </div>
  );
}
