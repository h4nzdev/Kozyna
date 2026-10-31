import React, { useState, useEffect, useCallback } from 'react';
import Navigation from './components/Navigation';
import HeroSection from './components/HeroSection';
import AnnouncementsSection from './components/AnnouncementsSection';
import MenuShowcaseSection from './components/MenuShowcaseSection';
import StorySection from './components/StorySection';
import ChefSection from './components/ChefSection';
import DiningExperienceSection from './components/DiningExperienceSection';
import VisitSection from './components/VisitSection';
import FooterSection from './components/FooterSection';
import AnnouncementsArchivePage from './components/AnnouncementsArchivePage';
import FullMenuPage from './components/FullMenuPage';

import CustomCursor from './components/CustomCursor';
import LoadingScreen from './components/LoadingScreen';
import AudioPlayer from './components/AudioPlayer';
import DishModal from './components/DishModal';
import ReservationModal from './components/ReservationModal';
import AnnouncementModal from './components/AnnouncementModal';

import { initSmoothScroll, destroySmoothScroll, scrollToElement } from './animations/scrollAnimations';

export default function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [heroAnimated, setHeroAnimated] = useState(false);
  const [isAudioPlaying, setIsAudioPlaying] = useState(false);
  const [selectedDish, setSelectedDish] = useState(null);
  const [selectedAnnouncement, setSelectedAnnouncement] = useState(null);
  const [isReservationOpen, setIsReservationOpen] = useState(false);
  const [preselectedDish, setPreselectedDish] = useState(null);

  // Page Routing: 'home' | 'announcements-archive' | 'menu-catalogue'
  const [currentPage, setCurrentPage] = useState(() => {
    if (window.location.hash.includes('archive')) return 'announcements-archive';
    if (window.location.hash.includes('menu')) return 'menu-catalogue';
    return 'home';
  });

  // Sync with browser back/forward buttons and hash navigation
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash;
      if (hash.includes('archive')) {
        setCurrentPage('announcements-archive');
      } else if (hash.includes('menu-catalogue') || hash.includes('full-menu')) {
        setCurrentPage('menu-catalogue');
      } else {
        setCurrentPage('home');
      }
    };

    window.addEventListener('hashchange', handleHashChange);
    window.addEventListener('popstate', handleHashChange);
    return () => {
      window.removeEventListener('hashchange', handleHashChange);
      window.removeEventListener('popstate', handleHashChange);
    };
  }, []);

  // Initialize Lenis smooth scroll on mount / page change
  useEffect(() => {
    initSmoothScroll();
    return () => {
      destroySmoothScroll();
    };
  }, [currentPage]);

  const handleScrollToSection = useCallback((id) => {
    if (currentPage !== 'home') {
      setCurrentPage('home');
      window.location.hash = '';
      setTimeout(() => {
        scrollToElement(id);
      }, 150);
      return;
    }
    scrollToElement(id);
  }, [currentPage]);

  const handleDishSelect = useCallback((dish) => {
    setSelectedDish(dish);
  }, []);

  const handleAnnouncementSelect = useCallback((item) => {
    setSelectedAnnouncement(item);
  }, []);

  const handleOpenReservationWithDish = useCallback((dish) => {
    setPreselectedDish(dish);
    setIsReservationOpen(true);
  }, []);

  // Navigation handlers
  const handleNavigateToArchive = useCallback(() => {
    setCurrentPage('announcements-archive');
    window.location.hash = 'announcements-archive';
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const handleBackToHomeFromArchive = useCallback(() => {
    setCurrentPage('home');
    window.location.hash = '';
    setTimeout(() => {
      scrollToElement('announcements-section');
    }, 150);
  }, []);

  const handleNavigateToMenuCatalogue = useCallback(() => {
    setCurrentPage('menu-catalogue');
    window.location.hash = 'menu-catalogue';
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const handleBackToHomeFromMenu = useCallback(() => {
    setCurrentPage('home');
    window.location.hash = '';
    setTimeout(() => {
      scrollToElement('menu-section');
    }, 150);
  }, []);

  return (
    <div className="relative bg-ivory text-espresso min-h-screen selection:bg-gold selection:text-espresso font-sans">
      {/* Delicate Film Grain Texture */}
      <div className="film-grain" />

      {/* Hardware-Accelerated Luxury Cursor */}
      <CustomCursor />

      {/* Ambient Acoustic Lounge Soundscape Synthesizer */}
      <AudioPlayer isPlaying={isAudioPlaying} />

      {/* Initial Atmospheric Loading Screen (Homepage only) */}
      {isLoading && (
        <LoadingScreen
          onLoaded={() => setHeroAnimated(true)}
          onFinished={() => setIsLoading(false)}
        />
      )}

      {/* ============================================================== */}
      {/* CONDITIONAL PAGE VIEW: HOME VS ARCHIVE VS FULL MENU            */}
      {/* ============================================================== */}
      {currentPage === 'announcements-archive' ? (
        <AnnouncementsArchivePage
          onBackToHome={handleBackToHomeFromArchive}
          onSelectAnnouncement={handleAnnouncementSelect}
        />
      ) : currentPage === 'menu-catalogue' ? (
        <FullMenuPage
          onBackToHome={handleBackToHomeFromMenu}
          onSelectDish={handleDishSelect}
          onOpenReservationWithDish={handleOpenReservationWithDish}
        />
      ) : (
        <>
          {/* Minimal Sticky / Floating Editorial Navigation */}
          <Navigation
            onScrollToSection={handleScrollToSection}
            onOpenReservation={() => {
              setPreselectedDish(null);
              setIsReservationOpen(true);
            }}
            isAudioPlaying={isAudioPlaying}
            onToggleAudio={() => setIsAudioPlaying(!isAudioPlaying)}
          />

          {/* 01. HERO SECTION */}
          <HeroSection
            isLoaded={heroAnimated}
            onExploreMenu={() => handleScrollToSection('menu-section')}
            onVisitUs={() => handleScrollToSection('visit-section')}
          />

          {/* 02. ANNOUNCEMENTS & UPDATES SECTION */}
          <AnnouncementsSection
            onSelectAnnouncement={handleAnnouncementSelect}
            onViewMoreAnnouncements={handleNavigateToArchive}
          />

          {/* 03. MENU SHOWCASE SECTION (Asymmetrical Bento Layouts) */}
          <MenuShowcaseSection
            onSelectDish={handleDishSelect}
            onOpenReservation={() => setIsReservationOpen(true)}
            onViewMoreMenu={handleNavigateToMenuCatalogue}
          />

          {/* 04. OUR STORY SECTION */}
          <StorySection />

          {/* 05. HEAD CHEF SECTION */}
          <ChefSection />

          {/* 06. DINING EXPERIENCE SECTION (Atmosphere, Real Photos & Bento) */}
          <DiningExperienceSection
            onOpenReservation={() => setIsReservationOpen(true)}
          />

          {/* 07. VISIT US & RESERVATION SECTION */}
          <VisitSection
            onOpenReservation={() => setIsReservationOpen(true)}
          />

          {/* 08. FOOTER SECTION */}
          <FooterSection
            onScrollToTop={() => handleScrollToSection('hero-section')}
          />
        </>
      )}

      {/* ============================================================== */}
      {/* INTERACTIVE MODALS                                             */}
      {/* ============================================================== */}
      {/* Dish Recipe & Pairing Modal */}
      <DishModal
        dish={selectedDish}
        onClose={() => setSelectedDish(null)}
        onAddToReservation={(dish) => handleOpenReservationWithDish(dish)}
      />

      {/* Announcement Chronicle Modal */}
      <AnnouncementModal
        announcement={selectedAnnouncement}
        onClose={() => setSelectedAnnouncement(null)}
        onOpenReservation={() => setIsReservationOpen(true)}
      />

      {/* Table Reservation Modal */}
      <ReservationModal
        isOpen={isReservationOpen}
        onClose={() => setIsReservationOpen(false)}
        preselectedDish={preselectedDish}
      />
    </div>
  );
}
