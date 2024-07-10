import React, {useState} from 'react';
import {Link, useNavigate} from "react-router-dom";
import {Button} from "@/components/ui/button";
import {Card, CardContent, CardDescription, CardHeader, CardTitle,} from "@/components/ui/card";
import {Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form";
import {PhoneInput} from "@/components/ui/phone-input";
import {zodResolver} from "@hookform/resolvers/zod";
import {Controller, useForm} from "react-hook-form";
import {isValidPhoneNumber} from "react-phone-number-input";
import {z} from "zod";
import {Input} from "@/components/ui/input";
import {EyeIcon, EyeOffIcon} from "lucide-react";
import {auth} from "@/firebaseConfig";
import {signInWithEmailAndPassword} from "firebase/auth";
import {useToast} from "@/components/ui/use-toast";


const phoneSchema = z.object({
    loginMethod: z.literal('phone'),
    phone: z.string().refine(isValidPhoneNumber, {message: "Invalid phone number"}),
    password: z.string().min(1, "Password is required")
});

const emailSchema = z.object({
    loginMethod: z.literal('email'),
    email: z.string().email("Invalid email address"),
    password: z.string().min(1, "Password is required")
});

const FormSchema = z.discriminatedUnion('loginMethod', [phoneSchema, emailSchema]);

export function LoginForm() {
    const [showPassword, setShowPassword] = useState(false);
    const [loginMethod, setLoginMethod] = useState('email');
    const navigate = useNavigate();
    const {toast} = useToast();

    function loginWithEmail(email, password) {
        signInWithEmailAndPassword(auth, email, password).then((userCredential) => {
            const user = userCredential.user;
            console.log(user);
            toast({
                title: "Login successful", description: `Welcome , ${user.email}`,
            });
            navigate('/');

        }).catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.error(errorCode, errorMessage);
            toast({
                variant: "destructive", title: "Login failed", description: errorMessage, status: "error",
            });
        });
    }

    function loginWithPhone(phone, password) {
//     TODO: Implement login with phone
        navigate('/');
    }

    const toggleLoginMethod = (currentMethod) => {
        const newMethod = currentMethod === 'email' ? 'phone' : 'email';
        form.setValue('loginMethod', newMethod);
        setLoginMethod(newMethod);
    };

    const form = useForm({
        resolver: zodResolver(FormSchema), defaultValues: {
            loginMethod: 'email', phone: "", email: "", password: ""
        },
    });

    function onSubmit(data) {
        console.log(data);
        if (data.loginMethod === 'email') {
            loginWithEmail(data.email, data.password);
        } else {
            loginWithPhone(data.phone, data.password);
        }
        form.reset();
    }

    return (<Card className="mx-auto max-w-sm">
        <CardHeader>
            <CardTitle className="text-2xl">Login</CardTitle>
            <CardDescription>
                Enter your {loginMethod === 'phone' ? 'phone number' : 'email'} and password to login to your
                account
            </CardDescription>
        </CardHeader>
        <CardContent>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                    {loginMethod === 'phone' ? (<FormField
                        control={form.control}
                        name="phone"
                        render={({field}) => (<FormItem>
                            <FormLabel>Phone Number</FormLabel>
                            <FormControl>
                                <Controller
                                    name="phone"
                                    control={form.control}
                                    render={({field}) => (<PhoneInput
                                        placeholder="Enter a phone number"
                                        defaultCountry="GH"
                                        value={field.value}
                                        onChange={field.onChange}
                                    />)}
                                />
                            </FormControl>
                            <FormDescription>
                                Enter a phone number
                            </FormDescription>
                            <FormMessage/>
                        </FormItem>)}
                    />) : (<FormField
                        control={form.control}
                        name="email"
                        render={({field}) => (<FormItem>
                            <FormLabel>Email</FormLabel>
                            <FormControl>
                                <Input
                                    type="email"
                                    placeholder="Enter your email"
                                    {...field}
                                />
                            </FormControl>
                            <FormDescription>
                                Enter your email address
                            </FormDescription>
                            <FormMessage/>
                        </FormItem>)}
                    />)}
                    <FormField
                        control={form.control}
                        name="password"
                        render={({field}) => (<FormItem>
                            <div className="flex items-center justify-between">
                                <FormLabel>Password</FormLabel>
                                <Link to="/forgot-password" className="ml-auto text-sm underline">
                                    Forgot your password?
                                </Link>
                            </div>
                            <FormControl>
                                <div className="relative">
                                    <Input
                                        type={showPassword ? "text" : "password"}
                                        placeholder="Enter your password"
                                        {...field}
                                    />
                                    <button
                                        type="button"
                                        className="absolute inset-y-0 right-0 px-3 flex items-center"
                                        onClick={() => setShowPassword(!showPassword)}
                                    >
                                        {showPassword ? <EyeOffIcon className="h-4 w-4"/> :
                                            <EyeIcon className="h-4 w-4"/>}
                                    </button>
                                </div>
                            </FormControl>
                            <FormMessage/>
                        </FormItem>)}
                    />
                    <FormField
                        control={form.control}
                        name="loginMethod"
                        render={({field}) => (<FormItem>
                            <FormControl>
                                <Button
                                    type="button"
                                    variant="link"
                                    className="p-0 h-auto font-normal text-sm"
                                    onClick={() => toggleLoginMethod(field.value)}
                                >
                                    {field.value === 'email' ? 'Login with phone instead' : 'Login with email instead'}
                                </Button>
                            </FormControl>
                        </FormItem>)}
                    />
                    <Button type="submit" className="w-full">Login</Button>
                </form>
            </Form>
            <div className="mt-4 text-center text-sm">
                Don&apos;t have an account?{" "}
                <Link to="/sign-up" className="underline">
                    Sign up
                </Link>
            </div>
        </CardContent>
    </Card>);
}