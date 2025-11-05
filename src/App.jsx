import { useState, useEffect } from "react";
import "./App.css";
import { database } from "../db.js";
import Header from "./components/Header.jsx";
import ListView from "./pages/listView.jsx";
import GridView from "./pages/gridView.jsx";
import ProductForm from "./components/ProductForm.jsx";

function App() {
  const [view, setView] = useState("list");
  const [products, setProducts] = useState(database);
  const [filteredProducts, setFilteredProducts] = useState(database);
  const [showModal, setShowModal] = useState(false);
  const [editData, setEditData] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const itemsPerPage = 8;
  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedProducts = filteredProducts.slice(
    startIndex,
    startIndex + itemsPerPage,
  );

  const toggleView = (selectedView) => setView(selectedView);

  const handleEdit = (p) => {
    console.log("Editing product:", p);
    setEditData(p);
    setShowModal(true);
  };

  const handleSaveProduct = (data) => {
    if (editData) {
      setProducts((prev) =>
        prev.map((p) => (p.id === editData.id ? { ...p, ...data } : p)),
      );
    } else {
      const newProduct = {
        ...data,
        id: Date.now(),
        createdAt: new Date().toISOString(),
        isActive: true,
        tags: [],
      };
      setProducts((prev) => [newProduct, ...prev]);
    }
    setEditData(null);
  };

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) setCurrentPage(page);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setEditData(null);
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      const filtered = products.filter(
        (p) =>
          p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          p.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
          p.category.toLowerCase().includes(searchQuery.toLowerCase()),
      );
      setFilteredProducts(filtered);
      setCurrentPage(1);
    }, 500);
    return () => clearTimeout(timer);
  }, [searchQuery, products]);

  return (
    <div className="home-container">
      <Header
        view={view}
        toggleView={toggleView}
        handleAddProduct={() => setShowModal(true)}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
      />

      {showModal && (
        <ProductForm
          showModal={showModal}
          handleCloseModal={handleCloseModal}
          handleSaveProduct={handleSaveProduct}
          editData={editData}
        />
      )}
      <div className="detail-container">
        <h2 className="view-title">Products</h2>
        {view === "list" ? (
          <ListView products={paginatedProducts} handleEdit={handleEdit} />
        ) : (
          <GridView products={paginatedProducts} handleEdit={handleEdit} />
        )}

        <div className="pagination">
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
          >
            Prev
          </button>
          <span>
            Page {currentPage} of {totalPages}
          </span>
          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;
