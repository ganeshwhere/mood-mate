import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { motion, AnimatePresence } from 'framer-motion';
import PageContainer from '@/components/layout/PageContainer';
import {
  ChevronRight,
  ChevronLeft,
  Heart,
  Brain,
  Moon,
  Zap,
  Activity,
  Users,
  Trophy,
  Plus,
} from 'lucide-react';

// Types
interface Question {
  id: number;
  category: string;
  text: string;
  description?: string;
  options: {
    value: number;
    label: string;
    description?: string;
  }[];
}

interface AssessmentState {
  currentStep: number;
  answers: Record<number, number>;
  isSubmitting: boolean;
  showResults: boolean;
  categoryScores: Record<string, number>;
}

// Assessment questions
const questions: Question[] = [
  // Emotional Well-being Category
  {
    id: 1,
    category: 'Emotional Well-being',
    text: 'How would you rate your overall mood today?',
    description: 'Consider your general emotional state and feelings',
    options: [
      {
        value: 1,
        label: 'Very Poor',
        description: 'Feeling extremely down or distressed',
      },
      {
        value: 2,
        label: 'Poor',
        description: 'Generally feeling low or negative',
      },
      {
        value: 3,
        label: 'Neutral',
        description: 'Feeling neither particularly good nor bad',
      },
      {
        value: 4,
        label: 'Good',
        description: 'Generally feeling positive and content',
      },
      {
        value: 5,
        label: 'Very Good',
        description: 'Feeling exceptionally happy and fulfilled',
      },
    ],
  },
  {
    id: 2,
    category: 'Emotional Well-being',
    text: 'How often do you experience feelings of anxiety or worry?',
    description: 'Consider both frequency and intensity of anxious thoughts',
    options: [
      {
        value: 1,
        label: 'Very Often',
        description: 'Almost constantly experiencing anxiety',
      },
      {
        value: 2,
        label: 'Often',
        description: 'Frequent anxiety throughout the day',
      },
      {
        value: 3,
        label: 'Sometimes',
        description: 'Occasional anxiety that comes and goes',
      },
      {
        value: 4,
        label: 'Rarely',
        description: 'Only occasional mild anxiety',
      },
      {
        value: 5,
        label: 'Never',
        description: 'No feelings of anxiety or worry',
      },
    ],
  },
  {
    id: 3,
    category: 'Emotional Well-being',
    text: 'How would you describe your ability to cope with stress?',
    description: 'Consider how well you handle challenging situations',
    options: [
      {
        value: 1,
        label: 'Very Poor',
        description: 'Often overwhelmed by stress',
      },
      { value: 2, label: 'Poor', description: 'Struggle to cope with stress' },
      {
        value: 3,
        label: 'Moderate',
        description: 'Generally handle stress okay',
      },
      { value: 4, label: 'Good', description: 'Usually cope well with stress' },
      {
        value: 5,
        label: 'Excellent',
        description: 'Very effective at managing stress',
      },
    ],
  },

  // Sleep Quality Category
  {
    id: 4,
    category: 'Sleep Quality',
    text: 'How well did you sleep last night?',
    description: 'Consider both duration and quality of sleep',
    options: [
      {
        value: 1,
        label: 'Very Poor',
        description: 'Slept very little or had severe sleep issues',
      },
      {
        value: 2,
        label: 'Poor',
        description: 'Had trouble falling or staying asleep',
      },
      { value: 3, label: 'Fair', description: 'Slept okay but not great' },
      {
        value: 4,
        label: 'Good',
        description: 'Slept well for most of the night',
      },
      { value: 5, label: 'Very Good', description: 'Slept exceptionally well' },
    ],
  },
  {
    id: 5,
    category: 'Sleep Quality',
    text: 'How consistent is your sleep schedule?',
    description: 'Consider your bedtime and wake-up time regularity',
    options: [
      {
        value: 1,
        label: 'Very Irregular',
        description: 'No consistent sleep pattern',
      },
      {
        value: 2,
        label: 'Irregular',
        description: 'Often varying sleep schedule',
      },
      {
        value: 3,
        label: 'Moderate',
        description: 'Somewhat consistent schedule',
      },
      {
        value: 4,
        label: 'Regular',
        description: 'Mostly consistent sleep schedule',
      },
      {
        value: 5,
        label: 'Very Regular',
        description: 'Strict and consistent sleep schedule',
      },
    ],
  },

  // Energy Levels Category
  {
    id: 6,
    category: 'Energy Levels',
    text: 'How would you rate your energy levels?',
    description: 'Consider your physical and mental energy throughout the day',
    options: [
      {
        value: 1,
        label: 'Very Low',
        description: 'Extremely tired or exhausted',
      },
      {
        value: 2,
        label: 'Low',
        description: 'Feeling tired and lacking energy',
      },
      { value: 3, label: 'Moderate', description: 'Normal energy levels' },
      { value: 4, label: 'High', description: 'Feeling energetic and active' },
      {
        value: 5,
        label: 'Very High',
        description: 'Extremely energetic and motivated',
      },
    ],
  },
  {
    id: 7,
    category: 'Energy Levels',
    text: 'How would you rate your mental clarity and focus?',
    description: 'Consider your ability to concentrate and think clearly',
    options: [
      {
        value: 1,
        label: 'Very Poor',
        description: 'Extremely foggy and unfocused',
      },
      {
        value: 2,
        label: 'Poor',
        description: 'Often distracted and unfocused',
      },
      {
        value: 3,
        label: 'Moderate',
        description: 'Generally focused but sometimes distracted',
      },
      { value: 4, label: 'Good', description: 'Usually clear and focused' },
      {
        value: 5,
        label: 'Excellent',
        description: 'Very clear and highly focused',
      },
    ],
  },

  // Stress Levels Category
  {
    id: 8,
    category: 'Stress Levels',
    text: 'How would you rate your current stress levels?',
    description: 'Consider both work and personal life stressors',
    options: [
      { value: 1, label: 'Very High', description: 'Overwhelmed with stress' },
      { value: 2, label: 'High', description: 'Feeling quite stressed' },
      {
        value: 3,
        label: 'Moderate',
        description: 'Some stress but manageable',
      },
      { value: 4, label: 'Low', description: 'Generally relaxed' },
      {
        value: 5,
        label: 'Very Low',
        description: 'Completely relaxed and stress-free',
      },
    ],
  },
  {
    id: 9,
    category: 'Stress Levels',
    text: 'How well do you manage work-life balance?',
    description: 'Consider your ability to balance professional and personal life',
    options: [
      {
        value: 1,
        label: 'Very Poor',
        description: 'Work completely dominates life',
      },
      {
        value: 2,
        label: 'Poor',
        description: 'Often struggle with work-life balance',
      },
      {
        value: 3,
        label: 'Moderate',
        description: 'Generally balanced but sometimes challenging',
      },
      { value: 4, label: 'Good', description: 'Usually maintain good balance' },
      {
        value: 5,
        label: 'Excellent',
        description: 'Perfect work-life balance',
      },
    ],
  },

  // Social Connection Category
  {
    id: 10,
    category: 'Social Connection',
    text: 'How would you rate your social connections?',
    description: 'Consider your relationships and social interactions',
    options: [
      {
        value: 1,
        label: 'Very Poor',
        description: 'Feeling isolated or disconnected',
      },
      { value: 2, label: 'Poor', description: 'Limited social interaction' },
      { value: 3, label: 'Fair', description: 'Some social connections' },
      { value: 4, label: 'Good', description: 'Strong social network' },
      {
        value: 5,
        label: 'Very Good',
        description: 'Excellent social connections',
      },
    ],
  },
  {
    id: 11,
    category: 'Social Connection',
    text: 'How comfortable are you in social situations?',
    description: 'Consider your ease in interacting with others',
    options: [
      {
        value: 1,
        label: 'Very Uncomfortable',
        description: 'Extremely anxious in social settings',
      },
      {
        value: 2,
        label: 'Uncomfortable',
        description: 'Often feel uneasy in social situations',
      },
      {
        value: 3,
        label: 'Moderate',
        description: 'Generally comfortable but sometimes anxious',
      },
      {
        value: 4,
        label: 'Comfortable',
        description: 'Usually at ease in social settings',
      },
      {
        value: 5,
        label: 'Very Comfortable',
        description: 'Completely at ease in any social situation',
      },
    ],
  },

  // Physical Health Category
  {
    id: 12,
    category: 'Physical Health',
    text: 'How would you rate your physical health?',
    description: 'Consider your overall physical well-being',
    options: [
      {
        value: 1,
        label: 'Very Poor',
        description: 'Significant health issues',
      },
      { value: 2, label: 'Poor', description: 'Not feeling well physically' },
      { value: 3, label: 'Fair', description: 'Generally healthy' },
      { value: 4, label: 'Good', description: 'Feeling physically well' },
      {
        value: 5,
        label: 'Very Good',
        description: 'Excellent physical health',
      },
    ],
  },
  {
    id: 13,
    category: 'Physical Health',
    text: 'How would you rate your exercise habits?',
    description: 'Consider your regular physical activity',
    options: [
      { value: 1, label: 'Very Poor', description: 'No regular exercise' },
      { value: 2, label: 'Poor', description: 'Rarely exercise' },
      { value: 3, label: 'Moderate', description: 'Some regular exercise' },
      { value: 4, label: 'Good', description: 'Regular exercise routine' },
      {
        value: 5,
        label: 'Excellent',
        description: 'Very active and consistent exercise',
      },
    ],
  },
];

