import React from "react";
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
import Edit from "../pages/question/Edit";
import Statistics from "../pages/question/Statistics";

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
      {
        path: "question",
        element: <QuestionLayout />,
        children: [
          {
            path: "edit",
            element: <Edit />
          },
          {
            path: "statistics",
            element: <Statistics />
          }
        ]
      },
      { path: "*", element: <NotFound /> }
    ]
  }
]);

export default router;
