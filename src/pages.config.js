import Home from './pages/Home';
import About from './pages/About';
import CakeShop from './pages/CakeShop';
import Flavours from './pages/Flavours';
import FAQ from './pages/FAQ';
import Contact from './pages/Contact';
import Cart from './pages/Cart';
import Booking from './pages/Booking';
import Payment from './pages/Payment';
import OrderConfirmation from './pages/OrderConfirmation';
import Auth from './pages/Auth';
import Dashboard from './pages/Dashboard';
import AdminDashboard from './pages/AdminDashboard';
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
    "Payment": Payment,
    "OrderConfirmation": OrderConfirmation,
    "Auth": Auth,
    "Dashboard": Dashboard,
    "AdminDashboard": AdminDashboard,
}

export const pagesConfig = {
    mainPage: "Home",
    Pages: PAGES,
    Layout: __Layout,
};