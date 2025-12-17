import { useState, useCallback } from "react";
import { Photo, ReportInfo } from "@/types/photo";
import { PhotoReportHeader } from "@/components/PhotoReportHeader";
import { PhotoUploadZone } from "@/components/PhotoUploadZone";
import { PhotoGallery } from "@/components/PhotoGallery";
import { PhotoPreviewModal } from "@/components/PhotoPreviewModal";
import { ActionBar } from "@/components/ActionBar";
import { Toaster } from "@/components/ui/sonner";
import { toast } from "sonner";

const Index = () => {
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [previewPhoto, setPreviewPhoto] = useState<Photo | null>(null);
  const [reportInfo, setReportInfo] = useState<ReportInfo>({
    title: "",
    client: "",
    date: new Date().toISOString().split("T")[0],
    projectCode: "",
    notes: "",
  });

  const handlePhotosAdd = useCallback((newPhotos: Photo[]) => {
    setPhotos((prev) => [...prev, ...newPhotos]);
    toast.success(`${newPhotos.length} ${newPhotos.length === 1 ? "foto adicionada" : "fotos adicionadas"}`);
  }, []);

  const handlePhotoDelete = useCallback((id: string) => {
    setPhotos((prev) => prev.filter((p) => p.id !== id));
    toast.success("Foto removida");
  }, []);

  const handleCaptionChange = useCallback((id: string, caption: string) => {
    setPhotos((prev) =>
      prev.map((p) => (p.id === id ? { ...p, caption } : p))
    );
  }, []);

  const handleClearAll = useCallback(() => {
    setPhotos([]);
    toast.success("Todas as fotos foram removidas");
  }, []);

  const handlePrint = useCallback(() => {
    window.print();
  }, []);

  return (
    <div className="min-h-screen gradient-subtle">
      <Toaster position="top-right" richColors />
      
      {/* Print Header - appears on all printed pages */}
      <div className="print-header hidden">
        <img 
          src="http://lclprojetos.com/img/logo_color.png" 
          alt="LCL Projetos"
        />
      </div>
      
      <div className="mx-auto max-w-6xl px-4 py-8 print-content">
        {/* Logo - screen only */}
        <div className="mb-8 flex justify-center no-print">
          <div className="rounded-xl bg-card px-6 py-4 shadow-soft">
            <img 
              src="http://lclprojetos.com/img/logo_color.png" 
              alt="LCL Projetos" 
              className="h-20 w-auto"
            />
          </div>
        </div>

        <div className="space-y-6">
          {/* Header with Report Info */}
          <PhotoReportHeader
            reportInfo={reportInfo}
            onReportInfoChange={setReportInfo}
          />

          {/* Upload Zone */}
          <PhotoUploadZone onPhotosAdd={handlePhotosAdd} />

          {/* Action Bar */}
          <ActionBar
            photoCount={photos.length}
            onPrint={handlePrint}
            onClearAll={handleClearAll}
          />

          {/* Photo Gallery */}
          {photos.length > 0 && (
            <div className="animate-fade-in">
              <PhotoGallery
                photos={photos}
                onPhotosChange={setPhotos}
                onPhotoDelete={handlePhotoDelete}
                onCaptionChange={handleCaptionChange}
                onPreview={setPreviewPhoto}
              />
            </div>
          )}

          {/* Empty State */}
          {photos.length === 0 && (
            <div className="rounded-xl border border-dashed border-border bg-card/50 p-12 text-center">
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-muted">
                <svg
                  className="h-8 w-8 text-muted-foreground"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                  />
                </svg>
              </div>
              <h3 className="font-display text-lg font-semibold text-foreground">
                Nenhuma foto adicionada
              </h3>
              <p className="mt-2 text-sm text-muted-foreground">
                Arraste imagens para a área acima ou clique para selecionar
              </p>
            </div>
          )}
        </div>

        {/* Footer */}
        <footer className="mt-12 border-t border-border pt-6 text-center no-print">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} LCL Projetos - Gerador de Relatórios Fotográficos
          </p>
        </footer>
      </div>

      {/* Preview Modal */}
      <PhotoPreviewModal
        photo={previewPhoto}
        photos={photos}
        onClose={() => setPreviewPhoto(null)}
        onNavigate={setPreviewPhoto}
      />
    </div>
  );
};

export default Index;
