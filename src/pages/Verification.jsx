import { useNavigate } from "react-router-dom";
import { useState } from "react";
import ProgressBar from "../components/ProgressBar";
import createAccountIllustration from "../assets/Sign up-cuate 1.png"; // Replace with actual image path
import etugra from "../assets/etugra-logo 1.png";
import "react-phone-input-2/lib/material.css";

export default function Verification() {
    const navigate = useNavigate();
    const [ifSend, setIfSend] = useState(0)
    const [formData, setFormData] = useState({
        phone: "",
        otp: "",
    });

    const handleNext = (e) => {
        e.preventDefault();
        setIfSend(1)
        console.log("Form Data:", formData); // Debugging log
        if (ifSend > 0) {
            navigate("/customer-info");
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value, // Dynamically set the field based on `name`
        }));
    };

    return (
        <div className="min-h-screen flex md:flex-row flex-col">
            {/* Left Section with light gray background */}
            <div className="w-full lg:w-1/2 bg-gray-100 flex flex-col items-center justify-center p-8 gap-4">
                <ProgressBar currentStep={1} />
                <img
                    src={etugra} // Replace with the image URL or leave blank for now
                    alt="Validation illustration"
                    className="mb-6 mx-auto"
                />
                <div className="bg-white w-full max-w-lg p-8 rounded-2xl shadow-lg">
                    {/* Card with white background */}
                    <form className="space-y-2 w-full max-w-md gap-4 grid grid-col-3" onSubmit={handleNext}>
                        <h2 className="col-span-2 text-2xl font-bold ms-2">Verification</h2>
                        <h2 className="col-span-2 text-md font-semibold text-orange-500 ms-2">
                            Enter your phone number, we will send OTP for verification.
                        </h2>

                        {/* Phone Input */}
                        <div className="col-span-2">
                            <div className="md:col-span-1 col-span-2">
                                <div className="flex">
                                    {/* <!-- Country Code Dropdown --> */}
                                    <select id="countryCode" className="block h-12 w-14 py-2 text-gray-700 bg-white border border-gray-300 rounded-l-2xl">
                                        <option value="+49">+49 (Germany)</option>
                                        <option value="+1">+1 (USA)</option>
                                        <option value="+44">+44 (UK)</option>
                                        <option value="+91">+91 (India)</option>
                                        <option value="+33">+33 (France)</option>
                                    </select>
                                    {/* <!-- Mobile Number Input --> */}
                                    <input
                                        type="tel"
                                        id="phoneNumber"
                                        placeholder="Phone#"
                                        className="flex-1 block w-full h-12 p-2 px-3 py-2 me-2 text-gray-700 bg-white border border-gray-300 rounded-r-2xl"
                                        required
                                    />
                                    <button
                                        type="subit"
                                        className="text-orange-500 border border-orange-500 h-12 p-2 px-4 rounded-2xl hover:bg-orange-500 hover:text-white"
                                    >
                                        {ifSend === 0 ? "Send" : "Resend"}
                                    </button>
                                </div>
                                <label className="text-xs ms-2 text-gray-400">Enter your Phone No.</label>
                            </div>
                        </div>


                        {/* OTP Input */}
                        {ifSend > 0 &&
                            <div className="col-span-2">
                                <label className="text-md font-semibold text-orange-500 ms-2">Enter OTP to verify your account.</label>
                                <input
                                    type="text"
                                    name="otp"
                                    value={formData.otp}
                                    onChange={handleInputChange}
                                    className="h-12 p-2 border mt-1 block w-full border-gray-300 rounded-2xl shadow-sm"
                                    placeholder="OTP*"
                                    required
                                />
                                <label className="text-xs ms-2 text-gray-400">Please Enter an OTP.</label>
                            </div>
                        }


                        {/* Submit Button */}
                        {/* <button
                            type="submit"
                            className="w-full bg-orange-500 text-white py-2 px-4 hover:bg-orange-600 col-span-2"
                        >
                            Next
                        </button> */}
                        <div className="w-full flex md:self-end mb-8 col-start-1 md:col-start-2">
                            <button
                                type="submit"
                                className="bg-orange-500 text-white px-6 py-2 w-full hover:bg-orange-600"
                                disabled={ifSend === 0 ? "true" : ""}
                            >
                                Next
                            </button>
                        </div>
                    </form>
                </div>
            </div>

            {/* Right Section */}
            <div className="w-full lg:w-1/2 bg-orange-100 flex flex-col items-center justify-center p-8">
                <div className="max-w-md text-center">
                    <img
                        src={createAccountIllustration} // Replace with actual image or URL
                        alt="Create Account illustration"
                        className="mb-6 mx-auto w-full max-w-xs lg:max-w-md"
                    />
                    <h3 className="text-xl font-semibold text-orange-600 mb-2 text-start">Important Note:</h3>
                    <ul className="list-disc text-start text-sm text-orange-600 ms-4">
                        <li>Please enter the One-Time Password (OTP) sent to your registered phone number.</li>
                        <li>Enter your secure password to log in or complete the verification.</li>
                    </ul>
                </div>
            </div>
        </div>
    );
}
