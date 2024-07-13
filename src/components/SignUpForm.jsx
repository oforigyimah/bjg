import {Button} from "@/components/ui/button"
import {Card, CardContent, CardDescription, CardHeader, CardTitle,} from "@/components/ui/card"
import {Input} from "@/components/ui/input"
import {Link, useNavigate} from "react-router-dom";
import {z} from "zod";
import {isValidPhoneNumber} from "react-phone-number-input";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form";
import {PhoneInput} from "@/components/ui/phone-input";
import {useEffect, useState} from "react";
import {EyeIcon, EyeOffIcon} from "lucide-react";
import {auth} from "@/firebaseConfig"
import {createUserWithEmailAndPassword} from "firebase/auth"
import {toast} from "@/components/ui/use-toast";


const FormSchema = z.object({
    first_name: z.string().min(2, {message: "First name must be at least 2 characters"}),
    last_name: z.string().min(2, {message: "Last name must be at least 2 characters"}),
    email: z.string().email({message: "Invalid email address"}),
    phone: z.string().refine(isValidPhoneNumber, {message: "Invalid phone number"}),
    password: z.string()
        .min(6, {message: "Password must be at least 6 characters"})
        .refine(val => /[a-zA-Z]/.test(val) && /\d/.test(val), {
            message: "Password must contain at least one letter and one number"
        }),
    confirmPassword: z.string().min(6, {message: "Password must be at least 6 characters"}),
}).refine(data => data.password === data.confirmPassword, {
    path: ['confirmPassword'],
    message: "Passwords do not match",
});


export function SignUpForm() {

    const navigate = useNavigate();
    const user = auth.currentUser;
    if (user) {
        console.log(user);
        navigate("/")
    }
    useEffect(() => {


    }, [])

    const form = useForm({
        resolver: zodResolver(FormSchema),
        defaultValues: {
            first_name: "",
            last_name: "",
            email: "",
            phone: "",
            password: "",
            confirmPassword: "",
        },
    });
    const [showPassword, setShowPassword] = useState(false);

    // const toast = useToast()

    function onSubmit(data) {
        console.log(data)
        const res = createUserWithEmailAndPassword(auth, data.email, data.password)
            .then((userCredential) => {
                const user = userCredential.user;
                console.log(user)
                return user
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                console.log(errorCode, errorMessage)
                toast({
                    variant: "destructive",
                    title: "signUp failed",
                    description: "something went wrong"
                })
            });

        if (res) {
            navigate("/")
        }


    }

    return (
        <Card className="mx-auto max-w-sm">
            <CardHeader>
                <CardTitle className="text-xl">Sign Up</CardTitle>
                <CardDescription>
                    Enter your information to create an account
                </CardDescription>
            </CardHeader>
            <CardContent>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                        <div className="grid gap-4">
                            <div className="grid grid-cols-2 gap-4">
                                <div className="grid gap-2">
                                    <FormField
                                        control={form.control}
                                        name="first_name"
                                        render={({field}) => (
                                            <FormItem>
                                                <FormLabel>First Name</FormLabel>
                                                <FormControl>
                                                    <Input placeholder="Max" {...field} />
                                                </FormControl>
                                                <FormDescription>
                                                    Enter your first name
                                                </FormDescription>
                                                <FormMessage/>
                                            </FormItem>
                                        )}
                                    >
                                    </FormField>
                                </div>
                                <div className="grid gap-2">
                                    <FormField
                                        control={form.control}
                                        name="last_name"
                                        render={({field}) => (
                                            <FormItem>
                                                <FormLabel>Last Name</FormLabel>
                                                <FormControl>
                                                    <Input placeholder="Robinson" {...field} />
                                                </FormControl>
                                                <FormDescription>
                                                    Enter your last name
                                                </FormDescription>
                                                <FormMessage/>
                                            </FormItem>
                                        )}
                                    >

                                    </FormField>
                                </div>
                            </div>
                            <div className="grid gap-2">
                                <FormField
                                    control={form.control}
                                    name="email"
                                    render={({field}) => (
                                        <FormItem>
                                            <FormLabel>Email</FormLabel>
                                            <FormControl>
                                                <Input
                                                    id={"email"}
                                                    type={"text"}
                                                    placeholder={"Enter your email"}
                                                    {...field}
                                                />
                                            </FormControl>
                                            <FormDescription>
                                                Enter a your email
                                            </FormDescription>
                                            <FormMessage/>
                                        </FormItem>
                                    )}
                                >
                                </FormField>
                            </div>
                            <div className="grid gap-2">
                                <FormField
                                    control={form.control}
                                    name="phone"
                                    render={({field}) => (
                                        <FormItem>
                                            <FormLabel>Phone Number</FormLabel>
                                            <FormControl>
                                                <PhoneInput placeholder="Enter a phone number"
                                                            defaultCountry="GH" {...field} />
                                            </FormControl>
                                            <FormDescription>
                                                Enter a phone number
                                            </FormDescription>
                                            <FormMessage/>
                                        </FormItem>
                                    )}
                                >
                                </FormField>
                            </div>
                            <div className="grid gap-2">
                                <FormField
                                    control={form.control}
                                    name="password"
                                    render={({field}) => (
                                        <FormItem>
                                            <div className="flex items-center justify-between">
                                                <FormLabel>Password</FormLabel>

                                            </div>
                                            <FormControl>
                                                <div className="relative">
                                                    <Input
                                                        id="password"
                                                        type={showPassword ? "text" : "password"}
                                                        placeholder="Enter your password"
                                                        {...field}
                                                    />
                                                    <button
                                                        type="button"
                                                        className="absolute inset-y-0 right-0 px-3 flex items-center"
                                                        onClick={() => setShowPassword(!showPassword)}
                                                    >
                                                        {showPassword ? <EyeOffIcon/> : <EyeIcon/>}
                                                    </button>
                                                </div>
                                            </FormControl>
                                            <FormMessage/>
                                        </FormItem>
                                    )}
                                >
                                </FormField>
                            </div>
                            <div className="grid gap-2">
                                <FormField
                                    control={form.control}
                                    name="confirmPassword"
                                    render={({field}) => (
                                        <FormItem>
                                            <div className="flex items-center justify-between">
                                                <FormLabel>Confirm Password</FormLabel>

                                            </div>
                                            <FormControl>
                                                <div className="relative">
                                                    <Input
                                                        id="Confirmpassword"
                                                        type={showPassword ? "text" : "password"}
                                                        placeholder="Confirm your password"
                                                        {...field}
                                                    />
                                                    <button
                                                        type="button"
                                                        className="absolute inset-y-0 right-0 px-3 flex items-center"
                                                        onClick={() => setShowPassword(!showPassword)}
                                                    >
                                                        {showPassword ? <EyeOffIcon/> : <EyeIcon/>}
                                                    </button>
                                                </div>
                                            </FormControl>
                                            <FormMessage/>
                                        </FormItem>
                                    )}
                                >
                                </FormField>
                            </div>
                            <Button type="submit" className="w-full">
                                Create an account
                            </Button>
                        </div>
                    </form>
                </Form>
                <div className="mt-4 text-center text-sm">
                    Already have an account?{" "}
                    <Link to={"../sign-in"} className="underline">
                        Sign in
                    </Link>
                </div>
            </CardContent>
        </Card>
    )
}
