import React, { useState, useEffect } from "react";
import "../App.css";
import { categories } from "../../db.js";

const ProductForm = ({
  showModal,
  handleCloseModal,
  handleSaveProduct,
  editData = null,
}) => {
  const [form, setForm] = useState({
    name: "",
    price: "",
    category: "",
    stock: "",
    description: "",
  });

  const [errors, setErrors] = useState({});
  const [isModified, setIsModified] = useState(false);

  useEffect(() => {
    if (editData) {
      setForm(editData);
      setIsModified(false);
      setErrors({});
    } else {
      setForm({
        name: "",
        price: "",
        category: "",
        stock: "",
        description: "",
      });
    }
  }, [editData]);

  const handleChange = (e) => {
    const { name, value, type } = e.target;
    const formattedValue = type === "number" ? Number(value) : value;

    setForm((prev) => {
      const updated = { ...prev, [name]: formattedValue };
      if (editData) {
        const changed = Object.keys(updated).some(
          (key) => updated[key] !== editData[key],
        );
        setIsModified(changed);
      } else {
        setIsModified(true);
      }
      return updated;
    });
  };

  const validate = () => {
    const newErrors = {};
    if (!form.name.trim()) newErrors.name = "Name is required";
    if (!form.price || isNaN(form.price))
      newErrors.price = "Valid price is required";
    if (!form.category.trim()) newErrors.category = "Category is required";
    if (form.stock && isNaN(form.stock))
      newErrors.stock = "Stock must be a number";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;
    handleSaveProduct(form);
    handleCloseModal();
  };

  if (!showModal) return null;

  return (
    <div className="form-main-container" onClick={handleCloseModal}>
      <div className="form-modal" onClick={(e) => e.stopPropagation()}>
        <h3 className="form-title">
          {editData ? "Edit Product" : "Add New Product"}
        </h3>

        <form onSubmit={handleSubmit} className="form-container">
          <div className="form-field">
            <label>Name *</label>
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="Enter product name"
            />
            {errors.name && <p className="error-text">{errors.name}</p>}
          </div>

          <div className="form-field">
            <label>Price *</label>
            <input
              type="number"
              name="price"
              value={form.price}
              onChange={handleChange}
              placeholder="Enter price"
            />
            {errors.price && <p className="error-text">{errors.price}</p>}
          </div>

          <div className="form-field">
            <label>Category *</label>
            <select
              name="category"
              value={form.category}
              onChange={handleChange}
            >
              <option value="">-- Select Category --</option>
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
            {errors.category && <p className="error-text">{errors.category}</p>}
          </div>

          <div className="form-field">
            <label>Stock</label>
            <input
              type="number"
              name="stock"
              value={form.stock}
              onChange={handleChange}
              placeholder="Enter stock count"
            />
            {errors.stock && <p className="error-text">{errors.stock}</p>}
          </div>

          <div className="form-field">
            <label>Description</label>
            <textarea
              name="description"
              value={form.description}
              onChange={handleChange}
              placeholder="Enter product description"
            />
          </div>

          <div className="modal-actions">
            <button
              type="submit"
              className={`save-btn ${
                editData && !isModified ? "disabled" : ""
              }`}
              disabled={editData && !isModified}
            >
              {editData ? "Update" : "Add"}
            </button>
            <button
              type="button"
              className="close-modal"
              onClick={handleCloseModal}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProductForm;
