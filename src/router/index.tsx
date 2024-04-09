import React, { lazy } from "react";
import { createBrowserRouter } from "react-router-dom";

import MainLayout from "../layouts/MainLayout";
import ManageLayout from "../layouts/ManageLayout";
import QuestionLayout from "../layouts/QuestionLayout";
import Home from "../pages/Home";
import Login from "../pages/Login";
import Register from "../pages/Register";
import NotFound from "../pages/NotFound";
import List from "../pages/manage/List";
import Trash from "../pages/manage/Trash";
import Star from "../pages/manage/Star";
// import Edit from "../pages/question/Edit";
// import Statistics from "../pages/question/Statistics";

// 路由懒加载，拆分 bundle， 优化首页体积 *******************这个可以写到论文里面*******************
const Edit = lazy(() => import("../pages/question/Edit"));
const Statistics = lazy(() => import("../pages/question/Statistics"));

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        path: "/",
        element: <Home />
      },
      { path: "login", element: <Login /> },
      { path: "register", element: <Register /> },
      {
        path: "manage",
        element: <ManageLayout />,
        children: [
          {
            path: "list",
            element: <List />
          },
          {
            path: "star",
            element: <Star />
          },
          {
            path: "trash",
            element: <Trash />
          }
        ]
      },
      { path: "*", element: <NotFound /> }
    ]
  },
  {
    path: "question",
    element: <QuestionLayout />,
    children: [
      {
        path: "edit/:id",
        element: <Edit />
      },
      {
        path: "statistics/:id",
        element: <Statistics />
      }
    ]
  }
]);

export default router;

// 小优化点
export const HOME_PATHNAME = "/";
export const LOGIN_PATHNAME = "/login";
export const REGISTER_PATHNAME = "/register";
export const MANAGE_INDEX_PATHNAME = "/manage/list";

export function isLoginOrRegisterPage(pathname: string) {
  return pathname === LOGIN_PATHNAME || pathname === REGISTER_PATHNAME;
}

export function isNoNeedUserInfo(pathname: string) {
  return isLoginOrRegisterPage(pathname) || pathname === HOME_PATHNAME;
}
