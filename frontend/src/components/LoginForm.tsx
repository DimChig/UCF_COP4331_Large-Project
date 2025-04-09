
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button, buttonVariants } from "@/components/ui/button";
import { Link } from "react-router-dom";

const formSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email." }),
  password: z.string()
    .min(4, { message: "Your password should be at least four characters." })
    .regex(
      // This regex puts a match to invalid passwords in a non-capturing group,
      // which lets us only capture *valid* passwords.
      /(?:.{0,4}|[^0-9]*|[^A-Z]*|[^a-z]*|[a-zA-Z0-9]*)$/g,
      {
        message: "Passwords need to have one lowercase letter, one uppercase letter, a number, and "
          + "a special character."
      }
    )
});

const LoginForm = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    // Since this wraps a react-hook-form, we have to give it defaults.
    defaultValues: {
      email: "",
      password: ""
    }
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    // Now we have type-safe and verified access to correct data.
    console.log(values);  //! Remove me after debugging.
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
