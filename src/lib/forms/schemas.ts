import { z } from "zod";

const requiredMessage = "Campo obrigatório.";

const trimmedString = z.string().trim();

export const emailSchema = trimmedString
  .min(1, requiredMessage)
  .email("Informe um e-mail válido.");

export const phoneSchema = trimmedString.refine(
  (value) => {
    const digits = value.replace(/\D/g, "");
    return digits.length === 10 || digits.length === 11;
  },
  { message: "Informe um telefone válido." },
);

export const passwordSchema = z.string().superRefine((value, context) => {
  if (!value) {
    context.addIssue({
      code: "custom",
      message: "Digite sua senha.",
    });
    return;
  }

  if (value.length < 8) {
    context.addIssue({
      code: "custom",
      message: "A senha deve ter no mínimo 8 caracteres.",
    });
  }

  if (value.length > 25) {
    context.addIssue({
      code: "custom",
      message: "A senha deve ter no máximo 25 caracteres.",
    });
  }

  if (!/\d/.test(value)) {
    context.addIssue({
      code: "custom",
      message: "A senha deve ter no mínimo 1 número.",
    });
  }

  if (!/[A-Z]/.test(value)) {
    context.addIssue({
      code: "custom",
      message: "A senha deve ter no mínimo 1 letra maiúscula.",
    });
  }

  if (!/[a-z]/.test(value)) {
    context.addIssue({
      code: "custom",
      message: "A senha deve ter no mínimo 1 letra minúscula.",
    });
  }
});

export const accountLoginSchema = z.object({
  identifier: trimmedString.min(3, "Informe seu usuário ou e-mail."),
  password: z.string().min(1, "Digite sua senha."),
  remember: z.boolean(),
});

export const accountRegisterEmailSchema = z.object({
  email: emailSchema,
});

export const accountAddressSchema = z.object({
  type: z.enum(["billing", "delivery"], {
    message: "Selecione a finalidade do endereço.",
  }),
  name: trimmedString
    .min(3, "Informe o nome do destinatário.")
    .max(80, "O nome deve ter até 80 caracteres."),
  postalCode: trimmedString.refine(
    (value) => value.replace(/\D/g, "").length === 8,
    { message: "Informe um CEP válido." },
  ),
  street: trimmedString
    .min(5, "Informe o endereço completo.")
    .max(120, "O endereço deve ter até 120 caracteres."),
  city: trimmedString
    .min(2, "Informe a cidade.")
    .max(60, "A cidade deve ter até 60 caracteres."),
  state: trimmedString
    .min(2, "Informe o estado.")
    .max(40, "O estado deve ter até 40 caracteres."),
  phone: phoneSchema,
});

export const accountProfileSchema = z
  .object({
    firstName: trimmedString.min(2, "Informe seu nome."),
    lastName: trimmedString.min(2, "Informe seu sobrenome."),
    displayName: trimmedString.min(3, "Informe seu nome de exibição."),
    email: emailSchema,
    phone: phoneSchema,
    currentPassword: z.string(),
    newPassword: z.string(),
    confirmPassword: z.string(),
  })
  .superRefine((values, context) => {
    const wantsPasswordChange =
      values.currentPassword || values.newPassword || values.confirmPassword;

    if (!wantsPasswordChange) {
      return;
    }

    if (!values.currentPassword) {
      context.addIssue({
        code: "custom",
        message: "Informe sua senha atual.",
        path: ["currentPassword"],
      });
    }

    const passwordResult = passwordSchema.safeParse(values.newPassword);
    if (!passwordResult.success) {
      passwordResult.error.issues.forEach((issue) => {
        context.addIssue({
          code: "custom",
          message: issue.message,
          path: ["newPassword"],
        });
      });
    }

    if (values.newPassword !== values.confirmPassword) {
      context.addIssue({
        code: "custom",
        message: "As senhas precisam ser iguais.",
        path: ["confirmPassword"],
      });
    }
  });

export const contactFormSchema = z.object({
  name: trimmedString.min(3, "Informe seu nome completo."),
  email: emailSchema,
  phone: phoneSchema,
  message: trimmedString.min(10, "Descreva como podemos ajudar."),
});

export const couponFormSchema = z.object({
  coupon: trimmedString
    .min(3, "Digite um cupom válido.")
    .max(24, "O cupom deve ter até 24 caracteres.")
    .regex(/^[a-zA-Z0-9-]+$/, "Use apenas letras, números e hífen."),
});

export const searchFormSchema = z.object({
  query: trimmedString.min(2, "Digite pelo menos 2 caracteres."),
});

export type AccountLoginFormValues = z.infer<typeof accountLoginSchema>;
export type AccountRegisterEmailFormValues = z.infer<
  typeof accountRegisterEmailSchema
>;
export type AccountAddressFormValues = z.infer<typeof accountAddressSchema>;
export type AccountProfileFormValues = z.infer<typeof accountProfileSchema>;
export type ContactFormValues = z.infer<typeof contactFormSchema>;
export type CouponFormValues = z.infer<typeof couponFormSchema>;
export type SearchFormValues = z.infer<typeof searchFormSchema>;
