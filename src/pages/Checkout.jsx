import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import arrowBack from "../assets/Vector.png";
// import ReactFlagsSelect from "react-flags-select";
import creditCard from "../assets/credit.png"
export default function Checkout() {
    const navigate = useNavigate();
    // const [selectedCountry, setSelectedCountry] = useState("TR");
    // const [quantity, setQuantity] = useState(1);
    // const [duration, setDuration] = useState("1 Year");
    const [totalPrice, setTotalPrice] = useState(920.0);
    const basePrice = 920.0;
    const [formData, setFormData] = useState({
        nationalIdType: "National ID",
        nationalId: "",
        dob: "",
        hasOrganization: false,
        firstName: "",
        lastName: "",
        organizationName: "",
        taxNumber: "",
        coupon: "",
        quantity: 1,
        duration: "1 Year"
    });
    // const handleQuantityChange = (e) => {
    //     const value = parseInt(e.target.value, 10);
    //     setQuantity(value > 0 ? value : 1); // Ensure quantity is always greater than 0
    // };

    const handleInputChange = (e) => {
        const { name, value, type, checked } = e.target;
        console.log(name, value, type, checked)
        setFormData((prevData) => ({
            ...prevData,
            [name]: type === "checkbox" ? checked : name === "quantity" ? Math.max(0, Number(value)) : value,
        }));
    };

    const calculateTotalPrice = () => {
        let yearMultiplier = 1;
        if (formData.duration === "2 Year") yearMultiplier = 2;
        if (formData.duration === "3 Year") yearMultiplier = 3;

        const total = basePrice * yearMultiplier * formData.quantity;
        setTotalPrice(total.toFixed(2)); // Ensure the price is formatted to 2 decimal places
    };

    const handleNext = (e) => {
        // Handle navigation or API call
        e.preventDefault();
        console.log(formData)
        navigate("/verify-account", { state: { checkoutForm: formData } });
    };

    useEffect(() => {
        calculateTotalPrice();
    });

    return (
        <>
            {/* Header */}
            {/* <header className="bg-white shadow-md">
                <div className="container mx-auto px-4 flex justify-between items-center py-4">
                    <img src={etugra} alt="Etugra Logo" />
                </div>
            </header> */}

            {/* Hero Section */}
            <section className="bg-orange-400 text-white px-10 md:px-20 relative pb-28">
                {/* Back button */}
                <div className="text-gray-200 gap-4 text-3xl font-semibold flex flex-row items-center py-4 pt-10 space-x-4">
                    <button
                        className=""
                        onClick={() => navigate("/")}
                    >
                        <img src={arrowBack} alt="Back Arrow" />
                    </button>
                    <span>Your Cart</span>
                </div>



                {/* Main Content */}
                <div className="relative text-black mt-4 ">
                    <div className="absolute inset-x-0 top-full container mx-auto">
                        <div className="flex md:flex-row flex-col-reverse gap-8">
                            {/* Product Details */}

                            <form className="bg-white shadow p-6 rounded-lg relative md:w-2/3" onSubmit={handleNext}>
                                {/* Duration Section */}
                                <div className="flex gap-4 border-b pb-4 my-4">
                                    <p className="text-sm font-bold">Duration:</p>

                                    {['1 Year', '2 Year', '3 Year'].map((option) => (
                                        <label key={option} className="flex items-center space-x-1">
                                            <input
                                                type="radio"
                                                name="duration"
                                                value={option}
                                                checked={formData.duration === option}
                                                onChange={handleInputChange}
                                            />
                                            <span>{option}</span>
                                        </label>
                                    ))}
                                </div>
                                <div className="flex items-center justify-between border-b pb-4 mb-4">
                                    <h3 className="text-xl font-semibold">Product</h3>
                                    <h3 className="text-xl font-semibold">Quantity</h3>
                                    <h3 className="text-xl font-semibold">Price</h3>
                                </div>
                                <div className="flex items-center justify-between border-b pb-4 mb-4">
                                    <h3 className="text-xl font-semibold">Digital Signature</h3>
                                    <input
                                        type="number"
                                        name="quantity"
                                        className="border border-gray-300 rounded w-12 text-center me-14"
                                        value={formData.quantity === 0 ? "" : formData.quantity}
                                        onChange={handleInputChange}
                                        min="0"
                                        max="99"
                                    />
                                    <p className="text-lg font-semibold">${basePrice.toFixed(2)}</p>
                                </div>
                                <p className="text-sm text-gray-600 border-b mb-4">
                                    <b>Product Overview: </b>This digital signature solution ensures maximum security for your documents with advanced encryption. Easy to use and compliant with legal standards, it is the ideal solution for your business and personal needs.
                                </p>

                                <div className="mt-8 gap-6 my-10 grid grid-cols-2">
                                    <div className="col-span-2 flex flex-col">
                                        <select
                                            name="nationalIdType"
                                            value={formData.nationalIdType}
                                            onChange={handleInputChange}
                                            className="border border-gray-300 rounded-2xl px-4 py-2 w-fit">
                                            <option value="National ID">National ID</option>
                                            <option value="Passport No.">Passport No.</option>
                                        </select>
                                        <label className="text-xs ms-2 text-gray-400">Select ID Type.</label>
                                    </div>
                                    <div className="md:col-span-1 col-span-2">
                                        <input
                                            type="text"
                                            name="nationalId"
                                            placeholder="National ID / Passport No."
                                            value={formData.nationalId}
                                            onChange={handleInputChange}
                                            className="h-12 p-2 border mt-1 block w-full border-gray-300 rounded-2xl shadow-sm"
                                            required
                                        />
                                        <label className="text-xs ms-2 text-gray-400">Enter Id.</label>
                                    </div>
                                    <div className="md:col-span-1 col-span-2">
                                        <input
                                            type="date"
                                            name="dob"
                                            value={formData.dob}
                                            onChange={handleInputChange}
                                            className="h-12 p-2 border mt-1 block w-full border-gray-300 rounded-2xl shadow-sm"
                                            required
                                        />
                                        <label className="text-xs ms-2 text-gray-400">Select you Date of Birth</label>
                                    </div>
                                    <div className="md:col-span-1 col-span-2">
                                        <input
                                            type="text"
                                            name="firstName"
                                            className="h-12 p-2 border mt-1 block w-full border-gray-300 rounded-2xl shadow-sm"
                                            placeholder="First Name*"
                                            value={formData.firstName}
                                            onChange={handleInputChange}
                                            required
                                        />
                                        <label className="text-xs ms-2 text-gray-400">Enter your first name.</label>
                                    </div>
                                    <div className="md:col-span-1 col-span-2">
                                        <input
                                            type="text"
                                            name="lastName"
                                            className="h-12 p-2 border mt-1 block w-full border-gray-300 rounded-2xl shadow-sm"
                                            placeholder="Last Name*"
                                            value={formData.lastName}
                                            onChange={handleInputChange}
                                            required
                                        />
                                        <label className="text-xs ms-2 text-gray-400">Enter your last name.</label>
                                    </div>

                                    {/* Organization Checkbox */}
                                    <div className="col-span-2">
                                        <label className="flex items-center space-x-2">
                                            <input
                                                type="checkbox"
                                                name="hasOrganization"
                                                checked={formData.hasOrganization}
                                                onChange={handleInputChange}

                                            />
                                            <span>I have an organization or company</span>
                                        </label>
                                    </div>
                                    {/* Organization Name */}
                                    {formData.hasOrganization && (
                                        <>
                                            <div className="md:col-span-1 col-span-2">
                                                <input
                                                    type="text"
                                                    name="organizationName"
                                                    className="h-12 p-2 border mt-1 block w-full border-gray-300 rounded-2xl shadow-sm"
                                                    placeholder="Organization Name"
                                                    value={formData.organizationName}
                                                    onChange={handleInputChange}
                                                />
                                                <label className="text-xs ms-2 text-gray-400">Enter your Organization name.</label>
                                            </div>

                                            {/* Tax Number */}
                                            <div className="md:col-span-1 col-span-2">
                                                <input
                                                    type="text"
                                                    name="taxNumber"
                                                    className="h-12 p-2 border mt-1 block w-full border-gray-300 rounded-2xl shadow-sm"
                                                    placeholder="Tax/VAT Number"
                                                    value={formData.taxNumber}
                                                    onChange={handleInputChange}
                                                />
                                                <label className="text-xs ms-2 text-gray-400">Enter Tax/VAT Number.</label>
                                            </div>
                                        </>
                                    )}
                                    {/* Next Button */}
                                    <div className="w-full flex flex-row justify-end col-span-2">
                                        <div className="flex justify-end items-end mb-8 w-40">
                                            <button
                                                type="submit"
                                                className="bg-orange-500 text-white px-6 py-2 w-full hover:bg-orange-600"
                                            >
                                                Next
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </form>

                            {/* Summary Section */}
                            <div className="bg-white shadow p-6 rounded-lg h-fit md:w-1/3">
                                <div className="flex flex-row justify-between mb-4">
                                    <h3 className="text-xl font-bold mb-4">Summary</h3>
                                    {/* Country Selection */}
                                    {/* <div className="flex items-center justify-between mb-4">
                                        <div className="flex items-center space-x-2">
                                            <ReactFlagsSelect
                                                selected={selectedCountry}
                                                onSelect={(code) => setSelectedCountry(code)}
                                                className="h-6 w-fit rounded-sm" // Custom styling
                                            />
                                        </div>
                                    </div> */}
                                </div>
                                <div className="flex flex-row items-center relative mb-4">
                                    <input
                                        type="text"
                                        name="coupon"
                                        placeholder="Add coupon Code"
                                        value={formData.coupon}
                                        onChange={handleInputChange}
                                        className="h-12 p-2 border block w-full border-gray-300 rounded-2xl shadow-sm"
                                    />
                                    <button
                                        type="button"
                                        className="absolute text-orange-500 border border-orange-500 h-12 p-2 px-4 rounded-2xl right-0 hover:bg-orange-500 hover:text-white"
                                    >
                                        Apply
                                    </button>
                                </div>



                                {/* Pricing Details */}
                                <div className="space-y-2 text-gray-700">
                                    <div className="flex justify-between">
                                        <p className="font-bold">Subtotal:</p>
                                        <p>${basePrice}</p>
                                    </div>
                                    <div className="flex justify-between border-b pb-8">
                                        <p className="font-bold">Estimated Tax:</p>
                                        <p>Calculated in Checkout</p>
                                    </div>
                                    <div className="flex justify-between font-bold text-lg">
                                        <p>Total:</p>
                                        <p>${totalPrice}</p>
                                    </div>
                                </div>

                                {/* Payment Methods */}
                                <div className="mt-4 flex justify-center items-center space-x-2 text-gray-600">
                                    <p>We Accept Only</p>
                                    <img src={creditCard} alt="Card" className="" />
                                    <p>Credit Cards</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}
