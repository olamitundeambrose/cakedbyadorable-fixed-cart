import Home from './pages/Home';
import About from './pages/About';
import CakeShop from './pages/CakeShop';
import Flavours from './pages/Flavours';
import FAQ from './pages/FAQ';
import Contact from './pages/Contact';
import Cart from './pages/Cart';
import Booking from './pages/Booking';
import __Layout from './Layout.jsx';


export const PAGES = {
    "Home": Home,
    "About": About,
    "CakeShop": CakeShop,
    "Flavours": Flavours,
    "FAQ": FAQ,
    "Contact": Contact,
    "Cart": Cart,
    "Booking": Booking,
}

export const pagesConfig = {
    mainPage: "Home",
    Pages: PAGES,
    Layout: __Layout,
};