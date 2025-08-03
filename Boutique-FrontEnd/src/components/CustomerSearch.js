import React, { useState } from 'react';

function CustomerSearch() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);

  const search = () => {
    fetch(`https://laxmi-boutique-back-end.onrender.com/api/customers/search?q=${query}`)
      .then(res => res.json())
      .then(data => setResults(data));
  };

  return (
    <div className="container mt-3">
      <h4>Search Customers</h4>
      <input
        className="form-control mb-2"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search by name, email..."
      />
      <button onClick={search} className="btn btn-info mb-3">Search</button>

      <ul className="list-group">
        {results.map(c => (
          <li key={c.id} className="list-group-item">
            {c.firstName} {c.lastName} - {c.email}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default CustomerSearch;
