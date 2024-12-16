import etugra from "../assets/etugra-logo 1.png";

const LandingPage = () => {
    return (
        <div className="font-sans bg-blue-50">
            {/* Navbar */}
            <header className="bg-white shadow-md">
                <div className="container mx-auto px-4 flex justify-between items-center py-4">
                    <img
                        src={etugra}
                        alt=""
                    />
                    <div className="space-x-4">
                        <a href="#" className="text-gray-600 hover:text-blue-500">
                            EN / English
                        </a>
                    </div>
                </div>
            </header>

            {/* Hero Section */}
            <section className="bg-orange-400 text-white py-16">
                <div className="container mx-auto px-4 text-center">
                    <h1 className="text-3xl md:text-4xl font-bold mb-4">
                        SSL Certificate - E-Tuğra Electronic Certificate Service Provider
                    </h1>
                    <p className="text-lg">

                        For those who will receive SSL from E-Tuğra for the first time
                        Welcome campaign has started
                    </p>
                </div>
            </section>

            {/* Features */}
            <section className="bg-white py-12">
                <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
                    {[
                        {
                            title: "SSL/TLS Certificates",
                            icon: "🔒",
                            link: "/checkout",
                        },
                        {
                            title: "S/MIME",
                            icon: "📧",
                            link: "/checkout",
                        },
                        {
                            title: "Code Signing",
                            icon: "💻",
                            link: "/checkout",
                        },
                        {
                            title: "Digital Signature",
                            icon: "📄",
                            link: "/checkout",
                        },
                    ].map((item, idx) => (
                        <div
                            key={idx}
                            className="bg-blue-50 border border-gray-200 rounded-lg p-6"
                        >
                            <div className="text-4xl mb-4">{item.icon}</div>
                            <h2 className="text-xl font-bold mb-2">{item.title}</h2>
                            <a
                                href={item.link}
                                className="inline-block mt-4 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
                            >
                                Shop Now
                            </a>
                        </div>
                    ))}
                </div>
            </section>

            {/* Footer */}
            <footer className="bg-gray-100 py-4">
                <div className="container mx-auto px-4 text-center text-sm text-gray-500">
                    We are working to achieve the SDGs and create a sustainable society.
                </div>
            </footer>
        </div>
    );
};

export default LandingPage
