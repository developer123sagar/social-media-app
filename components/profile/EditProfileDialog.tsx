import { UserData } from "@/types";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useForm } from "react-hook-form";
import {
  updateUserProfileSchema,
  UpdateUserProfileValues,
} from "@/validations";
import { zodResolver } from "@hookform/resolvers/zod";
import { useUpdateProfileMutation } from "@/app/(main)/users/[username]/mutation";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import LoadingButton from "../LoadingButtont";
import Image, { StaticImageData } from "next/image";
import { useRef, useState } from "react";
import { Label } from "../ui/label";
import { Camera } from "lucide-react";
import CropImageDialog from "../CropImageDialog";
import Resizer from "react-image-file-resizer";

interface EditProfileDialogPorps {
  user: UserData;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function EditProfileDialog({
  user,
  open,
  onOpenChange,
}: EditProfileDialogPorps) {
  const [croppedAvatar, setCroppedAvatar] = useState<Blob | null>(null);

  const form = useForm<UpdateUserProfileValues>({
    resolver: zodResolver(updateUserProfileSchema),
    defaultValues: {
      displayName: user.displayName,
      bio: user.bio || "",
    },
  });

  const mutation = useUpdateProfileMutation();

  async function onSubmit(values: UpdateUserProfileValues) {
    const newAvatarFile = croppedAvatar
      ? new File([croppedAvatar], `avatar_${user.id}.webp`)
      : undefined;

    mutation.mutate(
      {
        values,
        avatar: newAvatarFile,
      },
      {
        onSuccess: () => {
          setCroppedAvatar(null);
          onOpenChange(false);
        },
      },
    );
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit profile</DialogTitle>
        </DialogHeader>
        <div className="space-y-1.5">
          <Label>Avatar</Label>
          <AvatarInput
            src={
              croppedAvatar
                ? URL.createObjectURL(croppedAvatar)
                : user.avatarUrl || "/avatar-placeholder.png"
            }
            onImageCropped={setCroppedAvatar}
          />
        </div>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
            <FormField
              control={form.control}
              name="displayName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Display name</FormLabel>
                  <FormControl>
                    <Input placeholder="Your display name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="bio"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Bio</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Tell us a little bit about yourself"
                      className="resize-none"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <DialogFooter>
              <LoadingButton type="submit" loading={mutation.isPending}>
                Save
              </LoadingButton>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}

interface AvatarInputProps {
  src: string | StaticImageData;
  onImageCropped: (blob: Blob | null) => void;
}

function AvatarInput({ src, onImageCropped }: AvatarInputProps) {
  const [imageToCrop, setImageToCrop] = useState<File>();

  const fileInputRef = useRef<HTMLInputElement>(null);

  function onImageSelected(image: File | undefined) {
    if (!image) return;

    Resizer.imageFileResizer(
      image,
      1024,
      1024,
      "WEBP",
      100,
      0,
      (uri) => setImageToCrop(uri as File),
      "file",
    );

    //
  }
  return (
    <>
      <input
        type="file"
        accept="image/*"
        onChange={(e) => onImageSelected(e.target.files?.[0])}
        ref={fileInputRef}
        className="sr-only hidden"
      />
      <button
        type="button"
        onClick={() => fileInputRef.current?.click()}
        className="group relative block"
      >
        <Image
          src={src}
          alt="avatar"
          width={155}
          height={155}
          className="size-32 flex-none rounded-full border object-cover shadow-inner"
        />
        <span className="flex-center absolute inset-0 m-auto size-12 rounded-full bg-black bg-opacity-20 text-white transition duration-300 group-hover:bg-opacity-25">
          <Camera size={24} />
        </span>
      </button>
      {imageToCrop && (
        <CropImageDialog
          src={URL.createObjectURL(imageToCrop)}
          cropAspectRation={1}
          onCropped={onImageCropped}
          onClose={() => {
            setImageToCrop(undefined);
            if (fileInputRef.current) {
              fileInputRef.current.value = "";
            }
          }}
        />
      )}
    </>
  );
}
