import { Route, Routes } from "react-router-dom";
import { lazy, Suspense } from "react";

import Header from "components/Header/Header";
import HomePage from "pages/HomePage/HomePage";
import PrivatRoute from "routers/PrivatRouter";

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
    <>
      <Header />
      <main>
        <Suspense fallback={"Loading..."}>
          <Routes>
            <Route path="/news-ego" element={<HomePage />} />
            <Route path="/news-ego/news" element={<NewsPage />} />
            <Route
              path="/news-ego/profile"
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
    </>
  );
}

export default App;