import { LoginNetworkMutation } from "@/__generated__/graphql";
import { useLocalStorage } from "@/hooks/use-local-storage";

export const useUserData = () => {
  const [_user, setUser] = useLocalStorage<
    Partial<LoginNetworkMutation["loginNetwork"]>
  >("user-data", {});

  const user = {
    id: _user.member?.id,
    displayName: _user.member?.name,
    email: _user.member?.email,
    profileImage:
      _user.member?.profilePicture?.__typename === "Image"
        ? _user.member?.profilePicture?.urls
        : null,
    avatarFallback: _user.member?.name
      ?.split(" ")
      .map((i) => i.at(0))
      .join(" "),
  };

  return { user, setUser };
};
