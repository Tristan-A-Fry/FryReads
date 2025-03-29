import { useNavigate, Link } from "react-router-dom";
const HomePage = () => {
  const navigate = useNavigate();
  return (
    <div className="bg-gray-900 min-h-screen flex flex-col items-center justify-center text-white py-12">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4">Welcome to Fryreads</h1>
        <p className="text-xl mb-6">A book tracking app to manage and discover your favorite books.</p>
        <p className="text-lg mb-6">Track your reading progress, explore new titles, and organize your library easily.</p>

        <div className="flex space-x-4 justify-center">
          {/* <a
            href="/search"
            className="bg-gray-700 text-white px-6 py-2 rounded-md hover:bg-[#2ac9ff] transition"
          >
            Start Browsing
          </a> */}
            <button
              onClick={() => navigate("/search")}
                  className="bg-gray-700 text-white px-6 py-2 rounded-md hover:bg-[#2ac9ff] transition"
            >
              Start Browsing 
            </button>
            <button
              onClick={() => navigate("/login")}
                  className="bg-[#2ac9ff] px-5 py-2 rounded-lg transition hover:bg-[#2ac9ff] hover:shadow-lg hover:shadow-[0_0_10px_#2ac9ff]"
            >
              Login
            </button>
        </div>
      </div>

      {/* Add any additional sections below */}
      <section className="mt-12 max-w-4xl text-center">
        <h2 className="text-3xl font-semibold mb-4">Why Fryreads?</h2>
        <p className="text-lg mb-6">
          Organize your reading journey with features that let you track the books you're reading, discover new titles,
          and explore books by different authors in various languages.
        </p>
      </section>

      <section className="mt-12 max-w-4xl text-center">
        <h2 className="text-3xl font-semibold mb-4">About Fryreads</h2>
        <p className="text-lg mb-6">
            Fryreads is a personal hobby project. Built using .Net Core, and React, hosted on Microsofts Azure.
            We use the ISBN database api found <a href ="https://isbndb.com/" className="text-[#2ac9ff] hover:underline">here</a>, to gather books. 
            Please note this is a hobby project and I make and intend to make no money off of it.
            You can also view the source code <a href ="https://github.com/Tristan-A-Fry/FryReads" className="text-[#2ac9ff] hover:underline">here</a>, on github.
        </p>
      </section>

      <section className="mt-12 max-w-4xl text-center">
        <h2 className="text-3xl font-semibold mb-4">Learn more about me and my other projects</h2>
        <p className="text-lg mb-6">
            <a href ="https://tristanfry.com/" className="text-[#2ac9ff] hover:underline">Personal Website</a>
        </p>
      </section>

        <section className="mt-12 max-w-4xl text-center">
        <h2 className="text-3xl font-semibold mb-4">Socials</h2>

        <div className="flex justify-center space-x-6">
            <a href="https://github.com/Tristan-A-Fry" target="_blank" rel="noopener noreferrer">
            <img
                src="/github_white.png" // Replace with the actual path or URL of the icon
                alt="Github"
                className="w-8 h-8 hover:scale-105 transition-transform duration-200"
            />
            </a>

            <a href="https://www.linkedin.com/in/tristan-a-fry/" target="_blank" rel="noopener noreferrer">
            <img
                src="/linkedin_white.png" // Replace with the actual path or URL of the icon
                alt="LinkedIn"
                className="w-8 h-8 hover:scale-105 transition-transform duration-200"
            />
            </a>
        </div>
        </section>
    </div>
  );
};

export default HomePage;
