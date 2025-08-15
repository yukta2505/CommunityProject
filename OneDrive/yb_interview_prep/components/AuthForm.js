"use client";
import Image from "next/image";
import Link from "next/link";
import {useRouter} from "next/navigation";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/firebase/client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
} from "@/components/ui/form";
import {toast} from "sonner";
import FormField from "./FormField";
import { signUp, signIn } from "@/lib/actions/auth.action";


const authFormSchema = (type) => {
  return z.object({
    name: type === "sign-up" ? z.string().min(3) :z.string().optional(),
    email: z.string().min(3),
    password : z.string().min(3),
  })
}

const AuthForm = ({type}) => {
  const router = useRouter();
  const formSchema = authFormSchema(type);


  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  // 2. Define a submit handler.
  async function onSubmit(values) {
    try{
      if(type == 'sign-up'){
        const {name, email, password} = values;

        const userCredentials = await createUserWithEmailAndPassword(auth, email, password);

        const result = await signUp({
          uid: userCredentials.user.uid,
          name: name,
          email,
          password
        })

        if(!result.success) {
          toast.error(result.message);
          return;
        }

        toast.success('Account created successfully')
        router.push('/sign-in')
        
      } else{
        const {email, password} = values;
        const userCredential = await signInWithEmailAndPassword(auth, email, password)

        const idToken = await userCredential.user.getIdToken();

        if(!idToken) {
          toast.error('Sign in failed')
          return;
        }

        await signIn({
          email, idToken
        })

        toast.success('Signed in successfully')
        router.push('/')
        
      }
    } catch(error) {
      console.log(error);
      toast.error(`There was an error: ${error}`)
    }
  }

  const isSignIn = type === "sign-in";
  return (
    <div className="card-border lg:min-w-[566px]">
      <div className="flex flex-col gap-6 card py-14 px-10">
        <div className="flex flex-row gap-2 justify-center">
          <Image src="/logo.svg" alt="logo" height={32} width={38} />
          <h2 className="text-primary-100">PrepWise</h2>
        </div>
        <h3>Practice job interview with AI</h3>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-6 mt-4 form">
            {!isSignIn && (
              <FormField control={form.control} name = "name" label = "Name" placeholder = "Your name"/>
            )}
            <FormField control={form.control} name = "email" label = "Email" placeholder = "Your email" type="email"/>
            <FormField control={form.control} name = "password" label = "Password" placeholder = "Your password" type="password"/>
            <Button className="btn" type="submit">{isSignIn ? 'Sign in': 'Create an Account'}</Button>
          </form>
        </Form>
        
        <p className="text-center">
          {isSignIn ? 'No account yet?' : 'Have an account already?'}
          <Link href={!isSignIn ? '/sign-in' : '/sign-up'} className="text-user-primaery font-bold ml-1">
          {!isSignIn ? "Sign in" : 'Sign up'}
          </Link>
        </p>
      </div>
    </div>
  );
};

export default AuthForm;
