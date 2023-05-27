export default function Home() {
  return (
    <>
      <header>
        <div className="navbar rounded-box bg-base-300">
          <div className="flex-1 px-2 lg:flex-none">
            <a className="text-xl font-bold">Glocal</a>
          </div>
          <div className="flex flex-none">
            <div className="flex items-stretch">
              <div className="dropdown-end dropdown">
                <button tabIndex={0} className="btn-ghost btn-square btn">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    className="inline-block h-5 w-5 stroke-current"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z"
                    ></path>
                  </svg>
                </button>
                <ul
                  tabIndex={0}
                  className="dropdown-content menu rounded-box mt-4 w-52 bg-base-100 p-2 shadow"
                >
                  <li>
                    <a>このアプリについて</a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </header>
      <main>メイン</main>
    </>
  );
}
