type SearchProps = {
  query: string; // Current search query
  setQuery: React.Dispatch<React.SetStateAction<string>>; // Function to update the search query state
};

// Search component
const Search = ({ query, setQuery }: SearchProps) => {
  // Function to handle input change
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value); // Update the search query state with input value
  };

  // Render the component
  return (
    <div className="w-full relative mb-2">
      {/* Input field for search */}
      <input
        type="search"
        value={query}
        className="peer cursor-pointer relative z-10 h-10 w-8 text-sm text-white rounded-full border bg-transparent border-gray-200 pl-12 outline-none focus:w-full focus:cursor-text focus:border-sky-500 focus:pl-16 focus:pr-4"
        onChange={(e) => handleChange(e)} // Call handleChange function on input change
      />
      {/* Search icon */}
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="absolute inset-y-0 my-auto h-8 w-12 border-r border-transparent stroke-gray-200 px-3.5 peer-focus:border-sky-500 peer-focus:stroke-sky-500"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth="2"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
        />
      </svg>
    </div>
  );
};

export default Search;
