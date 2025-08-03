import React, { useEffect, useState, useRef } from 'react';
import { Send, X, Check } from 'lucide-react';
import './styles/art.css';

function App() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [currentSection, setCurrentSection] = useState(0);
  const [isScrolling, setIsScrolling] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    artistName: '',
    description: '',
    genre: '',
    secondaryGenre: '',
    country: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitResult, setSubmitResult] = useState('');
  const [showGenreDropdown, setShowGenreDropdown] = useState(false);
  const [showSecondaryGenreDropdown, setShowSecondaryGenreDropdown] = useState(false);
  const [showCountryDropdown, setShowCountryDropdown] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const sections = ['HOME'];
      
  const artists = [
    { name: 'Tuadroi', url: 'https://open.spotify.com/artist/tuadroi' },
    { name: 'CRYSTAL DREAMS', url: 'https://open.spotify.com/artist/example3' },
    { name: 'DARK MATTER', url: 'https://open.spotify.com/artist/example4' },
    { name: 'SYNTH WAVE', url: 'https://open.spotify.com/artist/example5' },
    { name: 'ELECTRIC SOUL', url: 'https://open.spotify.com/artist/example6' },
    { name: 'BASS HUNTER', url: 'https://open.spotify.com/artist/example7' },
    { name: 'DIGITAL GHOST', url: 'https://open.spotify.com/artist/example8' },
    { name: 'NEON NIGHTS', url: 'https://open.spotify.com/artist/example9' },
    { name: 'CYBER PUNK', url: 'https://open.spotify.com/artist/example10' }
  ];

  const genres = [
    "Pop", "Rock", "Rock & Roll", "Hip Hop", "R&B", "Country", "Jazz",
    "Blues", "Classical", "Reggae", "Metal", "Folk", "Soul", "Punk",
    "Latin", "Dancehall", "Trap", "K-Pop", "Gospel", "Electronic", "Disco",
    "Alternative", "Indie", "World"
  ];


  const countries = [
    "Albania", "Algeria", "Andorra", "Angola", "Antigua and Barbuda",
    "Argentina", "Armenia", "Australia", "Austria", "Azerbaijan", "Bahamas",
    "Bahrain", "Bangladesh", "Barbados", "Belarus", "Belgium", "Belize", "Benin",
    "Bhutan", "Bolivia", "Bosnia and Herzegovina", "Botswana", "Brazil", "Brunei",
    "Bulgaria", "Burkina Faso", "Burundi", "Cambodia", "Cameroon", "Canada",
    "Cape Verde", "Central African Republic", "Chad", "Chile", "China", "Colombia",
    "Comoros", "Costa Rica", "Croatia", "Czech Republic", "Denmark", "Djibouti",
    "Dominica", "Dominican Republic", "Ecuador", "Egypt", "El Salvador",
    "Equatorial Guinea", "Eritrea", "Estonia", "Eswatini", "Ethiopia", "Fiji",
    "Finland", "France", "Gabon", "Gambia", "Georgia", "Germany", "Ghana",
    "Greece", "Grenada", "Guatemala", "Guinea", "Guinea-Bissau", "Guyana", "Haiti",
    "Honduras", "Hungary", "Iceland", "India", "Indonesia", "Ireland", "Israel",
    "Italy", "Jamaica", "Japan", "Jordan", "Kazakhstan", "Kenya", "Kiribati",
    "Kuwait", "Kyrgyzstan", "Laos", "Latvia", "Lebanon", "Lesotho", "Liberia",
    "Libya", "Liechtenstein", "Lithuania", "Luxembourg", "Madagascar", "Malawi",
    "Malaysia", "Maldives", "Mali", "Malta", "Marshall Islands", "Mauritania",
    "Mauritius", "Mexico", "Micronesia", "Moldova", "Monaco", "Mongolia",
    "Montenegro", "Morocco", "Mozambique", "Myanmar", "Namibia", "Nauru", "Nepal",
    "Netherlands", "New Zealand", "Nicaragua", "Niger", "Nigeria", "Norway", "Oman",
    "Pakistan", "Palau", "Panama", "Paraguay", "Peru", "Philippines", "Poland",
    "Portugal", "Qatar", "Romania", "Rwanda", "Saint Kitts and Nevis", "Saint Lucia",
    "Saint Vincent and the Grenadines", "Samoa", "San Marino", "Sao Tome and Principe",
    "Saudi Arabia", "Senegal", "Serbia", "Seychelles", "Sierra Leone", "Singapore",
    "Slovakia", "Slovenia", "Solomon Islands", "Somalia", "South Africa",
    "South Korea", "South Sudan", "Spain", "Sri Lanka", "Suriname", "Sweden",
    "Switzerland", "Taiwan", "Tajikistan", "Tanzania", "Thailand", "Timor-Leste",
    "Togo", "Tonga", "Trinidad and Tobago", "Tunisia", "Turkey", "Turkmenistan",
    "Tuvalu", "Uganda", "Ukraine", "United Arab Emirates", "United Kingdom",
    "United States", "Uruguay", "Uzbekistan", "Vanuatu", "Vatican City", "Vietnam",
    "Zambia", "Zimbabwe"
  ];

  
  const validateEmail = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const validateStep = (step) => {
    switch (step) {
      case 1:
        return formData.firstName.trim() && formData.lastName.trim() && formData.email.trim() && validateEmail(formData.email);
      case 2:
        return formData.artistName.trim() && formData.description.trim();
      case 3:
        return formData.genre.trim() && formData.secondaryGenre.trim() && formData.country.trim();
      default:
        return false;
    }
  };

  const handleNext = () => {
    if (validateStep(currentStep)) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleBack = () => {
    setCurrentStep(currentStep - 1);
  };

  const handleSubmit = async () => {
    if (!validateStep(3)) return;

    setIsSubmitting(true);
    setSubmitResult("Sending...");

    const submitFormData = new FormData();
    submitFormData.append("access_key", "0d7ef779-8fa8-46ee-80ac-2147357e2482");
    submitFormData.append("firstName", formData.firstName);
    submitFormData.append("lastName", formData.lastName);
    submitFormData.append("email", formData.email);
    submitFormData.append("artistName", formData.artistName);
    submitFormData.append("description", formData.description);
    submitFormData.append("genre", formData.genre);
    submitFormData.append("secondaryGenre", formData.secondaryGenre);
    submitFormData.append("country", formData.country);

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: submitFormData
      });

      const data = await response.json();

      if (data.success) {
        setSubmitResult("Application Submitted Successfully!");
        setIsSubmitted(true);
        setTimeout(() => {
          setShowModal(false);
          setCurrentStep(1);
          setFormData({
            firstName: '',
            lastName: '',
            email: '',
            artistName: '',
            description: '',
            genre: '',
            secondaryGenre: '',
            country: ''
          });
          setSubmitResult('');
          setIsSubmitted(false);
        }, 2000);
      } else {
        setSubmitResult("Error: " + data.message);
      }
    } catch (error) {
      setSubmitResult("Error submitting form");
    }

    setIsSubmitting(false);
  };

  const handleGenreSelect = (genre, isSecondary = false) => {
    if (isSecondary) {
      setFormData({ ...formData, secondaryGenre: genre });
      setShowSecondaryGenreDropdown(false);
    } else {
      setFormData({ ...formData, genre: genre });
      setShowGenreDropdown(false);
    }
  };

  return (
    <div className="art-container" ref={containerRef}>

      {/* Main content */}
      <div className="sections-container" style={{ transform: `translateY(-${currentSection * 100}vh)` }}>
        
        {/* HOME */}
        <section className="section home-section">
          <div className="home-content">
            <div className="main-logo">
              <span className="nine">9</span>
              <span className="ends">ENDS</span>
            </div>
            <div className="floating-elements">
              <div className="float-1"></div>
              <div className="float-2"></div>
              <div className="float-3"></div>
            </div>
          </div>
        </section>

        {/* ABOUT */}
        <section className="section about-section">
          <div className="section-content">
            <h2 className="section-title about-title">ABOUT</h2>
            <div className="about-content">
              <p className="about-text about-text-1">
                9ENDS is a Canadian independent record label, publisher, and distributor. We focus on releasing and managing music for independent artists across all platforms.
              </p>
              <div className="about-glow-orb"></div>
            </div>
          </div>
        </section>

        {/* ARTISTS */}
        <section className="section artists-section">
          <div className="section-content">
            <h2 className="section-title artists-heading">ARTISTS</h2>
            <div className="artists-list">
              {artists.map((artist, index) => (
                <div 
                  key={artist.name}
                  className={`artist-item ${index === 0 ? 'active' : 'inactive'}`}
                  style={{ animationDelay: `${index * 0.1}s` }}
                  onClick={() => window.open(artist.url, '_blank')}
                >
                  <span className="artist-name">{artist.name}</span>
                  <div className="artist-indicator">
                    <div className="arrow-indicator">↗</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* JOIN THE COLLECTIVE */}
        <section className="section demo-section">
          <div className="section-content">
            <h2 className="section-title">JOIN THE COLLECTIVE</h2>
            <div className="demo-content">
              <button className="demo-button" onClick={() => setShowModal(true)}>
                JOIN THE COLLECTIVE
              </button>
            </div>
          </div>
        </section>

      </div>


      {/* Join Collective Modal */}
      {showModal && (
        <div className="modal-overlay" onClick={(e) => e.target === e.currentTarget && null}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={() => setShowModal(false)}>
              <X size={24} />
            </button>
            
            {!isSubmitted ? (
              <>
                <div className="modal-header">
                  <div className="step-indicator">
                    <span className={currentStep === 1 ? 'active' : ''}>1</span>
                    <span className={currentStep === 2 ? 'active' : ''}>2</span>
                    <span className={currentStep === 3 ? 'active' : ''}>3</span>
                  </div>
                </div>

                {currentStep === 1 && (
                  <div className="form-step">
                    <h4>Personal Information</h4>
                    <div className="form-row">
                      <input
                        type="text"
                        placeholder="First Name"
                        value={formData.firstName}
                        onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                        required
                      />
                      <input
                        type="text"
                        placeholder="Last Name"
                        value={formData.lastName}
                        onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                        required
                      />
                    </div>
                    <input
                      type="email"
                      placeholder="Email Address"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      required
                    />
                    <div className="form-buttons">
                      <button 
                        className={`form-button ${validateStep(1) ? 'active' : ''}`}
                        onClick={handleNext}
                        disabled={!validateStep(1)}
                      >
                        Next
                      </button>
                    </div>
                  </div>
                )}

                {currentStep === 2 && (
                  <div className="form-step">
                    <h4>Introduce Yourself</h4>
                    <input
                      type="text"
                      placeholder="Artist/Band Name"
                      value={formData.artistName}
                      onChange={(e) => setFormData({ ...formData, artistName: e.target.value })}
                      required
                    />
                    <textarea
                      placeholder="Tell us about yourself..."
                      value={formData.description}
                      onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                      required
                    />
                    <div className="form-buttons">
                      <button className="form-button secondary" onClick={handleBack}>
                        Back
                      </button>
                      <button 
                        className={`form-button ${validateStep(2) ? 'active' : ''}`}
                        onClick={handleNext}
                        disabled={!validateStep(2)}
                      >
                        Next
                      </button>
                    </div>
                  </div>
                )}

                {currentStep === 3 && (
                  <div className="form-step">
                    <h4>Your Sound</h4>
                    
                    <div className="dropdown-container">
                      <label>Primary Genre</label>
                      <div className="custom-dropdown">
                        <div 
                          className="dropdown-selected"
                          onClick={() => setShowGenreDropdown(!showGenreDropdown)}
                        >
                          {formData.genre || 'Select Genre'}
                        </div>
                        {showGenreDropdown && (
                          <div className="dropdown-options">
                            {genres.map((genre) => (
                              <div
                                key={genre}
                                className="dropdown-option"
                                onClick={() => handleGenreSelect(genre)}
                              >
                                {genre}
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="dropdown-container">
                      <label>Secondary Genre</label>
                      <div className="custom-dropdown">
                        <div 
                          className="dropdown-selected"
                          onClick={() => setShowSecondaryGenreDropdown(!showSecondaryGenreDropdown)}
                        >
                          {formData.secondaryGenre || 'Select Secondary Genre'}
                        </div>
                        {showSecondaryGenreDropdown && (
                          <div className="dropdown-options">
                            {genres.map((genre) => (
                              <div
                                key={genre}
                                className="dropdown-option"
                                onClick={() => handleGenreSelect(genre, true)}
                              >
                                {genre}
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="dropdown-container">
                      <label>Country</label>
                      <div className="custom-dropdown">
                        <div 
                          className="dropdown-selected"
                          onClick={() => setShowCountryDropdown(!showCountryDropdown)}
                        >
                          {formData.country || 'Select Country'}
                        </div>
                        {showCountryDropdown && (
                          <div className="dropdown-options">
                            {countries.map((country) => (
                              <div
                                key={country}
                                className="dropdown-option"
                                onClick={() => {
                                  setFormData({ ...formData, country: country });
                                  setShowCountryDropdown(false);
                                }}
                              >
                                {country}
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="form-buttons">
                      <button className="form-button secondary" onClick={handleBack}>
                        Back
                      </button>
                      <button 
                        className={`form-button submit ${validateStep(3) ? 'active' : ''}`}
                        onClick={handleSubmit}
                        disabled={!validateStep(3) || isSubmitting}
                      >
                        {isSubmitting ? 'Submitting...' : 'Join Collective'}
                      </button>
                    </div>
                  </div>
                )}
              </>
            ) : (
              <div className="success-screen">
                <div className="success-checkmark">
                  <Check size={80} />
                </div>
                <h3>Welcome to 9ENDS</h3>
                <p>Your application has been submitted successfully!</p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default App;