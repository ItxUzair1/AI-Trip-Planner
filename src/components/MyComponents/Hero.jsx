import { useNavigate } from "react-router-dom";
import { Button } from "../ui/button";

export default function Hero() {
    const navigate = useNavigate();

    function handleClick() {
        navigate("/create-trip");
    }

    return (
        <section className="flex items-center mx-20 flex-col gap-10">
            <h1 className="font-extrabold text-[55px] text-center mt-9">
                <span className="text-[#eb5834]">Turn Travel Dreams Into Reality With AI </span> 
                Plan, Explore, and Experience Like Never Before!
            </h1>
            <p className="font-medium text-xl text-center">
                Planning your next trip has never been easier! With our AI-powered trip planner, you can create personalized itineraries, find the best destinations, and book everything in one place.
            </p>
            <Button onClick={handleClick}>Get Started</Button>
            <img 
                src="/src/assets/Designer.png" 
                alt="Designer" 
                className="w-full md:w-3/4 lg:w-1/2 mt-6 h-auto max-h-[600px] object-contain" 
            />
        </section>
    );
}
