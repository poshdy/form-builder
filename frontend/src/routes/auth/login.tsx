import { loginSchema, type loginPayload } from "@/schemas/auth";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import { signIn } from "@/api/actions/auth";
import { useForm } from "react-hook-form";
import { FormWrapper } from "@/components/auth/form-wrapper";
import {
  FormControl,
  FormField,
  FormMessage,
  FormItem,
  FormLabel,
  Form,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useUser } from "@/store/use-user";
import { toast } from "sonner";

export const Route = createFileRoute("/auth/login")({
  component: LoginPage,
});

function LoginPage() {
  const { login } = useUser();
  const { mutateAsync, isPending } = useMutation({
    mutationFn: async (values: loginPayload) => await signIn(values),
  });
  const form = useForm<loginPayload>({
    resolver: zodResolver(loginSchema),
    defaultValues: {},
    mode: "all",
  });

  const handleSubmit = async (values: loginPayload) => {
    try {
      console.log({ ...values });
      await mutateAsync(
        { ...values },
        {
          onSuccess(data) {
            const { user, account, accessToken } = data.data;
            const payload = {
              ...user,
              ...account,
              accessToken,
            };
            console.log({ data });
            login(payload);
            toast.success(`Welcome back! ${user?.firstName} ${user?.lastName}`);
          },
        }
      );
    } catch (error) {
      console.error({ error });
    }
  };
  return (
    <section className="w-full h-screen flex items-center justify-center ">
      <FormWrapper title="Welcome Back!" description="" type="SignIn">
        <Form {...form}>
          <form
            className="grid grid-cols-4 gap-4"
            onSubmit={form.handleSubmit(handleSubmit)}
          >
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem className="col-span-4">
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input {...field} type="email" placeholder="joe@doe.com" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem className="col-span-4">
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input {...field} type="password" placeholder="*******" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button
              disabled={isPending}
              className="cursor-pointer w-full col-span-4"
              type="submit"
            >
              {isPending ? "Loading..." : "Login"}
            </Button>
          </form>
        </Form>
      </FormWrapper>
    </section>
  );
}
