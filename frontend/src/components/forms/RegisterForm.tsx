import { zodResolver } from "@hookform/resolvers/zod";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Link, useNavigate } from "react-router-dom";
import { baseUrl, saveAuthToken } from "@/api/apiClient";
import { useState } from "react";
import { toast } from "sonner";
import { AlertCircle } from "lucide-react";

const formSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email." }),
  firstName: z.string().nonempty({ message: "Please enter your first name." }),
  lastName: z.string().nonempty({ message: "Please enter your last name." }),
  password: z
    .string()
    .trim()
    .min(4, { message: "Your password should be at least four characters." })
    .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9]).*$/, {
      message:
        "Passwords need to have one lowercase letter, one uppercase letter, a number, and a special character.",
    }),
});

interface ApiRegisterResponse {
  firstName: string;
  lastName: string;
  token: string;
}

const RegisterForm = () => {
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    // Since this wraps a react-hook-form, we have to give it defaults.
    defaultValues: {
      email: "",
      firstName: "",
      lastName: "",
      password: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      const response = await fetch(`${baseUrl}/api/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          login: values.email,
          password: values.password,
          firstName: values.firstName,
          lastName: values.lastName,
        }),
      });

      // If the response is not OK, attempt to parse error from server
      if (!response.ok) {
        try {
          const errorData = await response.json();
          setErrorMessage(errorData?.error ?? "Unknown error occurred");
        } catch {
          setErrorMessage(`API error: HTTP ${response.status} response.`);
        }
        return;
      }

      // Clear any prior error message on success (optional)
      setErrorMessage(null);

      // Parse the successful response
      const responseJson = await response.json();
      const responseBody = responseJson as ApiRegisterResponse;
      saveAuthToken(responseBody.token);

      // Notify the user that registration was successful
      toast.success("Registration successful", {
        description: `Welcome, ${responseBody.firstName}!`,
      });

      // Route to home page
      navigate("/");
    } catch (error: any) {
      // Ensure that we capture any thrown error message as a string
      setErrorMessage(error?.message || String(error));
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="firstName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>First Name</FormLabel>
              <FormControl>
                <Input placeholder="John" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="lastName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Last Name</FormLabel>
              <FormControl>
                <Input placeholder="Doe" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="example@email.com" {...field} />
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
                <Input {...field} type="password" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex flex-col w-full items-center justify-center space-y-4">
          {errorMessage && (
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>Error</AlertTitle>
              <AlertDescription>{errorMessage}</AlertDescription>
            </Alert>
          )}
          <Button type="submit" className="w-full">
            Register
          </Button>
          <Link to="/">
            Already have an account?{" "}
            <span className="text-blue-500 hover:underline">Sign in</span>
          </Link>
        </div>
      </form>
    </Form>
  );
};

export default RegisterForm;
