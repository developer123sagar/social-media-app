import { useRef } from "react";
import { Cropper, ReactCropperElement } from "react-cropper";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog";
import { Button } from "./ui/button";
import "cropperjs/dist/cropper.css";

interface CropImageDialogProps {
  src: string;
  cropAspectRation: number;
  onCropped: (blob: Blob | null) => void;
  onClose: () => void;
}

const CropImageDialog = ({
  cropAspectRation,
  onClose,
  onCropped,
  src,
}: CropImageDialogProps) => {
  const cropperRef = useRef<ReactCropperElement>(null);

  function crop() {
    const cropper = cropperRef.current?.cropper;
    if (!cropper) return;

    cropper.getCroppedCanvas().toBlob((blob) => onCropped(blob), "image/webp");
    onClose();
  }

  return (
    <Dialog open onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Crop image</DialogTitle>
        </DialogHeader>
        <Cropper
          src={src}
          aspectRatio={cropAspectRation}
          guides={false}
          zoomable={false}
          ref={cropperRef}
          className="mx-auto size-fit"
        />
        <DialogFooter>
          <Button variant={"secondary"} onClick={onClose}>
            Cancel
          </Button>
          <Button variant={"secondary"} onClick={crop}>
            Confirm
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default CropImageDialog;
