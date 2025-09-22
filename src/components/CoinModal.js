import React, { useEffect, useState } from "react";
import { Modal, Button, Spinner } from "react-bootstrap";
import { fetchCoinDetails } from "../services/api";

export default function CoinModal({ coinId, onClose }) {
  const [coin, setCoin] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function getCoinDetails() {
      if (!coinId) return;
      setLoading(true);
      try {
        const data = await fetchCoinDetails(coinId);
        setCoin(data);
      } catch (error) {
        console.error("Failed to fetch coin details:", error);
      } finally {
        setLoading(false);
      }
    }
    getCoinDetails();
  }, [coinId]);

  return (
    <Modal show onHide={onClose} centered>
      <Modal.Header closeButton>
        {loading || !coin ? (
          <Modal.Title>Loading...</Modal.Title>
        ) : (
          <Modal.Title>
            <img src={coin.image.thumb} alt={coin.name} className="me-2" />
            {coin.name} ({coin.symbol.toUpperCase()})
          </Modal.Title>
        )}
      </Modal.Header>
      <Modal.Body>
        {loading || !coin ? (
          <div className="text-center">
            <Spinner animation="border" />
          </div>
        ) : (
          <div>
            <div className="text-center mb-3">
              <img src={coin.image.large} alt={coin.name} width="80" />
            </div>
            <ul className="list-group">
              <li className="list-group-item d-flex justify-content-between">
                <strong>Current Price:</strong>
                <span>${coin.market_data.current_price.usd.toLocaleString()}</span>
              </li>
              <li className="list-group-item d-flex justify-content-between">
                <strong>Market Cap:</strong>
                <span>${coin.market_data.market_cap.usd.toLocaleString()}</span>
              </li>
              <li className="list-group-item d-flex justify-content-between">
                <strong>24h High:</strong>
                <span className="text-success">${coin.market_data.high_24h.usd.toLocaleString()}</span>
              </li>
              <li className="list-group-item d-flex justify-content-between">
                <strong>24h Low:</strong>
                <span className="text-danger">${coin.market_data.low_24h.usd.toLocaleString()}</span>
              </li>
            </ul>
            <div className="mt-3 text-center">
                <a href={coin.links.homepage[0]} className="btn btn-outline-primary btn-sm" target="_blank" rel="noopener noreferrer">
                Visit Website
                </a>
            </div>
          </div>
        )}
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onClose}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
}