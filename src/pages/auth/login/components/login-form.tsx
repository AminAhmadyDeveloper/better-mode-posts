import { gql } from "@/__generated__";
import { useMutation } from "@apollo/client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Fragment } from "react";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  getButtonState,
  StatefulButton,
} from "@/components/ui/stateful-button";
import { Button } from "@/components/ui/button";
import { MutationLoginNetworkWithPasswordArgs } from "@/__generated__/graphql";
import { useClientCookie } from "@/hooks/use-client-cookie";
import { useUserData } from "@/hooks/use-user-data";

const loginNetwork = gql(
  "\n  mutation LoginNetwork($usernameOrEmail: String!, $password: String!) {\n    loginNetwork(\n      input: { usernameOrEmail: $usernameOrEmail, password: $password }\n    ) {\n      accessToken\n      role {\n        name\n        scopes\n        __typename\n      }\n      member {\n        id\n        name\n        email\n        profilePicture {\n          __typename\n          ... on Image {\n            urls {\n              full\n              large\n              medium\n              small\n              thumb\n            }\n            url\n          }\n        }\n        __typename\n      }\n      __typename\n    }\n  }\n"
);

const loginNetworkFormSchema = z.object({
  usernameOrEmail: z
    .string()
    .min(1, { message: "username or email is required" }),
  password: z.string().min(1, { message: "password domain is required" }),
});

export const LoginForm = () => {
  const { set } = useClientCookie();
  const { setUser } = useUserData();

  const loginNetworkForm = useForm<
    MutationLoginNetworkWithPasswordArgs["input"]
  >({
    resolver: zodResolver(loginNetworkFormSchema),
    defaultValues: { password: "", usernameOrEmail: "" },
  });

  const [executeLoginNetwork, loginNetworkQueryResult] =
    useMutation(loginNetwork);

  const onSubmitForm = loginNetworkForm.handleSubmit((variables) =>
    executeLoginNetwork({
      variables,
      onCompleted: (data) => {
        if (data.loginNetwork.accessToken) {
          setUser(data.loginNetwork);
          set("memberToken", data.loginNetwork.accessToken);
          if (typeof window !== "undefined") window.location.href === "/";
        }
      },
      onError: (error) => {
        loginNetworkForm.setError("root", {
          message: error.message,
          type: "validate",
        });
      },
    })
  );

  return (
    <Fragment>
      <Form {...loginNetworkForm}>
        <form onSubmit={onSubmitForm}>
          <FormField
            control={loginNetworkForm.control}
            name="usernameOrEmail"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Username or Email</FormLabel>
                <FormControl>
                  <Input
                    placeholder="enter your username or email"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={loginNetworkForm.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input placeholder="enter your password" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormMessage className="mt-2">
            {loginNetworkForm.formState.errors.root?.message}
          </FormMessage>
          <StatefulButton
            type="submit"
            className="w-full mt-2"
            status={getButtonState(
              loginNetworkQueryResult.loading,
              !!loginNetworkQueryResult.data,
              !!loginNetworkQueryResult.error
            )}
          >
            Submit
          </StatefulButton>
        </form>
      </Form>
      <div className="mt-4 text-center text-sm">
        <Button variant="link" className="w-min">
          <a href="/">Continue as Guest</a>
        </Button>
      </div>
    </Fragment>
  );
};
