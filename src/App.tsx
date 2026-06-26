import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Home from "./pages/Home/Home";
import Build from "./pages/Build/Build";
import Preview from "./pages/Build/Preview";
import NotFound from "./pages/NotFound/NotFound";
import Templates from "./pages/Templates/Templates";

const router = createBrowserRouter(
  [
    { path: "/", element: <Home /> },
    { path: "/build/:template", element: <Build /> },
    { path: "/build/preview", element: <Preview /> },
    { path: "/templates", element: <Templates /> },
    { path: "*", element: <NotFound /> },
  ],
  {
    basename: "/ResumeBuilder",
  },
);

function App() {
  return <RouterProvider router={router}></RouterProvider>;
}

export default App;
