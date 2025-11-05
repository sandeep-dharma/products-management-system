const GridView = ({ products, handleEdit }) => {
  return (
    <div className="grid-view-container">
      <div className="product-grid">
        {products.map((p) => (
          <div key={p.id} className="product-card">
            <div className="product-header">
              <h3>{p.name}</h3>
              <div className="product-header-actions">
                <span
                  className={`status ${p.isActive ? "active" : "inactive"}`}
                >
                  {p.isActive ? "Active" : "Inactive"}
                </span>
                <button className="edit-btn" onClick={() => handleEdit(p)}>
                  Edit
                </button>
              </div>
            </div>
            <p className="description">{p.description}</p>
            <div className="details">
              <p>
                <strong>Category:</strong> {p.category}
              </p>
              <p>
                <strong>Price:</strong> ₹{p.price}
              </p>
              <p>
                <strong>Stock:</strong> {p.stock}
              </p>
              <p>
                <strong>Date:</strong>{" "}
                {new Date(p.createdAt).toLocaleDateString()}
              </p>
            </div>
            <div className="tags">
              {p.tags.map((tag, i) => (
                <span key={i} className="tag">
                  {tag}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default GridView;
