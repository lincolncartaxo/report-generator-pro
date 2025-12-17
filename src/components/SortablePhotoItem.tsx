import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { GripVertical, Trash2, Maximize2, Pencil, Check, X } from "lucide-react";
import { useState } from "react";
import { Photo } from "@/types/photo";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface SortablePhotoItemProps {
  photo: Photo;
  index: number;
  onDelete: (id: string) => void;
  onCaptionChange: (id: string, caption: string) => void;
  onPreview: (photo: Photo) => void;
}

export function SortablePhotoItem({
  photo,
  index,
  onDelete,
  onCaptionChange,
  onPreview,
}: SortablePhotoItemProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editCaption, setEditCaption] = useState(photo.caption);

  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: photo.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  const handleSaveCaption = () => {
    onCaptionChange(photo.id, editCaption);
    setIsEditing(false);
  };

  const handleCancelEdit = () => {
    setEditCaption(photo.caption);
    setIsEditing(false);
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={`photo-item group relative rounded-xl border border-border bg-card shadow-soft transition-all duration-200 ${
        isDragging ? "z-50 scale-105 shadow-elevated" : "hover:shadow-medium"
      }`}
    >
      {/* Drag Handle */}
      <div
        {...attributes}
        {...listeners}
        className="no-print absolute left-2 top-2 z-10 cursor-grab rounded-lg bg-background/80 p-1.5 opacity-0 backdrop-blur-sm transition-opacity group-hover:opacity-100 active:cursor-grabbing"
      >
        <GripVertical className="h-4 w-4 text-muted-foreground" />
      </div>

      {/* Photo Number */}
      <div className="absolute right-2 top-2 z-10 flex h-7 w-7 items-center justify-center rounded-full bg-primary text-xs font-bold text-primary-foreground shadow-medium">
        {index + 1}
      </div>

      {/* Image Container */}
      <div className="relative aspect-square overflow-hidden rounded-t-xl bg-muted">
        <img
          src={photo.dataUrl}
          alt={photo.caption}
          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
        
        {/* Overlay Actions */}
        <div className="no-print absolute inset-0 flex items-center justify-center gap-2 bg-foreground/0 opacity-0 transition-all duration-200 group-hover:bg-foreground/40 group-hover:opacity-100">
          <Button
            size="icon"
            variant="secondary"
            onClick={() => onPreview(photo)}
            className="h-10 w-10 rounded-full"
          >
            <Maximize2 className="h-5 w-5" />
          </Button>
          <Button
            size="icon"
            variant="destructive"
            onClick={() => onDelete(photo.id)}
            className="h-10 w-10 rounded-full"
          >
            <Trash2 className="h-5 w-5" />
          </Button>
        </div>
      </div>

      {/* Caption */}
      <div className="p-3">
        {isEditing ? (
          <div className="no-print flex items-center gap-2">
            <Input
              value={editCaption}
              onChange={(e) => setEditCaption(e.target.value)}
              className="h-8 text-sm"
              autoFocus
              onKeyDown={(e) => {
                if (e.key === "Enter") handleSaveCaption();
                if (e.key === "Escape") handleCancelEdit();
              }}
            />
            <Button size="icon" variant="ghost" onClick={handleSaveCaption} className="h-8 w-8 shrink-0">
              <Check className="h-4 w-4 text-green-600" />
            </Button>
            <Button size="icon" variant="ghost" onClick={handleCancelEdit} className="h-8 w-8 shrink-0">
              <X className="h-4 w-4 text-destructive" />
            </Button>
          </div>
        ) : (
          <div className="flex items-start justify-between gap-2">
            <p className="line-clamp-2 text-sm font-medium text-foreground">{photo.caption}</p>
            <Button
              size="icon"
              variant="ghost"
              onClick={() => setIsEditing(true)}
              className="no-print h-7 w-7 shrink-0 opacity-0 transition-opacity group-hover:opacity-100"
            >
              <Pencil className="h-3.5 w-3.5" />
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
