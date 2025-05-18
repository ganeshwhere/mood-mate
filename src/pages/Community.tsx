import { useState } from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import {
  HeartIcon,
  MessageCircle,
  Users,
  Calendar,
  Search,
  Filter,
  MapPin,
  ThumbsUp,
} from 'lucide-react';
import PageContainer from '@/components/layout/PageContainer';

const Community = () => {
  const [activeFilter, setActiveFilter] = useState('all');

  return (
    <PageContainer
      title="Community Support"
      subtitle="Connect with others on your mental health journey"
    >
      <div className="flex justify-end mb-8">
        <Button>Create Post</Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        <div className="lg:col-span-3">
          <div className="flex flex-col md:flex-row justify-between mb-6 gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input placeholder="Search communities and posts..." className="pl-10" />
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" className="flex items-center gap-1">
                <Filter className="h-4 w-4" />
                <span>Filter</span>
              </Button>
              <Button variant="outline" size="sm" className="flex items-center gap-1">
                <MapPin className="h-4 w-4" />
                <span>Near Me</span>
              </Button>
            </div>
          </div>

          <Tabs defaultValue="forums" className="mb-8">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="forums">Discussion Forums</TabsTrigger>
              <TabsTrigger value="events">Local Events</TabsTrigger>
              <TabsTrigger value="groups">Support Groups</TabsTrigger>
            </TabsList>

            <TabsContent value="forums" className="space-y-6 mt-6">
              <div className="flex overflow-x-auto py-2 gap-2 mb-4">
                {categories.map(category => (
                  <Badge
                    key={category.id}
                    variant={activeFilter === category.id ? 'default' : 'outline'}
                    className="cursor-pointer whitespace-nowrap"
                    onClick={() => setActiveFilter(category.id)}
                  >
                    {category.name}
                  </Badge>
                ))}
              </div>

              <div className="space-y-4">
                {posts.map(post => (
                  <Card key={post.id}>
                    <CardHeader className="pb-2">
                      <div className="flex justify-between">
                        <div className="flex items-center gap-3">
                          <Avatar>
                            <AvatarImage src={post.author.avatar} />
                            <AvatarFallback>{post.author.name.charAt(0)}</AvatarFallback>
                          </Avatar>
                          <div>
                            <div className="font-medium">{post.author.name}</div>
                            <div className="text-xs text-muted-foreground">
                              {post.category} • {post.timeAgo}
                            </div>
                          </div>
                        </div>
                        <Badge variant="outline">{post.category}</Badge>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <h3 className="text-lg font-semibold mb-2">{post.title}</h3>
                      <p className="text-muted-foreground mb-4">{post.content}</p>
                      {post.image && <div className="mb-4 bg-muted rounded-lg h-48 w-full"></div>}
                      <div className="flex gap-2">
                        {post.tags.map((tag, i) => (
                          <Badge key={i} variant="secondary" className="text-xs">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    </CardContent>
                    <CardFooter className="border-t pt-4 flex justify-between">
                      <div className="flex gap-4">
                        <Button
                          variant="ghost"
                          size="sm"
                          className="flex items-center gap-1 text-muted-foreground"
                        >
                          <ThumbsUp className="h-4 w-4" />
                          <span>{post.likes}</span>
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="flex items-center gap-1 text-muted-foreground"
                        >
                          <MessageCircle className="h-4 w-4" />
                          <span>{post.comments}</span>
                        </Button>
                      </div>
                      <Button variant="ghost" size="sm">
                        Share
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>

              <Button variant="outline" className="w-full">
                Load More
              </Button>
            </TabsContent>

            <TabsContent value="events" className="space-y-6 mt-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold">Upcoming Events</h2>
                <Button variant="outline" size="sm">
                  <Calendar className="h-4 w-4 mr-2" />
                  My Calendar
                </Button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {events.map(event => (
                  <Card key={event.id}>
                    <div className="h-40 bg-muted rounded-t-lg relative">
                      <div className="absolute top-2 right-2">
                        <Badge>{event.type}</Badge>
                      </div>
                    </div>
                    <CardHeader>
                      <CardTitle>{event.title}</CardTitle>
                      <CardDescription className="flex items-center gap-1">
                        <Calendar className="h-4 w-4" />
                        <span>
                          {event.date} • {event.time}
                        </span>
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-center gap-2 mb-2">
                        <MapPin className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm">{event.location}</span>
                      </div>
                      <p className="text-sm text-muted-foreground mb-3">{event.description}</p>
                      <div className="flex items-center gap-2">
                        <Users className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm">{event.attendees} attendees</span>
                      </div>
                    </CardContent>
                    <CardFooter className="flex justify-between">
                      <Button variant="outline" size="sm">
                        More Info
                      </Button>
                      <Button size="sm">RSVP</Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>

              <Button variant="outline" className="w-full">
                View All Events
              </Button>
            </TabsContent>

            <TabsContent value="groups" className="space-y-6 mt-6">
              <div className="mb-4">
                <h2 className="text-xl font-semibold mb-2">Find your community</h2>
                <p className="text-muted-foreground">
                  Join support groups based on shared experiences
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {groups.map(group => (
                  <Card key={group.id}>
                    <CardHeader className="pb-2">
                      <div className="flex items-center gap-4">
                        <div
                          className={`w-12 h-12 rounded-lg flex items-center justify-center ${group.bgColor}`}
                        >
                          {group.icon}
                        </div>
                        <div>
                          <CardTitle className="text-lg">{group.name}</CardTitle>
                          <CardDescription>{group.members} members</CardDescription>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground mb-3">{group.description}</p>
                      <div className="flex gap-2 mb-3">
                        {group.tags.map((tag, i) => (
                          <Badge key={i} variant="secondary" className="text-xs">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                      <div className="flex -space-x-2">
                        {[1, 2, 3, 4].map(i => (
                          <Avatar key={i} className="h-6 w-6 border-2 border-background">
                            <AvatarFallback className="text-xs">U{i}</AvatarFallback>
                          </Avatar>
                        ))}
                        <div className="h-6 w-6 rounded-full bg-muted flex items-center justify-center text-xs">
                          +{group.members - 4}
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter>
                      <Button variant="outline" className="w-full">
                        Join Group
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>

              <Button variant="outline" className="w-full">
                View All Groups
              </Button>
            </TabsContent>
          </Tabs>
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>My Communities</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {myCommunities.map(community => (
                <div key={community.id} className="flex items-center gap-3">
                  <div
                    className={`w-10 h-10 rounded-lg flex items-center justify-center ${community.bgColor}`}
                  >
                    {community.icon}
                  </div>
                  <div>
                    <div className="font-medium">{community.name}</div>
                    <div className="text-xs text-muted-foreground">
                      {community.unread > 0 && (
                        <span className="text-primary">{community.unread} new posts</span>
                      )}
                      {community.unread === 0 && <span>No new posts</span>}
                    </div>
                  </div>
                </div>
              ))}
            </CardContent>
            <CardFooter>
              <Button variant="outline" className="w-full">
                View All
              </Button>
            </CardFooter>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Trending Topics</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {trendingTopics.map((topic, i) => (
                <div key={i} className="space-y-1">
                  <div className="font-medium hover:text-primary cursor-pointer">#{topic.name}</div>
                  <div className="text-xs text-muted-foreground">{topic.posts} posts this week</div>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Recommended For You</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {recommendedGroups.map(group => (
                <div key={group.id} className="flex items-center gap-3">
                  <div
                    className={`w-10 h-10 rounded-lg flex items-center justify-center ${group.bgColor}`}
                  >
                    {group.icon}
                  </div>
                  <div className="flex-1">
                    <div className="font-medium">{group.name}</div>
                    <div className="text-xs text-muted-foreground">{group.members} members</div>
                  </div>
                  <Button variant="ghost" size="sm">
                    Join
                  </Button>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </PageContainer>
  );
};

// Sample data
const categories = [
  { id: 'all', name: 'All Topics' },
  { id: 'anxiety', name: 'Anxiety' },
  { id: 'depression', name: 'Depression' },
  { id: 'mindfulness', name: 'Mindfulness' },
  { id: 'selfcare', name: 'Self Care' },
  { id: 'stress', name: 'Stress Management' },
  { id: 'relationships', name: 'Relationships' },
  { id: 'trauma', name: 'Trauma' },
  { id: 'work', name: 'Work-Life Balance' },
];

const posts = [
  {
    id: 1,
    author: {
      name: 'Priya Sharma',
      avatar: '/avatars/priya.jpg',
    },
    title: 'How meditation helped me overcome exam anxiety',
    content:
      'As a final year engineering student at IIT Mumbai, I struggled with severe exam anxiety. Through regular meditation at the local temple and following the teachings of Swami Vivekananda, I found peace. Would love to hear from other students who have faced similar challenges.',
    category: 'Anxiety',
    timeAgo: '2 hours ago',
    likes: 24,
    comments: 8,
    tags: ['Anxiety', 'Meditation', 'Student Life'],
    image: true,
  },
  {
    id: 2,
    author: {
      name: 'Arjun Patel',
      avatar: '/avatars/arjun.jpg',
    },
    title: 'Daily yoga challenge - join our WhatsApp group',
    content:
      "Starting a 30-day yoga challenge inspired by Sadhguru's teachings. We'll practice at 6 AM daily at Central Park, Delhi. Perfect for beginners! DM to join our WhatsApp group.",
    category: 'Mindfulness',
    timeAgo: '4 hours ago',
    likes: 42,
    comments: 15,
    tags: ['Yoga', 'Challenge', 'Mindfulness'],
    image: false,
  },
  {
    id: 3,
    author: {
      name: 'Meera Reddy',
      avatar: '/avatars/meera.jpg',
    },
    title: 'Resources for dealing with grief and loss in Indian context',
    content:
      "I've compiled resources that helped me through the loss of my father. Includes books by Indian authors, podcasts in Hindi/English, and local support groups. Hope this helps others in our community.",
    category: 'Resources',
    timeAgo: 'Yesterday',
    likes: 67,
    comments: 23,
    tags: ['Grief', 'Resources', 'Support'],
    image: false,
  },
];

const events = [
  {
    id: 1,
    title: 'Anxiety Support Group Meeting',
    date: 'Jul 15, 2023',
    time: '6:00 PM - 7:30 PM',
    location: 'Community Center, Bandra West, Mumbai',
    description:
      'Weekly support group for those dealing with anxiety and panic disorders. Led by Dr. Rajesh Verma, Clinical Psychologist. New members welcome.',
    type: 'In-Person',
    attendees: 18,
  },
  {
    id: 2,
    title: 'Mindfulness & Meditation Workshop',
    date: 'Jul 18, 2023',
    time: '12:00 PM - 1:00 PM',
    location: 'Virtual (Zoom)',
    description:
      'Learn the basics of mindfulness meditation with certified instructor Dr. Anjali Gupta from Art of Living Foundation.',
    type: 'Virtual',
    attendees: 35,
  },
  {
    id: 3,
    title: 'Mental Health First Aid Training',
    date: 'Jul 22, 2023',
    time: '9:00 AM - 4:00 PM',
    location: 'Bangalore International Centre, Koramangala',
    description:
      'Certification course teaching how to identify, understand and respond to signs of mental health issues. Conducted by NIMHANS faculty.',
    type: 'In-Person',
    attendees: 12,
  },
  {
    id: 4,
    title: 'Art Therapy: Express & Heal',
    date: 'Jul 24, 2023',
    time: '3:00 PM - 5:00 PM',
    location: 'Creative Space Studio, Connaught Place, Delhi',
    description:
      'No artistic experience required! Join us for a healing art therapy session inspired by traditional Indian art forms.',
    type: 'In-Person',
    attendees: 8,
  },
];

const groups = [
  {
    id: 1,
    name: 'Anxiety Support India',
    members: 1243,
    description:
      'A safe space to discuss anxiety, share coping strategies, and support each other through challenges. Based on both modern psychology and traditional Indian wisdom.',
    tags: ['Anxiety', 'Panic', 'Support'],
    bgColor: 'bg-blue-100 dark:bg-blue-900/30',
    icon: <HeartIcon className="h-6 w-6 text-blue-500" />,
  },
  {
    id: 2,
    name: 'Yoga & Meditation',
    members: 897,
    description:
      'For those practicing traditional Indian meditation and yoga techniques. Share experiences and learn from each other.',
    tags: ['Meditation', 'Yoga', 'Daily Practice'],
    bgColor: 'bg-green-100 dark:bg-green-900/30',
    icon: <HeartIcon className="h-6 w-6 text-green-500" />,
  },
  {
    id: 3,
    name: 'Student Mental Health',
    members: 1578,
    description:
      'Support community for Indian students dealing with academic pressure, career choices, and mental health challenges.',
    tags: ['Students', 'Support', 'Education'],
    bgColor: 'bg-purple-100 dark:bg-purple-900/30',
    icon: <HeartIcon className="h-6 w-6 text-purple-500" />,
  },
  {
    id: 4,
    name: 'Work-Life Balance India',
    members: 723,
    description:
      'Discussions and strategies for maintaining healthy boundaries between work and personal life in the Indian context.',
    tags: ['Stress', 'Workplace', 'Balance'],
    bgColor: 'bg-orange-100 dark:bg-orange-900/30',
    icon: <HeartIcon className="h-6 w-6 text-orange-500" />,
  },
];

const myCommunities = [
  {
    id: 1,
    name: 'Anxiety Support India',
    unread: 3,
    bgColor: 'bg-blue-100 dark:bg-blue-900/30',
    icon: <HeartIcon className="h-5 w-5 text-blue-500" />,
  },
  {
    id: 2,
    name: 'Yoga & Meditation',
    unread: 0,
    bgColor: 'bg-green-100 dark:bg-green-900/30',
    icon: <HeartIcon className="h-5 w-5 text-green-500" />,
  },
  {
    id: 3,
    name: 'Student Mental Health',
    unread: 7,
    bgColor: 'bg-purple-100 dark:bg-purple-900/30',
    icon: <HeartIcon className="h-5 w-5 text-purple-500" />,
  },
];

const trendingTopics = [
  { name: 'gratitude', posts: 142 },
  { name: 'selfcare', posts: 87 },
  { name: 'anxiety', posts: 65 },
  { name: 'mentalhealth', posts: 54 },
  { name: 'meditation', posts: 42 },
];

const recommendedGroups = [
  {
    id: 1,
    name: 'Ayurveda & Wellness',
    members: 542,
    bgColor: 'bg-indigo-100 dark:bg-indigo-900/30',
    icon: <HeartIcon className="h-5 w-5 text-indigo-500" />,
  },
  {
    id: 2,
    name: 'Stress Management India',
    members: 1243,
    bgColor: 'bg-yellow-100 dark:bg-yellow-900/30',
    icon: <HeartIcon className="h-5 w-5 text-yellow-500" />,
  },
  {
    id: 3,
    name: 'Creative Expression',
    members: 328,
    bgColor: 'bg-pink-100 dark:bg-pink-900/30',
    icon: <HeartIcon className="h-5 w-5 text-pink-500" />,
  },
];

export default Community;
