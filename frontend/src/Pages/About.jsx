import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { FaUsers, FaBullseye, FaRocket, FaSmile, FaHeart, FaTwitter, FaInstagram, FaFacebook, FaLinkedin, FaEnvelope } from "react-icons/fa";

const teamMembers = [
  {
    name: "Nimish",
    // role: "Backend Developer",
    bio: "Nimish architects robust backend systems with a passion for performance.",
    twitter: "https://twitter.com/nimish_dev",
    linkedin: "https://linkedin.com/in/nimish",
    email: "nimish@example.com",
  },
  {
    name: "Nipam",
    // role: "Frontend Developer & UI/UX",
    bio: "Nipam designs seamless interfaces with expertise in React and Power BI.",
    twitter: "https://twitter.com/nipam_dev",
    linkedin: "https://linkedin.com/in/nipam",
    email: "nipam@example.com",
  },
  {
    name: "Hetvi",
    // role: "Frontend Developer",
    bio: "Hetvi creates visually stunning and intuitive user experiences.",
    twitter: "https://twitter.com/hetvi_dev",
    linkedin: "https://linkedin.com/in/hetvi",
    email: "hetvi@example.com",
  },
  {
    name: "Zakir Hussain",
    // role: "Full Stack Developer",
    bio: "Zakir masters both frontend and backend to deliver end-to-end solutions.",
    twitter: "https://twitter.com/zakir_dev",
    linkedin: "https://linkedin.com/in/zakirhussain",
    email: "zakir@example.com",
  },
  {
    name: "Keval",
    // role: "DevOps Engineer",
    bio: "Keval ensures flawless deployments with cutting-edge DevOps practices.",
    twitter: "https://twitter.com/keval_dev",
    linkedin: "https://linkedin.com/in/keval",
    email: "keval@example.com",
  },
  {
    name: "Dhruv",
    // role: "Backend Developer",
    bio: "Dhruv optimizes databases with deep expertise in SQL and MongoDB.",
    twitter: "https://twitter.com/dhruv_dev",
    linkedin: "https://linkedin.com/in/dhruv",
    email: "dhruv@example.com",
  },
];

const testimonials = [
  { name: "Alice Johnson", comment: "An exquisite dining experience delivered with elegance." },
  { name: "Bob Smith", comment: "Unparalleled service and quality—truly premium." },
  { name: "Charlie Brown", comment: "A sophisticated touch to every meal!" },
];

