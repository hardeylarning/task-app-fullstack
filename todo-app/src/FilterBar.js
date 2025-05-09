import React, { useState } from 'react';

const FilterBar = ({ onFilter }) => {
  const [filter, setFilter] = useState('');

  const handleFilter = () => {
    onFilter(filter);
  };

  return (
    <div className="mb-4">
      <div className="mb-2">
        <label htmlFor="filter" className="block text-sm font-medium text-gray-700">Filter By:</label>
        <select
          id="filter"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="mt-1 p-2 w-full border rounded-md"
        >
          <option value="">All</option>
          <option value="active">Active Status</option>
          <option value="complete">Completed</option>
        </select>
      </div>
      <button onClick={handleFilter} className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600">Filter</button>
    </div>
  );
};

export default FilterBar;