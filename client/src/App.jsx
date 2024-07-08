import "./App.css";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/navbar/Navbar.jsx";
import Home from "./views/home/Home.jsx";
import Shop from "./views/shop/Shop.jsx";
import About from "./views/about/About.jsx";
import Blog from "./views/blog/Blog.jsx";
import Contact from "./views/contact/Contact.jsx";
import CreateProduct from "./views/Admin/CreateOrder.jsx";
import UserPanel from "./components/userPanel/userPanel.jsx";


function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/shop" element={<Shop />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/admin" element={<CreateProduct />} />

        <Route path="/userPanel" element={<UserPanel />} />

      </Routes>
    </>
  );
}

export default App;
