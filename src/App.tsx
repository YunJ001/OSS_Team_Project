import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Splash from "./pages/Splash";
import Home from "./pages/Home";
import Test from "./pages/Test";
import Review from "./pages/Review";

function App() {
  const router = createBrowserRouter([
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
  ]);
  return (
    <div className="mx-auto relative">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
