# Crypto Dashboard

A web application built with React that displays live cryptocurrency market data from the CoinGecko API. It features a searchable and sortable list of coins, a "load more" functionality, and a highlights section for market movers.

**Live Demo:** [https://your-hosted-link.vercel.app/](https://your-hosted-link.vercel.app/)

---

## 🚀 How to Set Up and Run Locally

Follow these instructions to get the project running on your local machine.

1.  **Clone the repository:**
    ```sh
    git clone <your-repository-url>
    ```

2.  **Navigate to the project directory:**
    ```sh
    cd <project-directory>
    ```

3.  **Install dependencies:**
    ```sh
    npm install
    ```

4.  **Set up environment variables:**
    Create a file named `.env` in the root of the project and add the API base URL. *Note: The CoinGecko API may require a key for higher usage limits. [cite_start]If needed, you can add it here.* [cite: 68]
    ```
    # .env
    REACT_APP_API_BASE_URL="[https://api.coingecko.com/api/v3](https://api.coingecko.com/api/v3)"
    ```

5.  **Start the development server:**
    ```sh
    npm start
    ```
    The application will be available at `http://localhost:3000`.

---

## 🛠️ Tech Stack and Architecture Overview

### Tech Stack

* **Framework:** React.js
* **Styling:** Bootstrap 5
* **Language:** JavaScript (ES6+)
* **API:** CoinGecko API V3

### Architecture

[cite_start]The application follows a component-based architecture to ensure separation of concerns and maintainability[cite: 40].
* **`src/components`**: Contains all reusable UI components (`CoinsTable`, `SearchBar`, etc.).
* **`src/services`**: The `api.js` file centralizes all data fetching logic, isolating it from the UI.
* **`src/hooks`**: Contains custom hooks like `useDebounce` to encapsulate reusable logic.
* **`App.js`**: The main component that manages the application's core state and orchestrates data flow to child components.

---

## ✨ Design Patterns Used and Rationale

[cite_start]The project employs several design patterns to create a clean and scalable codebase. [cite: 66]

* **Component Composition**: The UI is built from small, single-purpose components that are composed together. This makes the UI flexible and easy to modify.
* **Centralized State Management**: The primary application state (list of coins, search query, loading/error status) is managed within the top-level `App` component. This provides a single source of truth and a clear, unidirectional data flow.
* **Service Layer (Adapter)**: The `api.js` file acts as a service layer. It abstracts the API fetching logic away from the components. This decouples the application from the specific API endpoint structure, making it easier to maintain or even switch data sources in the future.
* **Custom Hook (`useDebounce`)**: The `useDebounce` hook was created to encapsulate the logic for delaying the search filter execution. [cite_start]This is a performance optimization that prevents excessive re-renders and API calls on every keystroke, directly addressing the project requirements. [cite: 46]

### Rationale for Client-Side Operations

* **Sorting and filtering operations are handled entirely on the client-side.**
    **Reasoning:** For the current data volume (loading ~25-100 items at a time), client-side logic is significantly faster and more responsive. [cite_start]It provides instant feedback to the user for search and sort actions without the network latency of making additional server requests. [cite: 92]

---

## 📝 Assumptions, Limitations, and Future Improvements

### Assumptions

* The primary user goal is to quickly view, search, and sort the top cryptocurrencies by market cap.
* Client-side data handling is sufficient for the scope of this project.

### Limitations

* **No Real-Time Data:** Data is fetched on initial load and when "Load More" is clicked, not in real-time.
* **No Data Caching:** The application re-fetches data from the API on every full-page refresh.
* **No User Accounts:** The dashboard is stateless and does not support user-specific portfolios or watchlists.

### Future Improvements

* [cite_start]**Real-Time Updates:** Implement WebSockets to stream live price updates for a more dynamic user experience. [cite: 73]
* **Client-Side Caching:** Introduce `sessionStorage` or `localStorage` to cache API responses for a short duration, improving performance and reducing API usage on subsequent visits.
* **Testing:** Add unit tests for components and hooks using a framework like Jest and React Testing Library.
* **State Management:** For a larger application, integrate a dedicated state management library like Redux Toolkit or Zustand to handle more complex state interactions.