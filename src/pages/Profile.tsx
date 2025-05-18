import { useState, useEffect } from 'react';
import {
  User,
  Mail,
  Calendar,
  Watch,
  Bell,
  Shield,
  Globe,
  Moon,
  Sun,
  Heart,
  Brain,
  Activity,
  LogOut,
  LogIn,
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/components/ui/use-toast';

interface UserData {
  name?: string;
  email?: string;
  userType?: string;
  createdAt?: string;
  lastLogin?: string;
}

const Profile = () => {
  const [notifications, setNotifications] = useState(true);
  const [darkMode, setDarkMode] = useState(false);
  const [language, setLanguage] = useState('en');
  const [userData, setUserData] = useState<UserData>({});
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    // Load user data from local storage
    const storedUserData = localStorage.getItem('moodmate_user');
    if (storedUserData) {
      const parsedData = JSON.parse(storedUserData);
      // If email exists but no name, set name as Guest User
      if (parsedData.email && !parsedData.name) {
        parsedData.name = 'Guest User';
      }
      setUserData(parsedData);
    }
  }, []);

  const handleSignOut = async () => {
    try {
      await logout();
      // Clear local storage on logout
      localStorage.removeItem('moodmate_user');
      localStorage.removeItem('moodmate_auth_token');

      toast({
        title: 'Success',
        description: 'You have been signed out successfully.',
      });
      navigate('/signin');
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to sign out. Please try again.',
        variant: 'destructive',
      });
    }
  };

  const handleSignIn = () => {
    navigate('/signin');
  };

  const handleSaveChanges = () => {
    // Don't save if name is empty
    if (!userData.name?.trim()) {
      toast({
        title: 'Error',
        description: 'Please enter your name.',
        variant: 'destructive',
      });
      return;
    }

    // Update local storage with any changes
    localStorage.setItem('moodmate_user', JSON.stringify(userData));
    toast({
      title: 'Success',
      description: 'Profile updated successfully.',
    });
  };

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-4">
          <Avatar className="h-20 w-20">
            <AvatarImage src="/placeholder-avatar.jpg" alt="User avatar" />
            <AvatarFallback>{userData.name?.substring(0, 2).toUpperCase() || 'GU'}</AvatarFallback>
          </Avatar>
          <div>
            <h1 className="text-2xl font-bold">{userData.name || 'Guest User'}</h1>
            <p className="text-muted-foreground">{userData.email || 'Not signed in'}</p>
            {userData.userType && (
              <p className="text-sm text-muted-foreground capitalize">{userData.userType}</p>
            )}
          </div>
        </div>
        {userData.email ? (
          <Button variant="outline" className="flex items-center gap-2" onClick={handleSignOut}>
            <LogOut className="h-4 w-4" />
            Sign Out
          </Button>
        ) : (
          <Button variant="default" className="flex items-center gap-2" onClick={handleSignIn}>
            <LogIn className="h-4 w-4" />
            Sign In
          </Button>
        )}
      </div>

      <Tabs defaultValue="profile" className="space-y-4">
        <TabsList>
          <TabsTrigger value="profile">Profile</TabsTrigger>
          <TabsTrigger value="preferences">Preferences</TabsTrigger>
          <TabsTrigger value="integrations">Integrations</TabsTrigger>
        </TabsList>

        <TabsContent value="profile" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Personal Information</CardTitle>
              <CardDescription>Update your personal details</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name</Label>
                  <Input
                    id="name"
                    value={userData.name || ''}
                    onChange={e => setUserData(prev => ({ ...prev, name: e.target.value }))}
                    placeholder="Enter your name"
                    className="bg-background"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={userData.email || ''}
                    onChange={e => setUserData(prev => ({ ...prev, email: e.target.value }))}
                    className="bg-background"
                    disabled
                  />
                </div>
              </div>
              {userData.userType && (
                <div className="space-y-2">
                  <Label>User Type</Label>
                  <Input value={userData.userType} disabled className="bg-muted" />
                </div>
              )}
              {userData.lastLogin && (
                <div className="text-sm text-muted-foreground">
                  Last login: {new Date(userData.lastLogin).toLocaleString()}
                </div>
              )}
              <Button onClick={handleSaveChanges}>Save Changes</Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Mental Health Goals</CardTitle>
              <CardDescription>Set your wellness objectives</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-center space-x-2">
                  <Heart className="h-5 w-5 text-red-500" />
                  <span>Stress Management</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Brain className="h-5 w-5 text-blue-500" />
                  <span>Mindfulness</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Activity className="h-5 w-5 text-green-500" />
                  <span>Physical Activity</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="preferences" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>App Preferences</CardTitle>
              <CardDescription>Customize your app experience</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Push Notifications</Label>
                  <p className="text-sm text-muted-foreground">
                    Receive updates about your mental health journey
                  </p>
                </div>
                <Switch checked={notifications} onCheckedChange={setNotifications} />
              </div>
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Dark Mode</Label>
                  <p className="text-sm text-muted-foreground">Toggle dark/light theme</p>
                </div>
                <Switch checked={darkMode} onCheckedChange={setDarkMode} />
              </div>
              <div className="space-y-2">
                <Label>Language</Label>
                <select
                  className="w-full p-2 border rounded-md bg-background text-foreground"
                  value={language}
                  onChange={e => setLanguage(e.target.value)}
                >
                  <option value="en">English</option>
                  <option value="es">Spanish</option>
                  <option value="fr">French</option>
                  <option value="de">German</option>
                </select>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="integrations" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Device Integrations</CardTitle>
              <CardDescription>Connect your devices for better tracking</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between p-4 border rounded-lg bg-card">
                <div className="flex items-center space-x-4">
                  <Watch className="h-8 w-8 text-blue-500" />
                  <div>
                    <h3 className="font-medium text-foreground">Smart Watch</h3>
                    <p className="text-sm text-muted-foreground">
                      Track heart rate, sleep, and activity
                    </p>
                  </div>
                </div>
                <Button variant="outline">Connect</Button>
              </div>

              <div className="flex items-center justify-between p-4 border rounded-lg bg-card">
                <div className="flex items-center space-x-4">
                  <Calendar className="h-8 w-8 text-green-500" />
                  <div>
                    <h3 className="font-medium text-foreground">Calendar</h3>
                    <p className="text-sm text-muted-foreground">
                      Sync your schedule and appointments
                    </p>
                  </div>
                </div>
                <Button variant="outline">Connect</Button>
              </div>

              <div className="flex items-center justify-between p-4 border rounded-lg bg-card">
                <div className="flex items-center space-x-4">
                  <Bell className="h-8 w-8 text-purple-500" />
                  <div>
                    <h3 className="font-medium text-foreground">Reminders</h3>
                    <p className="text-sm text-muted-foreground">
                      Set up medication and therapy reminders
                    </p>
                  </div>
                </div>
                <Button variant="outline">Connect</Button>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Data & Privacy</CardTitle>
              <CardDescription>Manage your data and privacy settings</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label className="text-foreground">Data Sharing</Label>
                  <p className="text-sm text-muted-foreground">
                    Allow anonymous data collection for research
                  </p>
                </div>
                <Switch />
              </div>
              <Button variant="outline" className="w-full">
                Export My Data
              </Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Profile;
