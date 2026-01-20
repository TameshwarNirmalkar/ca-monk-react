import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useForm } from "@tanstack/react-form";
import { Field, FieldLabel, FieldSeparator } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { postBlog } from "@/api_service/blog.service";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { useState } from "react";

export const Route = createFileRoute("/addblog")({
  component: AddBlogComponent,
});

function AddBlogComponent() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const [open, setOpen] = useState<boolean>(false);
  const [message, setMessage] = useState<string>("");

  const mutation = useMutation({
    mutationFn: postBlog,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["blogs"] });
      setMessage("Blog added successfully!");
      setOpen(true);
      navigate({ to: "/" });
    },
    onError: (error) => {
      setMessage("Failed to add blog. Please try again.");
      setOpen(true);
    },
  });

  const form = useForm({
    defaultValues: {
      title: "",
      description: "",
      content: "",
      coverImage: "",
      category: "",
    },
    onSubmit: async ({ value }) => {
      const newBlog: any = {
        ...value,
        category: value.category.split(",").map((cat) => cat.trim()),
        date: new Date().toISOString(),
      };
      mutation.mutate(newBlog);
    },
  });

  return (
    <>
      <div className="flex p-8">
        <div className="w-full max-w-md">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              e.stopPropagation();
              form.handleSubmit();
            }}
            className="space-y-4">
            {/* Title Field */}
            <form.Field
              name="title"
              children={(field) => (
                <Field>
                  <FieldLabel htmlFor={field.name}>Blog Title</FieldLabel>
                  <Input
                    id={field.name}
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    onChange={(e) => field.handleChange(e.target.value)}
                    placeholder="Max Leiter"
                  />
                </Field>
              )}
            />

            {/* Cover Image Field */}
            <form.Field
              name="coverImage"
              children={(field) => (
                <Field>
                  <FieldLabel htmlFor={field.name}>Cover Image</FieldLabel>
                  <Input
                    id={field.name}
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    onChange={(e) => field.handleChange(e.target.value)}
                    placeholder="Cover image URL..."
                  />
                </Field>
              )}
            />

            {/* Category Field */}
            <form.Field
              name="category"
              children={(field) => (
                <Field>
                  <FieldLabel htmlFor={field.name}>Category</FieldLabel>
                  <Input
                    id={field.name}
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    onChange={(e) => field.handleChange(e.target.value)}
                    placeholder="Car, Motorcycle"
                  />
                </Field>
              )}
            />

            {/* Description Field */}
            <form.Field
              name="description"
              children={(field) => (
                <Field>
                  <FieldLabel htmlFor={field.name}>Description</FieldLabel>
                  <Textarea
                    id={field.name}
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    onChange={(e) => field.handleChange(e.target.value)}
                    placeholder="description helps us improve..."
                    rows={3}
                  />
                </Field>
              )}
            />

            {/* Content Field */}
            <form.Field
              name="content"
              children={(field) => (
                <Field>
                  <FieldLabel htmlFor={field.name}>Content</FieldLabel>
                  <Textarea
                    id={field.name}
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    onChange={(e) => field.handleChange(e.target.value)}
                    placeholder="Your content..."
                    rows={6}
                  />
                </Field>
              )}
            />

            <FieldSeparator />

            <div className="flex gap-2 py-4">
              <form.Subscribe
                selector={(state) => [state.canSubmit, state.isSubmitting]}
                children={([canSubmit, isSubmitting]) => (
                  <Button type="submit" disabled={!canSubmit || isSubmitting}>
                    {isSubmitting ? "Submitting..." : "Submit"}
                  </Button>
                )}
              />
              <Button
                type="button"
                variant="outline"
                onClick={() => form.reset()}>
                Reset
              </Button>
            </div>
          </form>
        </div>
      </div>

      <AlertDialog open={open} onOpenChange={setOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Server Notification</AlertDialogTitle>
            <AlertDialogDescription className="text-red-600">
              {message}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogAction onClick={() => setOpen(false)}>
              OK
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
