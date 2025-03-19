import React, { useState } from 'react';

import dogBreed from '../assets/dogbreed.jpg';
import catTraining from '../assets/cattraining.jpg';
import dogNutrition from '../assets/dognutrition.jfif';
import catBehavior from '../assets/catbehavior.jpg';

// Card data for the news
const newsData = [
  {
    title: 'Dog Breeds',
    image: dogBreed,
    description: 'The group of dogs of the original type includes hunting dogs, herding dogs...',
    fullDescription: 'The group of dogs of the original type includes hunting dogs, herding dogs, and working dogs. Each breed has its own characteristics and history, from small lap dogs to large working breeds like German Shepherds and Huskies. Understanding the breed helps in proper training and care, making sure that the dog thrives in its environment.',
    referenceLink: 'https://www.akc.org/dog-breeds/',
  },
  {
    title: 'Training Cats',
    image: catTraining,
    description: 'The process of training the animal to be a grateful eater can take months...',
    fullDescription: 'Training cats to be more compliant and less finicky is essential for both their well-being and your own peace of mind. Training involves using positive reinforcement and patience to encourage good behavior, from eating habits to litter box use. Cats are intelligent and capable of learning tricks or commands with the right approach.',
    referenceLink: 'https://www.cesarsway.com/cat-training-tips/',
  },
  {
    title: 'Nutrition of Dogs',
    image: dogNutrition,
    description: 'Food intolerances in animals are a common problem...',
    fullDescription: 'Food intolerances in dogs can lead to skin problems, digestive issues, and overall discomfort. A balanced diet with the right nutrients is critical for maintaining a dog’s health. Understanding which foods are beneficial and which ones to avoid can drastically improve your dog’s quality of life. This article covers the essentials of dog nutrition, along with common allergens and how to spot them.',
    referenceLink: 'https://www.petmd.com/dog/nutrition/evr_dg_guide_to_dog_nutrition',
  },
  {
    title: 'Cat Behavior',
    image: catBehavior,
    description: 'Cats communicate with each other and with humans through their voices...',
    fullDescription: 'Cats have a complex set of behaviors, including vocalizations, body language, and scent marking. Understanding these behaviors can enhance the bond between you and your cat. Whether it’s deciphering a meow or recognizing body language signals, the more you understand your cat, the more enjoyable your companionship will be.',
    referenceLink: 'https://www.cats.org.uk/cat-behaviour',
  }
];

const PetNewsSection = () => {
  const [showModal, setShowModal] = useState(false);
  const [modalContent, setModalContent] = useState('');
  const [modalLink, setModalLink] = useState('');

  const openModal = (fullDescription, referenceLink) => {
    setModalContent(fullDescription);
    setModalLink(referenceLink);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setModalContent('');
    setModalLink('');
  };

  return (
    <div className="pet-news-container my-16">
      <h2 className="text-center text-3xl font-bold uppercase">Pet Resources</h2>
      <div className="pet-news-grid grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mt-4 mx-10">
        {newsData.map((news, index) => (
          <div key={index} className="pet-news-card bg-white dark:bg-gray-800 rounded-lg shadow-md p-4">
            <img src={news.image} alt={news.title} className="w-full h-48 object-cover rounded-md mb-3" />
            <h3 className="text-xl font-semibold">{news.title}</h3>
            <p className="text-gray-600 dark:text-white">{news.description}</p>
            <button 
              onClick={() => openModal(news.fullDescription, news.referenceLink)} 
              className="text-blue-500 mt-3 underline"
            >
              Read more
            </button>
          </div>
        ))}
      </div>

      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center z-10 bg-black bg-opacity-50">
          <div className="bg-white dark:bg-gray-900 p-6 rounded-lg shadow-lg w-80 sm:w-96">
            <h3 className="text-2xl font-semibold mb-4">Full Article</h3>
            <p>{modalContent}</p>
            <div className="mt-4">
              <a 
                href={modalLink} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-blue-500 underline"
              >
                Read more details
              </a>
            </div>
            <button 
              onClick={closeModal} 
              className="mt-4 px-4 py-2 bg-red-500 text-white rounded-md"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default PetNewsSection;
