import { baseUrl, getAuthHeader, isAuthenticated } from "@/api/apiClient";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { zodResolver } from "@hookform/resolvers/zod";
import { useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { ImSpinner2 } from "react-icons/im";
import { toast } from "sonner";
import { z } from "zod";
import AuthDialog from "./AuthDialog";

interface Props {
  movieId: number;
}

const formSchema = z.object({
  text: z
    .string()
    .nonempty({ message: "Comments cannot be empty!" })
    .max(1000, {
      message: "Comments cannot be longer than 1000 characters!",
    }),
});

const WriteComment = ({ movieId }: Props) => {
  const queryClient = useQueryClient();
  const [authDialogOpened, setAuthDialogOpened] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      text: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    onComment(values.text);
  };

  const onComment = async (commentText: string) => {
    if (!isAuthenticated()) {
      setAuthDialogOpened(true);
      return;
    }
    setIsLoading(true);

    await new Promise((resolve) => setTimeout(resolve, 1000));

    try {
      const response = await fetch(
        `${baseUrl}/api/movies/${movieId}/comments`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: getAuthHeader(),
          },
          body: JSON.stringify({ text: commentText }),
        }
      );

      if (!response.ok) {
        toast.error("Failed to post comment", {
          description: `API request failed with HTTP ${response.status} ${
            response.statusText
          }: ${JSON.parse(await response.text()).error}`,
        });
      }

      queryClient.invalidateQueries({ queryKey: ["comments"] });
      toast.success("Comment posted successfully");
      form.reset();
    } catch (error) {
      toast.error("Error posting comment:", { description: String(error) });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <AuthDialog isOpened={authDialogOpened} setOpened={setAuthDialogOpened} />
      <Card className="p-6">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <FormField
              control={form.control}
              name="text"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-xl">Write a comment</FormLabel>
                  <FormControl>
                    <Textarea
                      className="h-24"
                      placeholder="Enter your comment here."
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                  <FormDescription>
                    If you gave this movie a rating, it will be included at the
                    end of your comment.
                  </FormDescription>
                </FormItem>
              )}
            />
            <Button
              className="mt-4 w-[125px] cursor-pointer"
              type="submit"
              disabled={isLoading}
            >
              {isLoading ? (
                <ImSpinner2 className="animate-spin" />
              ) : (
                "Post Comment"
              )}
            </Button>
          </form>
        </Form>
      </Card>
    </>
  );
};

export default WriteComment;
