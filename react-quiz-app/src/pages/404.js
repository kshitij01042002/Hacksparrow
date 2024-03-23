import "../styles/404.css";
import {NavMenu, Footer} from "../components";
import {IMAGES} from "../images/images";

const PageNotFound = () => {
  return (
    <>
      <NavMenu />
      <section className="not-found-ctn app-ctn">
        <img
          src={IMAGES.notFound}
          alt="404-page-not-found"
          className="img-responsive"
        />
      </section>
      <Footer />
    </>
  );
};

export {PageNotFound};
