import { useNavigate } from "react-router-dom";
import ProgressBar from "../components/ProgressBar";
import completeIllustration from "../assets/Confirmed-pana 1.png"; // Replace with actual image path
import etugra from "../assets/etugra-logo 1.png";

export default function Complete() {
    const navigate = useNavigate();

    const handleComplete = () => {
        // You can add additional functionality here if necessary
        navigate("/"); // Navigate to the home page or another route
    };

    return (
        <div className="min-h-screen flex md:flex-row flex-col">
            {/* Left Section with light gray background */}
            <div className="w-full md:w-1/2 bg-gray-100 flex flex-col p-8 items-center justify-center">
                <ProgressBar currentStep={4} />
                <img
                    src={etugra} // Replace with the image URL or leave blank for now
                    alt="Validation illustration"
                    className="mb-6 mx-auto"
                />
                <div className="flex flex-col items-center gap-4 mt-6 bg-white w-full max-w-lg p-8 rounded-2xl shadow-lg">

                    <h3 className="text-2xl font-bold mb-2">E-Government Validation</h3>

                    <div className="bg-orange-100 w-full max-w-lg p-8 rounded-3xl shadow-lg flex flex-col items-start">
                        {/* Card with white background */}
                        <p className="text-orange-600">Your application has been submitted successfully. Please  follow
                            these steps to complete the validation process</p>

                        <ol className="list-decimal list-inside text-sm text-gray-700 mt-4 ">
                            <li>Visit the e-government portal.</li>
                            <li>Log in with your e-government credentials.</li>
                            <li>Navigate to the Digital Signature section.</li>
                            <li>Locate and approve your pending application.</li>
                        </ol>
                    </div>
                    <div className="w-full max-w-lg">
                        <button
                            onClick={handleComplete}
                            className="w-full bg-orange-500 text-white py-2 px-4  hover:bg-orange-600"
                        >
                            Complete Application
                        </button>
                    </div>
                </div>

            </div>

            {/* Right Section */}
            <div className="w-full md:w-1/2 bg-orange-100 flex flex-col items-center justify-center p-8">
                <div className="max-w-md text-start">
                    <img
                        src={completeIllustration} // Replace with actual image or URL
                        alt="Completion illustration"
                        className="mb-6 mx-auto w-full max-w-xs lg:max-w-md"
                    />
                    <h3 className="text-xl  font-semibold text-orange-600 mb-2">Important Note:</h3>
                    <ul className="list-disc text-start text-sm text-orange-600 ms-4">
                        <li>Visit the E-Government Portal.</li>
                        <li>Log in with your E-Government credentials.</li>
                    </ul>
                </div>
            </div>
        </div>
    );
}
