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
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { z } from "zod";

// TODO: Move API interfaces to their own file.
interface ApiLoginResponse {
  firstName: string;
  lastName: string;
  token: string;
}

const formSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email." }),
  password: z.string().nonempty({ message: "Please enter a password." }),
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
        body: JSON.stringify({
          login: values.email,
          password: values.password,
        }),
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
          <Button type="submit" className="w-full">
            Login
          </Button>
          <Link to="/register">
            Dont have an account?{" "}
            <span className="text-blue-500 hover:underline">Sign up</span>
          </Link>
        </div>
      </form>
    </Form>
  );
};

export default LoginForm;
