import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  Form,
  FormField,
  FormItem,
  FormControl,
  FormDescription,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

interface Props {
  onComment: (commentText: string) => void;
}

const formSchema = z.object({
  text: z.string().nonempty({ message: "Comments cannot be empty!" }).max(10, {
    message: "Comments cannot be longer than 1000 characters!",
  }),
});

const WriteComment = ({ onComment }: Props) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      text: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    onComment(values.text);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          control={form.control}
          name="text"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-xl">Write a comment</FormLabel>
              <FormControl>
                <Textarea placeholder="Enter your comment here." {...field} />
              </FormControl>
              <FormMessage />
              <FormDescription>
                If you gave this movie a rating, it will be included at the end
                of your comment.
              </FormDescription>
            </FormItem>
          )}
        />
        <Button className="mt-4">Post Comment</Button>
      </form>
    </Form>
  );
};

export default WriteComment;
