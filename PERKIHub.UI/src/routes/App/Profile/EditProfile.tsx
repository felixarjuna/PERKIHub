import { FiLogOut } from 'react-icons/fi';
import { Form, useNavigate } from 'react-router-dom';
import { useAuth } from '../../../lib/hooks/useAuth';

export function EditProfile() {
  const user = useAuth();
  const navigate = useNavigate();

  const onLogout = () => {
    user?.setCurrentUser(null);
    navigate(-1);
  };

  return (
    <div className="flex items-center justify-center h-screen">
      <Form method="post" id="contact-form">
        <div className="flex items-center gap-4">
          <span>Name</span>
          <input
            placeholder="First"
            aria-label="First name"
            type="text"
            name="firstName"
            defaultValue={user?.currentUser?.firstName}
            className="text-input w-[14.5rem]"
          />
          <input
            placeholder="Last"
            aria-label="Last name"
            type="text"
            name="lastName"
            defaultValue={user?.currentUser?.lastName}
            className="text-input w-[14.5rem]"
          />
        </div>
        <div className="flex items-center gap-4">
          <span>Email</span>
          <input
            type="text"
            name="email"
            placeholder="@jack"
            defaultValue={user?.currentUser?.email}
            className="text-input w-[30rem]"
          />
        </div>
        <div className="mt-5 flex gap-4">
          <button type="submit" className="button-cream">
            Save
          </button>
          <button
            type="button"
            onClick={() => navigate(-1)}
            className="button-gray"
          >
            Cancel
          </button>
        </div>

        <div
          className="self-end text-2xl flex items-center gap-2 cursor-pointer"
          onClick={onLogout}
        >
          <p>Log out</p>
          <FiLogOut />
        </div>
      </Form>
    </div>
  );
}
