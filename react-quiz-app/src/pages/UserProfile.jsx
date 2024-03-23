import "../styles/user-profile.css";
import "../images/images";
import { Link } from "react-router-dom";
import { NavMenu, Footer } from "../components";
import { IMAGES } from "../images/images";

const UserProfile = () => {
    return (
        <>
        <NavMenu />
        <section className="app-ctn">
            <h2 className="text-center pd-lg">User Profile</h2>
            <div className="profile-ctn br-md pd-lg">
                <div className="profile-img br-full">
                <img src={IMAGES.userImg} alt="jhon-doe" className="img-responsive"/>
                </div>
                <div className="user-detail pd-bottom-lg">
                    <div className="pd-bottom-lg">
                    <p>Name</p>
                    <p className="para-lg">Jhon Doe</p>
                    </div>
                    <div className="pd-bottom-lg">
                    <p>Username</p>
                    <p className="para-lg">jhon@98</p>
                    </div>
                    <div className="pd-bottom-lg">
                    <p>Email</p>
                    <p className="para-lg">jhon@gmail.com</p>
                    </div>
                </div>
                <Link to="/login" className="btn btn-primary">Logout</Link>
            </div>
        </section>
        <Footer />
        </>
    );
}

export {UserProfile}