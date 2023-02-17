import { isRouteErrorResponse, useRouteError } from 'react-router-dom';

export default function ErrorPage() {
  const error = useRouteError();

  return (
    <div className="flex items-center justify-center flex-col">
      <h1>Oops!</h1>
      <p>Sorry, an unexpected error has occurred.</p>
      <p>
        <i>
          {isRouteErrorResponse(error) ? error.statusText : 'Unknown Error'}
        </i>
      </p>
    </div>
  );
}
