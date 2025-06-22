import { createForm, updateForm } from "@/api/actions/form";
import { Loader } from "@/components/Loader";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  formSchema,
  type FormPayload,
  type UpdateFormPayload,
} from "@/schemas/form";
import type { Form as FormType } from "@/types/forms";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

type FormModalProps = {
  formData?: FormType;
  open: boolean;
  onClose: () => void;
};

export const CreateUpdateFormModal = ({
  open,
  onClose,
  formData,
}: FormModalProps) => {
  const createMutation = useMutation({
    mutationFn: async (values: FormPayload) => await createForm(values),
  });

  const updateMutation = useMutation({
    mutationFn: async ({
      id,
      values,
    }: {
      id: string;
      values: UpdateFormPayload;
    }) => await updateForm(id, values),
  });

  const title = formData ? `Update ${formData.title}` : "Create Form";
  const btnText = formData ? `Save` : "Create";
  const isPending = createMutation.isPending || updateMutation.isPending;
  const handleSubmit = async (values: FormPayload) => {
    console.log({ values });
    try {
      if (formData) {
        await updateMutation.mutateAsync(
          {
            id: formData.id,
            values: { title: values.title, description: values.description },
          },
          {
            onSuccess() {
              onClose();
              toast.success("Form Created Successfully!");
            },
          }
        );
      } else {
        await createMutation.mutateAsync(
          { title: values.title, description: values.description },
          {
            onSuccess() {
              onClose();
              toast.success("Form Created Successfully!");
            },
          }
        );
      }
    } catch (error) {
      console.error({ error });
    }
  };
  const form = useForm<FormPayload>({
    resolver: zodResolver(formSchema),
    defaultValues: formData
      ? { title: formData.title, description: formData.description }
      : { title: "", description: "" },
  });
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
        </DialogHeader>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleSubmit)}
            className="w-full space-y-4 "
          >
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem className="space-y-1">
                  <FormLabel className="text-muted-foreground">Title</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      type="text"
                      placeholder="Customer Feedback"
                    />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem className="space-y-1">
                  <FormLabel className="text-muted-foreground">
                    Description (Optional)
                  </FormLabel>
                  <FormControl>
                    <Textarea {...field} placeholder="anything..." />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button disabled={isPending} type="submit" className="w-full">
              {isPending ? (
                <Loader
                  className="flex items-center justify-center"
                  size={20}
                />
              ) : (
                btnText
              )}
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};
