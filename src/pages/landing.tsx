import Navbar from "../components/nav/navbar";
import { Link } from "react-router-dom";
import { FaCheckCircle } from "react-icons/fa";
import { AiOutlineTool } from "react-icons/ai";
import { MdOutlineEmojiEvents } from "react-icons/md";
import { RiShareForwardLine } from "react-icons/ri";

const LandingPage = () => {
  return (
    <div className="min-h-screen flex flex-col bg-lightBg relative overflow-hidden">
      <Navbar />

      {/* Hero Section */}
      <section className="px-20 mt-20">
        <div className="container mx-auto flex items-center gap-10 py-20">
          <div className="w-full">
            <h2 className="text-3xl md:text-6xl font-bold mb-4 relative before:w-20 before:h-[2px] before:bg-brand before:absolute before:-top-1 before:left-0">
              Create and Share <span className="text-brand ">Quizzes</span>{" "}
              Easily
            </h2>
            <p className="text-lg md:text-2xl text-gray-600 mb-6">
              Empower your audience with engaging quizzes for education or fun.
              Create, share, and take quizzes effortlessly. Unleash your
              creativity and engage your audience like never before!
            </p>
            <div className="space-x-4">
              <Link to="/signup">
                <button className="bg-brand text-white px-5 py-2 rounded-md hover:opacity-90">
                  Get Started
                </button>
              </Link>
            </div>
          </div>
          <div className="w-full">
            <img
              src="/hero-img.png"
              alt="Qwiz"
              className="w-full object-cover"
            />
          </div>
        </div>
      </section>

      {/* About Us Section */}
      <section
        id="about"
        className="py-5 h-auto flex items-center gap-10 px-20"
      >
        <div className="w-full">
          <img
            src="/about.png"
            alt="Qwiz"
            className="w-full max-w-lg object-cover"
          />
        </div>
        <div className="container w-full px-5">
          <h3 className="text-4xl font-bold text-brand mb-5">Who we are</h3>
          <p className="text-gray-700 text-lg md:text-2xl max-w-2xl mx-auto mb-6">
            Qwiz is a platform that allows users to create, share, and analyze
            quizzes effortlessly. Whether you're an educator, marketer, or just
            someone looking to engage others with questions, Qwiz makes it
            simple.
          </p>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="container mx-auto p-20">
        <h3 className="text-4xl font-bold text-center text-brand mb-10">
          Why Use Qwiz?
        </h3>
        <div className="grid md:grid-cols-3 gap-10">
          {[
            {
              title: "Easy to Use",
              text: "With an intuitive interface, you can create quizzes in minutes—no technical skills required. Customize questions, set timers, and share instantly, saving time and effort.",
              icon: <AiOutlineTool size={40} className="text-brand mb-3" />,
            },
            {
              title: "Engaging",
              text: "Boost interaction with a variety of question types, images, and real-time feedback. Keep participants engaged and entertained, whether for education or fun.",
              icon: (
                <MdOutlineEmojiEvents size={40} className="text-brand mb-3" />
              ),
            },
            {
              title: "Reach More",
              text: "Easily distribute your quizzes across multiple platforms, from social media to email. Track results to understand your audience and improve engagement over time.",
              icon: (
                <RiShareForwardLine size={40} className="text-brand mb-3" />
              ),
            },
          ].map((feature, index) => (
            <div
              key={index}
              className="bg-accent p-7 rounded-lg shadow-md hover:shadow-lg transition duration-300"
            >
              {feature.icon}
              <h4 className="text-2xl font-medium mb-2 ">{feature.title}</h4>
              <p className="text-gray-700 font-light">{feature.text}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="w-full h-96 bg-brand relative text-whiteSmoke px-20 py-16 flex flex-col gap-3 justify-center items-start overflow-hidden">
        <h2 className="text-2xl font-bold md:text-4xl">Join Qwiz today</h2>
        <p className="text-gray-200 w-[40ch] text-lg leading-tight">
          Effortlessly conduct quizzes and assessments, reaching a wider
          audience online without the usual hassle. With intuitive tools and
          seamless access, Qwiz empowers you to deliver meaningful tests
          anywhere, anytime.
        </p>
        <Link
          className="py-2 px-6 bg-whiteSmoke text-brand font-medium rounded-full w-max"
          to="/signup"
        >
          Signup Today
        </Link>
        <div className="bg-[#fe8e28] w-[42rem] h-[42rem] absolute rounded-full -top-30 -right-48 shadow-sm"></div>
        <div className="bg-[#ffb169] w-[36rem] h-[36rem] absolute rounded-full -top-24 -right-48 shadow-sm"></div>
        <div className="bg-[#ffd2a9] w-[30rem] h-[30rem] absolute rounded-full top-22 -right-48  shadow-sm"></div>
        <div className="bg-[#fde7d0] w-96 h-96 absolute rounded-full top-0 -right-48 shadow-sm"></div>
        <div className="bg-[#fff5ec] w-72 h-72 absolute rounded-full top-18 -right-44 shadow-sm"></div>
        <div className="bg-white w-48 h-48 absolute rounded-full top-18 -right-36 shadow-sm"></div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-16">
        <div className="container mx-auto px-5">
          <h3 className="text-3xl font-bold text-center text-brand mb-8">
            Get in Touch
          </h3>
          <p className="text-center text-gray-700 mb-6">
            Have any questions or feedback? We'd love to hear from you!
          </p>
          <form className="max-w-md mx-auto space-y-4">
            <input
              type="text"
              placeholder="Your Name"
              className="w-full p-3 border rounded-md"
            />
            <input
              type="email"
              placeholder="Your Email"
              className="w-full p-3 border rounded-md"
            />
            <textarea
              placeholder="Your Message"
              rows={4}
              className="w-full p-3 border rounded-md resize-none"
            />
            <button className="bg-brand text-white w-full py-3 rounded-md hover:opacity-90">
              Submit
            </button>
          </form>
        </div>
      </section>

      {/* Footer */}
      <footer className="w-full bg-brand text-white py-6">
        <div className="container mx-auto text-center">
          <p>&copy; 2024 Qwiz. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
