import { Form, useLoaderData } from 'react-router-dom';
import { UserResponse } from '../../lib/api/contracts';

export default function EditUser() {
  const user = useLoaderData() as UserResponse;

  return (
    <Form method="post" id="contact-form">
      <p>
        <span>Name</span>
        <input
          placeholder="First"
          aria-label="First name"
          type="text"
          name="first"
          defaultValue={user.firstName}
        />
        <input
          placeholder="Last"
          aria-label="Last name"
          type="text"
          name="last"
          defaultValue={user.lastName}
        />
      </p>
      <label>
        <span>Email</span>
        <input
          type="text"
          name="twitter"
          placeholder="@jack"
          defaultValue={user.email}
        />
      </label>
      <label>
        <span>Password</span>
        <input
          placeholder="https://example.com/avatar.jpg"
          aria-label="Avatar URL"
          type="text"
          name="avatar"
          defaultValue={user.token}
        />
      </label>
      <label>
        <span>User ID</span>
        <input name="notes" defaultValue={user.id} disabled />
      </label>
      <p>
        <button type="submit">Save</button>
        <button type="button">Cancel</button>
      </p>
    </Form>
  );
}
