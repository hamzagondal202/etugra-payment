import { useState } from "react";
import address from "../assets/Address-cuate 1.png"
import { useNavigate } from 'react-router-dom';
import etugra from "../assets/etugra-logo 1.png";
import ProgressBar from "../components/ProgressBar";
import "react-phone-input-2/lib/material.css";
import "react-intl-tel-input/dist/main.css";

export default function AddressScreen() {
  const [addresses] = useState([{ id: 1 }]);
  const [billingAddresses, setBillingAddresses] = useState([]);
  const [deliveryAddresses, setDeliveryAddresses] = useState([]);
  const[sameAsBilling, setSameAsBilling] = useState(false)
  const [customerInfo, setCustomerInfo] = useState({
    phoneNumber: "",
    email: "",
    fullName: "",
  });
  const navigate = useNavigate();

  const handleNext = () => {
    if(sameAsBilling){
      const dataToSubmit = {
        customerInfo,
        billingAddresses,
      };
      console.log(dataToSubmit);

    }else{
      const dataToSubmit = {
        customerInfo,
        billingAddresses,
        deliveryAddresses,
      };
      console.log(dataToSubmit);

    }

    // const allAddresses = [...billingAddresses, ...deliveryAddresses];
    // const allFieldsFilled = allAddresses.every(address =>
    //   Object.values(address).every(field => field.trim() !== "")
    // );

    // if (allFieldsFilled) {
    //   console.log("All fields are filled. Proceeding with:", allAddresses);
    //   // Store addresses for temporary use or navigate to the next step

    // } else {
    //   alert("Please fill all fields in every form.");
    // }
    navigate('/payment');
  };

  const handleCustomerInfoChange = (e) => {
    console.log(sameAsBilling)
    const { name, value } = e.target;
    setCustomerInfo((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="min-h-screen flex md:flex-row flex-col">
      {/* Left Section */}
      <div className="w-full md:w-1/2 bg-gray-100 flex flex-col items-center justify-center p-8 gap-4 overflow-auto">
        <ProgressBar currentStep={2} />
        <img
          src={etugra} // Replace with the image URL or leave blank for now
          alt="Validation illustration"
          className="mb-6 mx-auto"
        />
        {/* Customer information Section */}
        <div className="mb-6 bg-white w-full max-w-2xl p-8 rounded-2xl shadow-lg">
          <h1 className="text-2xl font-bold mb-6">Customer Information</h1>
          <form className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
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
                    name="phoneNumber"
                    placeholder="Phone#"
                    className="flex-1 block w-full h-12 p-2 px-3 py-2 text-gray-700 bg-white border border-gray-300 rounded-r-2xl"
                    value={customerInfo.phoneNumber}
                    onChange={handleCustomerInfoChange}
                    required
                  />
                </div>
                <label className="text-xs ms-2 text-gray-400">Enter your Phone No.</label>
              </div>

              <div className="md:col-span-1 col-span-2">
                <input
                  type="email"
                  name="email"
                  placeholder="example@email.com"
                  className="h-12 p-2 border block w-full border-gray-300 rounded-2xl shadow-sm"
                  value={customerInfo.email}
                  onChange={handleCustomerInfoChange}
                  required
                />
                <label className="text-xs ms-2 text-gray-400">Enter your email</label>
              </div>
            </div>

            <div className="col-span-2">
              <input
                type="text"
                name="fullName"
                placeholder="Full Name"
                className="h-12 p-2 border block w-full border-gray-300 rounded-2xl shadow-sm"
                value={customerInfo.fullName}
                onChange={handleCustomerInfoChange}
                required
              />
              <label className="text-xs ms-2 text-gray-400">Enter your Full Name</label>
            </div>
          </form>
        </div>

        {/* Billing Address Section */}
        <div className="mb-6 bg-white w-full max-w-2xl p-8 rounded-2xl shadow-lg">
          {addresses.map((address) => (
            <AddressForm
              key={address.id}
              id={address.id}
              addresses={billingAddresses}
              setAddresses={setBillingAddresses}
              type="billing"
              heading="Billing Address"
            // onDelete={() => deleteAddress(address.id)}
            />
          ))}
        </div>

        {/* Delivery Address Section */}
        <div className="mb-6 bg-white w-full max-w-2xl p-8 rounded-2xl shadow-lg">
          {addresses.map((address, index) => (
            <AddressForm
              key={index}
              id={address.id}
              addresses={deliveryAddresses}
              setAddresses={setDeliveryAddresses}
              type="delivery"
              heading="Delivery Address"
              setIsSameAsBilling={setSameAsBilling}
            // onDelete={() => deleteAddress(address.id)}
            />
          ))}
        </div>
        {/* Next Button */}
        <div className="flex md:self-end md:me-16 mb-8 w-40">
          <button
            type="submit"
            className="bg-orange-500 text-white px-6 py-2 w-full hover:bg-orange-600"
            onClick={handleNext}
          >
            Next
          </button>
        </div>
      </div>

      {/* Right Section */}
      <div className="w-full md:w-1/2 bg-orange-100 p-6 h-screen md:fixed md:right-0">
        <div className="flex flex-col items-center justify-center h-full">
          <img
            src={address}
            alt="Location Placeholder"
            className="w-1/2 mb-4"
          />
          <p className="text-orange-500 font-semibold text-start">
            <strong>Important Note:</strong>
            <uo>
              <li>Please ensure the delivery address is accurate
                and complete to avoid any delays.</li>
            </uo>
          </p>
        </div>
      </div>
    </div>
  );
};
//
//
//
//------------------------------------------------------------------------------------------------------------------------------------------
//
//
//
// eslint-disable-next-line react/prop-types, no-unused-vars
const AddressForm = ({ id, type, disabled, onDelete, addresses, setAddresses, heading,setIsSameAsBilling }) => {
  const [formData, setFormData] = useState({
    postalCode: "",
    city: "",
    state: "",
    country: "Turkey",
    addressLine1: "",
    addressLine2: "",
  });
  const [sameAsBilling, setSameAsBilling] = useState(false);
  const [showDialog, setShowDialog] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const saveNewAdd = (e) => {
    setAddresses((prev) => [...prev, formData]);
    e.preventDefault()
    console.log(type)
    setShowDialog(false)
    setFormData({
      postalCode: "",
      city: "",
      state: "",
      country: "Turkey",
      addressLine1: "",
      addressLine2: "",
    });

  }
  const handleNext = (e) => {
    e.preventDefault();
    saveNewAdd()
  };

  const handleCheckboxChange = (e) => {
    console.log(e);

      setSameAsBilling(e.target.checked);
      console.log(sameAsBilling);
      setIsSameAsBilling(e.target.checked)
  };

  const addNewAddress = () => {
    setFormData({
      postalCode: "",
      city: "",
      state: "",
      country: "Turkey",
      addressLine1: "",
      addressLine2: "",
    });
    setShowDialog(true);
  };
  const handleSelectChange = (e) => {
    const selectedAddress = e.target.value;
    const addressArray = addresses;
    const selectedData = addressArray.find(
      (addr) => `${addr.addressLine1}, ${addr.city}, ${addr.state}, ${addr.country}` === selectedAddress
    );

    if (selectedData) {
      setFormData(selectedData);
    }
  };

  const renderDropdown = () => {
    const addressArray = addresses;
    return (
      addressArray.length > 0 && (
        <select
          onChange={handleSelectChange}
          className="border rounded px-4 py-2 w-full mb-4"
        >
          {/* <option value="" >Select a saved address</option> */}
          {addressArray.map((addr, index) => (
            <option
              key={index}
              value={`${addr.addressLine1}, ${addr.city}, ${addr.state}, ${addr.country}`}
            >
              {`${addr.addressLine1}, ${addr.city}, ${addr.state}, ${addr.country}`}
            </option>
          ))}
        </select>
      )
    );
  };

  const renderNewButton = () => {
    const addressArray = addresses;
    const typeOfElement = type
    console.log(typeOfElement);

    return (
      addressArray.length > 0 && !sameAsBilling &&(
        <button
          type="button"
          onClick={() => addNewAddress()}
          className="mt-2 bg-green-500 text-white px-4 py-2 hover:bg-green-600"
        >
          Add New
        </button>
      )
    )
  }



  const renderSaveButton = () => {
    const addressArray = addresses;
    const typeOfElement = type
    console.log(typeOfElement);


    return (
      addressArray.length == 0 && (
        <button
          type="submit"
          className="bg-orange-500 text-white px-6 py-2 hover:bg-orange-600"
        >
          {"Save"}
        </button>
      )
    )
  }
  return (
    <>
      {showDialog && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-30">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-xl font-bold mb-4">Add New Address</h2>
            <form onSubmit={saveNewAdd}>
              <div className="grid grid-cols-2 gap-4">
                <input
                  type="text"
                  name="addressLine1"
                  placeholder="Address Line 1*"
                  value={formData.addressLine1}
                  onChange={handleChange}
                  required
                  className="h-12 p-2 border block w-full border-gray-300 rounded-2xl shadow-sm col-span-2"
                />
                <input
                  type="text"
                  name="addressLine2"
                  placeholder="Address Line 2 (Optional)"
                  value={formData.addressLine2}
                  onChange={handleChange}
                  className="h-12 p-2 border block w-full border-gray-300 rounded-2xl shadow-sm col-span-2"
                />
                <input
                  type="text"
                  name="postalCode"
                  placeholder="ZipCode / Postal Address"
                  value={formData.postalCode}
                  onChange={handleChange}
                  required
                  className="h-12 p-2 border block w-full border-gray-300 rounded-2xl shadow-sm"
                />
                <input
                  type="text"
                  name="city"
                  placeholder="City"
                  value={formData.city}
                  onChange={handleChange}
                  required
                  className="h-12 p-2 border block w-full border-gray-300 rounded-2xl shadow-sm"
                />
                <input
                  type="text"
                  name="state"
                  placeholder="State / Province"
                  value={formData.state}
                  onChange={handleChange}
                  required
                  className="h-12 p-2 border block w-full border-gray-300 rounded-2xl shadow-sm"
                />
                <select
                  name="country"
                  value={formData.country}
                  onChange={handleChange}
                  required
                  className="h-12 p-2 border block w-full border-gray-300 rounded-2xl shadow-sm"
                >
                  <option value="Turkey">Turkey</option>
                  <option value="US">US</option>
                  <option value="Canada">Canada</option>
                  <option value="Pakistan">Pakistan</option>
                </select>
              </div>
              <div className="flex justify-end mt-4">
                <button
                  type="button"
                  onClick={() => setShowDialog(false)}
                  className="bg-red-500 text-white px-4 py-2 hover:bg-red-600"
                >
                  Cancel
                </ button>
                <button
                  type="submit"
                  className="bg-green-500 text-white px-4 py-2 ml-2 hover:bg-green-600"
                >
                  Add
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
      <form onSubmit={handleNext} className="space-y-4 my-4">
        <div className="flex flex-row items-center justify-between">
          <h2 className="text-2xl font-bold">{heading}</h2>
          {renderNewButton()}
        </div>
        
        {heading == "Delivery Address" &&
          <div className="flex justify-between items-center">
            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                // checked={sameAsBilling}
                className="size-4"
                onChange={handleCheckboxChange}
              />
              <span>Same as billing address</span>
            </label>
          </div>
        }
        {
          !sameAsBilling &&
          <>
          {renderDropdown()}
            <div className="grid grid-cols-2 gap-4">
              <div className="col-span-2">
                <input
                  type="text"
                  name="addressLine1"
                  className="h-12 p-2 border mt-1 block w-full border-gray-300 rounded-2xl shadow-sm"
                  placeholder="Address Line 1*"
                  value={formData.addressLine1}
                  onChange={handleChange}
                  // disabled={disable}
                  required
                />
                <label className="text-xs ms-2 text-gray-400">Enter address line 1.</label>
              </div>
              <div className="col-span-2">
                <input
                  type="text"
                  name="addressLine2"
                  className="h-12 p-2 border mt-1 block w-full border-gray-300 rounded-2xl shadow-sm"
                  placeholder="Address Line 2 (Optional)"
                  value={formData.addressLine2}
                  onChange={handleChange}
                // disabled={disable}
                />
                <label className="text-xs ms-2 text-gray-400">Enter Address Line 2.</label>
              </div>
              <div className="md:col-span-1 col-span-2">
                <input
                  type="text"
                  name="postalCode"
                  className="h-12 p-2 border mt-1 block w-full border-gray-300 rounded-2xl shadow-sm"
                  placeholder="ZipCode / Postal Address"
                  value={formData.postalCode}
                  onChange={handleChange}
                  // disabled={disable}
                  required
                />
                <label className="text-xs ms-2 text-gray-400">Enter ZipCode / Postal Address.</label>
              </div>
              <div className="md:col-span-1 col-span-2">
                <input
                  type="text"
                  name="city"
                  className="h-12 p-2 border mt-1 block w-full border-gray-300 rounded-2xl shadow-sm"
                  placeholder="City"
                  value={formData.city}
                  onChange={handleChange}
                  // disabled={disable}
                  required
                />
                <label className="text-xs ms-2 text-gray-400">Enter city name.</label>
              </div>
              <div className="md:col-span-1 col-span-2">
                <input
                  type="text"
                  name="state"
                  className="h-12 p-2 border mt-1 block w-full border-gray-300 rounded-2xl shadow-sm"
                  placeholder="State / Province"
                  value={formData.state}
                  onChange={handleChange}
                  // disabled={disable}
                  required
                />
                <label className="text-xs ms-2 text-gray-400">Enter Your State / Province.</label>
              </div>

              <div className="md:col-span-1 col-span-2">
                <select
                  name="country"
                  value={formData.country}
                  onChange={handleChange}
                  className="h-12 p-2 border mt-1 block w-full border-gray-300 rounded-2xl shadow-sm"
                  required
                // disabled={disable}
                >
                  <option value="TURKEY">Turkey</option>
                  <option value="US">US</option>
                  <option value="CANADA">Canada</option>
                  <option value="PAKISTAN">Pakistan</option>
                </select>
                <label className="text-xs ms-2 text-gray-400">Select Your Country.</label>
              </div>
            </div>
            <div className="flex flex-row items-center justify-end">
              {/* <button
                type="submit"
                className="bg-orange-500 text-white px-6 py-2 hover:bg-orange-600"
              >
                {"Save"}
              </button> */}
              {renderSaveButton()}
            </div>
          </>
        }

      </form>
    </>

  );
};