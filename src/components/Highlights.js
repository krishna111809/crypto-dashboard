import React from "react";

const HighlightItem = ({ coin, value, isPercentage = false, isPositive = true }) => (
  <li className="list-group-item d-flex justify-content-between align-items-center">
    <div>
      <img src={coin.image} alt={coin.name} width="20" className="me-2" />
      {coin.name}
    </div>
    <span className={`fw-bold ${isPositive ? 'text-success' : 'text-danger'}`}>
      {value}{isPercentage && '%'}
    </span>
  </li>
);

export default function Highlights({ coins }) {
  if (!coins.length) {
    return (
      <div className="card">
        <div className="card-body">
          <h5 className="card-title placeholder-glow">
            <span className="placeholder col-6"></span>
          </h5>
          <ul className="list-group list-group-flush placeholder-glow">
            <li className="list-group-item"><span className="placeholder col-12"></span></li>
            <li className="list-group-item"><span className="placeholder col-12"></span></li>
            <li className="list-group-item"><span className="placeholder col-12"></span></li>
          </ul>
        </div>
      </div>
    );
  }

  const gainers = [...coins]
    .filter(c => c.price_change_percentage_24h != null)
    .sort((a, b) => b.price_change_percentage_24h - a.price_change_percentage_24h)
    .slice(0, 5);

  const losers = [...coins]
    .filter(c => c.price_change_percentage_24h != null)
    .sort((a, b) => a.price_change_percentage_24h - b.price_change_percentage_24h)
    .slice(0, 5);

  const volume = [...coins]
    .filter(c => c.total_volume != null)
    .sort((a, b) => b.total_volume - a.total_volume)
    .slice(0, 5);

  return (
    <div>
      <h4 className="mb-3">Highlights</h4>
      
      <div className="card mb-4 shadow-sm">
        <div className="card-header fw-bold">🚀 Top Gainers (24h)</div>
        <ul className="list-group list-group-flush">
          {gainers.map((c) => (
            <HighlightItem 
              key={c.id} 
              coin={c} 
              value={c.price_change_percentage_24h?.toFixed(2)} 
              isPercentage 
              isPositive 
            />
          ))}
        </ul>
      </div>

      <div className="card mb-4 shadow-sm">
        <div className="card-header fw-bold">📉 Top Losers (24h)</div>
        <ul className="list-group list-group-flush">
          {losers.map((c) => (
            <HighlightItem 
              key={c.id} 
              coin={c} 
              value={c.price_change_percentage_24h?.toFixed(2)} 
              isPercentage 
              isPositive={false} 
            />
          ))}
        </ul>
      </div>

      <div className="card shadow-sm">
        <div className="card-header fw-bold">📊 Highest Volume</div>
        <ul className="list-group list-group-flush">
          {volume.map((c) => (
            <HighlightItem 
              key={c.id} 
              coin={c} 
              value={`$${c.total_volume?.toLocaleString()}`} 
              isPositive
            />
          ))}
        </ul>
      </div>
    </div>
  );
}