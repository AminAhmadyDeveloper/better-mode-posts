import { SelectNetworkForm } from "./components/select-network-form";

const SelectNetworkPage = () => {
  return (
    <div className="mx-auto grid w-[350px] gap-6">
      <div className="grid gap-2 text-center">
        <h1 className="text-3xl font-bold">Select Network</h1>
        <p className="text-balance text-muted-foreground">
          Select you own network otherwise click Skip to select default
        </p>
      </div>
      <SelectNetworkForm />
    </div>
  );
};

export default SelectNetworkPage;
