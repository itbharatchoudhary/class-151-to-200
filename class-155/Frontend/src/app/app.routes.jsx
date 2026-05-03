import { createBrowserRouter, Outlet, Navigate } from "react-router";
import Register from "../features/auth/pages/Register";
import Login from "../features/auth/pages/Login";
import CreateProduct from "../features/products/pages/CreateProduct";
import Dashboard from "../features/products/pages/Dashboard";
import Protected from "../features/auth/components/Protected";
import Home from "../features/products/pages/Home";
import ProductDetails from "../features/products/pages/ProductDetails";
import SellerProductsDetails from "../features/products/pages/SellerProductsDetails";
import Cart from "../features/cart/pages/Cart";
import AppLayout from "./AppLayout";

export const routes = createBrowserRouter([
 
    {
        path: "/register",
        element: <Register />
    },
    {
        path: "/login",
        element: <Login />
    },
    {
        element: <AppLayout />,
        children: [
            {
                path: "/",
                element: <Home />
            },
            {
                path: "/product/:id",
                element: <ProductDetails />
            },
            {
                path: "/cart",
                element: <Protected><Cart /></Protected>
            },
            {
                path: "/seller",
                element: <Protected role="seller"><Outlet /></Protected>,
                children: [
                    {
                        index: true,
                        element: <Navigate to="/seller/dashboard" replace />
                    },
                    {
                        path: "create-product",
                        element: <CreateProduct />
                    },
                    {
                        path: "dashboard",
                        element: <Dashboard />
                    },
                    {
                        path: "product/:id",
                        element: <SellerProductsDetails />
                    }
                ]
            },
        ]
    },
])
