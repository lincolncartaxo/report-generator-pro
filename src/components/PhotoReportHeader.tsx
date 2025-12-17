import { Calendar, Building2, FileText, Hash } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { ReportInfo } from "@/types/photo";

interface PhotoReportHeaderProps {
  reportInfo: ReportInfo;
  onReportInfoChange: (info: ReportInfo) => void;
}

export function PhotoReportHeader({ reportInfo, onReportInfoChange }: PhotoReportHeaderProps) {
  return (
    <div className="gradient-card rounded-xl border border-border p-6 shadow-soft animate-fade-in">
      <div className="mb-6 text-center">
        <h1 className="font-display text-3xl font-bold tracking-tight text-foreground">
          Relatório Fotográfico
        </h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Documentação visual do projeto
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <div className="space-y-2">
          <label className="flex items-center gap-2 text-sm font-medium text-foreground">
            <FileText className="h-4 w-4 text-primary" />
            Título do Relatório
          </label>
          <Input
            value={reportInfo.title}
            onChange={(e) => onReportInfoChange({ ...reportInfo, title: e.target.value })}
            placeholder="Ex: Vistoria Técnica - Fase 1"
            className="no-print"
          />
          <span className="print-only hidden text-lg font-semibold">{reportInfo.title || "Relatório Fotográfico"}</span>
        </div>

        <div className="space-y-2">
          <label className="flex items-center gap-2 text-sm font-medium text-foreground">
            <Building2 className="h-4 w-4 text-primary" />
            Cliente
          </label>
          <Input
            value={reportInfo.client}
            onChange={(e) => onReportInfoChange({ ...reportInfo, client: e.target.value })}
            placeholder="Nome do cliente"
            className="no-print"
          />
          <span className="print-only hidden">{reportInfo.client}</span>
        </div>

        <div className="space-y-2">
          <label className="flex items-center gap-2 text-sm font-medium text-foreground">
            <Calendar className="h-4 w-4 text-primary" />
            Data
          </label>
          <Input
            type="date"
            value={reportInfo.date}
            onChange={(e) => onReportInfoChange({ ...reportInfo, date: e.target.value })}
            className="no-print"
          />
          <span className="print-only hidden">{reportInfo.date}</span>
        </div>

        <div className="space-y-2">
          <label className="flex items-center gap-2 text-sm font-medium text-foreground">
            <Hash className="h-4 w-4 text-primary" />
            Código do Projeto
          </label>
          <Input
            value={reportInfo.projectCode}
            onChange={(e) => onReportInfoChange({ ...reportInfo, projectCode: e.target.value })}
            placeholder="Ex: PRJ-2024-001"
            className="no-print"
          />
          <span className="print-only hidden">{reportInfo.projectCode}</span>
        </div>

        <div className="space-y-2 md:col-span-2">
          <label className="flex items-center gap-2 text-sm font-medium text-foreground">
            Observações
          </label>
          <Textarea
            value={reportInfo.notes}
            onChange={(e) => onReportInfoChange({ ...reportInfo, notes: e.target.value })}
            placeholder="Notas adicionais sobre o projeto..."
            className="min-h-[80px] resize-none no-print"
          />
          <p className="print-only hidden whitespace-pre-wrap">{reportInfo.notes}</p>
        </div>
      </div>
    </div>
  );
}
