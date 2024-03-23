import "../styles/home.css";
import {useState, useEffect} from "react";
import {Link} from "react-router-dom";
import axios from "axios";
import {IMAGES} from "../images/images";
import {NavMenu, Footer, FeaturedCategory, Loader} from "../components";

const Home = () => {
  const [featuredCategory, setFeaturedCategory] = useState([]);
  const [loader, setLoader] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const response = await axios.get("/api/quiz");
        setLoader(false);
        setFeaturedCategory(response.data.quiz);
      } catch (err) {
        console.error("Featured Category", err);
      }
    })();
  }, []);
  return (
    <>
      <NavMenu />
      <section className="container mg-bottom-lg">
        <div className="hero-ctn">
          <div className="hero-txt">
            <h1>Test your personal finance knowledge with Wealth Quest</h1>
          </div>
          <div className="hero-img">
            <img className="img-responsive" src={IMAGES.hero} alt="hero" />
          </div>
        </div>
      </section>
      <section>
        <h2 className="text-center mg-lg">Featured Categories</h2>
        <div className="container">
          {loader && <Loader />}
          <div className="categories-ctn">
            {featuredCategory.map((item) => (
              <Link to={`/category/${item.id}`} key={item.id}>
                <FeaturedCategory
                  imgSrc={item.categoryImg}
                  categoryName={item.categoryName}
                />
              </Link>
            ))}
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
};

export {Home};
