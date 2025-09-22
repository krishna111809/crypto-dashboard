const API_BASE_URL = "https://api.coingecko.com/api/v3";

export const fetchCoinsMarket = async (page = 1) => {
  try {
    const response = await fetch(
      `${API_BASE_URL}/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=25&page=${page}&sparkline=false&price_change_percentage=24h`
    );
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("API call fetchCoinsMarket failed:", error);
    throw error;
  }
};

export const fetchCoinDetails = async (coinId) => {
  try {
    const response = await fetch(
      `${API_BASE_URL}/coins/${coinId}?localization=false&tickers=false&market_data=true&community_data=false&developer_data=false&sparkline=false`
    );
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(`API call fetchCoinDetails for ${coinId} failed:`, error);
    throw error;
  }
};