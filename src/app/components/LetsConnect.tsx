import { motion } from "framer-motion";
import { FaEnvelope, FaMapMarkerAlt, FaLinkedin, FaGithub } from "react-icons/fa";

export default function LetsConnect() {
  return (
    <motion.div
      className="w-full max-w-2xl mx-auto mt-12 mb-8 text-left"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3 }}
    >
      <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">
        Let's Connect
      </h2>
      
      <p className="text-gray-700 dark:text-gray-300 mb-8">
        Whether you have a question, project proposal, or just want to say hello, 
        feel free to reach out to me using any of the methods below.
      </p>
      
      <div className="space-y-4 mb-8">
        <div className="flex items-center gap-4">
          <div className="bg-gray-100 p-3 rounded-full dark:bg-gray-800">
            <FaEnvelope className="text-gray-700 dark:text-gray-300" />
          </div>
          <div>
            <p className="font-medium">Email</p>
            <a href="mailto:isaias.liszt@gmail.com" className="text-blue-600 dark:text-blue-400 hover:underline">
              isaias.liszt@gmail.com
            </a>
          </div>
        </div>
      </div>
      <div className="pt-6 border-t border-gray-200 dark:border-gray-700">
        <h4 className="font-medium mb-4">Connect with me on</h4>
        <div className="flex gap-4">
          <a 
            href="https://www.linkedin.com/in/adrian-isaias-sanchez/" 
            target="_blank" 
            rel="noopener noreferrer"
            className="bg-gray-100 p-3 rounded-full text-gray-700 hover:bg-blue-100 hover:text-blue-600 transition-colors dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700"
          >
            <FaLinkedin size={20} />
          </a>
          <a 
            href="https://github.com/Lisztos" 
            target="_blank" 
            rel="noopener noreferrer"
            className="bg-gray-100 p-3 rounded-full text-gray-700 hover:bg-blue-100 hover:text-blue-600 transition-colors dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700"
          >
            <FaGithub size={20} />
          </a>
          <a 
            href="mailto:isaias.liszt@gmail.com" 
            className="bg-gray-100 p-3 rounded-full text-gray-700 hover:bg-blue-100 hover:text-blue-600 transition-colors dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700"
          >
            <FaEnvelope size={20} />
          </a>
        </div>
      </div>
    </motion.div>
  );
} 