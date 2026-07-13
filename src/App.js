import {useState} from "react";
import "./App.css";

function App() {
  const [page, setPage]=useState("home");
  const [menuOpen,setMenuOpen]=useState(false);
  const [bookingData,setBookingData]=useState({
    fullName:"",
    phone:"",
    email:"",
    address:"",
    service:"",
    propertyType:"",
    preferredDate:"",
    preferredTime:"",
    details:""
  });
  const [bookingSubmitting, setBookingSubmitting]=useState(false);
  const [bookingSuccess, setBookingSuccess]=useState(false);
  const [bookingError, setBookingError]=useState("");

  const handleBookingChange=(event)=>{
    const {name,value}=event.target;
    setBookingData((previousData)=>({
      ...previousData,
      [name]:value
    }));
  };

  const handleBookingSubmit = async (event) => {
  event.preventDefault();

  setBookingSubmitting(true);
  setBookingSuccess(false);
  setBookingError("");

  const bookingWebAppUrl =
    "https://script.google.com/macros/s/AKfycbwgNjxVPal5SOhj_QZuU7kUFU69JlpkG3XysZCAHbKBAYxfZXqJ1Og4FhSA6wg4PPQ/exec";

  try {
    const formData = new URLSearchParams();

    Object.entries(bookingData).forEach(([key, value]) => {
      formData.append(key, value);
    });

    await fetch(bookingWebAppUrl, {
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
            className="primary-btn"
              onClick={()=>setPage("booking")}
              >
              Book Appoinment
              </button>

        
            <button 
            className="secondary-btn"
            onClick={()=>setPage("requestquote")}
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
  {page==="requestquote" &&(
<section id="requestquote" className="quote">

  <div className="quote-wrapper">

    <div className="quote-left">
      <p className="quote-tag">REQUEST A QUOTE</p>

      <h2>
        Get Your <span>Free Estimate</span>
      </h2>

      <p className="quote-note">
        Whether it's a new installation, repair, preventive maintenance,
        or engineering design, our team is ready to provide a detailed,
        no-obligation quotation tailored to your project.
      </p>

      <div className="quote-benefits">

        <div className="benefit">
          <span>✔</span>
          <p>Free Site Inspection</p>
        </div>

        <div className="benefit">
          <span>✔</span>
          <p>Fast Response within 24 Hours</p>
        </div>

        <div className="benefit">
          <span>✔</span>
          <p>Professional HVAC Engineers</p>
        </div>

        <div className="benefit">
          <span>✔</span>
          <p>No Hidden Charges</p>
        </div>

      </div>
    </div>


    <form className="quote-form">

      <input type="text" placeholder="Full Name" />

      <input type="tel" placeholder="Phone Number" />

      <input type="email" placeholder="Email Address" />

      <input type="text" placeholder="Location / Address" />

      <select>
        <option>Select Service Needed</option>
        <option>Mechanical & Electrical Design</option>
        <option>Aircon Supply & Installation</option>
        <option>Aircon Cleaning</option>
        <option>Aircon Repair & Troubleshooting</option>
        <option>Electrical Wiring & Installation</option>
        <option>Preventive Maintenance</option>
      </select>

      <select>
        <option>Property Type</option>
        <option>Residential</option>
        <option>Commercial</option>
        <option>Industrial</option>
      </select>

      <textarea placeholder="Describe your project or concern..."></textarea>

      <button type="submit">
        Request Free Quote
      </button>

    </form>

  </div>

</section>
  )}
{page==="projects" &&(
<section id="projects" className="projects">
  <div className="section-title">
    <p>OUR WORK</p>
    <h2>Recent Projects</h2>
  </div>

  <div className="project-grid">
    <div className="project-card">
      <img src="/images/project2.jpg" alt="Aircon installation" />
      <div className="project-info">
        <h3>Aircon Installation</h3>
        <p>Residential air conditioning supply and installation.</p>
      </div>
    </div>

    <div className="project-card">
      <img src="/images/project3.jpg" alt="Electrical wiring" />
      <div className="project-info">
        <h3>Electrical Installation</h3>
        <p>Safe electrical wiring and installation services.</p>
      </div>
    </div>

    <div className="project-card">
      <img src="/images/project1.jpg" alt="Preventive maintenance" />
      <div className="project-info">
        <h3>Preventive Maintenance</h3>
        <p>Maintenance service for reliable cooling performance.</p>
      </div>
    </div>
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
  <section id="contact" className="contact-page">
    <div className="section-title">
      <p>CONTACT US</p>
      <h2>Get In Touch</h2>
    </div>

    <div className="contact-grid">
      <div className="contact-card">
        <span>📞</span>
        <h3>Call Us</h3>
        <p>0956 513 8790</p>
        <p>0969 411 5052</p>
      </div>

      <div className="contact-card">
        <span>✉️</span>
        <h3>Email</h3>
        <p>ventaraengineeringservices@gmail.com</p>
      </div>

      <div className="contact-card">
        <span>📍</span>
        <h3>Location</h3>
        <p>La Union and Nearby Provinces</p>
      </div>

      <div className="contact-card">
        <span>🕒</span>
        <h3>Business Hours</h3>
        <p>Monday – Saturday</p>
        <p>8:00 AM – 5:00 PM</p>
      </div>
    </div>
  </section>

)}
  </div>
);

}
 

export default App;