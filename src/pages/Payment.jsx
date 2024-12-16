import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import ProgressBar from '../components/ProgressBar';
import paymentIllustration from "../assets/Wallet-amico 1.png"; // Replace with actual image path
import etugra from "../assets/etugra-logo 1.png"; // Replace with actual logo path
import creditCards from "../assets/cards.png";
import InputMask from "react-input-mask";
import Cards from 'react-credit-cards-2';
import 'react-credit-cards-2/dist/es/styles-compiled.css';

export default function PaymentInformation() {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        cardNumber: "",
        expiryDate: "",
        cvc: "",
        name: "",
        focus: ""
    });


    // const handleInputFocus = (evt) => {
    //     setState((prev) => ({ ...prev, focus: evt.target.name }));
    //   }

    const handleNext = (e) => {
        e.preventDefault();
        // Here you can log or send formData to API
        console.log(formData);
        navigate('/complete'); // Navigate to Create Account screen
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value
        }));
    };

    const handleInputFocus = (evt) => {
        setFormData((prev) => ({ ...prev, focus: evt.target.name }));
    }

    return (
        <div className="min-h-screen flex md:flex-row flex-col">
            {/* Left Section with light gray background */}
            <div className="w-full md:w-1/2 bg-gray-100 flex flex-col items-center justify-center p-8">
                <ProgressBar currentStep={3} />
                <img
                    src={etugra} // Etugra logo
                    alt="Etugra Logo"
                    className="mb-6 mx-auto"
                />
                <div className="bg-white w-full max-w-xl p-8 rounded-2xl shadow-lg">
                    {/* Card with white background */}
                    <form className="space-y-4 w-full grid grid-cols-3 gap-4" onSubmit={handleNext}>

                        {/* Credit Card Fields */}
                        <>
                            <h2 className="col-span-2 text-2xl font-bold ms-2">Payment Method</h2>

                            <div className="col-span-3">
                                <div className='flex flex-row items-center border w-full border-gray-300 rounded-2xl shadow-sm relative'>
                                    <input
                                        type="number"
                                        id="cardNumber"
                                        name="cardNumber"  // Added name attribute for formData
                                        value={formData.cardNumber} // Bind value to state
                                        onChange={handleInputChange} // Handle input change
                                        onFocus={handleInputFocus}
                                        className="h-12 p-2 w-full rounded-2xl"
                                        placeholder="Card Number*"
                                        required
                                    />
                                    <img
                                        src={creditCards} // Payment illustration
                                        alt="Payment illustration"
                                        className="mx-auto absolute right-1"
                                    />
                                </div>
                                <label className='text-xs ms-2 text-gray-400'>Enter a valid card number.</label>
                            </div>
                            <div className="col-span-3">
                                <input
                                    type="text"
                                    name="name"
                                    className="h-12 p-2 border mt-1 block w-full border-gray-300 rounded-2xl shadow-sm"
                                    placeholder="Card Holder's Name*"
                                    value={formData.name}
                                    onChange={handleInputChange}
                                    onFocus={handleInputFocus}
                                    required
                                />
                                <label className="text-xs ms-2 text-gray-400">Enter your first name.</label>
                            </div>

                            <div className='flex flex-row  col-span-3'>
                                <div className='col-span-1 space-y-8 me-2'>
                                    <div >
                                        <InputMask
                                            mask="99/99"
                                            placeholder="MM/YY*"
                                            name="expiryDate" // Added name attribute for formData
                                            value={formData.expiryDate} // Bind value to state
                                            onChange={handleInputChange} // Handle input change
                                            onFocus={handleInputFocus}
                                            className="h-12 p-2 border mt-1 block w-full border-gray-300 rounded-2xl shadow-sm"
                                            alwaysShowMask={false}
                                            required
                                        />
                                        <label className='text-xs ms-2 text-gray-400'>Expiry Date (MM/YY).</label>
                                    </div>
                                    <div>
                                        <input
                                            type="number"
                                            name="cvc" // Added name attribute for formData
                                            value={formData.cvc} // Bind value to state
                                            onChange={(e) => {
                                                const value = e.target.value;
                                                // Allow only digits and limit to 3 characters
                                                if (/^\d{0,3}$/.test(value)) {
                                                    handleInputChange(e);
                                                }
                                            }} // Handle input change
                                            onFocus={handleInputFocus}
                                            className="h-12 p-2 border mt-1 block w-full border-gray-300 rounded-2xl shadow-sm"
                                            placeholder="CVC*"
                                            maxLength="3"
                                            required
                                        />
                                        <label className='text-xs ms-2 text-gray-400'>3-digit code on the back.</label>
                                    </div>
                                </div>
                                <div className='col-span-2 columns-xs h-52 container size-'>
                                    <Cards
                                        number={formData.cardNumber}
                                        expiry={formData.expiryDate}
                                        cvc={formData.cvc}
                                        name={formData.name}
                                        focused={formData.focus}
                                        preview={true}
                                        style={{ width: '220px', height: '140px' }} // Reduce card size
                                    />
                                </div>
                            </div>


                        </>

                        {/* <button
                            type="submit"
                            className="w-full bg-orange-500 text-white py-2 px-4 rounded-2xl hover:bg-orange-600 col-span-3"
                        >
                            Next
                        </button> */}
                        <div className="flex md:self-end md:me-16 mb-8 w-full col-span-1 col-start-3">
                            <button
                                type="submit"
                                className="bg-orange-500 text-white px-6 py-2 w-full hover:bg-orange-600"
                                onClick={handleNext}
                            >
                                Next
                            </button>
                        </div>
                    </form>
                </div>
            </div>

            {/* Right Section with orange background */}
            <div className="w-full md:w-1/2 bg-orange-100 flex flex-col items-center justify-center p-8">
                <div className="max-w-md text-center">
                    <img
                        src={paymentIllustration} // Payment illustration
                        alt="Payment illustration"
                        className="mb-6 mx-auto"
                    />
                    <h3 className="text-xl font-semibold text-orange-600 mb-2 text-start">Important Note:</h3>
                    <ul className="list-disc text-start text-sm text-orange-600 ms-4">
                        <li>Credit/Debit Card (Visa, MasterCard, etc.).</li>
                        <li>Digital Wallets (Paypal).</li>
                        <li>Select your preferred payment method at checkout.</li>
                        <li>Ensure accurate details are entered to avoid transaction errors.</li>
                    </ul>
                </div>
            </div>
        </div>
    );
}
