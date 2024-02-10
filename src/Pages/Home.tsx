import Header from "../components/Header";
import Footer from "../components/Footer";
import Main from "../components/Main";

const Home = () => {
  return (
    <div className="w-full min-h-screen flex  gap-2 bg-neutral-900">
      <div className="bg-neutral-900 flex justify-between max-w-[80rem] mx-auto px-2 flex-col w-full md:flex-1">
        <Header />
        <Main />
        <Footer />
      </div>
    </div>
  );
};

export default Home;
