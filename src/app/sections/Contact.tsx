"use client";

import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { useActiveSectionContext } from "@/app/context/active-section-context";
import SectionHeading from "@/app/components/SectionHeading";
import { useRef, useState } from "react";
import { FaEnvelope, FaMapMarkerAlt, FaLinkedin, FaGithub, FaTwitter } from "react-icons/fa";

export default function Contact() {
  const { ref, inView } = useInView({
    threshold: 0.5,
  });
  const { setActiveSection, timeOfLastClick } = useActiveSectionContext();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      setFormData({ name: "", email: "", message: "" });
      
      // Reset the success message after 5 seconds
      setTimeout(() => {
        setIsSubmitted(false);
      }, 5000);
    }, 1000);
  };

  return (
    <motion.section
      ref={ref}
      id="contact"
      className="scroll-mt-28 mb-28 sm:mb-40 w-[min(100%,62rem)] text-center px-4"
      initial={{ opacity: 0, y: 100 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.175 }}
    >
      <SectionHeading>Contact Me</SectionHeading>
      
      <p className="text-gray-700 dark:text-gray-300 mb-12 max-w-[42rem] mx-auto">
        Feel free to get in touch with me. I'm always open to discussing new projects, 
        creative ideas, or opportunities to be part of your vision.
      </p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-start">
        {/* Contact Info */}
        <div className="text-left space-y-6">
          <div>
            <h3 className="text-xl font-bold mb-4">Let's Connect</h3>
            <p className="text-gray-700 dark:text-gray-300 mb-6">
              Whether you have a question, project proposal, or just want to say hello, 
              feel free to reach out to me using the form or any of the methods below.
            </p>
          </div>
          
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="bg-gray-100 p-3 rounded-full dark:bg-gray-800">
                <FaEnvelope className="text-gray-700 dark:text-gray-300" />
              </div>
              <div>
                <p className="font-medium">Email</p>
                <a href="mailto:adrian@example.com" className="text-blue-600 dark:text-blue-400 hover:underline">
                  adrian@example.com
                </a>
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              <div className="bg-gray-100 p-3 rounded-full dark:bg-gray-800">
                <FaMapMarkerAlt className="text-gray-700 dark:text-gray-300" />
              </div>
              <div>
                <p className="font-medium">Location</p>
                <p className="text-gray-700 dark:text-gray-300">San Francisco, CA</p>
              </div>
            </div>
          </div>
          
          <div className="pt-6 border-t border-gray-200 dark:border-gray-700">
            <h4 className="font-medium mb-3">Follow me on</h4>
            <div className="flex gap-4">
              <a 
                href="https://linkedin.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="bg-gray-100 p-3 rounded-full text-gray-700 hover:bg-blue-100 hover:text-blue-600 transition-colors dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700"
              >
                <FaLinkedin />
              </a>
              <a 
                href="https://github.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="bg-gray-100 p-3 rounded-full text-gray-700 hover:bg-blue-100 hover:text-blue-600 transition-colors dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700"
              >
                <FaGithub />
              </a>
              <a 
                href="https://twitter.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="bg-gray-100 p-3 rounded-full text-gray-700 hover:bg-blue-100 hover:text-blue-600 transition-colors dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700"
              >
                <FaTwitter />
              </a>
            </div>
          </div>
        </div>
        
        {/* Contact Form */}
        <div className="bg-white p-8 rounded-xl shadow-md dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
          <h3 className="text-xl font-bold mb-6 text-left">Send Me a Message</h3>
          
          {isSubmitted ? (
            <div className="bg-green-100 text-green-700 p-4 rounded-lg dark:bg-green-900/30 dark:text-green-400">
              Thank you for your message! I'll get back to you as soon as possible.
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4 text-left">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                  placeholder="Your name"
                />
              </div>
              
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                  placeholder="Your email"
                />
              </div>
              
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={5}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                  placeholder="Your message"
                />
              </div>
              
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3 px-6 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors disabled:opacity-70"
              >
                {isSubmitting ? "Sending..." : "Send Message"}
              </button>
            </form>
          )}
        </div>
      </div>
    </motion.section>
  );
} 