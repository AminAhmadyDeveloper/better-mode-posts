import { Container } from "@/components/layout/container";
import { RainbowButton } from "@/components/ui/rainbow-button";
import { SparklesText } from "@/components/ui/sparkles-text";
import { Switcher } from "@/components/utils/switcher";
import { PostsList } from "@/pages/home/components/posts-list";
import { PostsListSkeleton } from "@/pages/home/components/posts-list-skeleton";
import { useCookie } from "@/providers/cookie-provider";
import { FC, Suspense } from "react";
import { Link } from "react-router-dom";

export interface HomePageProps {}

const HomePage: FC<HomePageProps> = () => {
  const { accessToken } = useCookie();

  return (
    <Switcher selectSecondChild={!!accessToken}>
      <main className="flex w-full min-h-full items-center justify-center flex-grow flex-col gap-4">
        <SparklesText
          text="Welcome to Bettermode posts"
          className="text-center"
        />
        <h1 className="text-center text-xl">
          we have to have a network to provide posts for you
        </h1>
        <div className="flex items-center gap-4">
          <RainbowButton>
            <Link to="/auth">Get started</Link>
          </RainbowButton>
        </div>
      </main>
      <Container>
        <SparklesText
          text="Welcome to Bettermode posts"
          className="text-center my-4"
        />
        <h1 className="text-center text-xl">look at our latest posts</h1>
        <Suspense fallback={<PostsListSkeleton />}>
          <PostsList />
        </Suspense>
      </Container>
    </Switcher>
  );
};

export default HomePage;
