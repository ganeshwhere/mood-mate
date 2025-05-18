import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  ArrowRight,
  Heart,
  Brain,
  Sparkles,
  Shield,
  LineChart,
  Calendar,
  FileText,
  MessageCircle,
  Star,
  CheckCircle,
  CloudSun,
  Moon,
  Target,
  Users,
  Bell,
  Sun,
  ChevronDown,
  Menu,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { useTheme } from '@/components/theme-provider';

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5 },
};

const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.2,
    },
  },
};

// Mobile-optimized feature card
const FeatureCard = ({
  icon: Icon,
  title,
  description,
  className,
  iconColor = 'text-primary',
  iconBg = 'bg-primary/10',
}: {
  icon: React.ElementType;
  title: string;
  description: string;
  className?: string;
  iconColor?: string;
  iconBg?: string;
}) => (
  <motion.div
    variants={fadeInUp}
    className={cn(
      'bg-card border rounded-xl p-6 sm:p-8 hover:shadow-lg transition-all',
      'hover:scale-105 hover:bg-accent/5',
      className
    )}
  >
    <div
      className={cn(
        'mb-4 sm:mb-6 flex items-center justify-center w-12 h-12 sm:w-16 sm:h-16 rounded-2xl',
        iconBg
      )}
    >
      <Icon className={cn('w-6 h-6 sm:w-8 sm:h-8', iconColor)} />
    </div>
    <h3 className="text-lg sm:text-xl font-semibold mb-2 sm:mb-3">{title}</h3>
    <p className="text-sm sm:text-base text-muted-foreground">{description}</p>
  </motion.div>
);

const features = [
  {
    icon: LineChart,
    title: 'Mood Tracking',
    description:
      'Track daily emotions with our intuitive mood tracker. Identify patterns and triggers to better understand your mental health journey.',
    iconColor: 'text-blue-500',
    iconBg: 'bg-blue-500/10',
  },
  {
    icon: Brain,
    title: 'Mindfulness Exercises',
    description:
      'Access guided breathing exercises, meditation sessions, and mindfulness practices to reduce stress and anxiety.',
    iconColor: 'text-purple-500',
    iconBg: 'bg-purple-500/10',
  },
  {
    icon: FileText,
    title: 'Journal & Notes',
    description:
      'Document your thoughts, feelings, and experiences with our digital journal. Includes guided prompts and mood-based templates.',
    iconColor: 'text-teal-500',
    iconBg: 'bg-teal-500/10',
  },
  {
    icon: Calendar,
    title: 'Mood Calendar',
    description:
      'Visualize your emotional patterns over time with our interactive mood calendar. Track progress and identify trends.',
    iconColor: 'text-amber-500',
    iconBg: 'bg-amber-500/10',
  },
  {
    icon: MessageCircle,
    title: 'AI Support',
    description:
      'Get 24/7 support from our AI companion. Receive personalized recommendations, coping strategies, and emotional support.',
    iconColor: 'text-rose-500',
    iconBg: 'bg-rose-500/10',
  },
  {
    icon: Shield,
    title: 'Privacy First',
    description:
      'Your mental health data is encrypted and secure. We prioritize your privacy with industry-leading security measures.',
    iconColor: 'text-emerald-500',
    iconBg: 'bg-emerald-500/10',
  },
];

