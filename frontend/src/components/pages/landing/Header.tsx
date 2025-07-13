import { Button } from "@/components/ui/button";
import { Menu, X, Zap } from "lucide-react";
import { useState } from "react";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-lg border-b border-white/10">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-gradient-to-br from-primary to-accent rounded-lg flex items-center justify-center">
            <Zap className="w-5 h-5 text-white" />
          </div>
          <span className="text-xl font-bold gradient-text">FormCraft</span>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          <a
            href="#features"
            className="text-foreground/80 hover:text-foreground transition-colors"
          >
            Features
          </a>
          <a
            href="#pricing"
            className="text-foreground/80 hover:text-foreground transition-colors"
          >
            Pricing
          </a>
          <a
            href="#about"
            className="text-foreground/80 hover:text-foreground transition-colors"
          >
            About
          </a>
          <a
            href="#contact"
            className="text-foreground/80 hover:text-foreground transition-colors"
          >
            Contact
          </a>
        </nav>

        {/* Desktop CTA */}
        <div className="hidden md:flex items-center space-x-4">
          <Button variant="ghost" size="sm">
            Sign In
          </Button>
          <Button variant="default" size="sm">
            Start Free Trial
          </Button>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? (
            <X className="w-6 h-6" />
          ) : (
            <Menu className="w-6 h-6" />
          )}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-background/95 backdrop-blur-lg border-t border-white/10">
          <nav className="container mx-auto px-4 py-4 space-y-4">
            <a
              href="#features"
              className="block text-foreground/80 hover:text-foreground transition-colors"
            >
              Features
            </a>
            <a
              href="#pricing"
              className="block text-foreground/80 hover:text-foreground transition-colors"
            >
              Pricing
            </a>
            <a
              href="#about"
              className="block text-foreground/80 hover:text-foreground transition-colors"
            >
              About
            </a>
            <a
              href="#contact"
              className="block text-foreground/80 hover:text-foreground transition-colors"
            >
              Contact
            </a>
            <div className="pt-4 space-y-2">
              <Button variant="ghost" className="w-full">
                Sign In
              </Button>
              <Button variant="default" className="w-full">
                Start Free Trial
              </Button>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;
