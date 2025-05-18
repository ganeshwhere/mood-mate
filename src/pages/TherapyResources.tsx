import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import PageContainer from '@/components/layout/PageContainer';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Label } from '@/components/ui/label';

const TherapyResources = () => {
  return (
    <PageContainer
      title="Therapy Resources"
      subtitle="Access a variety of mental health resources, therapist directories, and educational materials."
    >
      <div className="relative mb-8">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input placeholder="Search for resources..." className="pl-10" />
      </div>

      <Tabs defaultValue="therapists" className="space-y-6">
        <TabsList className="grid grid-cols-3 mb-8">
          <TabsTrigger value="therapists">Find Therapists</TabsTrigger>
          <TabsTrigger value="education">Educational Content</TabsTrigger>
          <TabsTrigger value="crisis">Crisis Support</TabsTrigger>
        </TabsList>

        <TabsContent value="therapists" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Therapist Directory</CardTitle>
              <CardDescription>
                Find licensed therapists specializing in various mental health areas
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="specialty">Specialty</Label>
                  <Select>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select specialty" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Specialties</SelectItem>
                      <SelectItem value="anxiety">Anxiety</SelectItem>
                      <SelectItem value="depression">Depression</SelectItem>
                      <SelectItem value="trauma">Trauma & PTSD</SelectItem>
                      <SelectItem value="addiction">Addiction</SelectItem>
                      <SelectItem value="grief">Grief</SelectItem>
                      <SelectItem value="relationships">Relationships</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="format">Session Format</Label>
                  <Select>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Choose format" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="any">Any Format</SelectItem>
                      <SelectItem value="inperson">In-Person</SelectItem>
                      <SelectItem value="virtual">Virtual</SelectItem>
                      <SelectItem value="phone">Phone</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <Button className="mt-6 w-full" size="lg">
                Find Therapists
              </Button>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {therapists.map(therapist => (
              <Card key={therapist.id}>
                <CardHeader>
                  <div className="flex items-center gap-4">
                    <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                      <span className="text-lg font-bold">{therapist.name.charAt(0)}</span>
                    </div>
                    <div>
                      <CardTitle className="text-lg">{therapist.name}</CardTitle>
                      <CardDescription>{therapist.specialty}</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="text-sm">
                  <p className="line-clamp-3">{therapist.description}</p>
                  <div className="mt-2 flex items-center gap-2">
                    <span className="text-xs px-2 py-1 bg-primary/10 rounded-full">
                      {therapist.format}
                    </span>
                    <span className="text-xs px-2 py-1 bg-primary/10 rounded-full">
                      {therapist.insurance}
                    </span>
                  </div>
                </CardContent>
                <CardFooter className="pt-0">
                  <Button variant="outline" className="w-full text-sm">
                    View Profile
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="education" className="space-y-6">
          <Card className="mb-6">
            <CardHeader>
              <CardTitle>Mental Health Education</CardTitle>
              <CardDescription>
                Learn about various mental health topics from experts
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {educationalResources.map(resource => (
                  <Card key={resource.id} className="overflow-hidden">
                    <div className="h-40 bg-muted" />
                    <CardHeader>
                      <CardTitle className="text-lg">{resource.title}</CardTitle>
                      <CardDescription>{resource.type}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm line-clamp-3">{resource.description}</p>
                    </CardContent>
                    <CardFooter className="pt-0">
                      <Button variant="outline" className="w-full text-sm">
                        View Resource
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Recommended Books</CardTitle>
              <CardDescription>Expert-recommended reading for mental wellness</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {books.map(book => (
                  <div key={book.id} className="text-center">
                    <div className="h-40 bg-muted rounded-md mb-2" />
                    <h3 className="font-medium text-sm">{book.title}</h3>
                    <p className="text-xs text-muted-foreground">{book.author}</p>
                  </div>
                ))}
              </div>
            </CardContent>
            <CardFooter>
              <Button variant="outline" className="w-full">
                View All Books
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="crisis" className="space-y-6">
          <Card className="border-red-200 bg-red-50 dark:bg-red-950/10">
            <CardHeader>
              <CardTitle className="text-red-600 dark:text-red-400">24/7 Crisis Support</CardTitle>
              <CardDescription>Immediate help is available if you're in crisis</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center border-b pb-4">
                  <div className="bg-red-100 dark:bg-red-900/30 p-3 rounded-full mr-4">
                    <svg
                      className="h-6 w-6 text-red-600 dark:text-red-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                      />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-medium">National Suicide Prevention Lifeline</h3>
                    <p className="text-lg font-bold">7893078930</p>
                    <p className="text-sm text-muted-foreground">Available 24/7</p>
                  </div>
                </div>

                <div className="flex items-center border-b pb-4">
                  <div className="bg-red-100 dark:bg-red-900/30 p-3 rounded-full mr-4">
                    <svg
                      className="h-6 w-6 text-red-600 dark:text-red-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"
                      />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-medium">Crisis Text Line</h3>
                    <p className="text-lg font-bold">Text HOME to 741741</p>
                    <p className="text-sm text-muted-foreground">Available 24/7</p>
                  </div>
                </div>

                <div className="flex items-center">
                  <div className="bg-red-100 dark:bg-red-900/30 p-3 rounded-full mr-4">
                    <svg
                      className="h-6 w-6 text-red-600 dark:text-red-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-medium">Emergency Services</h3>
                    <p className="text-lg font-bold">100</p>
                    <p className="text-sm text-muted-foreground">For immediate danger</p>
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button className="w-full" variant="destructive">
                Create Safety Plan
              </Button>
            </CardFooter>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Local Resources</CardTitle>
              <CardDescription>Find crisis support in your area</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2 mb-4">
                <label htmlFor="location" className="text-sm font-medium">
                  Your Location
                </label>
                <Input id="location" placeholder="Enter ZIP code or city" />
              </div>
              <Button className="w-full">Find Local Resources</Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </PageContainer>
  );
};

// Sample data
const therapists = [
  {
    id: 1,
    name: 'Dr. Sarah Johnson',
    specialty: 'Anxiety & Depression',
    description:
      'Specializing in cognitive behavioral therapy (CBT) for anxiety, depression, and stress management with over 15 years of experience.',
    format: 'Virtual & In-Person',
    insurance: 'Multiple Plans Accepted',
  },
  {
    id: 2,
    name: 'Dr. Michael Chen',
    specialty: 'Trauma & PTSD',
    description:
      'Trauma specialist using EMDR and somatic experiencing techniques to help clients process and heal from past traumas.',
    format: 'Virtual Only',
    insurance: 'Out-of-Network',
  },
  {
    id: 3,
    name: 'Lisa Williams, LMFT',
    specialty: 'Relationships & Family',
    description:
      'Helping couples and families improve communication, resolve conflicts, and build stronger relationships.',
    format: 'In-Person',
    insurance: 'Most Major Plans',
  },
];

const educationalResources = [
  {
    id: 1,
    title: 'Understanding Anxiety',
    type: 'Video Series',
    description:
      'A comprehensive 5-part video series explaining the science behind anxiety and effective coping strategies.',
  },
  {
    id: 2,
    title: 'Mindfulness Foundations',
    type: 'Interactive Course',
    description:
      'Learn the basics of mindfulness meditation with guided practices and scientific explanations.',
  },
  {
    id: 3,
    title: 'Sleep Hygiene 101',
    type: 'Article + Assessment',
    description:
      'Discover how sleep affects mental health and learn techniques to improve your sleep quality.',
  },
];

const books = [
  { id: 1, title: 'The Body Keeps the Score', author: 'Bessel van der Kolk' },
  { id: 2, title: 'Feeling Good', author: 'David D. Burns' },
  { id: 3, title: 'Atomic Habits', author: 'James Clear' },
  { id: 4, title: "Man's Search for Meaning", author: 'Viktor E. Frankl' },
];

export default TherapyResources;
