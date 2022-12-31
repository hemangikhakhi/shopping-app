import "./App.css";
import { Navbar } from "./components/Navbar";
import { ProductsContainer } from "./components/ProductsContaner";
import { ShoppingCartProvider } from "./context/ShoppingCartContext";

function App() {
  return (
    <ShoppingCartProvider>
      <Navbar />
      <ProductsContainer />
    </ShoppingCartProvider>
  );
}

export default App;
