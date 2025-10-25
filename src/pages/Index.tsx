import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Calendar, MessageSquare, Award, Map, Bell, Users } from "lucide-react";
import heroImage from "@/assets/hero-campus.jpg";

const Index = () => {
  const features = [
    {
      icon: Calendar,
      title: "Smart Calendar",
      description: "Never miss a class, event, or deadline with our unified calendar system"
    },
    {
      icon: MessageSquare,
      title: "Discussion Forums",
      description: "Discord-style forums for prep materials, doubts, and club discussions"
    },
    {
      icon: Award,
      title: "Token Rewards",
      description: "Earn tokens for achievements and redeem them at campus facilities"
    },
    {
      icon: Map,
      title: "Campus Navigation",
      description: "Interactive map showing your next class location and campus routes"
    },
    {
      icon: Bell,
      title: "Central Notices",
      description: "Get important updates from departments, faculty, and clubs in one place"
    },
    {
      icon: Users,
      title: "Interest Groups",
      description: "AI-powered recommendations to connect you with clubs matching your interests"
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative gradient-hero text-white overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <img 
            src={heroImage} 
            alt="KIIT Campus Life" 
            className="w-full h-full object-cover"
          />
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 py-24 sm:px-6 lg:px-8">
          <div className="text-center animate-fade-in">
            <h1 className="text-5xl md:text-7xl font-bold mb-6">
              Welcome to <span className="block mt-2">KIITSTOP</span>
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-white/90 max-w-3xl mx-auto">
              Your unified campus management portal. Connect, organize, and thrive at KIIT University.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/auth">
                <Button size="lg" variant="secondary" className="text-lg px-8 py-6">
                  Get Started
                </Button>
              </Link>
              <Button size="lg" variant="outline" className="text-lg px-8 py-6 border-white text-white hover:bg-white hover:text-primary">
                Learn More
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-20 px-4 max-w-7xl mx-auto">
        <div className="text-center mb-16 animate-slide-up">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Everything You Need in <span className="gradient-text">One Place</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Streamline your campus life with powerful tools designed for students, faculty, and clubs
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <Card 
              key={index} 
              className="p-6 hover-lift gradient-card border-border/50 animate-scale-in"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                <feature.icon className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-muted-foreground">{feature.description}</p>
            </Card>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="gradient-hero text-white py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Ready to Transform Your Campus Experience?
          </h2>
          <p className="text-xl mb-8 text-white/90">
            Join thousands of students, faculty, and clubs already using KIITSTOP
          </p>
          <Link to="/auth">
            <Button size="lg" variant="secondary" className="text-lg px-8 py-6">
              Sign Up Now
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-muted py-8 px-4">
        <div className="max-w-7xl mx-auto text-center text-muted-foreground">
          <p>&copy; 2025 KIITSTOP. Made for KIIT University Campus Community.</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
