type FormFieldErrorProps = {
  id?: string;
  message?: string;
};

export function FormFieldError({ id, message }: FormFieldErrorProps) {
  return (
    <p
      id={id}
      role="alert"
      aria-atomic="true"
      className="text-xs font-medium text-destructive"
    >
      {message ?? null}
    </p>
  );
}
