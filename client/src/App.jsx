import "./App.css";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/navbar/Navbar.jsx";
import Home from "./views/home/Home.jsx";
import Shop from "./views/shop/Shop.jsx";
import OurRoots from "./views/OurRoots/OurRoots.jsx";
import Contact from "./views/contact/Contact.jsx";
import CreateProduct from "./views/Admin/CreateProduct.jsx";
import UserPanel from "./components/userPanel/userPanel.jsx";
import WeddingsEvents from "./views/weddings&events/Weddings&Events.jsx";
import WeddingProcess from "./views/weddingProcess/WeddingProcess.jsx";
import WeddingGallery from "./views/weddingGallery/WeddingGallery.jsx";
import Search from "./components/search/Search.jsx";
import Footer from "./components/footer/Footer.jsx";
import WeddingEvents from "./views/weddingEvents/WeddingEvents.jsx";
import Cart from "./components/cart/Cart.jsx";


function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/ourroots" element={<OurRoots />} />
        <Route path="/shop" element={<Shop />} />
        <Route path="/weddings-events" element={<WeddingsEvents />} />
        <Route path="/wedding-process" element={<WeddingProcess />} />
        <Route path="/wedding-gallery" element={<WeddingGallery />} />
        <Route path="/events" element={<WeddingEvents />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/admin" element={<CreateProduct />} />
        <Route path="/userPanel" element={<UserPanel />} />
        <Route path="/search" element={<Search />}/>
        <Route path="/cart" element={<Cart />}/>
      </Routes>
      <Footer />
    </>
  );
}

export default App;
