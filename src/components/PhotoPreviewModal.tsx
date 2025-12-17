import { X, ChevronLeft, ChevronRight } from "lucide-react";
import { Photo } from "@/types/photo";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";

interface PhotoPreviewModalProps {
  photo: Photo | null;
  photos: Photo[];
  onClose: () => void;
  onNavigate: (photo: Photo) => void;
}

export function PhotoPreviewModal({
  photo,
  photos,
  onClose,
  onNavigate,
}: PhotoPreviewModalProps) {
  if (!photo) return null;

  const currentIndex = photos.findIndex((p) => p.id === photo.id);
  const hasPrev = currentIndex > 0;
  const hasNext = currentIndex < photos.length - 1;

  const handlePrev = () => {
    if (hasPrev) {
      onNavigate(photos[currentIndex - 1]);
    }
  };

  const handleNext = () => {
    if (hasNext) {
      onNavigate(photos[currentIndex + 1]);
    }
  };

  return (
    <Dialog open={!!photo} onOpenChange={() => onClose()}>
      <DialogContent className="max-w-5xl border-none bg-background/95 p-0 backdrop-blur-md">
        <VisuallyHidden>
          <DialogTitle>Visualização da foto</DialogTitle>
        </VisuallyHidden>
        
        <div className="relative">
          {/* Close Button */}
          <Button
            size="icon"
            variant="ghost"
            onClick={onClose}
            className="absolute right-2 top-2 z-20 h-10 w-10 rounded-full bg-background/50 backdrop-blur-sm hover:bg-background/80"
          >
            <X className="h-5 w-5" />
          </Button>

          {/* Navigation */}
          {hasPrev && (
            <Button
              size="icon"
              variant="ghost"
              onClick={handlePrev}
              className="absolute left-2 top-1/2 z-20 h-12 w-12 -translate-y-1/2 rounded-full bg-background/50 backdrop-blur-sm hover:bg-background/80"
            >
              <ChevronLeft className="h-6 w-6" />
            </Button>
          )}

          {hasNext && (
            <Button
              size="icon"
              variant="ghost"
              onClick={handleNext}
              className="absolute right-2 top-1/2 z-20 h-12 w-12 -translate-y-1/2 rounded-full bg-background/50 backdrop-blur-sm hover:bg-background/80"
            >
              <ChevronRight className="h-6 w-6" />
            </Button>
          )}

          {/* Image */}
          <div className="flex max-h-[80vh] items-center justify-center p-4">
            <img
              src={photo.dataUrl}
              alt={photo.caption}
              className="max-h-full max-w-full rounded-lg object-contain"
            />
          </div>

          {/* Caption */}
          <div className="border-t border-border bg-card/50 px-6 py-4 backdrop-blur-sm">
            <p className="text-center font-medium text-foreground">{photo.caption}</p>
            <p className="mt-1 text-center text-sm text-muted-foreground">
              Foto {currentIndex + 1} de {photos.length}
            </p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
