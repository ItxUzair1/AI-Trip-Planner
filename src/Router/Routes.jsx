import CreateTrip from "@/components/MyComponents/CreateTrip";
import Hero from "@/components/MyComponents/Hero";
import SignIn from "@/components/MyComponents/SignIn";
import SignUp from "@/components/MyComponents/SignUp";
import TripDetails from "@/components/MyComponents/TripDetails";
import TripHistory from "@/components/MyComponents/TripHistory";
import AuthLayout from "@/Layout/AuthLayout";
import Layout from "@/Layout/layout";
import { Route, createBrowserRouter, createRoutesFromElements, Outlet } from "react-router-dom";

export const router = createBrowserRouter(
    createRoutesFromElements(
        <>
            <Route path="/" element={<Layout />}>
                <Route index element={<Hero />} />
                <Route path="create-trip" element={<CreateTrip />} />
                <Route path="/trip-details/:id" element={<TripDetails/>}/>
                <Route path="/trip-history" element={<TripHistory/>}/>
            </Route>
            <Route path="/" element={<AuthLayout />}>
                <Route index path="signin" element={<SignIn />} />
                <Route path="signup" element={<SignUp/>}/>
            </Route>
        </>
    ),
    {
        future: {
            v7_startTransition: true,
            v7_relativeSplatPath: true,
            v7_fetcherPersist: true,
            v7_normalizeFormMethod: true,
            v7_skipActionErrorRevalidation: true,
            v7_partialHydration: true,
        },
    }
);
