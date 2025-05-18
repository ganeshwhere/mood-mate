import { useNavigate, Link } from 'react-router-dom';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { Loader2 } from 'lucide-react';

import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useToast } from '@/components/ui/use-toast';
import { useAuth } from '@/contexts/AuthContext';
import { cn } from '@/lib/utils';

const formSchema = z.object({
  email: z.string().email('Please enter a valid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});

type FormData = z.infer<typeof formSchema>;

export default function SignIn() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { login, isLoading } = useAuth();

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  async function onSubmit(data: FormData) {
    try {
      await login(data.email, data.password);

      // Update user data in local storage
      const existingUserData = localStorage.getItem('moodmate_user');
      if (existingUserData) {
        const userData = JSON.parse(existingUserData);
        userData.lastLogin = new Date().toISOString();
        localStorage.setItem('moodmate_user', JSON.stringify(userData));
      } else {
        // If no existing data, create new entry
        const userData = {
          email: data.email,
          lastLogin: new Date().toISOString(),
        };
        localStorage.setItem('moodmate_user', JSON.stringify(userData));
      }
      localStorage.setItem('moodmate_auth_token', 'dummy_token_' + Date.now());

      toast({
        title: 'Success',
        description: 'You have successfully signed in.',
      });

      // Redirect to app dashboard after successful login
      navigate('/app');
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Invalid email or password. Please try again.',
        variant: 'destructive',
      });
    }
  }

  return (
    <>
      <div className="w-full bg-gradient-to-r from-yellow-500/20 to-red-500/20 border-b border-yellow-500/30">
        <div className="max-w-screen-xl mx-auto py-3 px-4">
          <div className="flex items-center justify-center">
            <p className="text-sm font-medium text-yellow-800 dark:text-yellow-200">
              Demo Mode: Use any email & password to try the app! Example: demo@example.com /
              pass123
            </p>
          </div>
        </div>
      </div>
      <div className="min-h-screen flex items-center justify-center bg-background p-4">
        <Card className="w-full max-w-md">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl font-bold text-center">Welcome back</CardTitle>
            <CardDescription className="text-center">
              Enter your email and password to sign in to your account
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Enter your email"
                          {...field}
                          disabled={isLoading}
                          className={cn(
                            'bg-background',
                            isLoading && 'opacity-50 cursor-not-allowed'
                          )}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Password</FormLabel>
                      <FormControl>
                        <Input
                          type="password"
                          placeholder="Enter your password"
                          {...field}
                          disabled={isLoading}
                          className={cn(
                            'bg-background',
                            isLoading && 'opacity-50 cursor-not-allowed'
                          )}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button
                  type="submit"
                  className={cn('w-full', isLoading && 'opacity-50 cursor-not-allowed')}
                  disabled={isLoading}
                >
                  {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                  Sign In
                </Button>
              </form>
            </Form>
          </CardContent>
          <CardFooter className="flex flex-col space-y-4">
            <div className="text-sm text-muted-foreground text-center">
              <Link
                to="/forgot-password"
                className="hover:text-primary underline-offset-4 hover:underline"
              >
                Forgot your password?
              </Link>
            </div>
            <div className="text-sm text-muted-foreground text-center">
              Don't have an account?{' '}
              <Link to="/signup" className="hover:text-primary underline-offset-4 hover:underline">
                Sign up
              </Link>
            </div>
          </CardFooter>
        </Card>
      </div>
    </>
  );
}
