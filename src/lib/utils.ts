import { GetPostsQuery } from "@/__generated__/graphql";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function createShortName(name?: string | null) {
  return name
    ?.split(" ")
    .map((i) => i.at(0))
    .join(" ");
}

export function imageSelector(
  profilePicture?: NonNullable<
    NonNullable<
      NonNullable<GetPostsQuery["getPosts"]["nodes"]>[0]["owner"]
    >["member"]
  >["profilePicture"]
) {
  return profilePicture?.__typename === "Image"
    ? profilePicture.url
    : undefined;
}

export function timeSince(date: string) {
  var seconds = Math.floor((+new Date() - +new Date(date)) / 1000);

  var interval = seconds / 31536000;

  if (interval > 1) {
    return Math.floor(interval) + " years";
  }
  interval = seconds / 2592000;
  if (interval > 1) {
    return Math.floor(interval) + " months";
  }
  interval = seconds / 86400;
  if (interval > 1) {
    return Math.floor(interval) + " days";
  }
  interval = seconds / 3600;
  if (interval > 1) {
    return Math.floor(interval) + " hours";
  }
  interval = seconds / 60;
  if (interval > 1) {
    return Math.floor(interval) + " minutes";
  }
  return Math.floor(seconds) + " seconds";
}

export function normalizeHtml(text: string | null | undefined) {
  return (
    text
      ?.replace('"', "")
      .slice(0, text.length - 4)
      .replaceAll('\\"', "") || ""
  );
}
