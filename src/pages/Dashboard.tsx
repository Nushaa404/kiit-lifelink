import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { User } from "@supabase/supabase-js";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { Calendar, MessageSquare, Bell, Map, Award, LogOut, Book, Users, Clock, Sparkles } from "lucide-react";
import { EventsCalendar } from "@/components/EventsCalendar";
import { Badge } from "@/components/ui/badge";
import techFestImg from "@/assets/event-tech-fest.jpg";
import culturalImg from "@/assets/event-cultural.jpg";
import sportsImg from "@/assets/event-sports.jpg";
import workshopImg from "@/assets/event-workshop.jpg";

const Dashboard = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check auth state
    const checkUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        navigate("/auth");
        return;
      }

      setUser(user);
      
      // Fetch profile
      const { data: profileData } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", user.id)
        .single();

      setProfile(profileData);
      setLoading(false);
    };

    checkUser();

    // Listen to auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      if (!session) {
        navigate("/auth");
      }
    });

    return () => subscription.unsubscribe();
  }, [navigate]);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    toast({
      title: "Logged out",
      description: "See you soon!",
    });
    navigate("/");
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading your dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-muted/30">
      {/* Header */}
      <header className="gradient-hero text-white">
        <div className="max-w-7xl mx-auto px-4 py-6 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">KIITSTOP</h1>
            <p className="text-white/80">Welcome back, {profile?.full_name}</p>
          </div>
          <div className="flex items-center gap-4">
            <div className="text-right mr-4">
              <p className="text-sm text-white/80">Role</p>
              <p className="font-semibold capitalize">{profile?.role}</p>
            </div>
            <Button variant="secondary" onClick={handleLogout}>
              <LogOut className="w-4 h-4 mr-2" />
              Logout
            </Button>
          </div>
        </div>
      </header>

      {/* Main Dashboard */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid gap-6 mb-8">
          {/* Quick Stats */}
          <div className="grid md:grid-cols-4 gap-4">
            <Card className="p-4 gradient-card hover-lift animate-scale-in">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                  <Calendar className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Today's Classes</p>
                  <p className="text-2xl font-bold">4</p>
                </div>
              </div>
            </Card>
            
            <Card className="p-4 gradient-card hover-lift animate-scale-in" style={{ animationDelay: "0.1s" }}>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center">
                  <Bell className="w-5 h-5 text-accent" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">New Notices</p>
                  <p className="text-2xl font-bold">7</p>
                </div>
              </div>
            </Card>
            
            <Card className="p-4 gradient-card hover-lift animate-scale-in" style={{ animationDelay: "0.2s" }}>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                  <Award className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Your Tokens</p>
                  <p className="text-2xl font-bold">150</p>
                </div>
              </div>
            </Card>
            
            <Card className="p-4 gradient-card hover-lift animate-scale-in" style={{ animationDelay: "0.3s" }}>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center">
                  <Users className="w-5 h-5 text-accent" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Events This Week</p>
                  <p className="text-2xl font-bold">3</p>
                </div>
              </div>
            </Card>
          </div>

          {/* Main Content Tabs */}
          <Tabs defaultValue="overview" className="w-full">
            <TabsList className="grid w-full grid-cols-5">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="calendar">Calendar</TabsTrigger>
              <TabsTrigger value="forums">Forums</TabsTrigger>
              <TabsTrigger value="notices">Notices</TabsTrigger>
              <TabsTrigger value="map">Campus Map</TabsTrigger>
            </TabsList>

            {/* Overview Tab */}
            <TabsContent value="overview" className="space-y-6">
              <Card className="p-6">
                <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                  <Calendar className="w-5 h-5 text-primary" />
                  Today's Schedule
                </h3>
                <div className="space-y-3">
                  {[
                    { time: "09:00 AM", subject: "Data Structures", room: "Room 301", faculty: "Dr. Sharma" },
                    { time: "11:00 AM", subject: "Database Management", room: "Lab 2", faculty: "Prof. Patel" },
                    { time: "02:00 PM", subject: "Operating Systems", room: "Room 405", faculty: "Dr. Kumar" },
                    { time: "04:00 PM", subject: "Web Development", room: "Lab 3", faculty: "Prof. Singh" },
                  ].map((cls, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                      <div className="flex items-center gap-4">
                        <div className="text-sm font-medium text-primary">{cls.time}</div>
                        <div>
                          <p className="font-medium">{cls.subject}</p>
                          <p className="text-sm text-muted-foreground">{cls.faculty}</p>
                        </div>
                      </div>
                      <div className="text-sm text-muted-foreground">{cls.room}</div>
                    </div>
                  ))}
                </div>
              </Card>

              <div className="grid md:grid-cols-2 gap-6">
                <Card className="p-6">
                  <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                    <Book className="w-5 h-5 text-accent" />
                    Attendance Summary
                  </h3>
                  <div className="space-y-3">
                    {[
                      { subject: "Data Structures", percentage: 85, color: "bg-green-500" },
                      { subject: "Database Management", percentage: 92, color: "bg-primary" },
                      { subject: "Operating Systems", percentage: 78, color: "bg-yellow-500" },
                      { subject: "Web Development", percentage: 95, color: "bg-primary" },
                    ].map((subject, index) => (
                      <div key={index}>
                        <div className="flex justify-between text-sm mb-1">
                          <span>{subject.subject}</span>
                          <span className="font-medium">{subject.percentage}%</span>
                        </div>
                        <div className="w-full bg-muted rounded-full h-2">
                          <div 
                            className={`h-2 rounded-full ${subject.color}`}
                            style={{ width: `${subject.percentage}%` }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </Card>

                <Card className="p-6">
                  <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                    <Bell className="w-5 h-5 text-primary" />
                    Recent Notices
                  </h3>
                  <div className="space-y-3">
                    {[
                      { title: "Exam Schedule Released", category: "Academic", time: "2 hours ago" },
                      { title: "Tech Fest Registration Open", category: "Event", time: "5 hours ago" },
                      { title: "Library Timing Updated", category: "General", time: "1 day ago" },
                      { title: "Placement Drive Announced", category: "Urgent", time: "2 days ago" },
                    ].map((notice, index) => (
                      <div key={index} className="p-3 bg-muted/50 rounded-lg">
                        <div className="flex items-start justify-between">
                          <div>
                            <p className="font-medium">{notice.title}</p>
                            <p className="text-sm text-muted-foreground">{notice.time}</p>
                          </div>
                          <span className="text-xs px-2 py-1 bg-primary/10 text-primary rounded-full">
                            {notice.category}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </Card>
              </div>

              {/* Featured Events - Poster Grid */}
              <Card className="p-6">
                <h3 className="text-2xl font-semibold mb-2 flex items-center gap-2">
                  <Sparkles className="w-6 h-6 text-primary" />
                  Upcoming Events
                </h3>
                <p className="text-muted-foreground mb-6">Don't miss out on these exciting campus events</p>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="group relative overflow-hidden rounded-lg border border-primary/20 hover:border-primary/40 transition-all hover:shadow-glow cursor-pointer">
                    <img 
                      src={techFestImg} 
                      alt="TechFest 2025" 
                      className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/50 to-transparent flex flex-col justify-end p-4">
                      <Badge className="w-fit mb-2 bg-primary/20 text-primary border-primary/30">Tech Fest</Badge>
                      <h4 className="font-bold text-lg">TechFest 2025</h4>
                      <div className="flex items-center gap-3 text-sm text-muted-foreground mt-1">
                        <span className="flex items-center gap-1">
                          <Calendar className="w-3 h-3" />
                          Oct 28
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          10:00 AM
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="group relative overflow-hidden rounded-lg border border-purple-500/20 hover:border-purple-500/40 transition-all hover:shadow-glow cursor-pointer">
                    <img 
                      src={culturalImg} 
                      alt="Cultural Fest" 
                      className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/50 to-transparent flex flex-col justify-end p-4">
                      <Badge className="w-fit mb-2 bg-purple-500/20 text-purple-500 border-purple-500/30">Cultural</Badge>
                      <h4 className="font-bold text-lg">Cultural Fest</h4>
                      <div className="flex items-center gap-3 text-sm text-muted-foreground mt-1">
                        <span className="flex items-center gap-1">
                          <Calendar className="w-3 h-3" />
                          Oct 30
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          5:00 PM
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="group relative overflow-hidden rounded-lg border border-orange-500/20 hover:border-orange-500/40 transition-all hover:shadow-glow cursor-pointer">
                    <img 
                      src={sportsImg} 
                      alt="Sports Tournament" 
                      className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/50 to-transparent flex flex-col justify-end p-4">
                      <Badge className="w-fit mb-2 bg-orange-500/20 text-orange-500 border-orange-500/30">Sports</Badge>
                      <h4 className="font-bold text-lg">Sports Tournament</h4>
                      <div className="flex items-center gap-3 text-sm text-muted-foreground mt-1">
                        <span className="flex items-center gap-1">
                          <Calendar className="w-3 h-3" />
                          Nov 2
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          8:00 AM
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="group relative overflow-hidden rounded-lg border border-primary/20 hover:border-primary/40 transition-all hover:shadow-glow cursor-pointer">
                    <img 
                      src={workshopImg} 
                      alt="AI Workshop" 
                      className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/50 to-transparent flex flex-col justify-end p-4">
                      <Badge className="w-fit mb-2 bg-primary/20 text-primary border-primary/30">Workshop</Badge>
                      <h4 className="font-bold text-lg">AI Workshop</h4>
                      <div className="flex items-center gap-3 text-sm text-muted-foreground mt-1">
                        <span className="flex items-center gap-1">
                          <Calendar className="w-3 h-3" />
                          Nov 5
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          2:00 PM
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            </TabsContent>

            {/* Calendar Tab */}
            <TabsContent value="calendar">
              <EventsCalendar />
            </TabsContent>

            {/* Forums Tab */}
            <TabsContent value="forums">
              <Card className="p-6">
                <h3 className="text-2xl font-semibold mb-4">Discussion Forums</h3>
                <div className="grid md:grid-cols-2 gap-4">
                  <Card className="p-4 hover-lift cursor-pointer">
                    <div className="flex items-center gap-3 mb-2">
                      <MessageSquare className="w-5 h-5 text-primary" />
                      <h4 className="font-semibold">Prep Forum</h4>
                    </div>
                    <p className="text-sm text-muted-foreground">Share study materials, notes, and resources</p>
                    <p className="text-xs text-primary mt-2">124 active discussions</p>
                  </Card>
                  
                  <Card className="p-4 hover-lift cursor-pointer">
                    <div className="flex items-center gap-3 mb-2">
                      <MessageSquare className="w-5 h-5 text-accent" />
                      <h4 className="font-semibold">Doubt Forum</h4>
                    </div>
                    <p className="text-sm text-muted-foreground">Ask questions and get help from faculty</p>
                    <p className="text-xs text-accent mt-2">87 open queries</p>
                  </Card>
                </div>
              </Card>
            </TabsContent>

            {/* Notices Tab */}
            <TabsContent value="notices">
              <Card className="p-6">
                <h3 className="text-2xl font-semibold mb-4">Central Notice Board</h3>
                <p className="text-muted-foreground mb-6">All important announcements in one place</p>
                <div className="space-y-4">
                  {Array.from({ length: 6 }).map((_, index) => (
                    <Card key={index} className="p-4 hover-lift">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <h4 className="font-semibold mb-1">Important Notice {index + 1}</h4>
                          <p className="text-sm text-muted-foreground mb-2">
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt.
                          </p>
                          <div className="flex items-center gap-4 text-xs text-muted-foreground">
                            <span>Department of CSE</span>
                            <span>•</span>
                            <span>Posted 2 days ago</span>
                          </div>
                        </div>
                        <span className="text-xs px-2 py-1 bg-primary/10 text-primary rounded-full whitespace-nowrap ml-4">
                          Academic
                        </span>
                      </div>
                    </Card>
                  ))}
                </div>
              </Card>
            </TabsContent>

            {/* Campus Map Tab */}
            <TabsContent value="map">
              <Card className="p-6">
                <h3 className="text-2xl font-semibold mb-4">Campus Navigation</h3>
                <p className="text-muted-foreground mb-6">Find your way around campus with our interactive map</p>
                <div className="mt-8 text-center py-24 bg-muted/30 rounded-lg">
                  <Map className="w-16 h-16 mx-auto text-primary mb-4" />
                  <p className="text-lg">Interactive campus map coming soon...</p>
                  <p className="text-sm text-muted-foreground mt-2">
                    Shows your current location and next class venue
                  </p>
                </div>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
