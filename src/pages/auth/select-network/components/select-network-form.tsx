import { gql } from "@/__generated__";
import { TokensQueryVariables } from "@/__generated__/graphql";
import {
  Form,
  FormControl,
  FormDescription,
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
import { useLazyQuery } from "@apollo/client";
import { useForm } from "react-hook-form";
import { Fragment } from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router-dom";
import { useClientCookie } from "@/hooks/use-client-cookie";
import { useLocalStorage } from "@/hooks/use-local-storage";

const getToken = gql(
  "\n  query Tokens($networkDomain: String!) {\n    tokens(networkDomain: $networkDomain) {\n      accessToken\n      network {\n        name\n      }\n      role {\n        name\n        scopes\n        __typename\n      }\n      member {\n        id\n        name\n        __typename\n      }\n    }\n  }\n"
);

const selectNetworkFormSchema = z.object({
  networkDomain: z.string().min(1, { message: "network domain is required" }),
});

const defaultNetwork = { networkDomain: "basic-69e6oodl.bettermode.io" };

export const SelectNetworkForm = () => {
  const { set } = useClientCookie();
  const [, setNetworkName] = useLocalStorage<string | undefined>(
    "network-name",
    undefined
  );

  const [executeSelectNetwork, selectNetworkQueryResult] =
    useLazyQuery(getToken);

  const selectNetworkForm = useForm<TokensQueryVariables>({
    resolver: zodResolver(selectNetworkFormSchema),
    defaultValues: { networkDomain: "basic-69e6oodl.bettermode.io" },
    disabled: selectNetworkQueryResult.loading,
  });

  const navigate = useNavigate();

  const handleSubmit = (variables: TokensQueryVariables) => {
    executeSelectNetwork({
      variables,
      onCompleted: (data) => {
        if (data.tokens.accessToken) {
          set("accessToken", data.tokens.accessToken);
          setNetworkName(data.tokens.network?.name);
          navigate("/auth/login");
        }
      },
      onError: (error) => {
        selectNetworkForm.setError("root", {
          message: error.message,
          type: "validate",
        });
      },
    });
  };

  const onSubmitForm = selectNetworkForm.handleSubmit(handleSubmit);

  console.log(selectNetworkQueryResult.error);

  return (
    <Fragment>
      <Form {...selectNetworkForm}>
        <form onSubmit={onSubmitForm}>
          <FormField
            control={selectNetworkForm.control}
            name="networkDomain"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Network Domain</FormLabel>
                <FormControl>
                  <Input
                    placeholder="enter you Bettermode community network"
                    {...field}
                  />
                </FormControl>
                <FormDescription>
                  example: {defaultNetwork.networkDomain}
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormMessage>
            {selectNetworkForm.formState.errors.root?.message}
          </FormMessage>
          <StatefulButton
            type="submit"
            className="w-full mt-2"
            status={getButtonState(
              selectNetworkQueryResult.loading,
              !!selectNetworkQueryResult.data,
              !!selectNetworkQueryResult.error
            )}
          >
            Submit
          </StatefulButton>
        </form>
      </Form>
      <div className="mt-4 text-center text-sm">
        I don't have network{" "}
        <StatefulButton
          variant="link"
          status={selectNetworkQueryResult.loading ? "loading" : "idle"}
          className="w-min"
          onClick={() => handleSubmit(defaultNetwork)}
        >
          Skip
        </StatefulButton>
      </div>
    </Fragment>
  );
};
