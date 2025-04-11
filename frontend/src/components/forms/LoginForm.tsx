import { baseUrl, saveAuthToken } from "@/api/apiClient";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { AlertCircle } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { z } from "zod";

export interface ApiLoginResponse {
  firstName: string;
  lastName: string;
  token: string;
}

const formSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email." }),
  password: z.string().nonempty({ message: "Please enter a password." }),
});

const LoginForm = () => {
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    // Since this wraps a react-hook-form, we have to give it defaults.
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      const response = await fetch(`${baseUrl}/api/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          login: values.email,
          password: values.password,
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
      const responseBody = responseJson as ApiLoginResponse;
      saveAuthToken(responseBody.token);

      // Notify the user that login was successful
      toast.success("Login successful", {
        description: `Welcome back, ${responseBody.firstName}!`,
      });

      // Route to home page
      navigate("/movies");
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
                <Input placeholder="password" {...field} />
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
            Login
          </Button>
          <Link to="/register">
            Dont have an account? <span className="text-blue-500 hover:underline">Sign up</span>
          </Link>
        </div>
      </form>
    </Form>
  );
};

export default LoginForm;
