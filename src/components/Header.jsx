import "../App.css";

const Header = ({
  view,
  toggleView,
  handleAddProduct,
  searchQuery,
  setSearchQuery,
}) => {
  return (
    <div className="header-container">
      <h1 className="logo-text">Product Management App </h1>
      <div className="action-container">
        <div className="search-bar">
          <input
            type="text"
            className="search-input"
            placeholder="Search products..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <div className="add-toggler-container">
          <div className="toggle-container">
            <button
              className={`toggle-option ${view === "list" ? "active" : ""}`}
              onClick={() => toggleView("list")}
            >
              List
            </button>
            <button
              className={`toggle-option ${view === "grid" ? "active" : ""}`}
              onClick={() => toggleView("grid")}
            >
              Grid
            </button>
          </div>
          <button className="add-product-button" onClick={handleAddProduct}>
            + Add Product
          </button>
        </div>
      </div>
    </div>
  );
};

export default Header;
