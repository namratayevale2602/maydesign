import React, { useEffect, useState, useRef } from "react";
import { motion } from "framer-motion";
import { fadeIn, staggerContainer } from "../../../utils/motion";
import CountUp from "react-countup";
import {
  FaFacebookF,
  FaTwitter,
  FaLinkedinIn,
  FaInstagram,
  FaMapMarkerAlt,
  FaPhoneAlt,
  FaEnvelope,
  FaClock,
  FaAward,
  FaProjectDiagram,
  FaUserTie,
} from "react-icons/fa";

const ContactUsPage = () => {
  const [isVisible, setIsVisible] = useState(false);
  const statsRef = useRef(null);

  const socialIcons = [
    {
      icon: FaFacebookF,
      label: "Facebook",
      url: "#",
      color: "hover:bg-blue-600",
    },
    { icon: FaTwitter, label: "Twitter", url: "#", color: "hover:bg-blue-400" },
    {
      icon: FaLinkedinIn,
      label: "LinkedIn",
      url: "#",
      color: "hover:bg-blue-700",
    },
    {
      icon: FaInstagram,
      label: "Instagram",
      url: "#",
      color: "hover:bg-pink-600",
    },
  ];

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
    project_type: "",
    budget: "",
  });

  const [submitStatus, setSubmitStatus] = useState(null);
  const [submitError, setSubmitError] = useState(null);

  const projectTypes = [
    "Residential Architecture",
    "Commercial Buildings",
    "Industrial Facilities",
    "Hospitality Design",
    "Institutional Projects",
    "Landscape Architecture",
    "Interior Design",
    "Urban Planning",
    "Renovation",
    "Other",
  ];

  const budgetRanges = [
    "Under $50,000",
    "$50,000 - $100,000",
    "$100,000 - $500,000",
    "$500,000 - $1M",
    "$1M - $5M",
    "Over $5M",
  ];

  const stats = [
    {
      icon: FaAward,
      number: 25,
      suffix: "+",
      label: "Awards Won",
      duration: 3,
    },
    {
      icon: FaProjectDiagram,
      number: 150,
      suffix: "+",
      label: "Projects Completed",
      duration: 4,
    },
    {
      icon: FaUserTie,
      number: 15,
      suffix: "+",
      label: "Years Experience",
      duration: 2,
    },
    {
      icon: FaMapMarkerAlt,
      number: 8,
      suffix: "",
      label: "Countries Served",
      duration: 3,
    },
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.3 }
    );

    if (statsRef.current) {
      observer.observe(statsRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitStatus("sending");
    setSubmitError(null);

    try {
      const response = await fetch(
        "http://127.0.0.1:8000/api/v1/createcontact",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      const result = await response.json();

      if (result.success) {
        setSubmitStatus("success");
        setFormData({
          name: "",
          email: "",
          phone: "",
          subject: "",
          message: "",
          project_type: "",
          budget: "",
        });
      } else {
        setSubmitStatus("error");
        setSubmitError(
          result.message || "Failed to send message. Please try again."
        );
      }
    } catch (err) {
      setSubmitStatus("error");
      setSubmitError(
        "Network error. Please check your connection and try again."
      );
    }
  };

  return (
    <motion.div
      initial="hidden"
      whileInView="show"
      viewport={{ once: true }}
      variants={staggerContainer}
      className="min-h-screen bg-cream-50"
    >
      {/* Hero Section with Architectural Background */}
      <section className="relative  py-80 lg:h-screen/2 flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1487958449943-2429e8be8625?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
            alt="Architectural Design"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-burnt-orange/80 to-gray-900/80"></div>
        </div>

        <motion.div
          variants={fadeIn("up", "spring", 0.5, 1)}
          className="relative text-center text-white px-4 max-w-4xl"
        >
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Let's Create Something Amazing
          </h1>
          <p className="text-xl md:text-2xl mb-8">
            Get in touch with our architectural team to bring your vision to
            life
          </p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-white text-[#BE5103] px-8 py-4 rounded-lg text-lg font-semibold transition-colors hover:bg-gray-100"
            onClick={() =>
              document
                .getElementById("contact-form")
                .scrollIntoView({ behavior: "smooth" })
            }
          >
            Start Your Project
          </motion.button>
        </motion.div>
      </section>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Information */}
          <motion.div
            variants={fadeIn("right", "spring", 0.3, 1)}
            className="space-y-8"
          >
            <div className="bg-white rounded-2xl shadow-xl p-8 border-l-4 border-burnt-orange">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">
                Get In Touch
              </h2>

              <div className="space-y-6">
                <div className="flex items-start space-x-4 group">
                  <div className="bg-burnt-orange bg-opacity-10 p-3 rounded-full group-hover:scale-110 transition-transform">
                    <FaMapMarkerAlt className="text-white text-xl" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 text-lg">
                      Studio Location
                    </h3>
                    <p className="text-gray-600">
                      123 Architectural Avenue
                      <br />
                      Design District, New York, NY 10001
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4 group">
                  <div className="bg-burnt-orange bg-opacity-10 p-3 rounded-full group-hover:scale-110 transition-transform">
                    <FaPhoneAlt className="text-white text-xl" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 text-lg">
                      Phone
                    </h3>
                    <p className="text-gray-600">
                      +1 (555) 123-4567
                      <br />
                      +1 (555) 123-4568
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4 group">
                  <div className="bg-burnt-orange bg-opacity-10 p-3 rounded-full group-hover:scale-110 transition-transform">
                    <FaEnvelope className="text-white text-xl" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 text-lg">
                      Email
                    </h3>
                    <p className="text-gray-600">
                      studio@maydesigns.com
                      <br />
                      info@maydesigns.com
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4 group">
                  <div className="bg-burnt-orange bg-opacity-10 p-3 rounded-full group-hover:scale-110 transition-transform">
                    <FaClock className="text-white text-xl" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 text-lg">
                      Business Hours
                    </h3>
                    <p className="text-gray-600">
                      Monday - Friday: 9:00 AM - 6:00 PM
                      <br />
                      Saturday: 10:00 AM - 4:00 PM
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Social Media */}
            <div className="bg-burnt-orange rounded-2xl shadow-xl p-8 text-white">
              <h3 className="text-2xl font-bold mb-4">Connect With Us</h3>
              <p className="text-gray-200 mb-6">
                Follow our latest projects and architectural insights
              </p>
              <div className="flex space-x-4">
                {socialIcons.map(({ icon: Icon, label, url, color }, index) => (
                  <motion.a
                    key={index}
                    href={url}
                    whileHover={{ scale: 1.1, y: -5 }}
                    whileTap={{ scale: 0.95 }}
                    className={`bg-white/10 backdrop-blur-sm p-4 rounded-xl ${color} transition-all duration-300 transform hover:shadow-lg`}
                    title={label}
                  >
                    <Icon className="text-2xl" />
                  </motion.a>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            variants={fadeIn("left", "spring", 0.3, 1)}
            id="contact-form"
          >
            <div className="bg-white rounded-2xl shadow-xl p-8 border-t-4 border-burnt-orange">
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold text-gray-900 mb-2">
                  Start Your Architectural Journey
                </h2>
                <p className="text-gray-600">
                  Fill out the form below and we'll schedule a consultation
                  within 24 hours
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-burnt-orange focus:border-transparent transition-all bg-gray-50"
                      required
                      placeholder="John Doe"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-burnt-orange focus:border-transparent transition-all bg-gray-50"
                      required
                      placeholder="john@example.com"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-burnt-orange focus:border-transparent transition-all bg-gray-50"
                      placeholder="+1 (555) 123-4567"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Project Type *
                    </label>
                    <select
                      name="project_type"
                      value={formData.project_type}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-burnt-orange focus:border-transparent transition-all bg-gray-50"
                      required
                    >
                      <option value="">Select Project Type</option>
                      {projectTypes.map((type, index) => (
                        <option key={index} value={type}>
                          {type}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Estimated Budget
                  </label>
                  <select
                    name="budget"
                    value={formData.budget}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-burnt-orange focus:border-transparent transition-all bg-gray-50"
                  >
                    <option value="">Select Budget Range</option>
                    {budgetRanges.map((range, index) => (
                      <option key={index} value={range}>
                        {range}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Project Details *
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows={6}
                    className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-burnt-orange focus:border-transparent transition-all bg-gray-50"
                    placeholder="Describe your project vision, requirements, timeline, and any specific needs..."
                    required
                  ></textarea>
                </div>

                <motion.button
                  type="submit"
                  disabled={submitStatus === "sending"}
                  whileHover={{ scale: submitStatus === "sending" ? 1 : 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full bg-burnt-orange hover:from-orange-600 hover:to-burnt-orange text-white font-semibold py-4 px-6 rounded-lg transition-all duration-300 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {submitStatus === "sending" ? (
                    <span className="flex items-center justify-center">
                      <svg
                        className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        ></circle>
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        ></path>
                      </svg>
                      Processing Your Request...
                    </span>
                  ) : (
                    "Schedule Free Consultation"
                  )}
                </motion.button>
              </form>

              {/* Status Messages */}
              {submitStatus === "success" && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-6 p-4 bg-green-50 border border-green-200 rounded-lg"
                >
                  <div className="flex items-center">
                    <svg
                      className="w-5 h-5 text-green-500 mr-3"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <div>
                      <p className="text-green-700 font-medium">
                        Thank you for your inquiry!
                      </p>
                      <p className="text-green-600 text-sm mt-1">
                        We've received your project details and will contact you
                        within 24 hours to schedule your free consultation.
                      </p>
                    </div>
                  </div>
                </motion.div>
              )}

              {submitStatus === "error" && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-6 p-4 bg-red-50 border border-red-200 rounded-lg"
                >
                  <div className="flex items-center">
                    <svg
                      className="w-5 h-5 text-red-500 mr-3"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <span className="text-red-700 font-medium">
                      {submitError}
                    </span>
                  </div>
                </motion.div>
              )}
            </div>
          </motion.div>
        </div>
      </div>

      {/* Map Section */}
      <motion.section
        variants={fadeIn("up", "spring", 0.5, 1)}
        className="bg-cream-50 py-16"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Visit Our Studio
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Located in the heart of the design district, our studio welcomes
              clients for personalized consultations
            </p>
          </div>

          <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
            <div className="h-96 w-full">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3023.9503398796587!2d-74.00594948459426!3d40.71272807933185!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c25a1e1c2e0b9f%3A0x4c2a8a5b5a5b5a5b!2sNew%20York%2C%20NY%2C%20USA!5e0!3m2!1sen!2s!4v1234567890"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                title="MayDesigns Architectural Studio Location"
              ></iframe>
            </div>
          </div>
        </div>{" "}
        {/* Stats Section */}
        <section ref={statsRef} className="py-16 bg-cream-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {stats.map((stat, index) => (
                <motion.div
                  key={index}
                  variants={fadeIn("up", "spring", index * 0.2, 1)}
                  className="text-center group"
                >
                  <div className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
                    <div className="bg-burnt-orange bg-opacity-10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                      <stat.icon className="text-white text-2xl" />
                    </div>
                    <div className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
                      {isVisible && (
                        <CountUp
                          end={stat.number}
                          suffix={stat.suffix}
                          duration={stat.duration}
                          className="text-burnt-orange"
                        />
                      )}
                    </div>
                    <div className="text-gray-600 font-medium">
                      {stat.label}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
        <style jsx>{`
          .bg-cream-50 {
            background-color: #fefaf6;
          }
          .border-cream-200 {
            border-color: #fae8d8;
          }
          .text-burnt-orange {
            color: #be5103;
          }
          .bg-burnt-orange {
            background-color: #be5103;
          }
          .border-burnt-orange {
            border-color: #be5103;
          }
        `}</style>
      </motion.section>
    </motion.div>
  );
};

export default ContactUsPage;
