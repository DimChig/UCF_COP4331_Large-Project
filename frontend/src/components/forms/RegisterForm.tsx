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

const formSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email." }),
  firstName: z.string().nonempty({ message: "Please enter your first name." }),
  lastName: z.string().nonempty({ message: "Please enter your last name." }),
  password: z
    .string()
    .trim()
    .min(4, { message: "Your password should be at least four characters." })
    .regex(
      // This regex puts a match to invalid passwords in a non-capturing group,
      // which lets us only capture *valid* passwords.
      // TODO: Find out why this sometimes doesnt detect invalid passwords.
      /^(?:.{0,4}|[^0-9]*|[^A-Z]*|[^a-z]*|[^a-zA-Z0-9]*)$/g,
      {
        message:
          "Passwords need to have one lowercase letter, one uppercase letter, a number, and " +
          "a special character.",
      }
    ),
});

const RegisterForm = () => {
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
      const response = await fetch("/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          login: values.email,
          password: values.password,
          firstName: values.firstName,
          lastName: values.lastName,
        }),
      });

      if (!response.ok) {
        console.error(`API error: HTTP ${response.status} response.`);
        // TODO: Display an error message to the user.

        return;
      }

      // const responseBody = await response.json() as ApiLoginResponse;
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
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex flex-col w-full items-center justify-center space-y-4">
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
