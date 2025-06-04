import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Splash from "./pages/Splash";
import Home from "./pages/Home";
import Test from "./pages/Test";
import Review from "./pages/Review";
import Word from "./pages/Word";
import Layout from "./Layout";
import Chat from "./pages/Chat";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        {
          path: "/",
          element: <Splash />,
        },
        {
          path: "/home",
          element: <Home />,
        },
        {
          path: "/test",
          element: <Test />,
        },
        {
          path: "/review",
          element: <Review />,
        },
        {
          path: "/word",
          element: <Word />,
        },
        {
          path: "/chat",
          element: <Chat />,
        },
      ],
    },
  ]);
  return (
    <div className="mx-auto relative">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