// Category icons mapping
const categoryIcons: Record<string, React.ReactNode> = {
  'Emotional Well-being': <Heart className="w-5 h-5" />,
  'Sleep Quality': <Moon className="w-5 h-5" />,
  'Energy Levels': <Zap className="w-5 h-5" />,
  'Stress Levels': <Brain className="w-5 h-5" />,
  'Social Connection': <Users className="w-5 h-5" />,
  'Physical Health': <Activity className="w-5 h-5" />,
};

/**
 * Assessment Component
 * A multi-step form for mental health assessment
 */
function Assessment() {
  const [state, setState] = useState<AssessmentState>({
    currentStep: 0,
    answers: {},
    isSubmitting: false,
    showResults: false,
    categoryScores: {},
  });

  /**
   * Handles the selection of an answer for the current question
   * @param value - The selected answer value
   */
  const handleAnswer = (value: string) => {
    setState(prev => ({
      ...prev,
      answers: {
        ...prev.answers,
        [questions[prev.currentStep].id]: Number(value),
      },
    }));
  };

  /**
   * Moves to the next question in the assessment
   */
  const handleNext = () => {
    setState(prev => ({
      ...prev,
      currentStep: prev.currentStep + 1,
    }));
  };

  /**
   * Moves to the previous question in the assessment
   */
  const handleBack = () => {
    setState(prev => ({
      ...prev,
      currentStep: prev.currentStep - 1,
    }));
  };

  /**
   * Submits the assessment and shows results
   */
  const handleSubmit = async () => {
    setState(prev => ({ ...prev, isSubmitting: true }));

    // Calculate category scores
    const categoryScores: Record<string, number[]> = {};
    questions.forEach(q => {
      if (!categoryScores[q.category]) {
        categoryScores[q.category] = [];
      }
      if (state.answers[q.id]) {
        categoryScores[q.category].push(state.answers[q.id]);
      }
    });

    const finalCategoryScores: Record<string, number> = {};
    Object.entries(categoryScores).forEach(([category, scores]) => {
      finalCategoryScores[category] = scores.reduce((acc, curr) => acc + curr, 0) / scores.length;
    });

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));

    setState(prev => ({
      ...prev,
      isSubmitting: false,
      showResults: true,
      categoryScores: finalCategoryScores,
    }));
  };

  /**
   * Calculates the overall assessment score
   * @returns The average score of all answers
   */
  const calculateScore = (): number => {
    const answers = Object.values(state.answers);
    return answers.reduce((acc, curr) => acc + curr, 0) / answers.length;
  };

  const progress = ((state.currentStep + 1) / questions.length) * 100;

  // Get current category progress
  const getCategoryProgress = (category: string) => {
    const categoryQuestions = questions.filter(q => q.category === category);
    const answeredQuestions = categoryQuestions.filter(q => state.answers[q.id]);
    return (answeredQuestions.length / categoryQuestions.length) * 100;
  };

  // Get encouraging message based on progress
  const getProgressMessage = (progress: number) => {
    if (progress === 0) return "Let's begin your mental health journey!";
    if (progress < 25) return 'Great start! Keep going!';
    if (progress < 50) return "You're making good progress!";
    if (progress < 75) return "Almost there! You're doing great!";
    if (progress < 100) return "Final stretch! You've got this!";
    return 'Amazing job completing the assessment!';
  };

  if (state.showResults) {
    const score = calculateScore();
    return (
      <PageContainer
        title="Assessment Results"
        subtitle="Your comprehensive mental health evaluation"
      >
        <div className="space-y-8">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <h1 className="text-4xl font-bold">Assessment Results</h1>
            <p className="text-xl text-muted-foreground mt-2">
              Your comprehensive mental health evaluation
            </p>
          </motion.div>

          <div className="grid gap-6">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
            >
              <Card className="shadow-lg overflow-hidden">
                <div className="bg-gradient-to-r from-primary/10 to-primary/5 p-6">
                  <div className="text-center space-y-4">
                    <div className="inline-flex items-center justify-center p-4 bg-background rounded-full shadow-lg mb-4">
                      <Trophy className="w-8 h-8 text-primary" />
                    </div>
                    <h2 className="text-5xl font-bold text-primary">
                      Overall Score: {score.toFixed(1)}/5
                    </h2>
                    <Badge
                      variant={score >= 4 ? 'default' : score >= 3 ? 'secondary' : 'destructive'}
                      className="text-xl px-6 py-2"
                    >
                      {score >= 4
                        ? 'Excellent Mental Health'
                        : score >= 3
                          ? 'Good Mental Health'
                          : 'Needs Attention'}
                    </Badge>
                  </div>
                </div>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              <Card className="shadow-lg">
                <CardContent className="pt-6">
                  <div className="space-y-6">
                    <div className="flex items-center space-x-2">
                      <Brain className="w-6 h-6 text-primary" />
                      <h3 className="text-2xl font-semibold">Category Breakdown</h3>
                    </div>
                    <div className="grid gap-6">
                      {Object.entries(state.categoryScores).map(([category, score], index) => (
                        <motion.div
                          key={category}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.1 * index }}
                          className="space-y-3"
                        >
                          <div className="flex justify-between items-center">
                            <div className="flex items-center space-x-2">
                              {categoryIcons[category]}
                              <span className="text-lg font-medium">{category}</span>
                            </div>
                            <Badge
                              variant={
                                score >= 4 ? 'default' : score >= 3 ? 'secondary' : 'destructive'
                              }
                              className="text-base"
                            >
                              {score.toFixed(1)}/5
                            </Badge>
                          </div>
                          <div className="relative">
                            <Progress value={(score / 5) * 100} className="h-3" />
                            <motion.div
                              className="absolute top-0 left-0 w-full h-full bg-primary/10"
                              initial={{ scaleX: 0 }}
                              animate={{ scaleX: score / 5 }}
                              transition={{
                                delay: 0.5 + 0.1 * index,
                                duration: 0.8,
                              }}
                            />
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
            >
              <Card className="shadow-lg">
                <CardContent className="pt-6">
                  <div className="space-y-4">
                    <div className="flex items-center space-x-2">
                      <Heart className="w-6 h-6 text-primary" />
                      <h3 className="text-2xl font-semibold">Personalized Action Plan</h3>
                    </div>
                    <ul className="list-none space-y-4 text-lg">
                      {score >= 4 ? (
                        <>
                          {[
                            'Continue maintaining your positive habits and self-care routine',
                            'Share your successful strategies with others who might benefit',
                            'Consider mentoring or supporting others in their mental health journey',
                            'Document your successful habits and routines',
                            'Set new goals for personal growth',
                          ].map((item, index) => (
                            <motion.li
                              key={index}
                              initial={{ opacity: 0, x: -20 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: 0.7 + 0.1 * index }}
                              className="flex items-start space-x-2"
                            >
                              <div className="mt-1.5">
                                <div className="w-2 h-2 rounded-full bg-primary" />
                              </div>
                              <span>{item}</span>
                            </motion.li>
                          ))}
                        </>
                      ) : score >= 3 ? (
                        <>
                          {[
                            'Consider incorporating more self-care activities into your daily routine',
                            'Try to maintain a regular sleep schedule',
                            'Stay connected with friends and family',
                            'Practice mindfulness or meditation regularly',
                            'Set aside time for hobbies and activities you enjoy',
                            'Consider tracking your mood and energy levels',
                          ].map((item, index) => (
                            <motion.li
                              key={index}
                              initial={{ opacity: 0, x: -20 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: 0.7 + 0.1 * index }}
                              className="flex items-start space-x-2"
                            >
                              <div className="mt-1.5">
                                <div className="w-2 h-2 rounded-full bg-primary" />
                              </div>
                              <span>{item}</span>
                            </motion.li>
                          ))}
                        </>
                      ) : (
                        <>
                          {[
                            'Consider reaching out to a mental health professional',
                            'Practice stress-reduction techniques like meditation or deep breathing',
                            'Make time for regular physical activity',
                            'Consider joining support groups or community activities',
                            'Establish a daily routine that includes self-care activities',
                            'Try to maintain regular sleep and meal schedules',
                            'Consider keeping a daily journal to track your progress',
                          ].map((item, index) => (
                            <motion.li
                              key={index}
                              initial={{ opacity: 0, x: -20 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: 0.7 + 0.1 * index }}
                              className="flex items-start space-x-2"
                            >
                              <div className="mt-1.5">
                                <div className="w-2 h-2 rounded-full bg-primary" />
                              </div>
                              <span>{item}</span>
                            </motion.li>
                          ))}
                        </>
                      )}
                    </ul>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
            >
              <Button
                size="lg"
                className="w-full text-lg py-6"
                onClick={() =>
                  setState({
                    currentStep: 0,
                    answers: {},
                    isSubmitting: false,
                    showResults: false,
                    categoryScores: {},
                  })
                }
              >
                Take Assessment Again
              </Button>
            </motion.div>
          </div>
        </div>
      </PageContainer>
    );
  }

  return (
    <PageContainer
      title="Mental Health Assessment"
      subtitle="This comprehensive assessment will help evaluate your mental well-being across different aspects of life. Please answer each question honestly and take your time."
    >
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column - Main Content */}
        <div className="lg:col-span-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="grid gap-6"
          >
            <Card className="shadow-lg">
              <CardContent className="pt-6">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={state.currentStep}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="space-y-6"
                  >
                    <div className="space-y-4">
                      <div className="flex items-center space-x-2">
                        {categoryIcons[questions[state.currentStep].category]}
                        <Badge variant="outline">{questions[state.currentStep].category}</Badge>
                      </div>
                      <h2 className="text-2xl font-semibold">
                        {questions[state.currentStep].text}
                      </h2>
                      {questions[state.currentStep].description && (
                        <p className="text-lg text-muted-foreground">
                          {questions[state.currentStep].description}
                        </p>
                      )}
                    </div>

                    <RadioGroup
                      value={state.answers[questions[state.currentStep].id]?.toString() || ''}
                      onValueChange={handleAnswer}
                      className="space-y-4"
                    >
                      {questions[state.currentStep].options.map((option, index) => (
                        <motion.div
                          key={option.value}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.1 * index }}
                        >
                          <motion.div
                            className={`flex items-start space-x-4 p-4 rounded-lg border transition-colors
                              ${
                                state.answers[questions[state.currentStep].id] === option.value
                                  ? 'bg-primary/5 border-primary'
                                  : 'hover:bg-accent'
                              }`}
                          >
                            <RadioGroupItem
                              value={option.value.toString()}
                              id={`option-${option.value}`}
                              className="mt-1"
                            />
                            <div className="space-y-1">
                              <Label htmlFor={`option-${option.value}`} className="text-lg">
                                {option.label}
                              </Label>
                              {option.description && (
                                <p className="text-muted-foreground">{option.description}</p>
                              )}
                            </div>
                          </motion.div>
                        </motion.div>
                      ))}
                    </RadioGroup>

                    <motion.div
                      className="flex justify-between pt-6"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.5 }}
                    >
                      <Button
                        variant="outline"
                        onClick={handleBack}
                        disabled={state.currentStep === 0}
                        className="text-lg py-6 px-8"
                      >
                        <ChevronLeft className="mr-2 h-5 w-5" />
                        Back
                      </Button>
                      {state.currentStep === questions.length - 1 ? (
                        <Button
                          onClick={handleSubmit}
                          disabled={
                            !state.answers[questions[state.currentStep].id] || state.isSubmitting
                          }
                          className="text-lg py-6 px-8"
                        >
                          {state.isSubmitting ? 'Submitting...' : 'Submit Assessment'}
                        </Button>
                      ) : (
                        <Button
                          onClick={handleNext}
                          disabled={!state.answers[questions[state.currentStep].id]}
                          className="text-lg py-6 px-8"
                        >
                          Next
                          <ChevronRight className="ml-2 h-5 w-5" />
                        </Button>
                      )}
                    </motion.div>
                  </motion.div>
                </AnimatePresence>
              </CardContent>
            </Card>

            {Object.keys(state.answers).length === 0 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
              >
                <Alert>
                  <AlertDescription className="text-lg">
                    Please select an answer to proceed with the assessment.
                  </AlertDescription>
                </Alert>
              </motion.div>
            )}
          </motion.div>
        </div>

        {/* Right Column - Progress and Categories */}
        <div className="lg:col-span-4 space-y-6">
          {/* Progress Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-card p-6 rounded-lg shadow-sm border sticky top-8"
          >
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <div className="space-y-1">
                  <h3 className="font-medium">Overall Progress</h3>
                  <p className="text-sm text-muted-foreground">{getProgressMessage(progress)}</p>
                </div>
                <Badge variant="outline" className="text-lg">
                  {Math.round(progress)}%
                </Badge>
              </div>
              <div className="relative h-3">
                <Progress value={progress} className="h-full" />
                <motion.div
                  className="absolute top-0 left-0 w-full h-full"
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: progress / 100 }}
                  transition={{ duration: 0.8 }}
                />
              </div>
            </div>

            {/* Category Progress */}
            <div className="mt-8 space-y-4">
              {Array.from(new Set(questions.map(q => q.category))).map((category, index) => (
                <motion.div
                  key={category}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.1 * index }}
                  className="bg-background p-4 rounded-lg border"
                >
                  <div className="flex items-center space-x-2 mb-2">
                    {categoryIcons[category]}
                    <span className="font-medium">{category}</span>
                  </div>
                  <Progress value={getCategoryProgress(category)} className="h-2" />
                  <p className="text-sm text-muted-foreground mt-2">
                    {Math.round(getCategoryProgress(category))}% Complete
                  </p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </PageContainer>
  );
}

export default Assessment;
