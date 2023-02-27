import { Route, Routes } from "react-router-dom";
import { lazy, Suspense } from "react";

import Header from "components/Header/Header";
import HomePage from "pages/HomePage/HomePage";
import PrivatRoute from "routers/PrivatRouter";
import { ThemeProvider } from "@mui/material";
import "./i18n";
import { theme } from "styles/theme";
import { Loader } from "general";

const NewsPage = lazy(
  () => import("pages/NewsPage/NewsPage" /* webpackChunkName: "NewsPage" */)
);

const ProfilePage = lazy(
  () =>
    import(
      "pages/ProfilePage/ProfilePage" /* webpackChunkName: "ProfilePage" */
    )
);

const ErrorPage = lazy(
  () => import("pages/ErrorPage/ErrorPage" /* webpackChunkName: "ErrorPage" */)
);

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Header />
      <main>
        <Suspense fallback={<Loader />}>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/news" element={<NewsPage />} />
            <Route
              path="/profile"
              element={
                <PrivatRoute>
                  <ProfilePage />
                </PrivatRoute>
              }
            />
            <Route path="*" element={<ErrorPage />} />
          </Routes>
        </Suspense>
      </main>
    </ThemeProvider>
  );
}

export default App;
