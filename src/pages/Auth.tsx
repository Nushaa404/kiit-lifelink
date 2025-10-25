import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { GraduationCap, Users, Briefcase } from "lucide-react";

const Auth = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [role, setRole] = useState<"student" | "faculty" | "club">("student");
  
  // Login state
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  
  // Signup state
  const [signupEmail, setSignupEmail] = useState("");
  const [signupPassword, setSignupPassword] = useState("");
  const [fullName, setFullName] = useState("");
  
  // Student specific
  const [semester, setSemester] = useState("");
  const [branch, setBranch] = useState("");
  
  // Faculty specific
  const [department, setDepartment] = useState("");
  
  // Club specific
  const [clubName, setClubName] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: loginEmail,
        password: loginPassword,
      });

      if (error) throw error;

      toast({
        title: "Welcome back!",
        description: "Successfully logged in.",
      });

      navigate("/dashboard");
    } catch (error: any) {
      toast({
        title: "Login failed",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Create auth user
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email: signupEmail,
        password: signupPassword,
        options: {
          emailRedirectTo: `${window.location.origin}/dashboard`,
        }
      });

      if (authError) throw authError;
      if (!authData.user) throw new Error("Signup failed");

      // Create profile
      const { error: profileError } = await supabase
        .from("profiles")
        .insert({
          id: authData.user.id,
          email: signupEmail,
          full_name: fullName,
          role: role,
        });

      if (profileError) throw profileError;

      // Create role-specific profile
      if (role === "student") {
        const { error: studentError } = await supabase
          .from("student_profiles")
          .insert({
            id: authData.user.id,
            semester: parseInt(semester),
            branch: branch,
            interests: [],
            tokens: 0,
          });
        if (studentError) throw studentError;
      } else if (role === "faculty") {
        const { error: facultyError } = await supabase
          .from("faculty_profiles")
          .insert({
            id: authData.user.id,
            department: department,
            subjects: [],
          });
        if (facultyError) throw facultyError;
      } else if (role === "club") {
        const { error: clubError } = await supabase
          .from("club_profiles")
          .insert({
            id: authData.user.id,
            club_name: clubName,
            description: "",
          });
        if (clubError) throw clubError;
      }

      toast({
        title: "Account created!",
        description: "Please check your email to verify your account.",
      });

      navigate("/dashboard");
    } catch (error: any) {
      toast({
        title: "Signup failed",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const roleIcons = {
    student: GraduationCap,
    faculty: Briefcase,
    club: Users,
  };

  const RoleIcon = roleIcons[role];

  return (
    <div className="min-h-screen gradient-hero flex items-center justify-center p-4">
      <Card className="w-full max-w-md p-8 animate-scale-in">
        <div className="text-center mb-6">
          <h1 className="text-3xl font-bold gradient-text mb-2">KIITSTOP</h1>
          <p className="text-muted-foreground">Your Campus Management Portal</p>
        </div>

        <Tabs defaultValue="login" className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-6">
            <TabsTrigger value="login">Login</TabsTrigger>
            <TabsTrigger value="signup">Sign Up</TabsTrigger>
          </TabsList>

          {/* Login Tab */}
          <TabsContent value="login">
            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <Label htmlFor="login-email">Email</Label>
                <Input
                  id="login-email"
                  type="email"
                  placeholder="your.email@kiit.ac.in"
                  value={loginEmail}
                  onChange={(e) => setLoginEmail(e.target.value)}
                  required
                />
              </div>
              <div>
                <Label htmlFor="login-password">Password</Label>
                <Input
                  id="login-password"
                  type="password"
                  placeholder="••••••••"
                  value={loginPassword}
                  onChange={(e) => setLoginPassword(e.target.value)}
                  required
                />
              </div>
              <Button type="submit" className="w-full" disabled={loading}>
                {loading ? "Logging in..." : "Login"}
              </Button>
            </form>
          </TabsContent>

          {/* Signup Tab */}
          <TabsContent value="signup">
            <form onSubmit={handleSignup} className="space-y-4">
              {/* Role Selection */}
              <div>
                <Label>I am a</Label>
                <div className="grid grid-cols-3 gap-2 mt-2">
                  {(["student", "faculty", "club"] as const).map((r) => {
                    const Icon = roleIcons[r];
                    return (
                      <Button
                        key={r}
                        type="button"
                        variant={role === r ? "default" : "outline"}
                        className="flex flex-col h-20"
                        onClick={() => setRole(r)}
                      >
                        <Icon className="w-5 h-5 mb-1" />
                        <span className="text-xs capitalize">{r}</span>
                      </Button>
                    );
                  })}
                </div>
              </div>

              <div>
                <Label htmlFor="full-name">Full Name</Label>
                <Input
                  id="full-name"
                  placeholder="Your name"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  required
                />
              </div>

              <div>
                <Label htmlFor="signup-email">Email</Label>
                <Input
                  id="signup-email"
                  type="email"
                  placeholder="your.email@kiit.ac.in"
                  value={signupEmail}
                  onChange={(e) => setSignupEmail(e.target.value)}
                  required
                />
              </div>

              <div>
                <Label htmlFor="signup-password">Password</Label>
                <Input
                  id="signup-password"
                  type="password"
                  placeholder="••••••••"
                  value={signupPassword}
                  onChange={(e) => setSignupPassword(e.target.value)}
                  required
                />
              </div>

              {/* Role-specific fields */}
              {role === "student" && (
                <>
                  <div>
                    <Label htmlFor="semester">Semester</Label>
                    <Select value={semester} onValueChange={setSemester} required>
                      <SelectTrigger>
                        <SelectValue placeholder="Select semester" />
                      </SelectTrigger>
                      <SelectContent>
                        {[1, 2, 3, 4, 5, 6, 7, 8].map((sem) => (
                          <SelectItem key={sem} value={sem.toString()}>
                            Semester {sem}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="branch">Branch</Label>
                    <Select value={branch} onValueChange={setBranch} required>
                      <SelectTrigger>
                        <SelectValue placeholder="Select branch" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="CSE">Computer Science</SelectItem>
                        <SelectItem value="IT">Information Technology</SelectItem>
                        <SelectItem value="ECE">Electronics & Communication</SelectItem>
                        <SelectItem value="MECH">Mechanical Engineering</SelectItem>
                        <SelectItem value="CIVIL">Civil Engineering</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </>
              )}

              {role === "faculty" && (
                <div>
                  <Label htmlFor="department">Department</Label>
                  <Input
                    id="department"
                    placeholder="e.g., Computer Science"
                    value={department}
                    onChange={(e) => setDepartment(e.target.value)}
                    required
                  />
                </div>
              )}

              {role === "club" && (
                <div>
                  <Label htmlFor="club-name">Club Name</Label>
                  <Input
                    id="club-name"
                    placeholder="e.g., Tech Society"
                    value={clubName}
                    onChange={(e) => setClubName(e.target.value)}
                    required
                  />
                </div>
              )}

              <Button type="submit" className="w-full" disabled={loading}>
                {loading ? "Creating account..." : "Sign Up"}
              </Button>
            </form>
          </TabsContent>
        </Tabs>
      </Card>
    </div>
  );
};

export default Auth;
