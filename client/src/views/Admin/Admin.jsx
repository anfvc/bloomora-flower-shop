import { useState } from "react";
import "./Admin.css";

function Admin() {
  const [data, setData] = useState({
    price: 0,
    name: "",
    category: "",
    subcategory: "",
    description: "",
  });

  const [image, setImage] = useState(null);

  function handleChange(e) {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
  }

  async function handleSubmit(e) {
    e.preventDefault();

    const formData = new FormData();

    formData.append("name", data.name);
    formData.append("price", +data.price);
    formData.append("description", data.description);
    formData.append("category", data.category);
    formData.append("subcategory", data.subcategory);
    formData.append("image", image);
    setImage("");

    try {
      const response = await fetch("http://localhost:5100/api/product/create", {
        method: "POST",
        body: formData,
        // headers: {
        //   "Content-Type": "application/JSON"
        // }
      });

      if (response.ok) {
        const newData = await response.json();
        console.log(newData);
        alert("Database has been updated");
      } else {
        throw new Error("Somethings wrong.");
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="container">
      <form onSubmit={handleSubmit}>
        <div>
          <h1>Admin Panel</h1>
        </div>
        <p>Please select an image to upload</p>
        <input type="file" onChange={(e) => setImage(e.target.files[0])} />
        <input
          type="text"
          placeholder="Name of Product"
          name="name"
          value={data.name}
          onChange={handleChange}
        />
        <input
          type="number"
          placeholder="Price of Product"
          name="price"
          value={data.price}
          onChange={handleChange}
        />
        <input
          type="text"
          placeholder="Description"
          name="description"
          value={data.description}
          onChange={handleChange}
        />
        <input
          type="text"
          placeholder="Category"
          name="category"
          value={data.category}
          onChange={handleChange}
        />
        <input
          type="text"
          placeholder="Subcategory"
          name="subcategory"
          value={data.subcategory}
          onChange={handleChange}
        />
        <button>Create Product</button>
      </form>
    </div>
  );
}

export default Admin;
