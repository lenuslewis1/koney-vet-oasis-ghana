
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import PageTransition from "./components/layout/PageTransition";

import Index from "./pages/Index";
import About from "./pages/About";
import Services from "./pages/Services";
import ServiceDetail from "./pages/ServiceDetail";
import Shop from "./pages/Shop";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import Contact from "./pages/Contact";
import NotFound from "./pages/NotFound";
import ProductDetail from "./pages/ProductDetail";
import Blog from "./pages/Blog";
import BlogPost from "./pages/BlogPost";

const queryClient = new QueryClient();

import { CartProvider } from "@/context/CartContext";

// Wrapper component to access location for AnimatePresence
const AnimatedRoutes = () => {
  const location = useLocation();
  
  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={
          <PageTransition>
            <Index />
          </PageTransition>
        } />
        <Route path="/about" element={
          <PageTransition>
            <About />
          </PageTransition>
        } />
        <Route path="/services" element={
          <PageTransition>
            <Services />
          </PageTransition>
        } />
        <Route path="/services/:id" element={
          <PageTransition>
            <ServiceDetail />
          </PageTransition>
        } />
        <Route path="/shop" element={
          <PageTransition>
            <Shop />
          </PageTransition>
        } />
        <Route path="/shop/cart" element={
          <PageTransition>
            <Cart />
          </PageTransition>
        } />
        <Route path="/shop/checkout" element={
          <PageTransition>
            <Checkout />
          </PageTransition>
        } />
        <Route path="/shop/product/:id" element={
          <PageTransition>
            <ProductDetail />
          </PageTransition>
        } />
        <Route path="/contact" element={
          <PageTransition>
            <Contact />
          </PageTransition>
        } />
        <Route path="/blog" element={
          <PageTransition>
            <Blog />
          </PageTransition>
        } />
        <Route path="/blog/:slug" element={
          <PageTransition>
            <BlogPost />
          </PageTransition>
        } />
        <Route path="*" element={
          <PageTransition>
            <NotFound />
          </PageTransition>
        } />
      </Routes>
    </AnimatePresence>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <CartProvider>
        <BrowserRouter>
          <AnimatedRoutes />
        </BrowserRouter>
      </CartProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
