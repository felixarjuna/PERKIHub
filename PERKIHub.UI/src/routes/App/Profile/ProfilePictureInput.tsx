import React from "react";
import { CgProfile } from "react-icons/cg";
import { FiUpload } from "react-icons/fi";

interface ProfilePictureInputProps {
  file: File | null;
}

export const ProfilePictureInput = ({ file }: ProfilePictureInputProps) => {
  const [profilePicture, setProfilePicture] = React.useState<File | null>(file);
  const uploadInput = React.useRef<HTMLInputElement | null>(null);

  const [isUpdating, setIsUpdating] = React.useState<boolean>(false);

  React.useEffect(() => {
    if (isUpdating) return;
    setProfilePicture(file);
  }, [file]);

  return (
    <div className="flex items-center gap-4">
      <span className="grow sm:grow-0 sm:w-24 text-3xl">
        {profilePicture ? (
          <img
            src={URL.createObjectURL(profilePicture!)}
            className="w-20 h-20 rounded-full border-2 border-cream box-border"
          />
        ) : (
          <CgProfile />
        )}
      </span>

      <div
        className="text-input w-[13rem] sm:grow flex gap-3"
        onClick={e => uploadInput.current?.click()}
      >
        <FiUpload className="text-2xl" />
        Upload File
      </div>
      <input
        type="file"
        name="profilePicture"
        className="hidden"
        ref={uploadInput}
        onChange={e => {
          setIsUpdating(true);
          const files = e.target.files;
          if (files) setProfilePicture(files[0]);
        }}
      />
    </div>
  );
};
