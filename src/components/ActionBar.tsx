import { Printer, Trash2, ImageIcon } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ActionBarProps {
  photoCount: number;
  onPrint: () => void;
  onClearAll: () => void;
}

export function ActionBar({ photoCount, onPrint, onClearAll }: ActionBarProps) {
  return (
    <div className="no-print flex flex-wrap items-center justify-between gap-4 rounded-xl border border-border bg-card p-4 shadow-soft">
      <div className="flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
          <ImageIcon className="h-5 w-5 text-primary" />
        </div>
        <div>
          <p className="font-display text-lg font-semibold text-foreground">
            {photoCount} {photoCount === 1 ? "foto" : "fotos"}
          </p>
          <p className="text-sm text-muted-foreground">
            {photoCount > 0 ? "Arraste para reorganizar" : "Adicione fotos para começar"}
          </p>
        </div>
      </div>

      <div className="flex gap-2">
        {photoCount > 0 && (
          <>
            <Button variant="outline" onClick={onClearAll}>
              <Trash2 className="mr-2 h-4 w-4" />
              Limpar Tudo
            </Button>
            <Button variant="gradient" onClick={onPrint}>
              <Printer className="mr-2 h-4 w-4" />
              Imprimir
            </Button>
          </>
        )}
      </div>
    </div>
  );
}
