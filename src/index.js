import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import App from "./App";

const rootElement = document.getElementById("root");
const root = createRoot(rootElement);
const router = createBrowserRoutesFromElements(
  createElementsfromRoutes({
    <Route path="/" elements={<Layout/>}>
    <Route path="" elements={<Register/>}>
    <Route path="login" elements={<Register/>}>
    </Route>
  })
)

root.render(
  <StrictMode>
    <App />
    <RouterProvider  router={router}/>
  </StrictMode>
);
