import { Button } from "@/components/ui/button";
import { ArrowRight, Play, Star } from "lucide-react";
import { useEffect, useState } from "react";

const Hero = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Aurora Background */}
      <div className="absolute inset-0 aurora-bg opacity-30"></div>
      <div className="absolute inset-0 aurora-overlay"></div>

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-background/50 via-background/80 to-background"></div>

      <div className="relative z-10 container mx-auto px-4 py-20 text-center">
        <div
          className={`space-y-8 ${isVisible ? "animate-fade-in-up" : "opacity-0"}`}
        >
          {/* Badge */}
          <div className="inline-flex items-center space-x-2 bg-primary/10 border border-primary/20 rounded-full px-4 py-2 text-sm animate-bounce-in">
            <Star className="w-4 h-4 text-primary" />
            <span className="text-primary">Trusted by 10,000+ teams</span>
          </div>

          {/* Main Headline */}
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold leading-tight">
            Build Beautiful Forms
            <br />
            <span className="gradient-text">Without Code</span>
          </h1>

          {/* Subheadline */}
          <p className="text-xl md:text-2xl text-foreground/70 max-w-3xl mx-auto leading-relaxed">
            Create stunning, responsive forms in minutes with our drag-and-drop
            builder. Collect data, process payments, and automate workflows
            effortlessly.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-8">
            <Button variant="default" size="lg" className="group">
              Start Building for Free
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Button>
            <Button variant="secondary" size="lg" className="group">
              <Play className="w-5 h-5 mr-2" />
              Watch Demo
            </Button>
          </div>
        </div>

        {/* Floating Elements */}
        <div className="absolute top-20 left-10 w-20 h-20 bg-primary/20 rounded-full blur-xl animate-float"></div>
        <div
          className="absolute bottom-32 right-10 w-32 h-32 bg-accent/20 rounded-full blur-xl animate-float"
          style={{ animationDelay: "2s" }}
        ></div>
        <div
          className="absolute top-1/2 left-1/4 w-16 h-16 bg-aurora-tertiary/20 rounded-full blur-xl animate-float"
          style={{ animationDelay: "4s" }}
        ></div>
      </div>
    </section>
  );
};

export default Hero;
