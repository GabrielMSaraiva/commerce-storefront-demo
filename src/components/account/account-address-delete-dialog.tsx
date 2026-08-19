import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import {
  getAccountAddressLabel,
  type AccountAddress,
} from "@/lib/account-addresses";

type AccountAddressDeleteDialogProps = {
  address: AccountAddress | null;
  onCancel: () => void;
  onConfirm: () => void;
};

export function AccountAddressDeleteDialog({
  address,
  onCancel,
  onConfirm,
}: AccountAddressDeleteDialogProps) {
  return (
    <AlertDialog
      open={Boolean(address)}
      onOpenChange={(open) => {
        if (!open) {
          onCancel();
        }
      }}
    >
      <AlertDialogContent className="w-[calc(100vw-2rem)]">
        <AlertDialogHeader>
          <AlertDialogTitle>Remover endereço?</AlertDialogTitle>
          <AlertDialogDescription>
            Esta ação removerá o{" "}
            {address
              ? getAccountAddressLabel(address.type).toLowerCase()
              : "endereço"}{" "}
            da sua conta.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel className="rounded-xl">
            Cancelar
          </AlertDialogCancel>
          <AlertDialogAction
            variant="destructive"
            className="rounded-xl font-bold"
            onClick={onConfirm}
          >
            Remover
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
