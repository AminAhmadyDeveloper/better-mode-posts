import { UserName } from "@/pages/home/components/user-name";
import { FC, Fragment, Suspense } from "react";

export interface HomePageProps {}

const HomePage: FC<HomePageProps> = () => {
  return (
    <Fragment>
      <Suspense fallback="loading...">
        <UserName />
      </Suspense>
    </Fragment>
  );
};

export default HomePage;
