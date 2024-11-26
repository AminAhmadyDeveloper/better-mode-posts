import { gql } from "@/__generated__";
import { Container } from "@/components/layout/container";
import { For } from "@/components/utils/for";
import { normalizeHtml, timeSince } from "@/lib/utils";
import { useQuery } from "@apollo/client";
import { useParams } from "react-router-dom";

const getPost = gql(
  "\n  query GetPost($postId: ID!) {\n    getPost(postId: $postId) {\n      owner {\n        member {\n          name\n          profilePicture {\n            ... on Image {\n              url\n              __typename\n            }\n            __typename\n          }\n          __typename\n        }\n        __typename\n      }\n      id\n      updatedAt\n      contentSummary {\n        summary\n        __typename\n      }\n      fields {\n        value\n        key\n        __typename\n      }\n      description\n      thumbnail {\n        ... on Image {\n          url\n          __typename\n        }\n        __typename\n      }\n      tags {\n        title\n        __typename\n      }\n      title\n      reactions {\n        reaction\n        __typename\n      }\n      __typename\n    }\n  }\n"
);

export const PostPage = () => {
  const { postId } = useParams();

  const { data } = useQuery(getPost, { variables: { postId: postId || "" } });

  return (
    <main>
      <Container className="flex flex-col items-center justify-center w-full py-8">
        <div className="flex flex-col w-full justify-start items-center">
          <h1 className="text-2xl font-bold mt-4">{data?.getPost.title}</h1>
          <span className="mb-4">
            {timeSince(data?.getPost.updatedAt)} ago by{" "}
            {data?.getPost.owner?.member?.name}
          </span>
          <For each={data?.getPost.fields || []}>
            {(field) => {
              const __html = normalizeHtml(field.value);
              return (
                <p
                  className="prose text-foreground prose-strong:text-foreground prose-headings:text-foreground"
                  key={field.key}
                  dangerouslySetInnerHTML={{ __html }}
                />
              );
            }}
          </For>
        </div>
      </Container>
    </main>
  );
};
