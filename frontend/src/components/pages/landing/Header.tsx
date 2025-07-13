import { Logo } from "@/components/logo";
import { Button } from "@/components/ui/button";
import { Link } from "@tanstack/react-router";
import { Menu, Plus, Settings, User, X } from "lucide-react";
import { useState } from "react";
import { CreateUpdateFormModal } from "../forms/create-update-modal";

type HeaderProps = {
  page: "home" | "form";
};

const Header = ({ page }: HeaderProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const homeItems = [
    { label: "Features", href: "#features" },
    { label: "Pricing", href: "#pricing" },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-lg border-b border-white/10">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <Logo />

        {/* Desktop Navigation */}
        {page == "home" ? (
          <nav className="hidden md:flex items-center space-x-8">
            {homeItems.map((item, idx) => (
              <Link
                className="text-foreground/80 hover:text-foreground transition-colors"
                to={item.href}
                key={idx}
              >
                {item.label}
              </Link>
            ))}
          </nav>
        ) : (
          <></>
        )}

        {/* Desktop CTA */}
        <div className="hidden md:flex items-center space-x-4">
          {page == "home" ? (
            <>
              <Button variant="ghost" size="sm">
                Sign In
              </Button>
              <Button variant="default" size="sm">
                Start Free Trial
              </Button>
            </>
          ) : (
            <FormCta />
          )}
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

const FormCta = () => {
  const [open, setOpen] = useState<boolean>(false);

  return (
    <>
      <div className="flex items-center space-x-4">
        <Button
          onClick={() => setOpen(true)}
          variant="default"
          size="sm"
          className="gap-2 cursor-pointer"
        >
          <Plus className="h-4 w-4" />
          New Form
        </Button>

        <Button variant="ghost" size="sm">
          <Settings className="h-4 w-4" />
        </Button>

        <Button variant="ghost" size="sm">
          <User className="h-4 w-4" />
        </Button>
      </div>

      {open && (
        <CreateUpdateFormModal onClose={() => setOpen(false)} open={open} />
      )}
    </>
  );
};
