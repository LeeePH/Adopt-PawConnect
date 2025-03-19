import React, {useState} from 'react';
import {Element} from 'react-scroll'

const FAQ = [
  {
    question: "What is the process for adopting a pet?",
    answer: "The process includes filling out an application form, meeting the pet in person, completing a vet clearance, and paying a minimum adoption fee of 100 pesos.",
  },
  {
    question: "Are all pets vaccinated and spayed/neutered?",
    answer: "Yes, all our adoptable pets are vaccinated and spayed/neutered (kapon) before adoption.",
  },
  {
    question: "Can I return a pet if things don't work out?",
    answer: "Yes, we have a return policy to ensure pets are rehomed safely if the adoption does not work out.",
  },
  {
    question: "What are the requirements to adopt a pet?",
    answer: "Adopters must be at least 18 years old, provide proof of residence, and agree to a home visit if necessary.",
  },
  {
    question: "Can I adopt more than one pet at a time?",
    answer: "Yes, you can adopt multiple pets if your living situation and resources can accommodate them.",
  },
];

const FAQSection = () => {
  const [activeFAQ, setActiveFAQ] = useState(null);

  return (
    <Element name='faqSection'>
      <div className="p-5 my-10 dark:bg-gray-900">
      <div className="my-10">
        <h2 className="text-3xl font-bold mb-8 text-center">Frequently Asked Questions</h2>
        <div className="container mx-auto space-y-6 justify-center items-center w-full">
          {FAQ.map((FAQ, index) => (
            <div key={index} className="border-b-2 pb-4">
              <button
                onClick={() => setActiveFAQ(activeFAQ === index ? null : index)}
                className="flex justify-between w-full text-left text-lg font-semibold"
              >
                {FAQ.question}
                <span>{activeFAQ === index ? '-' : '+'}</span>
              </button>
              {activeFAQ === index && (
                <p className="mt-2 text-gray-600 dark:text-gray-50 italic">{FAQ.answer}</p>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  </Element>
  )};

export default FAQSection;
