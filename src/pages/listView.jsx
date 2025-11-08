import React from "react";
import "../App.css";

const ListView = ({ products, handleEdit }) => {
  return (
    <div className="list-view-container">
      <div className="table-scroll-container">
        <table border="1" cellPadding="10" className="table-container">
          <thead className="table-header">
            <tr>
              <th>Name</th>
              <th>Price (₹)</th>
              <th>Category</th>
              <th>Stock</th>
              <th>Description</th>
              <th>Created At</th>
              <th>Active</th>
              <th>Tags</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map((p) => (
              <tr key={p.id}>
                <td>{p.name}</td>
                <td>{p.price}</td>
                <td>{p.category}</td>
                <td>{p.stock}</td>
                <td className="table-description description" title={p.description}>
                  {p.description}
                </td>
                <td>{new Date(p.createdAt).toLocaleDateString()}</td>
                <td>{p.isActive ? "✅" : "❌"}</td>
                <td>{p.tags.join(", ")}</td>
                <td>
                  <button
                    style={{
                      backgroundColor: "#007bff",
                      color: "white",
                      border: "none",
                      borderRadius: "6px",
                      padding: "6px 12px",
                      cursor: "pointer",
                    }}
                    onClick={() => handleEdit(p)}
                  >
                    Edit
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ListView;
