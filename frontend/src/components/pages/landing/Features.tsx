import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import {
  Palette,
  Zap,
  Shield,
  BarChart3,
  Smartphone,
  Globe,
  Lock,
  Users,
  Workflow,
} from "lucide-react";

const Features = () => {
  const features = [
    {
      icon: Palette,
      title: "Drag & Drop Builder",
      description:
        "Create beautiful forms with our intuitive visual editor. No coding required.",
      color: "text-primary",
    },
    {
      icon: Zap,
      title: "Lightning Fast",
      description:
        "Optimized for speed with instant loading and real-time collaboration.",
      color: "text-accent",
    },
    {
      icon: Shield,
      title: "Enterprise Security",
      description:
        "Bank-level encryption and GDPR compliance to keep your data safe.",
      color: "text-aurora-tertiary",
    },
    {
      icon: Smartphone,
      title: "Mobile Optimized",
      description:
        "Forms that look perfect on every device, automatically responsive.",
      color: "text-primary",
    },
    {
      icon: Globe,
      title: "Global Reach",
      description: "Multi-language support and worldwide form delivery.",
      color: "text-accent",
    },
    {
      icon: Lock,
      title: "Secure Payments",
      description:
        "Accept payments securely with Stripe integration and PCI compliance.",
      color: "text-aurora-tertiary",
    },
    {
      icon: Workflow,
      title: "Automation",
      description:
        "Connect with 1000+ apps and automate your workflows seamlessly.",
      color: "text-primary",
    },
  ];

  return (
    <section id="features" className="py-24 relative">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16 animate-fade-in-up">
          <Badge variant="secondary" className="mb-4">
            Features
          </Badge>
          <h2 className="text-3xl md:text-5xl font-bold mb-6">
            Everything you need to
            <br />
            <span className="gradient-text">build amazing forms</span>
          </h2>
          <p className="text-xl text-foreground/70 max-w-2xl mx-auto">
            Powerful features that make form building effortless and data
            collection seamless.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <Card
              key={feature.title}
              className="relative p-8 bg-card/50 backdrop-blur-sm border-white/10 card-shadow hover-lift group"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="space-y-4">
                <div
                  className={`w-12 h-12 rounded-lg bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}
                >
                  <feature.icon className={`w-6 h-6 ${feature.color}`} />
                </div>

                <h3 className="text-xl font-semibold text-foreground">
                  {feature.title}
                </h3>

                <p className="text-foreground/70 leading-relaxed">
                  {feature.description}
                </p>
              </div>

              {/* Hover Glow Effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-accent/5 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </Card>
          ))}
        </div>

        {/* Call to Action */}
        <div className="text-center mt-16 animate-fade-in-up">
          <p className="text-lg text-foreground/70 mb-6">
            Ready to transform your data collection?
          </p>
          <div className="inline-flex items-center space-x-4">
            <div className="flex -space-x-2">
              {[1, 2, 3, 4].map((i) => (
                <div
                  key={i}
                  className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-accent border-2 border-background"
                ></div>
              ))}
            </div>
            <span className="text-sm text-foreground/60">
              Join 10,000+ happy customers
            </span>
          </div>
        </div>
      </div>

      {/* Background Elements */}
      <div className="absolute top-1/4 left-0 w-64 h-64 bg-primary/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-1/4 right-0 w-64 h-64 bg-accent/10 rounded-full blur-3xl"></div>
    </section>
  );
};

export default Features;
