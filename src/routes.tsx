import AboutPage from "@/pages/about/about-page";
import HomePage from "@/pages/home/home-page";
import { Routes as _Routes, Route } from "react-router-dom";
import MainLayout from "@/layouts/main-layout";

import { FC } from "react";
import NotFoundPage from "@/pages/not-found-page";

export interface RoutesProps {}

export const Routes: FC<RoutesProps> = () => {
  return (
    <_Routes>
      <Route path="/" element={<MainLayout />}>
        <Route index element={<HomePage />} />
        <Route path="about" element={<AboutPage />} />
      </Route>
        <Route path="*" element={<NotFoundPage />} />
    </_Routes>
  );
};
