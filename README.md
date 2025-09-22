

# Crypto Dashboard

[](https://opensource.org/licenses/MIT)

This project is a responsive cryptocurrency dashboard built with React, created as a technical assignment. It fetches and displays live market data from the CoinGecko API, demonstrating proficiency in modern front-end development practices, component-based architecture, and API handling.

-----

## ✨ Key Features

  * **Live Data Display**: Real-time cryptocurrency prices, market cap, volume, and 24h change.
  * **Search & Filter**: Instantly search for coins by name or symbol with debouncing for performance.
  * **Client-Side Sorting**: Sort the data table by various columns like price, market cap, etc.
  * **Pagination**: "Load More" button to fetch additional coins and append them to the list.
  * **Market Highlights**: View top gainers, top losers, and highest volume coins in a dedicated section.
  * **Detailed View**: Click on any coin to see more details (24h high/low, etc.) in a modal window.
  * **Responsive Design**: Fully functional and styled for both desktop and mobile devices.

-----

## 🛠️ Tech Stack

  * **React.js**: Core front-end library for building the user interface.
  * **JavaScript (ES6+)**: Language used for application logic.
  * **Bootstrap 5**: CSS framework for styling and responsiveness.
  * **CoinGecko API**: Used as the source for all cryptocurrency data.

-----

## ⚙️ Project Setup

Follow these steps to run the project on your local machine.

1.  **Clone the repository:**

    ```sh
    git clone https://github.com/krishna111809/crypto-dashboard.git
    ```

2.  **Navigate to the project directory:**

    ```sh
    cd crypto-dashboard
    ```

3.  **Install dependencies:**

    ```sh
    npm install
    ```

4.  **Create an environment file:**
    Create a file named `.env` in the root of the project and add the API base URL.

    ```
    REACT_APP_API_BASE_URL="https://api.coingecko.com/api/v3"
    ```

5.  **Start the development server:**

    ```sh
    npm start
    ```

    The application will be available at `http://localhost:3000`.

-----

## 🏛️ Architectural Decisions & Rationale

  * **Component-Based Architecture**: The application is broken down into small, reusable components (e.g., `CoinsTable`, `SearchBar`, `CoinModal`). This promotes separation of concerns, making the codebase easier to manage, test, and scale.

  * **Centralized State Management**: The primary application state (the list of coins, search query, loading/error states) is managed within the top-level `App` component. This provides a single source of truth and a clear, unidirectional data flow, which is efficient for an application of this scale.

  * **Service Layer**: All API data fetching logic is isolated in `src/services/api.js`. This decouples the application from the specific API structure, making it easy to maintain or even switch to a different data source in the future without refactoring UI components.

  * **Client-Side Operations Rationale**: Sorting and filtering are handled on the client-side. For the current data volume (loading \~25-100 items at a time), this approach is faster and more responsive as it avoids the network latency of making additional server requests, providing instant feedback to the user.

-----

## 📜 License

This project is licensed under the MIT License. See the [LICENSE](https://www.google.com/search?q=LICENSE) file for details.

Copyright (c) 2025 Vavilala Krishna Murthi
