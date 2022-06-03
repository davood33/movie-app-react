import "./App.scss";
import 'swiper/swiper.min.css';
import './assets/boxicons-2.0.7/css/boxicons.min.css'
import { BrowserRouter } from "react-router-dom";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import AllRoutes from "./config/AllRoutes";
function App() {
  return (
    <BrowserRouter>
      <Header />
      <AllRoutes />
      <Footer />
    </BrowserRouter>
  );
}

export default App;
