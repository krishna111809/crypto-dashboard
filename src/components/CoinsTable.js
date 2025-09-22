import React from "react";

export default function CoinsTable({ coins, onRowClick, requestSort, sortConfig }) {
  const getSortIcon = (key) => {
    if (!sortConfig || sortConfig.key !== key) {
      return <span className="text-muted small"> ↕</span>;
    }
    if (sortConfig.direction === 'ascending') {
      return ' 🔼';
    }
    return ' 🔽';
  };

  return (
    <div className="table-responsive shadow-sm rounded">
      <table className="table table-hover align-middle mb-0">
        <thead className="table-light">
          <tr>
            <th scope="col">
                <button onClick={() => requestSort('market_cap_rank')} className="btn btn-sm btn-link text-muted text-decoration-none p-0 fw-bold">
                # {getSortIcon('market_cap_rank')}
                </button>
            </th>
            <th scope="col">Coin</th>
            <th scope="col">
                <button onClick={() => requestSort('current_price')} className="btn btn-sm btn-link text-dark text-decoration-none p-0 fw-bold">
                Price{getSortIcon('current_price')}
                </button>
            </th>
            <th scope="col">
                <button onClick={() => requestSort('price_change_percentage_24h')} className="btn btn-sm btn-link text-dark text-decoration-none p-0 fw-bold">
                24h Change{getSortIcon('price_change_percentage_24h')}
                </button>
            </th>
            <th scope="col">
                <button onClick={() => requestSort('market_cap')} className="btn btn-sm btn-link text-dark text-decoration-none p-0 fw-bold">
                Market Cap{getSortIcon('market_cap')}
                </button>
            </th>
            <th scope="col">
                <button onClick={() => requestSort('total_volume')} className="btn btn-sm btn-link text-dark text-decoration-none p-0 fw-bold">
                Volume{getSortIcon('total_volume')}
                </button>
            </th>
          </tr>
        </thead>
        <tbody>
          {coins.map((c) => (
            <tr 
                key={c.id} 
                onClick={() => onRowClick(c.id)} 
                onKeyDown={(e) => e.key === 'Enter' && onRowClick(c.id)}
                role="button"
                tabIndex="0"
                style={{ cursor: "pointer" }}
            >
              <td className="fw-bold">{c.market_cap_rank}</td>
              <td>
                <img src={c.image} alt={c.name} width="25" className="me-2" />
                {c.name} <span className="text-muted text-uppercase">{c.symbol}</span>
              </td>
              <td>${c.current_price.toLocaleString()}</td>
              <td className={c.price_change_percentage_24h >= 0 ? "text-success" : "text-danger"}>
                {c.price_change_percentage_24h?.toFixed(2)}%
              </td>
              <td>${c.market_cap.toLocaleString()}</td>
              <td>${c.total_volume.toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}