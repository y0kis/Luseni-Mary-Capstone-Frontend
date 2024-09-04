import './App.css';
import { Routes, Route } from 'react-router-dom';
import Nav from './components/Nav'; 
import EducationalResourcesPage from './pages/EducationalResourcesPage';
import DonationPage from './pages/DonationPage';
import HomePage from './pages/HomePage';
import MentorshipPage from './pages/MentorshipPage';
import SkillBuildingProgramPage from './pages/SkillBuildingProgramPage'; 

function App() {
  return (
    <>
      
        <Nav />
      <main>
      <header>
        <h1>Welcome To MADAM YOKO ORGANIZATION</h1>
        </header>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/educational/:id" element={<EducationalResourcesPage />} />
          <Route path="/donation" element={<DonationPage />} />
          <Route path="/mentor" element={<MentorshipPage />} />
          <Route path="/skill-building" element={<SkillBuildingProgramPage />} />
        </Routes>
        
      </main>
    </>
  );
}

export default App;
