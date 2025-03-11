import Alert from "./components/Alert";
import Artworks from "./components/Artworks";
import Header from "./components/Header";
import Hero from "./components/Hero";
import Footer from "./components/Footer";
import Loading from "./components/Loading";

const App = () => {
  return (
    <div className="min-h-screen">
      <div className="gradient-bg-hero">
        <Header />
        <Hero />
      </div>
      <Alert />
      <Artworks />
      <Footer />
      <Loading />
    </div>
  );
};

export default App;
