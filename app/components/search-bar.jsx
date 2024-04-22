"use client"

export default function Searchbar({ onSearch, searchQuery, setSearchQuery }) {
  const handleSearch = () => {
    if (searchQuery.trim() !== '') {
      onSearch(); // Call the onSearch prop without passing the searchQuery
    }
  };

  return (
    <div className="ml-10 mr-10">
      <input
        className="drop-shadow-xl p-1 block w-full rounded-md outline-[#000066] bg-gray-100 focus:bg-white"
        type="text"
        placeholder="Search City Name Here"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        onKeyPress={(e) => {
          if (e.key === 'Enter') {
            handleSearch();
          }
        }}
      />
      <button
      className=" drop-shadow-xl mt-3 bg-yellow-500 text-white py-2 px-4 rounded-md cursor-pointer hover:bg-yellow-600 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:ring-opacity-50 transition duration-300 ease-in-out"
      onClick={handleSearch}
      >
      Search
      </button>

    </div>
  );
}
