import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Card } from "@/components/ui/card";
import {
  Form,
  FormField,
  FormItem,
  FormControl,
  FormDescription,
  FormLabel,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { Textarea } from "@/components/ui/textarea";

const formSchema = z.object({
  text: z.string().nonempty({ message: "Comments cannot be empty!" }),
});

const WriteComment = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      text: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {};

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          control={form.control}
          name="text"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Write a comment</FormLabel>
              <FormControl>
                <Textarea placeholder="Enter your comment here." {...field} />
              </FormControl>
              <FormDescription>
                If you gave this movie a rating, it will be included at the end of your comment.
              </FormDescription>
            </FormItem>
          )}
        />
      </form>
    </Form>
  );
};

export default WriteComment;
