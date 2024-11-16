import React from "react";
import {
  LuUpload,
  LuMic,
  LuSettings,
  LuZap,
  LuShield,
  LuGlobe,
  LuLock,
  LuFileAudio,
  LuPlay,
  LuDownload,
} from "react-icons/lu";
import { Link, useNavigate } from "react-router-dom"; // Assuming you're using React Router for navigation

const Button = ({ children, className, variant, to }) => {
  const navigate =useNavigate()
  return <button
    className={`px-6 py-3 rounded-full text-lg font-semibold transition-transform duration-300 transform ${
      variant === "outline"
        ? "border border-blue-500 text-white-500 hover:bg-blue-500 hover:text-white"
        : "bg-blue-600 hover:bg-blue-700 text-white"
    } ${className}`}
    onClick={() =>{
      navigate(to)
    }

    }
  >
    {children}
  </button>
};

const FeatureCard = ({ icon: Icon, title, description }) => (
  <div className="flex flex-col items-center text-center p-6 bg-gray-800 rounded-lg transition-transform duration-300 transform hover:scale-105 hover:shadow-lg">
    <Icon className="w-10 h-10 mb-4 text-blue-500 transition-colors duration-300 hover:text-blue-400" />
    <h3 className="mb-2 text-xl font-semibold text-white">{title}</h3>
    <p className="text-gray-400">{description}</p>
  </div>
);

const Navbar = () => (
  <nav className="bg-gray-900 text-white py-4 h-16">
    <div className="container mx-auto flex items-center justify-between px-6">
      {/* SafeSound Logo */}
      <div className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-600">
        SafeSound
      </div>

      {/* Navbar links */}
      <div className="flex items-center space-x-6">
        <Button to='/censor' variant="outline" className="hidden md:block">
          Censor Audio Only
        </Button>
        <Button to="/video" variant="outline" className="hidden md:block">
          Upload Video to Censor Audio
        </Button>
      </div>
    </div>
  </nav>
);

const LandingPage = () => {
  return (
    <div className="min-h-screen bg-gray-900 text-gray-100">
      {/* Navbar */}
      <Navbar />

      {/* Header */}
      <header className="container mx-auto px-4 py-16 text-center">
        <h1 className="mb-4 text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-600">
          Welcome to SafeSound AI
        </h1>
        <p className="text-xl text-gray-400">
          Audio Censorship for a Cleaner Digital World
        </p>
      </header>

      {/* How It Works */}
      <section className="container mx-auto px-8 py-8">
        <h2 className="mb-8 text-3xl font-bold text-center text-white">
          How It Works
        </h2>
        <p className="mb-8 text-center text-gray-400 max-w-2xl mx-auto">
          Our powerful AI model processes your audio files to detect and censor
          any curse words, ensuring a safe, family-friendly environment for all
          listeners.
        </p>
        <div className="grid md:grid-cols-3 gap-8">
          <FeatureCard
            icon={LuUpload}
            title="Upload Audio/Video Files"
            description="Simply upload your audio/video files for automatic censorship."
          />
          <FeatureCard
            icon={LuMic}
            title="Click to Censor Audio"
            description="Click the 'Censor Now' button to automatically censor selected parts of your audio. Download the cleaned file in minutes."
          />
          <FeatureCard
            icon={LuSettings}
            title="Customize Censorship"
            description="Our model automatically censors predefined offensive words. Users can also enter specific words in the text box to add custom censorship."
          />
        </div>
      </section>

      {/* Features */}
      <section className="container mx-auto px-32 py-16 bg-gradient-to-r from-blue-900 to-purple-900">
        <h2 className="mb-8 text-3xl font-bold text-center text-white">
          Features
        </h2>
        <div className="grid md:grid-cols-3 gap-8">
          <FeatureCard
            icon={LuZap}
            title="Audio & Video Processing"
            description="Instant censorship on both audio and video recordings"
          />
          <FeatureCard
            icon={LuShield}
            title="Accurate Detection"
            description="Advanced AI models trained to identify a wide range of offensive language."
          />
          <FeatureCard
            icon={LuUpload}
            title="User-Friendly Interface"
            description="Simple, intuitive audio file upload and playback controls."
          />
        </div>
      </section>

      {/* Why Choose SafeSound AI? */}
      <section className="container mx-auto px-32 py-16">
        <h2 className="mb-8 text-3xl font-bold text-center text-white">
          Why Choose SafeSound AI?
        </h2>
        <div className="grid md:grid-cols-2 gap-8">
          {[
            {
              icon: LuShield,
              title: "Protect Your Audience",
              description:
                "Maintain a positive environment, free from harmful or offensive language.",
            },
            {
              icon: LuGlobe,
              title: "Enhance Content Accessibility",
              description:
                "Make your audio content suitable for all audiences, including younger listeners.",
            },
            {
              icon: LuZap,
              title: "AI-Powered Precision",
              description:
                "Advanced NLP and audio processing techniques ensure high accuracy and minimal false positives.",
            },
            {
              icon: LuLock,
              title: "Privacy-Focused",
              description:
                "We prioritize user data protection. Your audio files are processed securely and are never stored without your permission.",
            },
          ].map((item, index) => (
            <div
              key={index}
              className="flex items-start p-6 bg-gray-800 rounded-lg transition-transform duration-300 hover:scale-x-[1.02] hover:scale-y-105 hover:shadow-lg"
            >
              <item.icon className="w-8 h-8 mr-4 text-blue-500 flex-shrink-0" />
              <div>
                <h3 className="mb-2 text-xl font-semibold text-white">
                  {item.title}
                </h3>
                <p className="text-gray-400">{item.description}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Call to Action */}
      <section className="container mx-auto px-4 py-16 text-center">
        <h2 className="mb-4 text-3xl font-bold text-white">Try It Now</h2>
        <p className="mb-8 text-gray-400 max-w-2xl mx-auto">
          Upload an audio file to see our AI in action and experience the power
          of real-time curse word censorship.
        </p>
        <Button to='/censor' className="text-lg px-8 py-4 rounded-full transition-transform duration-300 hover:scale-105 hover:bg-blue-700">
          Try Now
        </Button>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 py-8 text-center">
        <p className="text-gray-400">
          &copy; 2024 SafeSound AI. All rights reserved.
        </p>
        <div className="mt-4">
          <a href="#" className="text-gray-400 hover:text-white mx-2">
            Privacy Policy
          </a>
          <a href="#" className="text-gray-400 hover:text-white mx-2">
            Terms of Service
          </a>
          <a href="#" className="text-gray-400 hover:text-white mx-2">
            Contact
          </a>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
