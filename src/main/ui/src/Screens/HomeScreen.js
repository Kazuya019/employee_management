import React from "react";
import "./HomeScreen.css";
import { Link } from "react-router-dom";
function HomeScreen() {
  return (
    <div>
      <section class="colored-section" id="title">
        <div class="container-fluid">
          <nav class="navbar navbar-expand-lg navbar-light bg-white">
            {/* <a class="navbar-brand" style="color: #051367;" href="#">
              Connecteam+
            </a> */}
            <button
              class="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarSupportedContent"
              aria-controls="navbarSupportedContent"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span class="navbar-toggler-icon"></span>
            </button>

            <div class="collapse navbar-collapse" id="navbarSupportedContent">
              <ul class="navbar-nav ms-auto">
                <li class="nav-item">
                  <a class="nav-link" href="#title">
                    Home
                  </a>
                </li>
                <li class="nav-item">
                  <a class="nav-link" href="#features">
                    Features
                  </a>
                </li>
                <li class="nav-item">
                  <a class="nav-link" href="#testimonials">
                    About us
                  </a>
                </li>
                <li>
                  <Link
                    to="/signin"
                    type="button"
                    class="btn btn-light nav-btn"
                    name="button"
                  >
                    Log In
                  </Link>
                  {/* <button
                    type="button"
                    class="btn btn-light nav-btn"
                    name="button"
                  >
                    Log in
                  </button> */}
                </li>
                <li>
                  <Link
                    to="/register"
                    type="button"
                    class="btn btn-light nav-btn"
                    name="button"
                  >
                    Register
                  </Link>
                </li>
                
              </ul>
            </div>
          </nav>
        </div>
      </section>
      {/* <hr style="height: 2px; border: 0;" /> */}

      <section class="colored-section" id="title">
        <div class="container-fluid">
          <div class="row">
            <div class="col-lg-6">
              <h1 class="big-heading">Manage Your Team in One Place</h1>
              <div class="small-heading">
                Use advanced employee management system to connect with
                employees perfectly, communicate without obstacles and manage
                effectively.
              </div>
              <div class="btn-section">
                <a href="#footer">
                  <button
                    type="button"
                    class="bigbtn btn btn-dark btn-lg"
                    // style="background-color: #2D31FA; border: none;"
                  >
                    Contact us
                  </button>
                </a>
                <button
                  type="button"
                  class="bigbtn btn btn-outline btn-light btn-lg"
                  //   style="color: #2D31FA; border-color: #2D31FA; margin-left: 50px;"
                >
                  Learn more
                </button>
              </div>
            </div>
            <div class="col-lg-6">
              <img
                class="people-img"
                src="images/titlepage.png"
                alt="iphone-mockup"
              />
            </div>
          </div>
        </div>
      </section>

      <section class="white-section" id="features">
        <div class="container-fluid">
          <div class="row">
            <div class="col-lg-4">
              <i class="fas fa-solid fa-check fa-4x"></i>
              <h3 class="feature-title">Easy to use</h3>
              <p class="sub-box">
                So easy to use, even your employee can learn it self.
              </p>
            </div>

            <div class="col-lg-4">
              <i class="fas fa-solid fa-list fa-4x"></i>
              <h3 class="feature-title">Effective to customize</h3>
              <p class="sub-box">
                {" "}
                Provide a good communication platform for employee.
              </p>
            </div>

            <div class="col-lg-4">
              <i class="fas fa-solid fa-user-shield fa-4x"></i>
              <h3 class="feature-title">Guaranteed to be secure</h3>
              <p class="sub-box">
                Your information here is safe. We guranteed it.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section class="colored-section" id="testimonials">
        <div
          id="carouselExampleControls"
          class="carousel carousel-dark slide"
          data-bs-ride="false"
          data-bs-pause="hover"
        >
          <div class="carousel-inner">
            <div class="carousel-item active container-fluid">
              <h2 class="testimonial-text">
                Everything we needed and plus more, all in a single solution.
                Not only did we cut our previous costs by 80%, everything is now
                in a single solution.
              </h2>
              <img
                class="testimonial-image"
                src="images/lady-img.jpg"
                alt="lady-profile"
              />
              <em>Kelly, New York</em>
            </div>
            <div class="carousel-item container-fluid">
              <h2 class="testimonial-text">
                It's a simple, but intuitive, Work OS for teams to shape
                workflows, adjust to shifting needs, create transparency,
                connect collaboratively, and stop doing manual grunt work.
              </h2>
              <img
                class="testimonial-image"
                src="images/dog-img.jpg"
                alt="dog-profile"
              />
              <em>Jackson, Austin</em>
            </div>
          </div>
          <button
            class="carousel-control-prev"
            type="button"
            data-bs-target="#carouselExampleControls"
            data-bs-slide="prev"
          >
            <span class="carousel-control-prev-icon" aria-hidden="true"></span>
            <span class="visually-hidden">Previous</span>
          </button>
          <button
            class="carousel-control-next"
            type="button"
            data-bs-target="#carouselExampleControls"
            data-bs-slide="next"
          >
            <span class="carousel-control-next-icon" aria-hidden="true"></span>
            <span class="visually-hidden">Next</span>
          </button>
        </div>
      </section>

      <section class="white-section" id="cta">
        <div class="container-fluid">
          <div class="cta-position">
            <h1 class="cta-text">Find the Effective Way of Your Work Today.</h1>
            <a href="#footer">
              <button
                type="button"
                class="bigbtn btn btn-dark btn-lg"
                // style="background-color: #2D31FA; border:none;"
              >
                Contact us
              </button>
            </a>
            <button
              type="button"
              class="bigbtn btn btn-outline btn-dark btn-lg"
              //   style="background-color: #2D31FA; border:none;"
            >
              Register
            </button>
          </div>
        </div>
      </section>

      <footer class="colored-section" id="footer">
        <div class="container-fluid">
          <i class="img-box fab fa-twitter"></i>
          <i class="img-box fab fa-facebook-f"></i>
          <i class="img-box fab fa-instagram"></i>
          <i class="img-box fas fa-envelope"></i>
          <p>© Copyright Connecteam+</p>
        </div>
      </footer>
    </div>
  );
}

export default HomeScreen;
