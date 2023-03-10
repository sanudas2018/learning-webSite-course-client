import { createBrowserRouter } from "react-router-dom";
import Main from "../layout/Main";
import Blog from "../Pages/Blog/Blog";
import CourseDetails from "../Pages/Courses/CourseDetails/CourseDetails";
import Courses from "../Pages/Courses/Courses";
import Faq from "../Pages/Faq/Faq";
import Home from "../Pages/Home/Home";
import Login from "../Pages/Login/Login";
import NotFound from "../Pages/NotFound/NotFound";
import CheckOut from "../Pages/Others/CheckOut/CheckOut";
import Profile from "../Pages/Others/Profile/Profile";
import TremsAndConditon from "../Pages/Others/TremsAndConditon/TremsAndConditon";
import Registration from "../Pages/Registration/Registration";
import PrivateRoutes from "./PrivateRoutes";

export const router = createBrowserRouter([
  { path: "/", element: <Home></Home> },
  { path: "/home", element: <Home></Home> },
  {
    path: "/",

    element: <Main></Main>,
    children: [
      {
        path: "/courses",
        element: <Courses></Courses>,
        loader: async () => {
          return fetch("https://open-door-learner-server.vercel.app/courses");
        },
      },
      {
        path: "/courses/details/:id",
        element: <CourseDetails></CourseDetails>,
        loader: async ({ params }) => {
          return fetch(
            `https://open-door-learner-server.vercel.app/courses/${params.id}`
          );
        },
      },
      {
        path: "/checkOut/:id",
        element: (
          <PrivateRoutes>
            <CheckOut></CheckOut>
          </PrivateRoutes>
        ),
        loader: async ({ params }) => {
          return fetch(
            `https://open-door-learner-server.vercel.app/courses/${params.id}`
          );
        },
      },
      { path: "/faq", element: <Faq></Faq> },
      { path: "/blog", element: <Blog></Blog> },
    ],
  },
  {
    path: "/profile",
    element: (
      <PrivateRoutes>
        <Profile></Profile>
      </PrivateRoutes>
    ),
  },
  { path: "/registration", element: <Registration></Registration> },

  { path: "/login", element: <Login></Login> },
  {
    path: "/termsAndCondition",
    element: <TremsAndConditon></TremsAndConditon>,
  },
  { path: "*", element: <NotFound></NotFound> },
]);
