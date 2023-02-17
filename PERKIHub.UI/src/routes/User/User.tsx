import { Form, useLoaderData } from 'react-router-dom';
import { UserResponse } from '../../lib/api/contracts';

interface Contact {
  avatar: string;
  twitter: string;
  notes: string;
  favorite: boolean;
}

interface FavoriteProps {
  contact: Contact;
}

export default function User() {
  const contact = {
    avatar: 'https://placekitten.com/g/200/200',
    twitter: 'your_handle',
    notes: 'Some notes',
    favorite: true,
  };
  const user = useLoaderData() as UserResponse;

  return (
    <div id="contact">
      <div>
        <img key={contact.avatar} src={contact.avatar} />
      </div>

      <div>
        <h1>
          {user.firstName || user.lastName ? (
            <>
              {user.firstName} {user.lastName}
            </>
          ) : (
            <i>No Name</i>
          )}{' '}
          <Favorite contact={contact} />
        </h1>

        {user.email && (
          <p>
            <a target="_blank" href={`https://twitter.com/${contact.twitter}`}>
              {user.email}
            </a>
          </p>
        )}

        {user.token && <p>{user.token}</p>}

        <div>
          <Form action="edit">
            <button type="submit">Edit</button>
          </Form>
          <Form
            method="post"
            action="delete"
            onSubmit={(event) => {
              if (!confirm('Please confirm you want to delete this record.')) {
                event.preventDefault();
              }
            }}
          >
            <button type="submit">Delete</button>
          </Form>
        </div>
      </div>
    </div>
  );
}

function Favorite({ contact }: FavoriteProps) {
  // yes, this is a `let` for later
  let favorite = contact.favorite;
  return (
    <Form method="post">
      <button
        name="favorite"
        value={favorite ? 'false' : 'true'}
        aria-label={favorite ? 'Remove from favorites' : 'Add to favorites'}
      >
        {favorite ? '★' : '☆'}
      </button>
    </Form>
  );
}
