import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { For } from "@/components/utils/for";

import { Skeleton } from "@/components/ui/skeleton";

export const PostsListSkeleton = () => {
  return (
    <main className="min-h-screen grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 p-4">
      <For each={[0, 1, 2, 3, 4, 5]}>
        {(_, index) => {
          return (
            <Card key={index} className="p-0 relative">
              <CardHeader className="flex flex-row items-center space-y-0 border-b">
                <Avatar>
                  <AvatarFallback>AA</AvatarFallback>
                </Avatar>
                <div className="flex flex-col justify-center h-full ms-4">
                  <h4>
                    <Skeleton className="h-6 w-12" />
                  </h4>
                  <h6 className="text-muted-foreground text-xs flex items-center mt-1">
                    <Skeleton className="h-6 w-6 me-2" /> ago
                  </h6>
                </div>
              </CardHeader>
              <CardContent className="gap-y-4 flex flex-col h-96">
                <Skeleton className="w-full h-48 mt-4 rounded-xl object-cover object-center" />
                <CardTitle className="truncate">
                  <Skeleton className="h-6 w-12" />
                </CardTitle>
                <CardDescription>
                  <Skeleton className="h-24 w-full" />
                </CardDescription>
              </CardContent>
              <CardFooter className="border-t mt-auto py-6">
                <Skeleton className="h-9 w-24" />
              </CardFooter>
            </Card>
          );
        }}
      </For>
    </main>
  );
};
