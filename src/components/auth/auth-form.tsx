
'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import Link from 'next/link';
import { useState } from 'react';

import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Mail, Lock, User, BriefcaseMedical, Loader2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

// TODO: Import Firebase auth functions and the 'auth' instance from firebase/config
// import { createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile } from 'firebase/auth';
// import { auth, db } from '@/lib/firebase/config';
// import { doc, setDoc } from 'firebase/firestore';


const loginSchema = z.object({
  email: z.string().email({ message: 'Invalid email address.' }),
  password: z.string().min(6, { message: 'Password must be at least 6 characters.' }),
});

const signupSchema = z.object({
  fullName: z.string().min(2, { message: 'Full name must be at least 2 characters.'}),
  email: z.string().email({ message: 'Invalid email address.' }),
  password: z.string().min(6, { message: 'Password must be at least 6 characters.' }),
  confirmPassword: z.string().min(6, { message: 'Password must be at least 6 characters.' }),
  role: z.enum(['patient', 'doctor'], { required_error: 'You need to select a role.'}),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"], 
});

type AuthFormProps = {
  mode: 'login' | 'signup';
};

export function AuthForm({ mode }: AuthFormProps) {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const schema = mode === 'login' ? loginSchema : signupSchema;
  
  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: mode === 'login' ? { email: '', password: '' } : { fullName: '', email: '', password: '', confirmPassword: '', role: 'patient' },
  });

  async function onSubmit(values: z.infer<typeof schema>) {
    setIsLoading(true);
    console.log("Form values:", values);

    // TODO: Implement Firebase Authentication
    try {
      if (mode === 'login') {
        // const userCredential = await signInWithEmailAndPassword(auth, values.email, values.password);
        // console.log('User logged in:', userCredential.user);
        toast({
          title: 'Login Successful (Mock)',
          description: 'You would be redirected now.',
        });
        // router.push('/dashboard'); // Or role-specific dashboard
      } else if (mode === 'signup') {
        // const signupValues = values as z.infer<typeof signupSchema>; // Type assertion for signup
        // const userCredential = await createUserWithEmailAndPassword(auth, signupValues.email, signupValues.password);
        // console.log('User signed up:', userCredential.user);
        
        // await updateProfile(userCredential.user, { displayName: signupValues.fullName });

        // Store additional user info (like role) in Firestore
        // await setDoc(doc(db, "users", userCredential.user.uid), {
        //   uid: userCredential.user.uid,
        //   email: signupValues.email,
        //   fullName: signupValues.fullName,
        //   role: signupValues.role,
        //   createdAt: new Date(),
        // });

        toast({
          title: 'Signup Successful (Mock)',
          description: 'Your account has been created. You would be redirected now.',
        });
        // router.push('/dashboard'); // Or role-specific dashboard
      }
    } catch (error: any) {
      console.error(`${mode} error:`, error);
      toast({
        title: `${mode === 'login' ? 'Login' : 'Signup'} Failed`,
        description: error.message || 'An unexpected error occurred.',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        {mode === 'signup' && (
          <FormField
            control={form.control}
            name="fullName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Full Name</FormLabel>
                <FormControl>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input placeholder="John Doe" {...field} className="pl-10" />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        )}
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input type="email" placeholder="name@example.com" {...field} className="pl-10" />
                </div>
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
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input type="password" placeholder="••••••••" {...field} className="pl-10" />
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        {mode === 'signup' && (
          <>
            <FormField
              control={form.control}
              name="confirmPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Confirm Password</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input type="password" placeholder="••••••••" {...field} className="pl-10" />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="role"
              render={({ field }) => (
                <FormItem className="space-y-3">
                  <FormLabel>Register as</FormLabel>
                  <FormControl>
                    <RadioGroup
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      className="flex flex-col space-y-1"
                    >
                      <FormItem className="flex items-center space-x-3 space-y-0">
                        <FormControl>
                          <RadioGroupItem value="patient" />
                        </FormControl>
                        <FormLabel className="font-normal flex items-center gap-2">
                          <User className="h-4 w-4 text-muted-foreground" /> Patient
                        </FormLabel>
                      </FormItem>
                      <FormItem className="flex items-center space-x-3 space-y-0">
                        <FormControl>
                          <RadioGroupItem value="doctor" />
                        </FormControl>
                        <FormLabel className="font-normal flex items-center gap-2">
                          <BriefcaseMedical className="h-4 w-4 text-muted-foreground" /> Doctor
                        </FormLabel>
                      </FormItem>
                    </RadioGroup>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </>
        )}
        <Button type="submit" className="w-full bg-accent hover:bg-accent/90 text-accent-foreground" disabled={isLoading}>
          {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : (mode === 'login' ? 'Login' : 'Sign Up')}
        </Button>
      </form>
      <p className="mt-6 text-center text-sm text-muted-foreground">
        {mode === 'login' ? "Don't have an account? " : 'Already have an account? '}
        <Link href={mode === 'login' ? '/signup' : '/login'} className="font-medium text-primary hover:underline">
          {mode === 'login' ? 'Sign up' : 'Login'}
        </Link>
      </p>
    </Form>
  );
}
