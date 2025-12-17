import Home from './pages/Home';
import About from './pages/About';
import CakeShop from './pages/CakeShop';
import Flavours from './pages/Flavours';
import FAQ from './pages/FAQ';
import __Layout from './Layout.jsx';


export const PAGES = {
    "Home": Home,
    "About": About,
    "CakeShop": CakeShop,
    "Flavours": Flavours,
    "FAQ": FAQ,
}

export const pagesConfig = {
    mainPage: "Home",
    Pages: PAGES,
    Layout: __Layout,
};