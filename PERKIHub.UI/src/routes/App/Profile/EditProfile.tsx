import React from "react";
import { FiLogOut } from "react-icons/fi";
import { Form, useNavigate } from "react-router-dom";
import { UpsertProfilePictureRequest } from "../../../lib/api/contracts";
import { useAuth } from "../../../lib/hooks/useAuth";
import { ProfilePictureInput } from "./ProfilePictureInput";
import { useProfile } from "./hooks/useProfile";

export function EditProfile() {
  const { currentUser, onChangeUser } = useAuth();
  const navigate = useNavigate();

  const onLogout = () => {
    localStorage.removeItem("user");
    onChangeUser(null);
    navigate(-1);
  };

  const [userInput, setUserInput] = React.useState<{
    id: string;
    profilePicture: File | null;
    firstName: string;
    lastName: string;
    email: string;
    password: string;
  }>({
    id: currentUser?.id ?? "",
    profilePicture: null,
    firstName: currentUser?.firstName ?? "",
    lastName: currentUser?.lastName ?? "",
    email: currentUser?.email ?? "",
    password: "",
  });

  const { onUpdateProfile, onUpdateProfilePicture, profilePicture } =
    useProfile(currentUser?.id ?? "");

  React.useEffect(() => {
    setUserInput(prevValue => ({
      ...prevValue,
      id: currentUser?.id ?? "",
      firstName: currentUser?.firstName ?? "",
      lastName: currentUser?.lastName ?? "",
      email: currentUser?.email ?? "",
    }));
  }, [currentUser]);

  const onSubmitUpdateUser = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdateProfile.mutate(userInput);

    // Update Profile Picture If Needed
    if (userInput.profilePicture) {
      const upsertProfilePictureRequest: UpsertProfilePictureRequest = {
        id: userInput.id,
        profilePicture: userInput.profilePicture,
      };
      onUpdateProfilePicture.mutate(upsertProfilePictureRequest);
    }
  };

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUserInput(prevValue => ({ ...prevValue, [name]: value }));
  };

  return (
    <div className="flex items-center justify-center h-screen w-screen p-8 flex-col">
      <Form
        method="post"
        id="contact-form"
        className="w-screen p-8 sm:max-w-lg"
        onSubmit={onSubmitUpdateUser}
      >
        <div className="hidden">
          <input
            placeholder="First"
            aria-label="First name"
            type="text"
            name="id"
            defaultValue={currentUser?.id}
            className="text-input w-[13rem] sm:grow"
          />
        </div>

        <ProfilePictureInput file={profilePicture} />

        <div className="flex items-center gap-4">
          <span className="grow sm:grow-0 sm:w-24">First name</span>
          <input
            placeholder="First"
            aria-label="First name"
            type="text"
            name="firstName"
            className="text-input w-[13rem] sm:grow"
            value={userInput.firstName}
            onChange={onChange}
          />
        </div>
        <div className="flex items-center gap-4">
          <span className="grow sm:grow-0 sm:w-24">Last name</span>
          <input
            placeholder="Last"
            aria-label="Last name"
            type="text"
            name="lastName"
            className="text-input w-[13rem] sm:grow"
            value={userInput.lastName}
            onChange={onChange}
          />
        </div>
        <div className="flex items-center gap-4">
          <span className="grow sm:grow-0 sm:w-24">Email</span>
          <input
            type="text"
            name="email"
            placeholder="@jack"
            className="text-input w-[13rem] sm:grow"
            value={userInput.email}
            onChange={onChange}
          />
        </div>
        <div className="flex items-center gap-4">
          <span className="grow sm:grow-0 sm:w-24">Password</span>
          <input
            type="password"
            name="password"
            className="text-input w-[13rem] sm:grow text-2xl"
            value={userInput.password}
            onChange={onChange}
          />
        </div>

        <div className="mt-5 flex gap-4">
          <div className="w-24 bg-lightmaroon">
            <button type="submit" className="button-cream">
              Save
            </button>
          </div>
          <div className="w-24 bg-cream">
            <button
              type="button"
              onClick={() => navigate(-1)}
              className="button-gray"
            >
              Back
            </button>
          </div>
        </div>

        {(onUpdateProfile.isSuccess || onUpdateProfilePicture.isSuccess) && (
          <div className="mt-1">
            <span className="text-lightmaroon sm:text-xl">
              User updated successfully! 🔥
            </span>
          </div>
        )}

        {(onUpdateProfile.isError || onUpdateProfilePicture.isError) && (
          <div className="mt-1">
            <span className="text-lightmaroon sm:text-xl">
              User update failed! 🥺
            </span>
          </div>
        )}
      </Form>

      <div
        className="absolute right-10 top-10 flex text-xl items-center gap-2 cursor-pointer"
        onClick={onLogout}
      >
        <p>Log out</p>
        <FiLogOut />
      </div>
    </div>
  );
}
