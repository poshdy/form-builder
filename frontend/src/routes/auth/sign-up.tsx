import { FormWrapper } from "@/components/auth/form-wrapper";
import {
  Form,
  FormField,
  FormControl,
  FormItem,
  FormLabel,
  FormMessage,
  FormDescription,
} from "@/components/ui/form";
import { createFileRoute } from "@tanstack/react-router";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { signUpSchema, type signUpPayload } from "@/schemas/auth";
import { useMutation } from "@tanstack/react-query";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { signUp } from "@/api/actions/auth";
import { useUser } from "@/store/use-user";
import { toast } from "sonner";
export const Route = createFileRoute("/auth/sign-up")({
  component: SignupPage,
});

function SignupPage() {
  const { login } = useUser();
  const { mutateAsync: register, isPending } = useMutation({
    mutationFn: async (values: signUpPayload) => await signUp(values),
  });
  const form = useForm<signUpPayload>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {},
    mode: "all",
  });

  const handleSubmit = async (values: signUpPayload) => {
    try {
      console.log({ ...values });
      await register(
        { ...values },
        {
          onSuccess(data) {
            const { accessToken, account, user } = data.data;
            console.log(data.data);
            const payload = { accessToken, ...user, ...account };
            login(payload);
            toast.success("Account Created Successfully!");
          },
        }
      );
    } catch (error) {
      console.error({ error });
    }
  };
  return (
    <section className="w-full h-screen flex items-center justify-center ">
      <FormWrapper
        type="SignUp"
        title="Register"
        description="register to our app to be able to create and pulish forms"
      >
        <Form {...form}>
          <form
            className="grid grid-cols-4 gap-4"
            onSubmit={form.handleSubmit(handleSubmit)}
          >
            <div className="col-span-4 grid grid-cols-2 gap-1">
              <FormField
                name="firstName"
                control={form.control}
                render={({ field }) => (
                  <FormItem className="col-span-1">
                    <FormLabel>First name</FormLabel>
                    <FormControl>
                      <Input placeholder="Joe" {...field} />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                name="lastName"
                control={form.control}
                render={({ field }) => (
                  <FormItem className="col-span-1">
                    <FormLabel>Last name</FormLabel>
                    <FormControl>
                      <Input placeholder="Doe" {...field} />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem className="col-span-4">
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input {...field} type="email" placeholder="joe@doe.com" />
                  </FormControl>
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
                  <FormDescription>
                    a password must be at least 6 charcters
                  </FormDescription>
                </FormItem>
              )}
            />

            <Button
              disabled={isPending}
              className="cursor-pointer w-full col-span-4"
              type="submit"
            >
              {isPending ? "Loading..." : "Register"}
            </Button>
          </form>
        </Form>
      </FormWrapper>
    </section>
  );
}
