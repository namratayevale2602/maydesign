import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Menu,
  X,
  ChevronDown,
  Home,
  Users,
  Folder,
  BookOpen,
  Phone,
  ChevronRight,
} from "lucide-react";
import { LogoBlack, LogoWhite } from "../../assets";

// Dummy data for MAY Designs
const mayDesignsData = {
  company: {
    name: "MAY Designs",
    logo: LogoBlack,
  },
  navigation: [
    { label: "Home", path: "/", icon: <Home className="h-4 w-4 mr-2" /> },
    {
      label: "About",
      path: "/about-us",
      icon: <Users className="h-4 w-4 mr-2" />,
      subItems: [
        { name: "Our Story", href: "/about-us" },
        { name: "Team", href: "/about-us" },
        { name: "Mission & Vision", href: "/about-us" },
      ],
    },
    {
      label: "Projects",
      path: "/projects",
      icon: <Folder className="h-4 w-4 mr-2" />,
      subItems: [
        {
          name: "Architecture",
          href: "/projects/architecture",
        },
        {
          name: "Interior Design",
          href: "/projects/interior",
          subItems: [
            { name: "Residential", href: "/projects/interior/residential" },
            { name: "Commercial", href: "/projects/interior/commercial" },
          ],
        },
        {
          name: "Landscape",
          href: "/projects/landscape",
        },
      ],
    },
    {
      label: "Blog",
      path: "/blogs",
      icon: <BookOpen className="h-4 w-4 mr-2" />,
    },
    {
      label: "Contact",
      path: "/contact-us",
      icon: <Phone className="h-4 w-4 mr-2" />,
    },
  ],
};

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(null);
  const [openSubDropdown, setOpenSubDropdown] = useState(null);
  const [scrolled, setScrolled] = useState(false);
  const [hoveredItem, setHoveredItem] = useState(null);
  const [showNav, setShowNav] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  // Scroll effect

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);

      // Mobile scroll behavior
      if (window.innerWidth < 1024) {
        const currentScrollY = window.scrollY;
        if (currentScrollY > lastScrollY && currentScrollY > 50) {
          // Scrolling down
          setShowNav(false);
        } else {
          // Scrolling up
          setShowNav(true);
        }
        setLastScrollY(currentScrollY);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
    if (!isMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  };

  const closeAllMenus = () => {
    setIsMenuOpen(false);
    setOpenDropdown(null);
    setOpenSubDropdown(null);
    document.body.style.overflow = "auto";
  };

  const handleDropdownToggle = (dropdown) => (e) => {
    e.preventDefault();
    e.stopPropagation();
    setOpenDropdown(openDropdown === dropdown ? null : dropdown);
    setOpenSubDropdown(null);
  };

  const handleSubDropdownToggle = (subDropdown) => (e) => {
    e.preventDefault();
    e.stopPropagation();
    setOpenSubDropdown(openSubDropdown === subDropdown ? null : subDropdown);
  };

  const handleMobileNavItemClick = (item, e) => {
    const isChevronClick = e.target.closest(".chevron-container") !== null;

    if (item.subItems && !isChevronClick) {
      window.location.href = item.path;
      closeAllMenus();
    } else if (item.subItems && isChevronClick) {
      e.preventDefault();
      setOpenDropdown(openDropdown === item.label ? null : item.label);
      setOpenSubDropdown(null);
    } else {
      closeAllMenus();
    }
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { y: -20, opacity: 0 },
    show: { y: 0, opacity: 1 },
  };

  return (
    <header className="fixed w-full z-50 font-sans">
      {/* Main Navbar */}
      <motion.nav
        className={`${
          scrolled ? "bg-white shadow-lg" : "bg-transparent"
        } transition-all duration-300`}
        initial={{ padding: "16px 0" }}
        animate={{
          padding: scrolled ? "8px 0" : "16px 0",
          backgroundColor: scrolled
            ? "rgba(255,255,255,0.95)"
            : "rgba(255,255,255,0)",
        }}
        transition={{ type: "tween", ease: "easeInOut" }}
      >
        <div className="container mx-auto px-6 flex justify-between items-center">
          {/* Logo */}
          <motion.a
            href="/"
            className="flex items-center"
            whileHover={{ scale: 1.03 }}
            animate={{ opacity: showNav ? 1 : 0 }}
            transition={{ duration: 0.2 }}
          >
            <motion.img
              src={scrolled ? LogoBlack : LogoBlack}
              alt="Elite Sports Club"
              className={`h-auto ${scrolled ? "w-64" : "w-54"}`}
              transition={{ duration: 0.3 }}
            />
          </motion.a>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-1">
            {mayDesignsData.navigation.map((item) => (
              <div
                key={item.label}
                className="relative"
                onMouseEnter={() => {
                  setHoveredItem(item.label);
                  if (item.subItems) setOpenDropdown(item.label);
                }}
                onMouseLeave={() => {
                  setHoveredItem(null);
                  if (!openSubDropdown) setOpenDropdown(null);
                }}
              >
                {/* Main nav item */}
                <motion.a
                  href={item.path}
                  className={`flex items-center ${
                    scrolled ? "text-gray-800" : "text-gray-800"
                  } hover:text-[#BF5700] transition-colors px-4 py-2 font-medium uppercase tracking-wider text-sm relative`}
                  whileHover={{ scale: 1.05 }}
                >
                  {item.icon}
                  <span className="whitespace-nowrap">{item.label}</span>
                  {item.subItems && (
                    <span
                      className="chevron-container ml-1"
                      onClick={handleDropdownToggle(item.label)}
                    >
                      <ChevronDown
                        className={`h-3 w-3 transition-transform ${
                          openDropdown === item.label ? "rotate-180" : ""
                        }`}
                      />
                    </span>
                  )}

                  {hoveredItem === item.label && (
                    <motion.div
                      className="absolute bottom-0 left-0 w-full h-0.5 bg-[#BF5700]"
                      layoutId="navUnderline"
                      initial={{ width: 0 }}
                      animate={{ width: "100%" }}
                      transition={{
                        type: "spring",
                        stiffness: 300,
                        damping: 20,
                      }}
                    />
                  )}
                </motion.a>

                {/* First level dropdown */}
                {item.subItems && openDropdown === item.label && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    transition={{ type: "spring", stiffness: 300, damping: 25 }}
                    className="absolute left-0 mt-1 w-64 bg-white rounded-lg shadow-xl z-50 border border-gray-100"
                    onMouseEnter={() => setOpenDropdown(item.label)}
                    onMouseLeave={() => {
                      if (!openSubDropdown) setOpenDropdown(null);
                    }}
                  >
                    <motion.div
                      variants={containerVariants}
                      initial="hidden"
                      animate="show"
                      className="py-2"
                    >
                      {item.subItems.map((subItem) => (
                        <div key={subItem.name} className="relative">
                          <motion.a
                            href={subItem.href}
                            onClick={
                              subItem.subItems
                                ? handleSubDropdownToggle(subItem.name)
                                : undefined
                            }
                            className={`flex items-center justify-between w-full px-4 py-3 text-sm text-gray-700 hover:bg-orange-50 hover:text-[#BF5700] transition-colors border-b border-gray-100 last:border-b-0`}
                            variants={itemVariants}
                            whileHover={{ x: 5 }}
                          >
                            <span>{subItem.name}</span>
                            {subItem.subItems && (
                              <ChevronRight className="h-3 w-3 ml-2" />
                            )}
                          </motion.a>

                          {/* Second level dropdown */}
                          {subItem.subItems &&
                            openSubDropdown === subItem.name && (
                              <motion.div
                                initial={{ opacity: 0, x: 10 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: 10 }}
                                transition={{
                                  type: "spring",
                                  stiffness: 300,
                                  damping: 25,
                                }}
                                className="absolute left-full top-0 ml-1 w-56 bg-white rounded-lg shadow-xl z-50 border border-gray-100"
                                onMouseEnter={() =>
                                  setOpenSubDropdown(subItem.name)
                                }
                                onMouseLeave={() => setOpenSubDropdown(null)}
                              >
                                <motion.div
                                  variants={containerVariants}
                                  initial="hidden"
                                  animate="show"
                                  className="py-2"
                                >
                                  {subItem.subItems.map((nestedItem) => (
                                    <motion.a
                                      key={nestedItem.name}
                                      href={nestedItem.href}
                                      className="flex items-center px-4 py-3 text-sm text-gray-700 hover:bg-orange-50 hover:text-[#BF5700] transition-colors border-b border-gray-100 last:border-b-0"
                                      variants={itemVariants}
                                      whileHover={{ x: 3 }}
                                    >
                                      {nestedItem.name}
                                    </motion.a>
                                  ))}
                                </motion.div>
                              </motion.div>
                            )}
                        </div>
                      ))}
                    </motion.div>
                  </motion.div>
                )}
              </div>
            ))}

            <motion.a
              href="/contact"
              className="ml-4 bg-gradient-to-r from-[#BF5700] to-[#D46B00] hover:from-[#D46B00] hover:to-[#BF5700] text-white px-6 py-2 rounded-lg font-semibold uppercase tracking-wider text-sm shadow-lg hover:shadow-xl transition-all"
              whileHover={{
                scale: 1.05,
                boxShadow: "0 5px 15px rgba(191, 87, 0, 0.4)",
              }}
              whileTap={{ scale: 0.98 }}
            >
              Get Quote
            </motion.a>
          </div>

          {/* Mobile Menu Button */}
          <motion.button
            className={`lg:hidden ${
              scrolled ? "text-gray-800" : "text-gray-800"
            } focus:outline-none`}
            onClick={toggleMenu}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </motion.button>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            transition={{ type: "tween", ease: "easeInOut" }}
            className="fixed inset-0 bg-white z-40 lg:hidden overflow-y-auto pt-20"
          >
            <div className="container mx-auto px-0 py-4 flex justify-end">
              <button
                onClick={closeAllMenus}
                className="text-gray-800 p-2 rounded-full hover:bg-gray-100 transition-colors"
                aria-label="Close menu"
              >
                <X className="h-6 w-6" />
              </button>
            </div>
            <div className="container mx-auto px-6">
              <motion.div
                className="grid gap-1"
                variants={containerVariants}
                initial="hidden"
                animate="show"
              >
                {mayDesignsData.navigation.map((item) => (
                  <motion.div
                    key={item.label}
                    className="border-b border-gray-100"
                    variants={itemVariants}
                  >
                    {item.subItems ? (
                      <>
                        <div className="flex items-center">
                          <a
                            href={item.path}
                            className="flex-1 flex items-center py-4 text-lg text-gray-800 font-semibold"
                            onClick={(e) => handleMobileNavItemClick(item, e)}
                          >
                            {item.icon}
                            <span className="ml-3">{item.label}</span>
                          </a>
                          {item.subItems && (
                            <button
                              onClick={(e) => {
                                e.preventDefault();
                                setOpenDropdown(
                                  openDropdown === item.label
                                    ? null
                                    : item.label
                                );
                                setOpenSubDropdown(null);
                              }}
                              className="p-2 chevron-container"
                            >
                              <ChevronDown
                                className={`h-4 w-4 transition-transform ${
                                  openDropdown === item.label
                                    ? "rotate-180"
                                    : ""
                                }`}
                              />
                            </button>
                          )}
                        </div>
                        <AnimatePresence>
                          {openDropdown === item.label && (
                            <motion.div
                              initial={{ opacity: 0, height: 0 }}
                              animate={{ opacity: 1, height: "auto" }}
                              exit={{ opacity: 0, height: 0 }}
                              className="pl-8 overflow-hidden"
                              transition={{
                                type: "spring",
                                stiffness: 300,
                                damping: 25,
                              }}
                            >
                              {item.subItems.map((subItem) => (
                                <div
                                  key={subItem.name}
                                  className="border-t border-gray-100"
                                >
                                  {subItem.subItems ? (
                                    <>
                                      <div className="flex items-center">
                                        <a
                                          href={subItem.href}
                                          className="flex-1 block py-3 text-base text-gray-700"
                                          onClick={(e) => e.preventDefault()}
                                        >
                                          {subItem.name}
                                        </a>
                                        <button
                                          onClick={(e) => {
                                            e.preventDefault();
                                            setOpenSubDropdown(
                                              openSubDropdown === subItem.name
                                                ? null
                                                : subItem.name
                                            );
                                          }}
                                          className="p-2"
                                        >
                                          <ChevronRight
                                            className={`h-4 w-4 transition-transform ${
                                              openSubDropdown === subItem.name
                                                ? "rotate-90"
                                                : ""
                                            }`}
                                          />
                                        </button>
                                      </div>
                                      <AnimatePresence>
                                        {openSubDropdown === subItem.name && (
                                          <motion.div
                                            initial={{ opacity: 0, height: 0 }}
                                            animate={{
                                              opacity: 1,
                                              height: "auto",
                                            }}
                                            exit={{ opacity: 0, height: 0 }}
                                            className="pl-6 overflow-hidden"
                                            transition={{
                                              type: "spring",
                                              stiffness: 300,
                                              damping: 25,
                                            }}
                                          >
                                            {subItem.subItems.map(
                                              (nestedItem) => (
                                                <a
                                                  key={nestedItem.name}
                                                  href={nestedItem.href}
                                                  className="flex items-center py-2 text-sm text-gray-600 hover:text-[#BF5700] transition-colors border-t border-gray-100"
                                                  onClick={closeAllMenus}
                                                >
                                                  {nestedItem.name}
                                                </a>
                                              )
                                            )}
                                          </motion.div>
                                        )}
                                      </AnimatePresence>
                                    </>
                                  ) : (
                                    <a
                                      href={subItem.href}
                                      className="block py-3 text-sm text-gray-600 hover:text-[#BF5700] transition-colors"
                                      onClick={closeAllMenus}
                                    >
                                      {subItem.name}
                                    </a>
                                  )}
                                </div>
                              ))}
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </>
                    ) : (
                      <a
                        href={item.path}
                        className="flex items-center py-4 text-lg text-gray-800 font-semibold"
                        onClick={closeAllMenus}
                      >
                        {item.icon}
                        <span className="ml-3">{item.label}</span>
                      </a>
                    )}
                  </motion.div>
                ))}
              </motion.div>

              <motion.div
                className="mt-8"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                <a
                  href="/contact"
                  className="block w-full bg-gradient-to-r from-[#BF5700] to-[#D46B00] text-white px-6 py-4 rounded-lg font-semibold uppercase tracking-wider text-center text-lg shadow-lg"
                  onClick={closeAllMenus}
                >
                  Get Quote
                </a>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Navbar;
