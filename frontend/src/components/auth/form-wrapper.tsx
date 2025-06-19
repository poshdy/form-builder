import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Link } from "@tanstack/react-router";

type FormWrapperProps = {
  title: string;
  description: string;
  children: React.ReactNode;
  type: "SignUp" | "SignIn";
};

export const FormWrapper = ({
  description,
  title,
  type,
  children,
}: FormWrapperProps) => {
  return (
    <div className="space-y-2 flex flex-col items-center">
      <Card>
        <CardHeader>
          <CardTitle>{title}</CardTitle>
          <CardDescription>{description}</CardDescription>
        </CardHeader>

        <CardContent className="w-[400px] h-fit">{children}</CardContent>
      </Card>

      <Link to={type == "SignIn" ? "/auth/sign-up" : "/auth/login"}>
        {type == "SignIn"
          ? "don't have an account? create one"
          : "Already have one? sign in "}
      </Link>
    </div>
  );
};
