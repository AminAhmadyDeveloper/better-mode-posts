import { useLocalStorage } from "@/hooks/use-local-storage";
import { LoginForm } from "@/pages/auth/login/components/login-form";

const LoginPage = () => {
  const [networkName] = useLocalStorage("network-name", null);

  return (
    <div className="mx-auto grid w-[350px] gap-6">
      <div className="grid gap-2 text-center">
        <h1 className="text-3xl font-bold">Login to Network</h1>
        <p className="text-balance text-muted-foreground">
          Enter user name and password to login to {networkName} network
        </p>
      </div>
      <LoginForm />
    </div>
  );
};

export default LoginPage;
