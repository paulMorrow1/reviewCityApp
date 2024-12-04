"use client";

// Add another div wrapping everything
// include a button with search icon after input field
// create a search action that queries database for input field value
// set the onClick to search action

const Search = () => {
  return (
    <div className="m-auto border-2 border-slate-500 rounded-lg">
      <input
        type="text"
        placeholder="Search Businesses"
        className="rounded-md p-1"
      ></input>
    </div>
  );
};

export default Search;
