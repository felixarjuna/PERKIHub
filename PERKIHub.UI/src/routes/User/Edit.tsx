import { Form, useLoaderData, useNavigate } from 'react-router-dom';
import { UserResponse } from '../../lib/api/contracts';

export default function EditUser() {
  const user = useLoaderData() as UserResponse;
  const navigate = useNavigate();

  return (
    <Form method="post" id="contact-form">
      <p className="flex items-center">
        <span>Name</span>
        <input
          placeholder="First"
          aria-label="First name"
          type="text"
          name="firstName"
          defaultValue={user.firstName}
          className="text-input"
        />
        <input
          placeholder="Last"
          aria-label="Last name"
          type="text"
          name="lastName"
          defaultValue={user.lastName}
          className="text-input"
        />
      </p>
      <label className="flex items-center">
        <span>Email</span>
        <input
          type="text"
          name="email"
          placeholder="@jack"
          defaultValue={user.email}
          className="text-input"
        />
      </label>
      <label className="flex items-center">
        <span>Password</span>
        <input
          placeholder="https://example.com/avatar.jpg"
          aria-label="Avatar URL"
          type="text"
          name="password"
          defaultValue={user.token}
          className="text-input"
        />
      </label>
      <label className="flex items-center">
        <span>User ID</span>
        <input name="id" defaultValue={user.id} className="text-input" />
      </label>
      <p>
        <button type="submit" className="submit-button">
          Save
        </button>
        <button
          type="button"
          onClick={() => navigate(-1)}
          className="cancel-button"
        >
          Cancel
        </button>
      </p>
    </Form>
  );
}
