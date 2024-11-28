import Footer from "@/components/MyComponents/Footer";
import Header from "@/components/MyComponents/Header";
import { Outlet } from "react-router-dom";

export default function Layout(){
    return (
        <div>
            <Header/>
            <Outlet/>
            <Footer/>
        </div>
    )
}
