import React, { useState } from 'react';
import './CustomerSearch.css';

function CustomerSearch() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);

  const search = () => {
    fetch(`https://laxmi-boutique-back-end.onrender.com/api/customers/search?q=${query}`)
      .then(res => res.json())
      .then(data => setResults(data));
  };

  return (
    <div className="search-container">
      <h4 className="search-title">Search Customers</h4>
      <input
        className="search-input"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search by name, email..."
      />
      <button onClick={search} className="search-button">Search</button>

      <ul className="search-results">
        {results.map(c => (
          <li key={c.id}>
            {c.firstName} {c.lastName} - {c.email}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default CustomerSearch;
