import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import HomeView from './components/HomeView';
import MenuView from './components/MenuView';
import GalleryView from './components/GalleryView';
import BookingView from './components/BookingView';
import AIAssistant from './components/AIAssistant';

export default function App() {
  const [currentPage, setCurrentPage] = useState<string>('home');
  const [isAssistantOpen, setIsAssistantOpen] = useState<boolean>(false);

  const renderActivePage = () => {
    switch (currentPage) {
      case 'home':
        return <HomeView setCurrentPage={setCurrentPage} />;
      case 'menu':
        return <MenuView />;
      case 'gallery':
        return <GalleryView />;
      case 'booking':
        return <BookingView />;
      default:
        return <HomeView setCurrentPage={setCurrentPage} />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[color:var(--color-warm-cream)] text-[color:var(--color-deep-moss)] relative" id="app-root">
      
      {/* Brand Navigation Header */}
      <Navbar 
        currentPage={currentPage} 
        setCurrentPage={setCurrentPage} 
        onOpenAssistant={() => setIsAssistantOpen(true)}
      />

      {/* Main Container with smooth fade transitions */}
      <main className="flex-grow flex flex-col" id="app-main">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentPage}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="flex-grow flex flex-col"
          >
            {renderActivePage()}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Beautiful High-Altitude Brand Footer */}
      <Footer setCurrentPage={setCurrentPage} />

      {/* AI Café Assistant: Pahari Brew Guide */}
      <AIAssistant 
        setCurrentPage={setCurrentPage} 
        isOpen={isAssistantOpen} 
        setIsOpen={setIsAssistantOpen} 
      />

    </div>
  );
}
