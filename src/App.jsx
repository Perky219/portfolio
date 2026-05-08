import { LanguageProvider } from "./i18n/LanguageContext";
import { ThemeProvider } from "./contexts/ThemeContext";
import { Navbar } from "./components/layout/Navbar";
import { Footer } from "./components/layout/Footer";
import { Hero } from "./components/sections/Hero";
import { Projects } from "./components/sections/Projects";
import { Skills } from "./components/sections/Skills";
import { Education } from "./components/sections/Education";
import { Contact } from "./components/sections/Contact";
import { ScrollProgress } from "./components/ui/ScrollProgress";
import { BackToTop } from "./components/ui/BackToTop";
import { CursorGlow } from "./components/ui/CursorGlow";

export default function App() {
  return (
    <ThemeProvider>
      <LanguageProvider>
        <ScrollProgress />
        <CursorGlow />
        <div className="bg-canvas min-h-screen grid-bg">
          <Navbar />
          <main>
            <Hero />
            <Projects />
            <Skills />
            <Education />
            <Contact />
          </main>
          <Footer />
        </div>
        <BackToTop />
      </LanguageProvider>
    </ThemeProvider>
  );
}
