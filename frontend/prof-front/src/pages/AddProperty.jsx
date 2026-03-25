import React, { useState } from "react";

const AddProperty = () => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    property_type: "",
    status: "",
    city: "",
    area: "",
    image: null,
    price: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Adding property: ", formData);
  };
  return (
    <div className="container my-5">
      <div className="row justify-content-center">
        <div className="col-md-8">
          <h1 className="mb-4">Add New Property</h1>

          <form onSubmit={handleSubmit} className="needs-validation">
            <div className="mb-3">
              <label htmlFor="title" className="form-label">
                Property Title
              </label>
              <input
                type="text"
                className="form-control"
                id="title"
                name="title"
                value={formData.title}
                onChange={handleChange}
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="description" className="form-label">
                Description
              </label>
              <textarea
                className="form-control"
                id="description"
                name="description"
                rows="4"
                value={formData.description}
                onChange={handleChange}
                required
              ></textarea>
            </div>
            <div className="mb-3">
              <label htmlFor="property_type" className="form-label">
                Property Type
              </label>
              <select
                name="property_type"
                onChange={handleChange}
                className="form-control"
              >
                <option value="house">House</option>
                <option value="apartment">Apartment</option>
                <option value="land">Land</option>
              </select>
            </div>
            <div className="mb-3">
              <label htmlFor="status" className="form-label">
                Property Type
              </label>
              <select
                name="status"
                onChange={handleChange}
                className="form-control"
              >
                <option value="sale">For Sale</option>
                <option value="rent">For Rent</option>
              </select>
            </div>
            <div className="mb-3">
              <label htmlFor="location" className="form-label">
                Location
              </label>
              <input
                type="text"
                className="form-control"
                id="city"
                name="city"
                placeholder="City"
                value={formData.location}
                onChange={handleChange}
                required
              />
              <input
                type="text"
                className="form-control"
                id="area"
                name="area"
                placeholder="Area"
                value={formData.location}
                onChange={handleChange}
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="image" className="form-label">
                Images
              </label>
              <input
                type="file"
                name="image"
                onChange={(e) =>
                  setFormData({ ...formData, image: e.target.files[0] })
                }
              />
            </div>
            <div className="mb-3">
              <label htmlFor="price" className="form-label">
                Price
              </label>
              <input
                type="number"
                className="form-control"
                id="price"
                name="price"
                value={formData.price}
                onChange={handleChange}
                required
              />
            </div>
            <button type="submit" className="btn btn-primary w-100">
              Add Property
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddProperty;
