import './index.css'

import NavSection from './components/NavSection'
import MainSection from './components/MainSection'
import PetsSection from './components/PetsSection'
import FAQSection from './components/FAQSection'
import PetNewsSection from './components/PetNewsSection'
import SupportUs from './components/SupportUs'
import FooterSection from './components/FooterSection'
import Chatbot from './components/Chatbot'

console.log("import.meta.env:", import.meta?.env);

const App = () => {
  return (
    <div>
      <NavSection />
      <MainSection />
      <PetsSection />
      <PetNewsSection/>
      <FAQSection />
      <SupportUs />
      <FooterSection />

    </div>
  )
}

export default App
