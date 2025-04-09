import { zodResolver } from "@hookform/resolvers/zod";
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
import { Link } from "react-router-dom";

// TODO: Move API interfaces to their own file.
interface ApiLoginResponse {
  firstName: string;
  lastName: string;
  token: string;
}

const formSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email." }),
  password: z.string().nonempty({ message: "Please enter a password" }),
});

const LoginForm = () => {
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
      const response = await fetch("/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ login: values.email, password: values.password }),
      });

      if (!response.ok) {
        console.error(`API error: HTTP ${response.status} response.`);
        // TODO: Display an error message to the user.

        return;
      }

      const responseBody = (await response.json()) as ApiLoginResponse;
      console.log("Login success.");
    } catch (error: any) {
      console.error(error.toString()); //* Temp.
    }

    console.log(values); //! Remove me after debugging.
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
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
        <div className="flex flex-col w-full items-center justify-center space-y-2">
          <Button type="submit">Login</Button>
          <Link to="/register" className="underline">
            Dont have an account? Create one here!
          </Link>
        </div>
      </form>
    </Form>
  );
};

export default LoginForm;
