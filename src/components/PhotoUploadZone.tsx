import { useCallback } from "react";
import { Upload, ImagePlus } from "lucide-react";
import { Photo } from "@/types/photo";

interface PhotoUploadZoneProps {
  onPhotosAdd: (photos: Photo[]) => void;
}

export function PhotoUploadZone({ onPhotosAdd }: PhotoUploadZoneProps) {
  const processFiles = useCallback((files: FileList | null) => {
    if (!files) return;

    const imageFiles = Array.from(files).filter(file => file.type.startsWith('image/'));
    
    const newPhotos: Photo[] = [];

    imageFiles.forEach((file) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        const photo: Photo = {
          id: `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
          file,
          dataUrl: e.target?.result as string,
          caption: file.name.replace(/\.[^/.]+$/, ""),
        };
        newPhotos.push(photo);
        
        if (newPhotos.length === imageFiles.length) {
          onPhotosAdd(newPhotos);
        }
      };
      reader.readAsDataURL(file);
    });
  }, [onPhotosAdd]);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    processFiles(e.dataTransfer.files);
  }, [processFiles]);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
  }, []);

  const handleInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    processFiles(e.target.files);
    e.target.value = '';
  }, [processFiles]);

  return (
    <div
      onDrop={handleDrop}
      onDragOver={handleDragOver}
      className="no-print group relative rounded-xl border-2 border-dashed border-primary/30 bg-primary/5 p-8 transition-all duration-300 hover:border-primary/50 hover:bg-primary/10"
    >
      <input
        type="file"
        multiple
        accept="image/*"
        onChange={handleInputChange}
        className="absolute inset-0 cursor-pointer opacity-0"
      />
      
      <div className="flex flex-col items-center justify-center gap-4 text-center">
        <div className="rounded-full bg-primary/10 p-4 transition-transform duration-300 group-hover:scale-110">
          <Upload className="h-8 w-8 text-primary" />
        </div>
        
        <div>
          <p className="font-display text-lg font-semibold text-foreground">
            Arraste fotos aqui
          </p>
          <p className="mt-1 text-sm text-muted-foreground">
            ou clique para selecionar arquivos
          </p>
        </div>

        <div className="flex items-center gap-2 rounded-full bg-secondary px-4 py-2 text-sm text-secondary-foreground">
          <ImagePlus className="h-4 w-4" />
          <span>JPG, PNG, WEBP</span>
        </div>
      </div>
    </div>
  );
}
