import React, { useState, useEffect, useCallback, useMemo } from "react";
import SearchBar from "./components/SearchBar";
import CoinsTable from "./components/CoinsTable";
import Highlights from "./components/Highlights";
import CoinModal from "./components/CoinModal";
import { fetchCoinsMarket } from "./services/api";
import { useDebounce } from './hooks/useDebounce';

function App() {
  const [coins, setCoins] = useState([]);
  const [filteredCoins, setFilteredCoins] = useState([]);
  const [search, setSearch] = useState("");
  const [selectedCoinId, setSelectedCoinId] = useState(null);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [sortConfig, setSortConfig] = useState({ key: 'market_cap_rank', direction: 'ascending' });

  const debouncedSearch = useDebounce(search, 400);

  const loadCoins = useCallback(async () => {
    if (page === 1) setLoading(true);
    setError(null);
    try {
      const data = await fetchCoinsMarket(page);
      setCoins((prev) => (page === 1 ? data : [...prev, ...data]));
    } catch (err) {
      console.error("Error fetching coins:", err);
      setError("Failed to load cryptocurrency data. Please try again later.");
    } finally {
      if (page === 1) setLoading(false);
    }
  }, [page]);

  useEffect(() => {
    loadCoins();
  }, [loadCoins]);

  useEffect(() => {
    if (!debouncedSearch) {
      setFilteredCoins(coins);
    } else {
      setFilteredCoins(
        coins.filter(
          (c) =>
            c.name.toLowerCase().includes(debouncedSearch.toLowerCase()) ||
            c.symbol.toLowerCase().includes(debouncedSearch.toLowerCase())
        )
      );
    }
  }, [debouncedSearch, coins]);
  
  const sortedAndFilteredCoins = useMemo(() => {
    let sortableItems = [...filteredCoins];
    if (sortConfig !== null) {
      sortableItems.sort((a, b) => {
        if (a[sortConfig.key] === null) return 1;
        if (b[sortConfig.key] === null) return -1;
        if (a[sortConfig.key] < b[sortConfig.key]) {
          return sortConfig.direction === 'ascending' ? -1 : 1;
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
          return sortConfig.direction === 'ascending' ? 1 : -1;
        }
        return 0;
      });
    }
    return sortableItems;
  }, [filteredCoins, sortConfig]);

  const requestSort = (key) => {
    let direction = 'ascending';
    if (sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending';
    }
    setSortConfig({ key, direction });
  };

  return (
    <div className="bg-light min-vh-100">
      <div className="container py-4">
        <header className="text-center mb-5">
          <h1 className="display-4 fw-bold">Crypto Dashboard</h1>
          <p className="text-muted">Live Cryptocurrency Prices by Market Cap</p>
        </header>

        <SearchBar search={search} setSearch={setSearch} />

        {error && (
            <div className="alert alert-danger mt-4 d-flex justify-content-between align-items-center">
                {error}
                <button className="btn btn-danger btn-sm" onClick={() => loadCoins()}>
                Retry
                </button>
            </div>
        )}

        <div className="row mt-4">
          <main className="col-lg-8">
            {loading ? (
              <div className="text-center p-5">
                <div className="spinner-border" style={{ width: "3rem", height: "3rem" }} role="status">
                  <span className="visually-hidden">Loading...</span>
                </div>
              </div>
            ) : sortedAndFilteredCoins.length > 0 ? (
              <CoinsTable 
                coins={sortedAndFilteredCoins} 
                onRowClick={setSelectedCoinId}
                requestSort={requestSort}
                sortConfig={sortConfig}
              />
            ) : (
              <div className="alert alert-info text-center">No coins found.</div>
            )}
            
            {!search && !error && (
                <div className="text-center mt-4">
                <button
                    className="btn btn-primary"
                    onClick={() => setPage((p) => p + 1)}
                >
                    Load More
                </button>
                </div>
            )}
          </main>
          
          <aside className="col-lg-4 mt-4 mt-lg-0">
            <Highlights coins={coins} onCoinClick={setSelectedCoinId}/>
          </aside>
        </div>

        {selectedCoinId && (
          <CoinModal coinId={selectedCoinId} onClose={() => setSelectedCoinId(null)} />
        )}
      </div>
    </div>
  );
}

export default App;