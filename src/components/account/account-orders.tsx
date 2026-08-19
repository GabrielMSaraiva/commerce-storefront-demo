import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { accountOrders, type AccountOrderStatus } from "@/content/account";
import { cn } from "@/lib/utils";

export function AccountOrders() {
  return (
    <section className="grid min-w-0 gap-6">
      <div className="grid gap-2">
        <h2 className="text-2xl font-bold md:text-3xl">Meus pedidos</h2>
        <p className="max-w-2xl wrap-break-word text-sm leading-6 text-muted-foreground">
          Acompanhe o status, finalize pagamentos pendentes e consulte os
          detalhes dos seus pedidos.
        </p>
      </div>

      <div className="hidden overflow-hidden rounded-xl border bg-card md:block">
        <table className="w-full min-w-[50rem] text-left text-sm">
          <thead>
            <tr className="border-b bg-muted/40 text-xs uppercase text-muted-foreground">
              <th className="px-5 py-3 font-semibold">Pedido</th>
              <th className="px-5 py-3 font-semibold">Data</th>
              <th className="px-5 py-3 font-semibold">Status</th>
              <th className="px-5 py-3 text-right font-semibold">Total</th>
              <th className="px-5 py-3 text-right font-semibold">Detalhes</th>
            </tr>
          </thead>
          <tbody>
            {accountOrders.map((order) => (
              <tr key={order.id} className="border-b last:border-b-0">
                <td className="px-5 py-3">
                  <div className="font-bold">{order.id}</div>
                  <div className="mt-1 max-w-64 truncate text-xs text-muted-foreground">
                    {order.productSummary}
                  </div>
                </td>
                <td className="px-5 py-3 text-muted-foreground">
                  {order.date}
                </td>
                <td className="px-5 py-3">
                  <OrderStatusBadge status={order.status} />
                </td>
                <td className="px-5 py-3 text-right">
                  <div className="font-bold">{order.amount}</div>
                  <div className="text-xs text-muted-foreground">
                    {order.itemCount} {order.itemCount === 1 ? "item" : "itens"}
                  </div>
                </td>
                <td className="px-5 py-3">
                  <div className="flex justify-end">
                    <OrderPrimaryAction actions={order.actions} />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="grid gap-3 md:hidden">
        {accountOrders.map((order) => (
          <article key={order.id} className="rounded-xl border bg-card p-4">
            <div className="flex flex-col items-start gap-3 sm:flex-row sm:justify-between">
              <div className="min-w-0">
                <div className="font-bold">{order.id}</div>
                <div className="mt-1 truncate text-xs text-muted-foreground">
                  {order.productSummary}
                </div>
              </div>
              <OrderStatusBadge status={order.status} />
            </div>

            <Separator className="my-4" />

            <div className="grid gap-2 text-sm">
              <div className="flex items-center justify-between gap-4">
                <span className="text-muted-foreground">Data</span>
                <span>{order.date}</span>
              </div>
              <div className="flex items-center justify-between gap-4">
                <span className="text-muted-foreground">Total</span>
                <span className="font-bold">{order.amount}</span>
              </div>
            </div>

            <div className="mt-4 flex justify-end">
              <OrderPrimaryAction actions={order.actions} />
            </div>
          </article>
        ))}
      </div>

      <p className="text-sm text-muted-foreground">
        Mostrando {accountOrders.length} de {accountOrders.length} pedidos.
      </p>
    </section>
  );
}

function OrderStatusBadge({ status }: { status: AccountOrderStatus }) {
  return (
    <Badge
      variant="secondary"
      className={cn(
        "gap-1.5",
        status === "Pagamento pendente" &&
        "bg-primary/10 text-primary hover:bg-primary/10",
        status === "Concluído" &&
        "bg-emerald-500/10 text-emerald-700 hover:bg-emerald-500/10",
        status === "Cancelado" &&
        "bg-muted text-muted-foreground hover:bg-muted",
      )}
    >
      <span className="size-1.5 rounded-full bg-current" />
      {status}
    </Badge>
  );
}

function OrderPrimaryAction({ actions }: { actions: string[] }) {
  const isPaymentPending = actions.includes("Pagar");

  return (
    <button
      type="button"
      className={cn(
        buttonVariants({
          size: "sm",
        }),
        "rounded-lg text-xs font-bold",
      )}
    >
      {isPaymentPending ? "Pagar" : "Detalhes"}
    </button>
  );
}
