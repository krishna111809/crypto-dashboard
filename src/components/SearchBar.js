import React from "react";

export default function SearchBar({ search, setSearch }) {
  return (
    <input
      type="text"
      value={search}
      onChange={(e) => setSearch(e.target.value)}
      className="form-control"
      placeholder="Search coin..."
    />
  );
}