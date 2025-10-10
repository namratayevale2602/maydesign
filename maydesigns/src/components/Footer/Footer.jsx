import React from "react";
import { motion } from "framer-motion";
import {
  FaMapMarkerAlt,
  FaPhone,
  FaEnvelope,
  FaClock,
  FaFacebookF,
  FaInstagram,
  FaTwitter,
  FaLinkedinIn,
  FaPinterestP,
} from "react-icons/fa";

// Dummy data for footer
const footerData = {
  company: {
    name: "MAY Designs",
    description:
      "Transforming spaces with innovative architecture and interior design solutions that reflect your unique vision and lifestyle.",
    year: new Date().getFullYear(),
  },
  contact: {
    address: [
      "123 Design Street",
      "Creative District",
      "Mumbai, Maharashtra 400001",
    ],
    phone: "+91 98765 43210",
    whatsapp: "+91 98765 43210",
    email: "hello@maydesigns.com",
    hours: {
      office: "Mon - Fri: 9:00 AM - 6:00 PM",
      weekend: "Sat: 10:00 AM - 4:00 PM",
    },
  },
  quickLinks: [
    { name: "Home", href: "/" },
    { name: "About Us", href: "/about" },
    { name: "Projects", href: "/projects" },
    { name: "Services", href: "/services" },
    { name: "Blog", href: "/blog" },
    { name: "Contact", href: "/contact" },
  ],
  services: [
    { name: "Architectural Design", href: "/services/architecture" },
    { name: "Interior Design", href: "/services/interior" },
    { name: "Landscape Design", href: "/services/landscape" },
    { name: "Space Planning", href: "/services/space-planning" },
    { name: "3D Visualization", href: "/services/3d-visualization" },
    { name: "Project Management", href: "/services/project-management" },
  ],
  socialLinks: [
    {
      platform: "facebook",
      url: "https://facebook.com/maydesigns",
      icon: FaFacebookF,
      color: "#3b5998",
    },
    {
      platform: "instagram",
      url: "https://instagram.com/maydesigns",
      icon: FaInstagram,
      color: "#E1306C",
    },
    {
      platform: "twitter",
      url: "https://twitter.com/maydesigns",
      icon: FaTwitter,
      color: "#1DA1F2",
    },
    {
      platform: "linkedin",
      url: "https://linkedin.com/company/maydesigns",
      icon: FaLinkedinIn,
      color: "#0077B5",
    },
    {
      platform: "pinterest",
      url: "https://pinterest.com/maydesigns",
      icon: FaPinterestP,
      color: "#BD081C",
    },
  ],
};

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const socialLinkVariants = {
    hover: {
      scale: 1.1,
      y: -2,
      transition: { duration: 0.2 },
    },
    tap: { scale: 0.95 },
  };

  return (
    <footer className="bg-gray-900 text-white relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, white 1px, transparent 0)`,
            backgroundSize: "20px 20px",
          }}
        />
      </div>

      <div className="container mx-auto px-6 py-16 relative z-10">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* Company Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-1"
          >
            <h3 className="text-2xl font-bold text-orange-400 mb-4">
              {footerData.company.name}
            </h3>
            <p className="text-gray-300 mb-6 leading-relaxed">
              {footerData.company.description}
            </p>

            {/* Social Links */}
            <div className="flex space-x-3">
              {footerData.socialLinks.map((social) => {
                const IconComponent = social.icon;
                return (
                  <motion.a
                    key={social.platform}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    variants={socialLinkVariants}
                    whileHover="hover"
                    whileTap="tap"
                    className="bg-gray-800 hover:bg-orange-500 p-2 rounded-full transition-colors"
                    style={{ color: social.color }}
                  >
                    <IconComponent className="h-5 w-5" />
                  </motion.a>
                );
              })}
            </div>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <h4 className="text-lg font-semibold text-orange-300 mb-4">
              Quick Links
            </h4>
            <ul className="space-y-2">
              {footerData.quickLinks.map((link) => (
                <li key={link.name}>
                  <motion.a
                    href={link.href}
                    whileHover={{ x: 5, color: "#FB923C" }}
                    className="text-gray-300 hover:text-orange-400 transition-colors block py-1"
                  >
                    {link.name}
                  </motion.a>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Services */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h4 className="text-lg font-semibold text-orange-300 mb-4">
              Our Services
            </h4>
            <ul className="space-y-2">
              {footerData.services.map((service) => (
                <li key={service.name}>
                  <motion.a
                    href={service.href}
                    whileHover={{ x: 5, color: "#FB923C" }}
                    className="text-gray-300 hover:text-orange-400 transition-colors block py-1"
                  >
                    {service.name}
                  </motion.a>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <h4 className="text-lg font-semibold text-orange-300 mb-4">
              Contact Info
            </h4>
            <div className="space-y-3">
              <div className="flex items-start space-x-3">
                <FaMapMarkerAlt className="h-5 w-5 text-orange-400 mt-0.5 flex-shrink-0" />
                <div>
                  {footerData.contact.address.map((line, index) => (
                    <p key={index} className="text-gray-300 text-sm">
                      {line}
                    </p>
                  ))}
                </div>
              </div>

              <div className="flex items-center space-x-3">
                <FaPhone className="h-5 w-5 text-orange-400" />
                <a
                  href={`tel:${footerData.contact.phone}`}
                  className="text-gray-300 hover:text-orange-400 transition-colors"
                >
                  {footerData.contact.phone}
                </a>
              </div>

              <div className="flex items-center space-x-3">
                <FaEnvelope className="h-5 w-5 text-orange-400" />
                <a
                  href={`mailto:${footerData.contact.email}`}
                  className="text-gray-300 hover:text-orange-400 transition-colors"
                >
                  {footerData.contact.email}
                </a>
              </div>

              <div className="flex items-start space-x-3">
                <FaClock className="h-5 w-5 text-orange-400 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-gray-300 text-sm">
                    {footerData.contact.hours.office}
                  </p>
                  <p className="text-gray-300 text-sm">
                    {footerData.contact.hours.weekend}
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Newsletter Subscription */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="bg-gradient-to-r from-orange-500 to-amber-500 rounded-lg p-8 mb-12"
        >
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="mb-4 md:mb-0 md:mr-6">
              <h4 className="text-xl font-bold text-white mb-2">
                Stay Updated
              </h4>
              <p className="text-amber-100">
                Subscribe to our newsletter for the latest design trends and
                projects
              </p>
            </div>
            <div className="flex w-full md:w-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="px-4 py-3 rounded-l-lg w-full md:w-64 focus:outline-none focus:ring-2 focus:ring-orange-300"
              />
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-gray-900 text-white px-6 py-3 rounded-r-lg font-semibold hover:bg-gray-800 transition-colors"
              >
                Subscribe
              </motion.button>
            </div>
          </div>
        </motion.div>

        {/* Bottom Bar */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="border-t border-gray-700 pt-8 flex flex-col md:flex-row justify-between items-center"
        >
          <p className="text-gray-400 text-sm mb-4 md:mb-0">
            © {currentYear} {footerData.company.name}. All rights reserved.
          </p>
          <div className="flex space-x-6 text-sm text-gray-400">
            <motion.a
              href="/privacy"
              whileHover={{ color: "#FB923C" }}
              className="hover:text-orange-400 transition-colors"
            >
              Privacy Policy
            </motion.a>
            <motion.a
              href="/terms"
              whileHover={{ color: "#FB923C" }}
              className="hover:text-orange-400 transition-colors"
            >
              Terms of Service
            </motion.a>
            <motion.a
              href="/sitemap"
              whileHover={{ color: "#FB923C" }}
              className="hover:text-orange-400 transition-colors"
            >
              Sitemap
            </motion.a>
          </div>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;
