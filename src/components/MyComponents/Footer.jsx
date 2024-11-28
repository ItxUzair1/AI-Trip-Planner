export default function Footer() {
    return (
        <footer className="bg-[#ffefe6] text-black py-10 mt-16">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                    {/* Logo and About Section */}
                    <div>
                    <img src="logo.svg" alt="Company Logo"/>
                        <p className="mt-4 text-black">
                            Your intelligent travel companion, simplifying journeys with personalized planning and recommendations.
                        </p>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h3 className="text-lg font-semibold text-[#eb5834]">Quick Links</h3>
                        <ul className="mt-4 space-y-2">
                            <li>
                                <a href="#" className="text-black hover:text-[#eb5834]">Home</a>
                            </li>
                            <li>
                                <a href="#" className="text-black hover:text-[#eb5834]">Features</a>
                            </li>
                            <li>
                                <a href="#" className="text-black hover:text-[#eb5834]">Pricing</a>
                            </li>
                            <li>
                                <a href="#" className="text-black hover:text-[#eb5834]">Contact</a>
                            </li>
                        </ul>
                    </div>

                    {/* Resources */}
                    <div>
                        <h3 className="text-lg font-semibold text-[#eb5834]">Resources</h3>
                        <ul className="mt-4 space-y-2">
                            <li>
                                <a href="#" className="text-black hover:text-[#eb5834]">Blog</a>
                            </li>
                            <li>
                                <a href="#" className="text-black hover:text-[#eb5834]">FAQs</a>
                            </li>
                            <li>
                                <a href="#" className="text-black hover:text-[#eb5834]">Support</a>
                            </li>
                            <li>
                                <a href="#" className="text-black hover:text-[#eb5834]">Privacy Policy</a>
                            </li>
                        </ul>
                    </div>

                    {/* Subscribe Section */}
                    <div>
                        <h3 className="text-lg font-semibold text-[#eb5834]">Subscribe</h3>
                        <p className="mt-4 text-black">
                            Stay updated with the latest travel tips and offers.
                        </p>
                        <form className="mt-4">
                            <input
                                type="email"
                                placeholder="Your email"
                                className="w-full px-4 py-2 text-black border border-[#eb5834] rounded-md focus:ring-2 focus:ring-[#eb5834] outline-none"
                            />
                            <button
                                type="submit"
                                className="mt-2 w-full bg-[#eb5834] text-white py-2 px-4 rounded-md hover:bg-[#d14e2e] transition duration-300"
                            >
                                Subscribe
                            </button>
                        </form>
                    </div>
                </div>

                {/* Footer Bottom */}
                <div className="mt-10 border-t border-[#eb5834] pt-6 text-center">
                    <p className="text-black">
                        
                        &copy; {new Date().getFullYear()} AI Trip Planner. All rights reserved.
                    </p>
                </div>
            </div>
        </footer>
    );
}
