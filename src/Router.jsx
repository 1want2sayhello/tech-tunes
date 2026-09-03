import React, { Suspense, lazy } from "react";
import { Routes, Route } from "react-router-dom";
import Fallback from "./components/UI/Fallback/Fallback";
import NotFound from "./components/UI/Error/NotFound/NotFound";

const Home = lazy(() => import("./pages/Home/Home"));
const Music = lazy(() => import("./pages/Music/Music"));
const Tech = lazy(() => import("./pages/Tech/Tech"));
const Merch = lazy(() => import("./pages/Merch/Merch"));
const LearnMore = lazy(() => import("./pages/LearnMore/LearnMore"));

const Cart = lazy(() => import("./pages/Cart/Cart"));
const OrderConfirmation = lazy(
  () => import("./pages/Cart/OrderConfirm/OrderConfirm"),
);

import SearchResults from "./pages/Search/SearchResults";

const VinylDetails = lazy(() => import("./pages/Details/VinylDetails"));

const TechDetails = lazy(() => import("./pages/Details/TechDetails"));
const MerchDetails = lazy(() => import("./pages/Details/MerchDetails"));

const LocationDetails = lazy(() => import("./pages/Details/LocationDetails"));

const Router = () => {
  return (
    <Suspense fallback={<Fallback />}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/music" element={<Music />} />
        <Route path="/tech" element={<Tech />} />
        <Route path="/merch" element={<Merch />} />
        <Route path="/learn-more" element={<LearnMore />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/buy-now" element={<Cart buyNowMode />} />
        <Route path="/order-confirmation" element={<OrderConfirmation />} />

        <Route path="/locations/:slug" element={<LocationDetails />} />
        <Route path="/vinyl/:slug" element={<VinylDetails />} />
        <Route path="/merch/:slug" element={<MerchDetails />} />
        <Route path="/tech/:slug" element={<TechDetails />} />
        <Route path="/search" element={<SearchResults />} />

        <Route path="*" element={<NotFound />} />
      </Routes>
    </Suspense>
  );
};

export default Router;
