import Link from 'next/link';

export default function Home() {
  return (
    <main>
      <div className="xl:ml-32 p-10 flex h-screen">
        <div className="sm:w-3/5 flex flex-col sm:justify-center justify-between">
          <div className="mt-20 sm:m-0">
            <h2 className="text-5xl sm:text-8xl sm:max-w-xl">Welcome to </h2>
            <h2 className="text-5xl mt-1 sm:text-8xl max-w-xl text-gradient">
              Perki Hub.
            </h2>
            <h3 className="text-2xl mt-5 sm:text-2xl sm:mt-2">
              All in one place for our developed Apps.
            </h3>
          </div>

          <div>
            <div className="mt-10 flex gap-6 pb-10">
              <div className="w-1/2 sm:w-24 bg-lightmaroon  flex items-center justify-center">
                <Link href="/register" className="button-cream" type="button">
                  Register
                </Link>
              </div>
              <div className="w-1/2 sm:w-24 flex items-center justify-center bg-cream">
                <Link href="/login" className="button-gray">
                  Login
                </Link>
              </div>
            </div>

            <div className="-mt-3 text-cream underline underline-offset-2">
              <Link href="app/events/">Continue without Login</Link>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
