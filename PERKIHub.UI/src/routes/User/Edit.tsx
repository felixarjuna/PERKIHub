import { Form, redirect, useLoaderData } from 'react-router-dom';
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
          name="firstName"
          defaultValue={user.firstName}
        />
        <input
          placeholder="Last"
          aria-label="Last name"
          type="text"
          name="lastName"
          defaultValue={user.lastName}
        />
      </p>
      <label>
        <span>Email</span>
        <input
          type="text"
          name="email"
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
          name="password"
          defaultValue={user.token}
        />
      </label>
      <label>
        <span>User ID</span>
        <input name="id" defaultValue={user.id} />
      </label>
      <p>
        <button type="submit">Save</button>
        <button type="button" onClick={() => redirect(`/users/${user.id}`)}>
          Cancel
        </button>
      </p>
    </Form>
  );
}
