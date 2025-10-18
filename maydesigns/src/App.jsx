import React from "react";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";

import Layout from "./layout/Layout";
import ContactUsPage from "./pages/ContactUs/ContactUsPage";
import Projects from "./pages/Projects/Projects";
import Home from "./pages/Home/Home";
import PageNotFound from "./pages/ErrorPages/NotFound";
import BlogPage from "./pages/Blogs/BlogPage";
import BlogDetailsPage from "./pages/Blogs/BlogDetailsPage";
import AboutUsPage from "./pages/About/AboutUsPage";
import ArchitecturePage from "./pages/Projects/ArchitecturePage";
import InteriorPage from "./pages/Projects/InteriorPage";
import ResidentialInteriorPage from "./pages/Projects/ResidentialInteriorPage";
import CommercialInteriorPage from "./pages/Projects/CommercialInteriorPage";
import ProjectDetailPage from "./pages/Projects/ProjectDetailPage";
import LandscapePage from "./pages/Projects/LandscapePage";

const App = () => {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="/about-us" element={<AboutUsPage />} />
        {/* Projects Routes */}
        <Route path="/projects" element={<Projects />} />
        <Route path="/projects/architecture" element={<ArchitecturePage />} />
        <Route path="/projects/interior" element={<InteriorPage />} />
        <Route
          path="/projects/interior/residential"
          element={<ResidentialInteriorPage />}
        />
        <Route
          path="/projects/interior/commercial"
          element={<CommercialInteriorPage />}
        />
        <Route path="/projects/landscape" element={<LandscapePage />} />
        {/* <Route path="/projects/:id" element={<ProjectDetailPage />} /> */}
        <Route path="/projects/:slug" element={<ProjectDetailPage />} />
        <Route path="/contact-us" element={<ContactUsPage />} />
        <Route path="/blogs" element={<BlogPage />} />
        <Route path="/blog/:slug" element={<BlogDetailsPage />} />

        <Route path="*" element={<PageNotFound />} />
      </Route>
    )
  );

  return (
    <div>
      <RouterProvider router={router} />
    </div>
  );
};

export default App;
