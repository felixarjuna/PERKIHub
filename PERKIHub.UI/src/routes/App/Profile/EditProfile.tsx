import { HttpStatusCode } from "axios";
import { FiLogOut } from "react-icons/fi";
import { Form, useActionData, useNavigate } from "react-router-dom";
import { useAuth } from "../../../lib/hooks/useAuth";

export function EditProfile() {
  const { currentUser, onChangeUser } = useAuth();
  const navigate = useNavigate();

  const status = useActionData();

  const onLogout = () => {
    localStorage.removeItem("user");
    onChangeUser(null);
    navigate(-1);
  };

  return (
    <div className="flex items-center justify-center h-screen w-screen p-8 flex-col">
      {status === HttpStatusCode.NoContent && (
        <div className="self-start sm:self-center">
          <p className="text-lightmaroon sm:text-xl">
            User updated successfully! 🔥
          </p>
        </div>
      )}
      <Form
        method="post"
        id="contact-form"
        className="w-screen p-8 sm:max-w-lg"
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
        <div className="flex items-center gap-4">
          <span className="grow sm:grow-0 sm:w-24">Name</span>
          <input
            placeholder="First"
            aria-label="First name"
            type="text"
            name="firstName"
            defaultValue={currentUser?.firstName}
            className="text-input w-[13rem] sm:grow"
          />
        </div>
        <div className="flex items-center gap-4">
          <span className="grow sm:grow-0 sm:w-24">Last name</span>
          <input
            placeholder="Last"
            aria-label="Last name"
            type="text"
            name="lastName"
            defaultValue={currentUser?.lastName}
            className="text-input w-[13rem] sm:grow"
          />
        </div>
        <div className="flex items-center gap-4">
          <span className="grow sm:grow-0 sm:w-24">Email</span>
          <input
            type="text"
            name="email"
            placeholder="@jack"
            defaultValue={currentUser?.email}
            className="text-input w-[13rem] sm:grow"
          />
        </div>
        <div className="flex items-center gap-4">
          <span className="grow sm:grow-0 sm:w-24">Password</span>
          <input
            type="password"
            name="password"
            className="text-input w-[13rem] sm:grow"
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
              Cancel
            </button>
          </div>
        </div>
      </Form>

      <div
        className="absolute right-10 top-10 flex text-xl sm:text-2xl items-center gap-2 cursor-pointer"
        onClick={onLogout}
      >
        <p>Log out</p>
        <FiLogOut />
      </div>
    </div>
  );
}
