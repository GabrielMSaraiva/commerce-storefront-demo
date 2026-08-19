import { describe, expect, it } from "vitest";

import {
  contactFormSchema,
  couponFormSchema,
  passwordSchema,
  searchFormSchema,
} from "./schemas";

describe("storefront form schemas", () => {
  it("accepts a complete contact form", () => {
    expect(
      contactFormSchema.safeParse({
        name: "Alex Demo",
        email: "alex@example.com",
        phone: "11999999999",
        message: "Gostaria de conhecer o projeto.",
      }).success,
    ).toBe(true);
  });

  it("rejects invalid contact details", () => {
    expect(
      contactFormSchema.safeParse({
        name: "A",
        email: "invalid",
        phone: "123",
        message: "curta",
      }).success,
    ).toBe(false);
  });

  it("enforces password complexity", () => {
    expect(passwordSchema.safeParse("StrongPass1").success).toBe(true);
    expect(passwordSchema.safeParse("weak").success).toBe(false);
  });

  it("allows safe coupon and search inputs", () => {
    expect(couponFormSchema.safeParse({ coupon: "DEMO-15" }).success).toBe(true);
    expect(couponFormSchema.safeParse({ coupon: "<script>" }).success).toBe(false);
    expect(searchFormSchema.safeParse({ query: "kit" }).success).toBe(true);
  });
});
