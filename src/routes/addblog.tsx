import { createFileRoute } from "@tanstack/react-router";
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldSeparator,
  FieldSet,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/addblog")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div>
      <div className="w-full max-w-md">
        <FieldSet>
          <FieldGroup>
            <Field>
              <FieldLabel htmlFor="title">Blog Title</FieldLabel>
              <Input id="title" type="text" placeholder="Max Leiter" />
            </Field>
            <Field>
              <FieldLabel htmlFor="description">Description</FieldLabel>
              <Textarea
                id="description"
                placeholder="description helps us improve..."
                rows={4}
              />
            </Field>
            <Field>
              <FieldLabel htmlFor="content">Content</FieldLabel>
              <Textarea
                id="content"
                placeholder="Your content helps us improve..."
                rows={4}
              />
            </Field>
            <Field>
              <FieldLabel htmlFor="coverImage">Cover Image</FieldLabel>
              <Input
                id="coverImage"
                type="text"
                placeholder="Cover Image Path"
              />
            </Field>
            <Field>
              <FieldLabel htmlFor="category">Category</FieldLabel>
              <Input id="category" type="text" placeholder="Car, Motorcycle" />
            </Field>
            <FieldSeparator />
            <Field orientation="responsive">
              <Button type="submit">Submit</Button>
              <Button type="button" variant="outline">
                Cancel
              </Button>
            </Field>
          </FieldGroup>
        </FieldSet>
      </div>
    </div>
  );
}
