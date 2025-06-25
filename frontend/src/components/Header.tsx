import { Button } from "@/components/ui/button";
import { Link } from "@tanstack/react-router";
import { Plus, Settings, User } from "lucide-react";

const NavigationBar = () => {
  return (
    <nav className="border-b border-border bg-card/50 backdrop-blur supports-[backdrop-filter]:bg-card/50">
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-8">
            <div className="flex items-center space-x-2">
              <div className="h-8 w-8 rounded-lg bg-primary flex items-center justify-center">
                <span className=" font-bold text-sm">F</span>
              </div>
              <span className="text-xl  font-bold">FormCraft</span>
            </div>

            <div className="hidden md:flex items-center space-x-6">
              <a
                href="#"
                className="text-foreground hover:text-primary transition-colors"
              >
                Dashboard
              </a>
              <Link
                className="text-muted-foreground hover:text-foreground transition-colors"
                to="/forms"
              >
                Forms
              </Link>

              <a
                href="#"
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                Analytics
              </a>
              <a
                href="#"
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                Settings
              </a>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <Button variant="default" size="sm" className="gap-2">
              <Plus className="h-4 w-4" />
              New Form
            </Button>

            <Button variant="ghost" size="sm">
              <Settings className="h-4 w-4" />
            </Button>

            <Button variant="ghost" size="sm">
              <User className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="sm">
              <User className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default NavigationBar;
