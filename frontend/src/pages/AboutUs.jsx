import React from "react";

const AboutUs = () => {
  return (
    <section className="about py-12 sm:py-16">
      <div className="container mx-auto px-4">
        {/* Heading */}
        <div className="text-center mb-10 sm:mb-12">
          <h2 className="text-2xl sm:text-3xl font-bold">About Us</h2>
        </div>

        {/* About Image */}
        <img
          src="about-us.jpg"
          alt="about us"
          className="w-full max-w-4xl mx-auto mb-10"
        />

        {/* About Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 px-2 sm:px-10 md:px-[10%] mb-20">
          {[
            {
              title: "Who We Are?",
              text: "Contextual advertising programs sometimes have strict policies that need to be adhered to.",
            },
            {
              title: "What We Do?",
              text: "In this digital generation where information can be easily obtained, business cards still hold importance.",
            },
            {
              title: "Why Choose Us?",
              text: "We maximize the potential of your space while ensuring comfort and accessibility.",
            },
          ].map((item, index) => (
            <div key={index} className="text-center md:text-left">
              <h4 className="text-xl sm:text-2xl font-bold mb-2">{item.title}</h4>
              <p className="text-gray-700 text-sm sm:text-base">{item.text}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Testimonial Section */}
      <section className="bg-gray-100 py-12 px-4">
        <div className="container mx-auto flex flex-col-reverse md:flex-row items-center gap-8">
          <div className="md:w-1/2 text-center md:text-left">
            <p className="text-base sm:text-lg italic leading-relaxed">
              “Going out after work? Take your butane curling iron with you to
              the office, heat it up, style your hair before you leave the
              office and you won’t have to make a trip back home.”
            </p>
            <div className="mt-6 flex justify-center md:justify-start items-center gap-4">
              <img
                src="/testimonial-author.jpg"
                alt="Author"
                className="w-12 h-12 rounded-full"
              />
              <div>
                <h5 className="font-semibold">Augusta Schultz</h5>
                <p className="text-sm text-gray-600">Fashion Design</p>
              </div>
            </div>
          </div>
          <div className="md:w-1/2">
            <img src="/testimonial-pic.jpg" alt="Testimonial" className="w-full" />
          </div>
        </div>
      </section>

      {/* Counter Section */}
      <section className="counter py-16 bg-white">
        <div className="container mx-auto px-4 grid grid-cols-2 sm:grid-cols-4 gap-8 text-center">
          {[
            { value: "102", label: "Our Clients" },
            { value: "30", label: "Total Categories" },
            { value: "102", label: "In Country" },
            { value: "98%", label: "Happy Customers" },
          ].map((item, idx) => (
            <div key={idx}>
              <h2 className="text-4xl sm:text-6xl font-bold">{item.value}</h2>
              <span className="block mt-1 text-sm sm:text-base text-gray-600">{item.label}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Team Section */}
      <section className="team py-16 bg-gray-50">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-2xl sm:text-3xl font-semibold mb-10">Meet Our Team</h2>
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { name: "John Smith", role: "Fashion Design", img: "team-1.jpg" },
              { name: "Christine Wise", role: "C.E.O", img: "team-2.jpg" },
              { name: "Sean Robbins", role: "Manager", img: "team-3.jpg" },
              { name: "Lucy Myers", role: "Delivery", img: "team-4.jpg" },
            ].map((member, index) => (
              <div key={index} className="bg-white shadow-sm p-4 rounded-md">
                <img
                  src={member.img}
                  alt={member.name}
                  className="w-full h-auto rounded mb-4"
                />
                <h4 className="font-semibold text-lg">{member.name}</h4>
                <span className="text-sm text-gray-500">{member.role}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Clients Section */}
      <section className="clients py-16 bg-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-2xl sm:text-3xl font-semibold mb-8">Happy Clients</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6 items-center">
            {[1, 8, 3, 4, 5, 6, 7, 8].map((num) => (
              <div key={num} className="p-2">
                <img
                  src={`/client-${num}.png`}
                  alt={`Client ${num}`}
                  className="mx-auto max-h-20 object-contain"
                />
              </div>
            ))}
          </div>
        </div>
      </section>
    </section>
  );
};

export default AboutUs;
