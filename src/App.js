import {useEffect, useState} from "react";
import "./App.css";

function App() {
  const [page, setPage] = useState("home");
  const [menuOpen, setMenuOpen] = useState(false);
  const [approvedReviews, setApprovedReviews] = useState([]);
  const [reviewsLoading, setReviewsLoading] = useState(true);
  const [reviewsLoadError, setReviewsLoadError] = useState("");

  const WEB_APP_URL =
    "https://script.google.com/macros/s/AKfycbwgNjxVPal5SOhj_QZuU7kUFU69JlpkG3XysZCAHbKBAYxfZXqJ1Og4FhSA6wg4PPQ/exec";


  const [bookingData, setBookingData] = useState({
    fullName: "",
    phone: "",
    email: "",
    address: "",
    service: "",
    propertyType: "",
    preferredDate: "",
    preferredTime: "",
    details: ""
  });

  const [bookingSubmitting, setBookingSubmitting] = useState(false);
  const [bookingSuccess, setBookingSuccess] = useState(false);
  const [bookingError, setBookingError] = useState("");

  useEffect(() => {
  const loadApprovedReviews = async () => {
    setReviewsLoading(true);
    setReviewsLoadError("");

    try {
      const response = await fetch(WEB_APP_URL, {
        method: "GET",
        redirect: "follow"
      });

      if (!response.ok) {
        throw new Error(`Request failed: ${response.status}`);
      }

      const data = await response.json();

      if (!Array.isArray(data)) {
        throw new Error("The review response is not an array.");
      }

      setApprovedReviews(data);
    } catch (error) {
      console.error("Review loading error:", error);

      setReviewsLoadError(
        "Unable to load reviews."
      );
    } finally {
      setReviewsLoading(false);
    }
  };

  loadApprovedReviews();
}, []);

  const handleBookingChange = (event) => {
    const { name, value } = event.target;

    setBookingData((previousData) => ({
      ...previousData,
      [name]: value
    }));
  };

  const handleBookingSubmit = async (event) => {
    event.preventDefault();

    setBookingSubmitting(true);
    setBookingSuccess(false);
    setBookingError("");

    try {
      const formData = new URLSearchParams();

      // Tells Apps Script to use the Bookings sheet
      formData.append("requestType", "booking");

      Object.entries(bookingData).forEach(([key, value]) => {
        formData.append(key, value);
      });

      await fetch(WEB_APP_URL, {
        method: "POST",
        mode: "no-cors",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded"
        },
        body: formData.toString()
      });

      setBookingSuccess(true);

      setBookingData({
        fullName: "",
        phone: "",
        email: "",
        address: "",
        service: "",
        propertyType: "",
        preferredDate: "",
        preferredTime: "",
        details: ""
      });
    } catch (error) {
      console.error("Booking submission failed:", error);

      setBookingError(
        "We could not submit your booking. Please call or email Ventara directly."
      );
    } finally {
      setBookingSubmitting(false);
    }
  };

  /* =========================
     REQUEST A QUOTE FORM
  ========================= */

  const [quoteData, setQuoteData] = useState({
    fullName: "",
    phone: "",
    email: "",
    address: "",
    service: "",
    propertyType: "",
    details: ""
  });

  const [quoteSubmitting, setQuoteSubmitting] = useState(false);
  const [quoteSuccess, setQuoteSuccess] = useState(false);
  const [quoteError, setQuoteError] = useState("");

  const handleQuoteChange = (event) => {
    const { name, value } = event.target;

    setQuoteData((previousData) => ({
      ...previousData,
      [name]: value
    }));
  };

  const handleQuoteSubmit = async (event) => {
    event.preventDefault();

    setQuoteSubmitting(true);
    setQuoteSuccess(false);
    setQuoteError("");

    try {
      const formData = new URLSearchParams();

      // Tells Apps Script to use the Quotes sheet
      formData.append("requestType", "quote");

      Object.entries(quoteData).forEach(([key, value]) => {
        formData.append(key, value);
      });

      await fetch(WEB_APP_URL, {
        method: "POST",
        mode: "no-cors",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded"
        },
        body: formData.toString()
      });

      setQuoteSuccess(true);

      setQuoteData({
        fullName: "",
        phone: "",
        email: "",
        address: "",
        service: "",
        propertyType: "",
        details: ""
      });
    } catch (error) {
      console.error("Quote request submission failed:", error);

      setQuoteError(
        "We could not submit your quote request. Please call or email Ventara directly."
      );
    } finally {
      setQuoteSubmitting(false);
    }
  };
  const [reviewData, setReviewData] = useState({
    name:"",
    email:"",
    rating:"",
    message:""
  });
  const [reviewSubmitting, setReviewSubmitting] = useState(false);
  const [reviewSuccess, setReviewSuccess] = useState(false);
  const [reviewError, setReviewError] = useState("");
  const handleReviewChange = (event) => {
  const { name, value } = event.target;

  setReviewData((previousData) => ({
    ...previousData,
    [name]: value
  }));
};

