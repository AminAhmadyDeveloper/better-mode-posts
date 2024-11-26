import AboutPage from "@/pages/about/about-page";
import HomePage from "@/pages/home/home-page";
import { Routes as _Routes, Route } from "react-router-dom";
import MainLayout from "@/pages/main-layout";

import { FC, Suspense } from "react";
import NotFoundPage from "@/pages/not-found-page";
import { AuthLayout } from "@/pages/auth/auth-layout";
import SelectNetworkPage from "@/pages/auth/select-network/select-network-page";
import LoginPage from "@/pages/auth/login/login-page";
import { PostPage } from "@/pages/post/post-page";

export interface RoutesProps {}

export const Routes: FC<RoutesProps> = () => {
  return (
    <_Routes>
      <Route path="/" element={<MainLayout />}>
        <Route index element={<HomePage />} />
        <Route path="about" element={<AboutPage />} />
        <Route
          path="post/:postId"
          element={
            <Suspense>
              <PostPage />
            </Suspense>
          }
        />
      </Route>
      <Route path="/auth" element={<AuthLayout />}>
        <Route index element={<SelectNetworkPage />} />
        <Route path="login" element={<LoginPage />} />
      </Route>
      <Route path="*" element={<NotFoundPage />} />
    </_Routes>
  );
};
