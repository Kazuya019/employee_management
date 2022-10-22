import React from "react";
import "./HomeScreen.css";
import titleImg from './images/titleImg.png';
import dog from './images/dog-img.png';
import lady from './images/lady-img.png';
import { BsCheckLg } from 'react-icons/bs';
import { FaListUl } from 'react-icons/fa';
import { MdSecurity } from 'react-icons/md';
import { ImTwitter } from 'react-icons/im';
import { FaFacebookF } from 'react-icons/fa';
import { GrInstagram } from 'react-icons/gr';
import { MdEmail } from 'react-icons/md';
import AliceCarousel from 'react-alice-carousel';
import "react-alice-carousel/lib/alice-carousel.css";
import { Link } from "react-router-dom";


function HomeScreen() {
  return (

    // <----------------------------------navbar---------------------------------->
    <div>
      <section id="title">
        <div className="container-fluids">
          <span className="titleName">Connecteam+</span>

          <a className="nav-link" href="#title">
            Home
          </a >

          <a className="nav-link" href="#features">
            Features
          </a >

          <a className="nav-link" href="#testimonials">
            About us
          </a >

          <Link to='/signin' type="button" className="nav-btn" name="button">
            Log in
          </Link>

          <Link to='register' type="button" className="nav-btn" name="button">
            Register
          </Link>
        </div>
        <hr />
      </section>

      {/* <----------------------------------title----------------------------------> */}
      <section className="title" id="title">
        <img className="titleImg" src={titleImg} />

        <h1 className="big-heading">Manage Your Team in One Place</h1>
        <h4 className="small-heading">
          Use advanced employee management system to connect with
          employees perfectly, communicate without obstacles and manage
          effectively.
        </h4>

        <a href="#footer">
          <button type="button" className="titleBtnLeft">
            Contact us
          </button>
        </a >

        <button type="button" className="titleBtnRight">
          Learn more
        </button>

      </section>

      {/* <----------------------------------Feature----------------------------------> */}
      <section className="colored-section" id="features">
        <div className="feature">

          <span className="feature1">
            <BsCheckLg className="icon" />
            <h3 className="feature-title">Easy to use</h3>
            <p className="feature-sub">So easy to use, even your employee can learn it self.</p >
          </span>

          <span className="feature2">
            <FaListUl className="icon" />
            <h3 className="feature-title">Effective to customize</h3>
            <p className="feature-sub">Provide a good communication platform for employee.</p >
          </span>

          <span className="feature3">
            <MdSecurity className="icon" />
            <h3 className="feature-title">Guaranteed to be secure</h3>
            <p className="feature-sub">Your information here is safe. We guranteed it.</p>
          </span>
        </div>
      </section>

      {/* <----------------------------------Testimonial----------------------------------> */}
      <section id="testimonials">
        <AliceCarousel>
          <div className="carousel-item">
            <h2 className="testimonial-text1">
              Everything we needed and plus more, all in a single solution.
              Not only did we cut our previous costs by 80%, everything is now
              in a single solution.
            </h2>
            <img className="testerImg" src={lady} alt="lady" />
            <em className="testerName">Kelly, New York</em>
          </div>

          <div className="carousel-item">
            <h2 className="testimonial-text2">
              It is a simple and intuitive working operating system.
              It is suitable for teams to shape workflow,
              increase work visibility and stop manual heavy lifting.
            </h2>
            <img className="testerImg" src={dog} alt="dog" />
            <em className="testerName">Jackson, Austin</em>
          </div>
        </AliceCarousel>
      </section>

      {/* <----------------------------------Call for Action----------------------------------> */}
      <section className="colored-section" id="cta">
        <h1 className="cta-text">
          Find the Effective Way of Your Work Today.
        </h1>

        <a href="#footer">
          <button type="button" className="ctaButton">
            Contact us
          </button>
        </a >
        
        <Link to='register' type="button" className="ctaButton">
          Register
        </Link>
      </section>

      {/* <----------------------------------Footer----------------------------------> */}
      <footer id="footer">
        <ImTwitter className="footerIcon"></ImTwitter>
        <FaFacebookF className="footerIcon"></FaFacebookF>
        <GrInstagram className="footerIcon"></GrInstagram>
        <MdEmail className="footerIcon"></MdEmail>
        <p className="footer-text">© Copyright Connecteam+</p >
      </footer>
    </div>
  );
}

export default HomeScreen;