const handleReviewSubmit = async (event) => {
  event.preventDefault();

  setReviewSubmitting(true);
  setReviewSuccess(false);
  setReviewError("");

  try {
    const formData = new URLSearchParams();

    formData.append("requestType", "review");

    Object.entries(reviewData).forEach(([key, value]) => {
      formData.append(key, value);
    });

    await fetch(WEB_APP_URL, {
      method: "POST",
      mode: "no-cors",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      body: formData.toString()
    });

    setReviewSuccess(true);

    setReviewData({
      name: "",
      email: "",
      rating: "",
      message: ""
    });
  } catch (error) {
    console.error("Review submission failed:", error);

    setReviewError(
      "We could not submit your review. Please try again."
    );
  } finally {
    setReviewSubmitting(false);
  }
};

const openQuoteForService = (serviceName) => {
  setQuoteData((previousData) => ({
    ...previousData,
    service: serviceName,
  }));

  setQuoteSuccess(false);
  setQuoteError("");
  setPage("requestquote");

  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });
};
    return (
    <div>
      <nav className="navbar">
  <img src="/logo.jpg" alt="Ventara Logo" className="logo" />

  <button className="menu-btn" onClick={() => setMenuOpen(!menuOpen)}>
    ☰
  </button>

  <div className={menuOpen ? "nav-links active" : "nav-links"}>
    <button onClick={() => { setPage("home"); setMenuOpen(false); }}>Home</button>
    <button onClick={() => { setPage("about"); setMenuOpen(false); }}>About</button>
    <button onClick={() => { setPage("services"); setMenuOpen(false); }}>Services</button>
    <button onClick={() => { setPage("projects"); setMenuOpen(false); }}>Projects</button>
    <button onClick={() => { setPage("review"); setMenuOpen(false); }}>Reviews</button>
    <button onClick={() => { setPage("faq"); setMenuOpen(false); }}>FAQ</button>
    <button onClick={() => { setPage("contact"); setMenuOpen(false); }}>Contact</button>
  </div>

      </nav>
      {page==="home"&&(
      <section id="home" className="hero">
        <div className="hero-left">
          <p className="tag">RELIABLE HVAC & ENGINEERING SERVICES</p>
          <h1>
            You Can 
            <br />
            <span>Count On.</span>
          </h1>

          <p>
            Professional Air conditioning installation, repair, cleaning,
            preventive maintenance, and mechanical and electrical engineering services. 
          </p>

          <div className="hero-buttons">
          
            <button 
              type="button"
              className="primary-btn"
              onClick={(event)=>{
                event.preventDefault();
                setBookingSuccess(false);
                setBookingError("");
                setPage("booking"); 
              }}
              >
              Book Appoinment
              </button>

        
            <button 
              type="button"
              className="secondary-btn"
              onClick={(event) => {
                event.preventDefault();
                setQuoteSuccess(false);
                setQuoteError("");
                setPage("requestquote"); 
              }}
              >
              Request A Quote
            </button>
          </div>

      </div>

        <div className="hero-right"> 
        <img 
        src="/hero-design.png" 
        alt="Ventara HVAC" 
        className="hero-image"
      
         />
         </div>
      </section>
  )}
  {page==="services" &&(
<section id="services" className="services">
  <h2>
    Our <span>Services</span>
  </h2>

  <div className="service-grid">

    <div className="service-card">
      <div className="service-icon">📐</div>
      <h3>Mechanical & Electrical Design</h3>
      <p>
        We provide complete mechanical and electrical engineering designs for
        residential, commercial, and industrial projects. Every design is
        created to meet safety standards, efficiency requirements, and client
        specifications.
      </p>
    </div>

    <div className="service-card">
      <div className="service-icon">❄️</div>
      <h3>Aircon Supply & Installation</h3>
      <p>
        We supply high-quality air conditioning systems and perform
        professional installations that ensure maximum cooling efficiency,
        energy savings, and long-term reliability.
      </p>
    </div>

    <div className="service-card">
      <div className="service-icon">🧼</div>
      <h3>Aircon Cleaning</h3>
      <p>
        Keep your air conditioning system operating at its best with our deep
        cleaning service. We remove dirt, bacteria, and buildup to improve air
        quality and extend equipment life.
      </p>
    </div>

    <div className="service-card">
      <div className="service-icon">🛠️</div>
      <h3>Aircon Repair & Troubleshooting</h3>
      <p>
        Our experienced technicians quickly diagnose and repair cooling issues,
        electrical faults, leaks, unusual noises, and other air conditioning
        problems to restore peak performance.
      </p>
    </div>

    <div className="service-card">
      <div className="service-icon">⚡</div>
      <h3>Electrical Wiring & Installation</h3>
      <p>
        We provide safe and code-compliant electrical wiring, panel
        installations, lighting systems, outlets, and other electrical
        solutions for homes and businesses.
      </p>
    </div>

    <div className="service-card">
      <div className="service-icon">🛡️</div>
      <h3>Preventive Maintenance</h3>
      <p>
        Prevent unexpected breakdowns with scheduled maintenance services that
        improve system efficiency, reduce operating costs, and extend the life
        of your HVAC equipment.
      </p>
    </div>

  </div>
</section>
  )}
  {page === "requestquote" && (
  <section id="requestquote" className="quote">
    <div className="quote-wrapper">

      <div className="quote-left">
        <p className="quote-tag">REQUEST A QUOTE</p>

        <h2>
          Get Your <span>Free Estimate</span>
        </h2>

        <p className="quote-note">
          Tell us about your project or service needs. Our team will review
          your request and contact you regarding the estimate and next steps.
        </p>

        <div className="quote-benefits">
          <div className="benefit">
            <span>✓</span>
            <p>Free initial quotation</p>
          </div>

          <div className="benefit">
            <span>✓</span>
            <p>Professional project assessment</p>
          </div>

          <div className="benefit">
            <span>✓</span>
            <p>Cost-friendly solutions</p>
          </div>

          <div className="benefit">
            <span>✓</span>
            <p>No hidden charges</p>
          </div>
        </div>
      </div>

      <div className="quote-form-container">
        {!quoteSuccess ? (
          <form
            className="quote-form"
            onSubmit={handleQuoteSubmit}
          >
            <input
              type="text"
              name="fullName"
              placeholder="Full Name"
              value={quoteData.fullName}
              onChange={handleQuoteChange}
              required
            />

            <input
              type="tel"
              name="phone"
              placeholder="Phone Number"
              value={quoteData.phone}
              onChange={handleQuoteChange}
              required
            />

            <input
              type="email"
              name="email"
              placeholder="Email Address"
              value={quoteData.email}
              onChange={handleQuoteChange}
              required
            />

            <input
              type="text"
              name="address"
              placeholder="Location / Address"
              value={quoteData.address}
              onChange={handleQuoteChange}
              required
            />

            <select
              name="service"
              value={quoteData.service}
              onChange={handleQuoteChange}
              required
            >
              <option value="" disabled>
                Select Service Needed
              </option>

              <option value="Mechanical & Electrical Design">
                Mechanical & Electrical Design
              </option>

              <option value="Aircon Supply & Installation">
                Aircon Supply & Installation
              </option>

              <option value="Aircon Cleaning">
                Aircon Cleaning
              </option>

              <option value="Aircon Repair & Troubleshooting">
                Aircon Repair & Troubleshooting
              </option>

              <option value="Electrical Wiring & Installation">
                Electrical Wiring & Installation
              </option>

              <option value="Preventive Maintenance">
                Preventive Maintenance
              </option>
            </select>

            <select
              name="propertyType"
              value={quoteData.propertyType}
              onChange={handleQuoteChange}
              required
            >
              <option value="" disabled>
                Property Type
              </option>

              <option value="Residential">
                Residential
              </option>

              <option value="Commercial">
                Commercial
              </option>

              <option value="Industrial">
                Industrial
              </option>
            </select>

            <textarea
              name="details"
              placeholder="Describe your project, concern, equipment, quantity, or requested service..."
              value={quoteData.details}
              onChange={handleQuoteChange}
              required
            />

            <button
              type="submit"
              disabled={quoteSubmitting}
            >
              {quoteSubmitting
                ? "Submitting Request..."
                : "Request Free Quote"}
            </button>

            {quoteError && (
              <p className="quote-error">
                {quoteError}
              </p>
            )}

            <p className="quote-privacy-note">
              🔒 Your information will only be used to process your quotation
              request.
            </p>
          </form>
        ) : (
          <div className="quote-success">
            <div className="quote-success-icon">
              ✓
            </div>

            <h3>Thank You!</h3>

            <p className="quote-success-main">
              Your quote request has been received.
            </p>

            <p>
              Our Ventara team will review your project details and contact
              you shortly regarding the estimate and next steps.
            </p>

            <p className="quote-success-note">
              The final quotation may depend on site conditions, equipment,
              materials, quantity, and project requirements.
            </p>

            <button
              type="button"
              onClick={() => {
                setQuoteSuccess(false);
                setPage("home");
              }}
            >
              Return to Home
            </button>

            <button
              type="button"
              className="another-quote-btn"
              onClick={() => {
                setQuoteSuccess(false);
                setQuoteError("");
              }}
            >
              Request Another Quote
            </button>
          </div>
        )}
      </div>

    </div>
  </section>

  )}
{page === "projects" && (
  <section id="projects" className="projects-page">
    <div className="projects-header">
      <span className="projects-tag">OUR WORK</span>

      <h2>
        Recent <span>Projects</span>
      </h2>

      <p>
        Explore some of the HVAC and engineering projects completed by
        Ventara Engineering Services.
      </p>
    </div>

    <div className="projects-grid">

      {/* Project 1 */}
      <article className="project-card">
        <div className="project-image-wrapper">
          <img
            src="/images/project2.jpg"
            alt="Residential Aircon Installation"
          />
          <span className="project-category">
            Aircon Installation
          </span>
        </div>

        <div className="project-content">
          <h3>Residential Aircon Installation</h3>

          <p className="project-location">
            📍 La Union, Philippines
          </p>

          <p>
            Complete air conditioning supply and installation with proper
            positioning, testing, and commissioning.
          </p>

          <button
            type="button"
            onClick={() =>
              openQuoteForService("Aircon Supply & Installation")
            }
          >
            Inquire About This Service
          </button>
        </div>
      </article>

      {/* Project 2 */}
      <article className="project-card">
        <div className="project-image-wrapper">
          <img
            src="/images/project3.jpg"
            alt="Electrical Wiring Installation"
          />
          <span className="project-category">
            Electrical Work
          </span>
        </div>

        <div className="project-content">
          <h3>Electrical Wiring Installation</h3>

          <p className="project-location">
            📍 La Union, Philippines
          </p>

          <p>
            Safe and organized electrical wiring installation completed
            according to engineering standards.
          </p>

          <button
            type="button"
            onClick={() =>
              openQuoteForService("Electrical Wiring & Installation")
            }
          >
            Inquire About This Service
          </button>
        </div>
      </article>

      {/* Project 3 */}
      <article className="project-card">
        <div className="project-image-wrapper">
          <img
            src="/images/project1.jpg"
            alt="Preventive Maintenance"
          />
          <span className="project-category">
            Preventive Maintenance
          </span>
        </div>

        <div className="project-content">
          <h3>Preventive Maintenance</h3>

          <p className="project-location">
            📍 La Union, Philippines
          </p>

          <p>
            Detailed cleaning, inspection, and performance testing to
            keep air conditioning systems operating efficiently.
          </p>

          <button
            type="button"
            onClick={() =>
              openQuoteForService("Preventive Maintenance")
            }
          >
            Inquire About This Service
          </button>
        </div>
      </article>

    </div>
  </section>
)}
{page === "about" && (
  <section id="about" className="about">
    <div className="about-top">
      <div className="about-text">
        <p className="about-tag">ABOUT US</p>

        <h2>Ventara elevates indoor comfort through smart, reliable HVAC services.</h2>

        <p>
          Ventara Engineering Services provides reliable HVAC and engineering solutions for residential, commercial, and industrial clients. We
          combine technical expertise with professional workmanship to deliver quality, safety, and lasting customer satisfaction.
        </p>
      </div>

      <div className="about-image">
        <img src="/about-image.jpg" alt="Ventara Engineering Services" />
      </div>
    </div>


    <div className="section-divider">
      <span>OUR MISSION & VISION</span>
    </div>

    <div className="about-mission-vision">
      <div className="mission-card">
        <h3>🎯 Our Mission</h3>
        <p>
          At Ventara Engineering Services, our mission is to provide cost-friendly yet highly effective HVAC and engineering solutions
          without compromising quality, safety, or professionalism.
        </p>
        <p>
          We are committed to delivering reliable workmanship, exceptional
          customer service, and long-lasting comfort for every home and business.
        </p>
      </div>

      <div className="vision-card">
        <h3>🌍 Our Vision</h3>
        <p>
          To become one of Philippines's most trusted HVAC and engineering service
          providers by delivering innovative, affordable, and sustainable
          solutions.
        </p>
        <p>
          We aim to build lasting relationships through excellence, integrity,
          and customer satisfaction.
        </p>
      </div>
    </div>

    <div className="section-divider">
      <span>WHY CHOOSE VENTARA</span>
    </div>

    <div className="about-grid">
      <div className="about-card">
        <div className="icon">📜</div>
        <h3>Registered Business</h3>
        <p>Operating legally and professionally with proper business registrations.</p>
      </div>

      <div className="about-card">
        <div className="icon">🛡️</div>
        <h3>Licensed & Insured</h3>
        <p>Providing safe, reliable, and trusted HVAC and engineering services.</p>
      </div>

      <div className="about-card">
        <div className="icon">👷</div>
        <h3>Certified Technicians</h3>
        <p>Handled by trained professionals with HVAC service experience.</p>
      </div>

      <div className="about-card">
        <div className="icon">💰</div>
        <h3>Cost-Friendly Service</h3>
        <p>Affordable solutions without compromising quality and workmanship.</p>
      </div>
    </div>
  </section>
)}
   
{page === "booking" && (
  <section id="booking" className="booking">
    <div className="booking-container">

      <div className="booking-left">
        <h2>
          Schedule an <span>Appointment</span>
        </h2>

        <p>
          Fill out the form and our team will contact you to confirm your
          booking. We provide reliable HVAC and engineering services you can
          count on.
        </p>

        <div className="booking-feature">
          <div className="booking-icon">📅</div>

          <div>
            <h4>Easy Scheduling</h4>
            <p>Choose your preferred date and time.</p>
          </div>
        </div>

        <div className="booking-feature">
          <div className="booking-icon">🛡️</div>

          <div>
            <h4>Trusted Professionals</h4>
            <p>Experienced technicians focused on safe, quality service.</p>
          </div>
        </div>

        <div className="booking-feature">
          <div className="booking-icon">⚡</div>

          <div>
            <h4>Fast Response</h4>
            <p>Quick confirmation and professional assistance.</p>
          </div>
        </div>
      </div>

      <div className="booking-form">
        {!bookingSuccess ? (
          <>
            <h3>Booking Form</h3>

            <form onSubmit={handleBookingSubmit}>
              <div className="booking-grid">

                <input
                  type="text"
                  name="fullName"
                  placeholder="Full Name"
                  value={bookingData.fullName}
                  onChange={handleBookingChange}
                  required
                />

                <input
                  type="tel"
                  name="phone"
                  placeholder="Phone Number"
                  value={bookingData.phone}
                  onChange={handleBookingChange}
                  required
                />

                <input
                  type="email"
                  name="email"
                  placeholder="Email Address"
                  value={bookingData.email}
                  onChange={handleBookingChange}
                  required
                />

                <input
                  type="text"
                  name="address"
                  placeholder="Location / Address"
                  value={bookingData.address}
                  onChange={handleBookingChange}
                  required
                />

                <select
                  name="service"
                  value={bookingData.service}
                  onChange={handleBookingChange}
                  required
                >
                  <option value="" disabled>
                    Select Service
                  </option>

                  <option value="Mechanical & Electrical Design">
                    Mechanical & Electrical Design
                  </option>

                  <option value="Aircon Supply & Installation">
                    Aircon Supply & Installation
                  </option>

                  <option value="Aircon Cleaning">
                    Aircon Cleaning
                  </option>

                  <option value="Aircon Repair & Troubleshooting">
                    Aircon Repair & Troubleshooting
                  </option>

                  <option value="Electrical Wiring & Installation">
                    Electrical Wiring & Installation
                  </option>

                  <option value="Preventive Maintenance">
                    Preventive Maintenance
                  </option>
                </select>

                <select
                  name="propertyType"
                  value={bookingData.propertyType}
                  onChange={handleBookingChange}
                  required
                >
                  <option value="" disabled>
                    Property Type
                  </option>

                  <option value="Residential">Residential</option>
                  <option value="Commercial">Commercial</option>
                  <option value="Industrial">Industrial</option>
                </select>

                <input
                  type="date"
                  name="preferredDate"
                  value={bookingData.preferredDate}
                  onChange={handleBookingChange}
                  required
                />

                <input
                  type="time"
                  name="preferredTime"
                  value={bookingData.preferredTime}
                  onChange={handleBookingChange}
                  required
                />
              </div>

              <textarea
                name="details"
                placeholder="Additional Details"
                value={bookingData.details}
                onChange={handleBookingChange}
              />

              <button type="submit" disabled={bookingSubmitting}>
                {bookingSubmitting
                  ? "Submitting Booking..."
                  : "Book Appointment"}
              </button>

              {bookingError && (
                <p className="booking-error">
                  {bookingError}
                </p>
              )}

              <p className="booking-note">
                🔒 Your information is safe and will only be used to process
                your service request.
              </p>
            </form>
          </>
        ) : (
          <div className="booking-success">
            <div className="booking-success-icon">✓</div>

            <h3>Thank You!</h3>

            <p className="success-main-message">
              Your booking request has been received.
            </p>

            <p>
              Our Ventara team will contact you shortly to confirm your
              appointment, service details, preferred date, and time.
            </p>

            <p className="success-reminder">
              Please remember that your appointment is not confirmed until our
              team contacts you.
            </p>

            <button
              type="button"
              onClick={() => {
                setBookingSuccess(false);
                setPage("home");
              }}
            >
              Return to Home
            </button>

            <button
              type="button"
              className="book-another-btn"
              onClick={() => setBookingSuccess(false)}
            >
              Make Another Booking
            </button>
          </div>
        )}
      </div>
    </div>
  </section>
)}
{page === "review" && (
  <section id="review" className="review">
    <div className="section-title">
      <p>CUSTOMER TESTIMONIALS</p>
      <h2>What Our Clients Say</h2>
      <span className="review-subtitle">
        Real feedback from customers who trust Ventara Engineering Services.
      </span>
    </div>

    <div className="testimonial-grid">
  {reviewsLoading ? (
    <p className="reviews-status">Loading customer reviews...</p>
  ) : reviewsLoadError ? (
    <p className="reviews-status reviews-load-error">
      {reviewsLoadError}
    </p>
  ) : approvedReviews.length === 0 ? (
    <p className="reviews-status">
      No approved customer reviews yet.
    </p>
  ) : (
    approvedReviews.map((review, index) => (
      <div className="testimonial-card" key={index}>
        <div className="stars">
          {"★".repeat(review.rating)}
          {"☆".repeat(5 - review.rating)}
        </div>

        <p>{review.review}</p>

        <h4>— {review.name}</h4>
      </div>
    ))
  )}
</div>

    {!reviewSuccess ? (
      <form
        className="review-form"
        onSubmit={handleReviewSubmit}
      >
        <h3>Leave Your Review</h3>

        <input
          type="text"
          name="name"
          placeholder="Your Name"
          value={reviewData.name}
          onChange={handleReviewChange}
          required
        />

        <input
          type="email"
          name="email"
          placeholder="Your Email Address"
          value={reviewData.email}
          onChange={handleReviewChange}
          required
        />

        <select
          name="rating"
          value={reviewData.rating}
          onChange={handleReviewChange}
          required
        >
          <option value="" disabled>
            Rate Our Service
          </option>

          <option value="5">⭐⭐⭐⭐⭐ Excellent</option>
          <option value="4">⭐⭐⭐⭐ Very Good</option>
          <option value="3">⭐⭐⭐ Good</option>
          <option value="2">⭐⭐ Fair</option>
          <option value="1">⭐ Poor</option>
        </select>

        <textarea
          name="message"
          placeholder="Tell us about your experience..."
          value={reviewData.message}
          onChange={handleReviewChange}
          required
        />

        <button
          type="submit"
          disabled={reviewSubmitting}
        >
          {reviewSubmitting
            ? "Submitting Review..."
            : "Submit Review"}
        </button>

        {reviewError && (
          <p className="review-error">
            {reviewError}
          </p>
        )}

        <p className="review-note">
          Reviews may be checked before appearing publicly on the website.
        </p>
      </form>
    ) : (
      <div className="review-success">
        <div className="review-success-icon">✓</div>

        <h3>Thank You!</h3>

        <p>
          Your review has been received.
        </p>

        <p>
          We appreciate you taking the time to share your experience with
          Ventara Engineering Services.
        </p>

        <button
          type="button"
          onClick={() => {
            setReviewSuccess(false);
            setPage("home");
          }}
        >
          Return to Home
        </button>

        <button
          type="button"
          className="another-review-btn"
          onClick={() => {
            setReviewSuccess(false);
            setReviewError("");
          }}
        >
          Leave Another Review
        </button>
      </div>
    )}
  </section>
)}
{page==="faq" && (
<section id="faq" className="faq">
  <div className="section-title">
    <p>FREQUENTLY ASKED QUESTIONS</p>
    <h2>Have Questions?</h2>
  </div>
  <div className="faq-container">

    <details className="faq-item">
      <summary>How often should my air conditioner be cleaned?</summary>
      <p>
        We recommend professional air conditioner cleaning every 3–6 months,
        depending on usage, to maintain cooling efficiency and improve indoor air quality.
      </p>
    </details>

    <details className="faq-item">
      <summary>Do you offer free quotations?</summary>
      <p>
        Yes! We provide free site inspections and quotations for installations,
        repairs, and engineering projects.
      </p>
    </details>

    <details className="faq-item">
      <summary>What areas do you serve?</summary>
      <p>
        We primarily serve La Union and nearby provinces. Contact us to confirm
        if your location is within our service area.
      </p>
    </details>

    <details className="faq-item">
      <summary>How long does aircon installation take?</summary>
      <p>
        Most residential installations are completed within one day, depending
        on the unit type and installation requirements.
      </p>
    </details>

    <details className="faq-item">
      <summary>Do you offer preventive maintenance?</summary>
      <p>
        Yes. Our preventive maintenance service includes inspection, cleaning,
        performance testing, and recommendations to keep your HVAC system running efficiently.
      </p>
    </details>

    <details className="faq-item">
      <summary>Are your technicians certified?</summary>
      <p>
        Absolutely. Our technicians are experienced professionals committed to
        quality workmanship and safety standards.
      </p>
    </details>

  </div>
</section>
)}

{page === "contact" && (
  <section id="contact" className="contact-section">
  <div className="section-header">
    <span className="section-tag">CONTACT US</span>
    <h2>Let's Work Together</h2>
    <p>
      Get in touch with us today for bookings, quotations, or inquiries.
      We are always ready to help.
    </p>
  </div>

  <div className="contact-container">

    <div className="contact-info">

      <div className="contact-card">
        <h3>📍 Service Area</h3>
        <p>La Union and Nearby Provinces</p>
      </div>

      <div className="contact-card">
        <h3>📞 Phone Numbers</h3>
        <a href="tel:+639565138790">
          0956 513 8790
        </a>

        <br />

        <a href="tel:+639694115052">
          0969 411 5052
        </a>
      </div>

      <div className="contact-card">
        <h3>✉ Email</h3>
        <a href="mailto:ventaraengineering@venataraph.com">
          ventaraengineering@venataraph.com
        </a>
      </div>

      <div className="contact-card">
        <h3>📘 Facebook Page</h3>

        <a
          href="https://facebook.com/profile.php?id=61587195983439"
          target="_blank"
          rel="noopener noreferrer"
        >
          Ventara Engineering Services
        </a>
      </div>

    </div>

    <div className="contact-map">

      <iframe
        title="Ventara Location"
        src="https://www.google.com/maps/embed?pb=!3m2!1sen!2sca!4v1783975715335!5m2!1sen!2sca!6m8!1m7!1s_pPODP6XlabyXIaKjadyJg!2m2!1d16.85928691764884!2d120.4284051672024!3f257.3613812698402!4f-1.2402233895704455!5f0.7820865974627469" 
        width="100%"
        height="400"
        style={{
          border: 0,
          borderRadius: "18px",
        }}
        loading="lazy"
        allowFullScreen
        referrerPolicy="no-referrer-when-downgrade"
      />

    </div>

  </div>
</section>
)}
    </div>
  );
} 

export default App;