const AboutUs = () => {
  const [selectedMember, setSelectedMember] = useState(null);
  const [happyCustomers, setHappyCustomers] = useState(10000);
  const [restaurantsPartnered, setRestaurantsPartnered] = useState(500);
  const [deliveriesCompleted, setDeliveriesCompleted] = useState(1000000);
  const [currentTestimonials, setCurrentTestimonials] = useState(testimonials.slice(0, 3));

  // Dynamic Statistics
  useEffect(() => {
    const interval = setInterval(() => {
      setHappyCustomers((prev) => prev + Math.floor(Math.random() * 100));
      setRestaurantsPartnered((prev) => prev + Math.floor(Math.random() * 10));
      setDeliveriesCompleted((prev) => prev + Math.floor(Math.random() * 1000));
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  // Rotating Testimonials
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTestimonials((prev) => {
        const nextIndex = (testimonials.indexOf(prev[2]) + 1) % testimonials.length;
        return [
          testimonials[nextIndex],
          testimonials[(nextIndex + 1) % testimonials.length],
          testimonials[(nextIndex + 2) % testimonials.length],
        ];
      });
    }, 6000);
    return () => clearInterval(interval);
  }, []);

  const openProfile = (member) => setSelectedMember(member);
  const closeProfile = () => setSelectedMember(null);

  return (
    <div className="bg-gradient-to-b from-blue-50 to-white text-gray-900 min-h-screen">
      {/* Header Section */}
      <section className="bg-gradient-to-r from-blue-900 to-blue-700 text-white py-24 text-center relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(255,255,255,0.1),_transparent_70%)] opacity-50"></div>
        <motion.h1
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="text-5xl md:text-6xl font-extrabold tracking-tight relative z-10"
        >
          About MunchMate
        </motion.h1>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="mt-6 text-xl max-w-3xl mx-auto font-light relative z-10"
        >
          Elevating food delivery to an art form—where luxury meets convenience.
        </motion.p>
      </section>

      {/* Mission & Values Section */}
      <section className="py-24 max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-3 gap-12">
          {[
            { title: "Our Vision", icon: FaBullseye, text: "Crafting a world-class food delivery experience with precision." },
            { title: "Our Promise", icon: FaRocket, text: "Swift, impeccable service tailored to your desires." },
            { title: "Our People", icon: FaUsers, text: "A team of visionaries shaping the future of dining." },
          ].map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              className="bg-white/80 backdrop-blur-md p-8 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 text-center border border-blue-100"
            >
              <item.icon className="text-blue-800 text-5xl mb-6 mx-auto" />
              <h2 className="text-2xl font-semibold text-blue-900">{item.title}</h2>
              <p className="mt-4 text-gray-600 font-light">{item.text}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Statistics Section */}
      <section className="bg-gradient-to-r from-blue-800 to-blue-600 text-white py-24">
        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-3 gap-12 text-center">
          {[
            { number: happyCustomers.toLocaleString(), label: "Satisfied Clients", icon: FaSmile },
            { number: restaurantsPartnered.toLocaleString(), label: "Elite Partners", icon: FaHeart },
            { number: deliveriesCompleted.toLocaleString(), label: "Flawless Deliveries", icon: FaRocket },
          ].map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
            >
              <stat.icon className="text-5xl mb-6 mx-auto opacity-80" />
              <h2 className="text-4xl font-bold tracking-wide">{stat.number}</h2>
              <p className="mt-3 text-lg font-light">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Team Section */}
      <section className="py-24 max-w-7xl mx-auto px-6">
        <motion.h2
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
          className="text-5xl font-extrabold text-center text-blue-900 mb-16 tracking-tight"
        >
          Our Esteemed Team
        </motion.h2>
        <div className="grid md:grid-cols-3 gap-12">
          {teamMembers.map((member, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.15 }}
              className="bg-white/90 backdrop-blur-md p-8 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 text-center border border-blue-100"
            >
              <div className="w-32 h-32 rounded-full mx-auto mb-6 border-4 border-blue-900/50 shadow-md bg-blue-100 flex items-center justify-center">
                <span className="text-4xl font-bold text-blue-900">
                  {member.name.charAt(0)}
                </span>
              </div>
              <h3 className="text-2xl font-semibold text-blue-900">{member.name}</h3>
              <p className="text-blue-700 font-light">{member.role}</p>
              <button
                onClick={() => openProfile(member)}
                className="mt-6 px-6 py-2 bg-blue-900 text-white rounded-full hover:bg-blue-800 transition-all duration-300 shadow-md"
              >
                Discover More
              </button>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Profile Modal */}
      {selectedMember && (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4 }}
            className="bg-white/95 backdrop-blur-lg p-10 rounded-3xl shadow-2xl max-w-md w-full relative border border-blue-200/50"
          >
            <button
              onClick={closeProfile}
              className="absolute top-4 right-4 text-blue-900 hover:text-blue-700 text-3xl font-light transition-colors"
            >
              ×
            </button>
            <div className="w-36 h-36 rounded-full mx-auto mb-6 border-4 border-blue-900/50 shadow-lg bg-blue-100 flex items-center justify-center">
              <span className="text-5xl font-bold text-blue-900">
                {selectedMember.name.charAt(0)}
              </span>
            </div>
            <h3 className="text-2xl font-semibold text-blue-900 text-center">{selectedMember.name}</h3>
            <p className="text-blue-700 text-center font-light mb-4">{selectedMember.role}</p>
            <p className="text-gray-700 text-center font-light mb-6">{selectedMember.bio}</p>
            <div className="flex justify-center space-x-8 mb-6">
              <a href={selectedMember.twitter} target="_blank" rel="noopener noreferrer" className="text-blue-900 hover:text-blue-700 transition-colors">
                <FaTwitter className="text-2xl" />
              </a>
              <a href={selectedMember.linkedin} target="_blank" rel="noopener noreferrer" className="text-blue-900 hover:text-blue-700 transition-colors">
                <FaLinkedin className="text-2xl" />
              </a>
            </div>
            <a
              href={`mailto:${selectedMember.email}`}
              className="block w-full text-center px-6 py-3 bg-blue-900 text-white rounded-full hover:bg-blue-800 transition-all duration-300 shadow-md"
            >
              <FaEnvelope className="inline mr-2" /> Connect
            </a>
          </motion.div>
        </div>
      )}

      {/* Testimonials Section */}
      <section className="py-24 bg-blue-50">
        <motion.h2
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
          className="text-5xl font-extrabold text-center text-blue-900 mb-16 tracking-tight"
        >
          Voices of Excellence
        </motion.h2>
        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-3 gap-12">
          {currentTestimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              className="bg-white/80 backdrop-blur-md p-8 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 text-center border border-blue-100"
            >
              <div className="w-24 h-24 rounded-full mx-auto mb-6 border-4 border-blue-900/50 shadow-md bg-blue-100 flex items-center justify-center">
                <span className="text-3xl font-bold text-blue-900">
                  {testimonial.name.charAt(0)}
                </span>
              </div>
              <h3 className="text-xl font-semibold text-blue-900">{testimonial.name}</h3>
              <p className="mt-4 text-gray-600 font-light italic">"{testimonial.comment}"</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Footer Section */}
      <footer className="bg-gradient-to-r from-blue-900 to-blue-800 text-white py-12 text-center">
        <div className="flex justify-center space-x-10 mb-6">
          <a href="https://twitter.com" className="hover:text-blue-300 transition-colors"><FaTwitter className="text-2xl" /></a>
          <a href="https://instagram.com" className="hover:text-blue-300 transition-colors"><FaInstagram className="text-2xl" /></a>
          <a href="https://facebook.com" className="hover:text-blue-300 transition-colors"><FaFacebook className="text-2xl" /></a>
        </div>
        <p className="text-blue-200 font-light">© 2025 MunchMate. Crafted with Excellence.</p>
      </footer>
    </div>
  );
};

export default AboutUs;