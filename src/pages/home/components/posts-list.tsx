import { gql } from "@/__generated__";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { For } from "@/components/utils/for";
import { defaultPostImage } from "@/images";
import { createShortName, imageSelector, timeSince } from "@/lib/utils";
import { useSuspenseQuery } from "@apollo/client";
import { Link, useLocation } from "react-router-dom";

import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationNext,
} from "@/components/ui/pagination";
import { useQueryState } from "nuqs";

const getPosts = gql(
  "\n  query GetPosts(\n    $after: String\n    $before: String\n    $excludePins: Boolean\n    $filterBy: [PostListFilterByInput!]\n    $limit: Int!\n    $offset: Int\n    $orderBy: PostListOrderByEnum\n    $postTypeIds: [String!]\n    $reverse: Boolean\n    $spaceIds: [ID!]\n  ) {\n    getPosts(\n      after: $after\n      before: $before\n      excludePins: $excludePins\n      filterBy: $filterBy\n      limit: $limit\n      offset: $offset\n      orderBy: $orderBy\n      postTypeIds: $postTypeIds\n      reverse: $reverse\n      spaceIds: $spaceIds\n    ) {\n      nodes {\n        owner {\n          member {\n            name\n            profilePicture {\n              ... on Image {\n                url\n                __typename\n              }\n              __typename\n            }\n            __typename\n          }\n          __typename\n        }\n        id\n        updatedAt\n        description\n        customSeoDetail {\n          thumbnail {\n            ... on Image {\n              url\n              __typename\n            }\n            __typename\n          }\n          __typename\n        }\n        tags {\n          title\n          __typename\n        }\n        title\n        reactions {\n          reaction\n          __typename\n        }\n        __typename\n      }\n      pageInfo {\n        hasNextPage\n        endCursor\n        __typename\n      }\n      totalCount\n      __typename\n    }\n  }\n"
);

export const PostsList = () => {
  const { pathname } = useLocation();
  const [after, setAfter] = useQueryState("after");
  const { data } = useSuspenseQuery(getPosts, {
    variables: { after, limit: 6 },
    queryKey: pathname,
  });

  const onNextPage = () => {
    if (
      data.getPosts.pageInfo.hasNextPage &&
      data.getPosts.pageInfo.endCursor
    ) {
      setAfter(data.getPosts.pageInfo.endCursor);
    }
  };

  return (
    <main className="min-h-screen grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 p-4">
      <For each={data?.getPosts.nodes || []}>
        {(node) => {
          return (
            <Card key={node.id} className="p-0 relative">
              <CardHeader className="flex flex-row items-center space-y-0 border-b">
                <Avatar>
                  <AvatarFallback>
                    {createShortName(node.owner?.member?.name)}
                  </AvatarFallback>
                  <AvatarImage
                    src={imageSelector(node.owner?.member?.profilePicture)}
                  />
                </Avatar>
                <div className="flex flex-col justify-center h-full ms-4">
                  <h4>{node.owner?.member?.name}</h4>
                  <h6 className="text-muted-foreground text-xs">
                    {timeSince(node.updatedAt)} ago
                  </h6>
                </div>
              </CardHeader>
              <CardContent className="gap-y-4 flex flex-col h-96">
                <img
                  className="w-full h-48 mt-4 rounded-xl object-cover object-center"
                  src={
                    imageSelector(node.customSeoDetail?.thumbnail) ||
                    defaultPostImage
                  }
                />
                <CardTitle className="truncate">{node.title}</CardTitle>
                <CardDescription>{node.description}</CardDescription>
              </CardContent>
              <CardFooter className="border-t mt-auto py-6">
                <Button asChild>
                  <Link to={`/post/${node.id}`}>Read More</Link>
                </Button>
              </CardFooter>
            </Card>
          );
        }}
      </For>
      <Pagination className="col-span-full w-full flex justify-center">
        <PaginationContent>
          <PaginationItem>
            <PaginationNext onClick={onNextPage} className="cursor-pointer" />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </main>
  );
};