const Landing = () => {
  const { theme, setTheme } = useTheme();

  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  const scrollToSection = (elementId: string) => {
    const element = document.getElementById(elementId);
    if (element) {
      const offset = 96; // Navbar height + some padding
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-rose-500/5 to-transparent relative">
      {/* Background Pattern - Optimized for mobile */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:16px_16px] sm:bg-[size:24px_24px]" />
        <div className="absolute left-0 right-0 top-0 -z-10 m-auto h-[600px] sm:h-[800px] w-full bg-[radial-gradient(circle_at_top,rgba(var(--primary-rgb),0.15),transparent_50%)]" />
      </div>

      {/* Modern Navigation */}
      <div className="w-full flex justify-center pt-4 z-50 fixed">
        <nav className="sticky top-4 z-50 backdrop-blur-md rounded-full border shadow-sm px-6 py-3 max-w-7xl w-full mx-4 bg-background/60">
          <div className="flex justify-between items-center">
            <Link
              to="/"
              className="flex items-center space-x-2 hover:opacity-80 transition-opacity"
            >
              <span className="text-xl sm:text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-rose-500 to-purple-500">
                Mood Mate
              </span>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-6">
              <button
                onClick={() => scrollToSection('features')}
                className="text-muted-foreground hover:text-foreground transition-colors hover:scale-105 transform"
              >
                Features
              </button>
              <button
                onClick={() => scrollToSection('how-it-works')}
                className="text-muted-foreground hover:text-foreground transition-colors hover:scale-105 transform"
              >
                How it Works
              </button>
              <Button
                variant="ghost"
                size="icon"
                onClick={toggleTheme}
                className="hover:bg-accent/10"
              >
                {theme === 'dark' ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
              </Button>
              <Link to="/signin">
                <Button
                  variant="ghost"
                  className="hover:scale-105 transform border border-rose-300 rounded-3xl"
                >
                  Sign In
                </Button>
              </Link>
              <Link to="/signup">
                <Button className="bg-gradient-to-r from-rose-500 to-purple-500 hover:scale-105 transform transition-all shadow-lg rounded-3xl hover:shadow-rose-500/25">
                  Get Started Free
                </Button>
              </Link>
            </div>

            {/* Mobile menu button */}
            <div className="flex items-center gap-2 md:hidden">
              <Button
                variant="ghost"
                size="icon"
                onClick={toggleTheme}
                className="hover:bg-accent/10"
              >
                {theme === 'dark' ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
              </Button>
            </div>
          </div>
        </nav>
      </div>

      <main className="space-y-16 sm:space-y-24">
        {/* Mobile-optimized Hero Section */}
        <section className="relative py-16 sm:py-24 overflow-hidden">
          <div className="absolute inset-0" />
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative"
          >
            <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-64 sm:w-96 h-64 sm:h-96 bg-gradient-to-r from-rose-500/20 to-purple-500/20 rounded-full blur-3xl opacity-30" />
            <h1 className="text-3xl sm:text-5xl md:text-7xl font-bold tracking-tight mb-4 sm:mb-6 mt-32 bg-clip-text text-transparent bg-gradient-to-r from-foreground to-foreground/80">
              Your Personal Mental{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-rose-500 to-purple-500">
                Wellness
              </span>{' '}
              Companion
            </h1>
            <p className="text-base sm:text-xl text-muted-foreground mb-6 sm:mb-8 max-w-2xl mx-auto">
              Track your mood, practice mindfulness, and nurture your mental health with Mood Mate's
              comprehensive suite of tools and AI-powered support.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
              <Link to="/signin" className="w-full sm:w-auto">
                <Button
                  size="lg"
                  className="w-full text-base sm:text-lg px-6 sm:px-8 bg-gradient-to-r from-rose-500 to-purple-500 hover:scale-105 transform transition-all shadow-lg hover:shadow-rose-500/25"
                >
                  Start Free <ArrowRight className="ml-2 w-4 h-4 sm:w-5 sm:h-5" />
                </Button>
              </Link>
              <a href="#how-it-works" className="w-full sm:w-auto">
                <Button
                  size="lg"
                  variant="outline"
                  className="w-full text-base sm:text-lg px-6 sm:px-8 border-rose-500/20 hover:border-rose-500 hover:scale-105 transform transition-all"
                >
                  See How It Works
                </Button>
              </a>
            </div>
          </motion.div>
        </section>

        {/* Mobile-optimized Features Grid */}
        <section id="features" className="py-16 sm:py-24 relative scroll-mt-24">
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-rose-500/5 to-transparent" />
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
            <div className="text-center mb-8 sm:mb-16">
              <h2 className="text-2xl sm:text-4xl font-bold mb-3 sm:mb-4 bg-clip-text text-transparent bg-gradient-to-r from-foreground to-foreground/80">
                Everything You Need for Mental Wellness
              </h2>
              <p className="text-base sm:text-xl text-muted-foreground max-w-2xl mx-auto">
                Comprehensive tools and features designed to support your mental health journey
              </p>
            </div>
            <motion.div
              variants={staggerContainer}
              initial="initial"
              whileInView="animate"
              viewport={{ once: true }}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-8"
            >
              {features.map((feature, index) => (
                <FeatureCard
                  key={index}
                  {...feature}
                  className="backdrop-blur-sm bg-background/50"
                />
              ))}
            </motion.div>
          </div>
        </section>

        {/* Mobile-optimized How It Works Section */}
        <section id="how-it-works" className="py-16 sm:py-24 relative scroll-mt-24">
          <div className="absolute inset-0" />
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
            <div className="text-center mb-8 sm:mb-16">
              <h2 className="text-2xl sm:text-4xl font-bold mb-3 sm:mb-4 bg-clip-text text-transparent bg-gradient-to-r from-foreground to-foreground/80">
                How Mood Mate Works
              </h2>
              <p className="text-base sm:text-xl text-muted-foreground max-w-2xl mx-auto">
                Your daily companion for mental wellness, supporting you every step of the way
              </p>
            </div>
            <motion.div
              variants={staggerContainer}
              initial="initial"
              whileInView="animate"
              viewport={{ once: true }}
              className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-8"
            >
              <motion.div variants={fadeInUp} className="text-center">
                <div className="mb-6 mx-auto w-20 h-20 rounded-2xl bg-blue-500/10 flex items-center justify-center">
                  <CloudSun className="w-10 h-10 text-blue-500" />
                </div>
                <h3 className="text-lg font-semibold mb-3">Daily Check-in</h3>
                <p className="text-muted-foreground">
                  Start your day with a quick mood check-in and personalized recommendations
                </p>
              </motion.div>
              <motion.div variants={fadeInUp} className="text-center">
                <div className="mb-6 mx-auto w-20 h-20 rounded-2xl bg-purple-500/10 flex items-center justify-center">
                  <Target className="w-10 h-10 text-purple-500" />
                </div>
                <h3 className="text-lg font-semibold mb-3">Track Progress</h3>
                <p className="text-muted-foreground">
                  Monitor your mental health journey with detailed insights and analytics
                </p>
              </motion.div>
              <motion.div variants={fadeInUp} className="text-center">
                <div className="mb-6 mx-auto w-20 h-20 rounded-2xl bg-teal-500/10 flex items-center justify-center">
                  <Brain className="w-10 h-10 text-teal-500" />
                </div>
                <h3 className="text-lg font-semibold mb-3">Practice Mindfulness</h3>
                <p className="text-muted-foreground">
                  Access guided exercises and meditation sessions anytime, anywhere
                </p>
              </motion.div>
              <motion.div variants={fadeInUp} className="text-center">
                <div className="mb-6 mx-auto w-20 h-20 rounded-2xl bg-amber-500/10 flex items-center justify-center">
                  <MessageCircle className="w-10 h-10 text-amber-500" />
                </div>
                <h3 className="text-lg font-semibold mb-3">Get Support</h3>
                <p className="text-muted-foreground">
                  Connect with our AI assistant for 24/7 emotional support and guidance
                </p>
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 sm:py-24 relative">
          <div className="absolute inset-0" />
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="bg-background/50 backdrop-blur-sm rounded-2xl p-8 sm:p-12 border shadow-lg"
            >
              <h2 className="text-2xl sm:text-4xl font-bold mb-4 sm:mb-6 text-center bg-clip-text text-transparent bg-gradient-to-r from-rose-500 to-purple-500">
                Start Your Mental Wellness Journey Today
              </h2>

              <p className="text-base sm:text-xl text-muted-foreground mb-8 text-center max-w-2xl mx-auto">
                Join thousands of others who have taken the first step towards better mental health
                with Mood Mate.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
                <Link to="/signup" className="w-full sm:w-auto">
                  <Button
                    size="lg"
                    className="w-full text-base sm:text-lg px-6 sm:px-8 bg-gradient-to-r from-rose-500 to-purple-500 hover:scale-105 transform transition-all shadow-lg hover:shadow-rose-500/25"
                  >
                    Get Started Free <ArrowRight className="ml-2 w-4 h-4 sm:w-5 sm:h-5" />
                  </Button>
                </Link>
                <Link to="/signin" className="w-full sm:w-auto">
                  <Button
                    size="lg"
                    variant="outline"
                    className="w-full text-base sm:text-lg px-6 sm:px-8 border-rose-500/20 hover:border-rose-500 hover:scale-105 transform transition-all"
                  >
                    Sign In
                  </Button>
                </Link>
              </div>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-8 text-sm sm:text-base text-muted-foreground">
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-rose-500" />
                  <span>14-day free trial</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-purple-500" />
                  <span>No credit card required</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-rose-500" />
                  <span>Cancel anytime</span>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Mobile-optimized Footer */}
        <footer className="border-t py-8 sm:py-16 relative">
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-rose-500/5" />
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 sm:gap-12">
              <div className="col-span-2 md:col-span-1">
                <div className="flex items-center space-x-2 mb-4">
                  <span className="text-lg sm:text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-rose-500 to-purple-500">
                    Mood Mate
                  </span>
                </div>
                <p className="text-sm sm:text-base text-muted-foreground">
                  Your personal mental wellness companion, available 24/7.
                </p>
              </div>
              <div>
                <h4 className="font-semibold mb-3 sm:mb-4">Features</h4>
                <ul className="space-y-2 text-sm sm:text-base text-muted-foreground">
                  <li>Mood Tracking</li>
                  <li>Mindfulness Exercises</li>
                  <li>Journal & Notes</li>
                  <li>AI Support</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold mb-3 sm:mb-4">Company</h4>
                <ul className="space-y-2 text-sm sm:text-base text-muted-foreground">
                  <li>About Us</li>
                  <li>Privacy Policy</li>
                  <li>Terms of Service</li>
                  <li>Contact</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold mb-3 sm:mb-4">Connect</h4>
                <ul className="space-y-2 text-sm sm:text-base text-muted-foreground">
                  <li>Twitter</li>
                  <li>Instagram</li>
                  <li>Facebook</li>
                  <li>LinkedIn</li>
                </ul>
              </div>
            </div>
            <div className="mt-8 sm:mt-12 pt-6 sm:pt-8 border-t text-center text-sm sm:text-base text-muted-foreground">
              <p>© {new Date().getFullYear()} Mood Mate. All rights reserved.</p>
            </div>
          </div>
        </footer>
      </main>
    </div>
  );
};

export default Landing;
