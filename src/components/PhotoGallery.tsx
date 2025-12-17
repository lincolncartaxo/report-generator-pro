import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  rectSortingStrategy,
} from "@dnd-kit/sortable";
import { Photo } from "@/types/photo";
import { SortablePhotoItem } from "./SortablePhotoItem";

interface PhotoGalleryProps {
  photos: Photo[];
  onPhotosChange: (photos: Photo[]) => void;
  onPhotoDelete: (id: string) => void;
  onCaptionChange: (id: string, caption: string) => void;
  onPreview: (photo: Photo) => void;
}

export function PhotoGallery({
  photos,
  onPhotosChange,
  onPhotoDelete,
  onCaptionChange,
  onPreview,
}: PhotoGalleryProps) {
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (over && active.id !== over.id) {
      const oldIndex = photos.findIndex((p) => p.id === active.id);
      const newIndex = photos.findIndex((p) => p.id === over.id);
      onPhotosChange(arrayMove(photos, oldIndex, newIndex));
    }
  };

  if (photos.length === 0) {
    return null;
  }

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragEnd={handleDragEnd}
    >
      <SortableContext items={photos.map((p) => p.id)} strategy={rectSortingStrategy}>
        <div className="photo-grid grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
          {photos.map((photo, index) => (
            <SortablePhotoItem
              key={photo.id}
              photo={photo}
              index={index}
              onDelete={onPhotoDelete}
              onCaptionChange={onCaptionChange}
              onPreview={onPreview}
            />
          ))}
        </div>
      </SortableContext>
    </DndContext>
  );
}
