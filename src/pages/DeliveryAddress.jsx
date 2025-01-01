import { useRef, useState } from "react";
import { AddressForm } from "../components/AddressForm";
import address from "../assets/Address-cuate 1.png"
import { useLocation, useNavigate } from 'react-router-dom';
import etugra from "../assets/etugra-logo 1.png";
import errorIcon from "../assets/error-message.png"
import ProgressBar from "../components/ProgressBar";
import "react-phone-input-2/lib/material.css";
import "react-intl-tel-input/dist/main.css";
import PhoneInput from 'react-phone-input-2'
import 'react-phone-input-2/lib/style.css'
import axios from 'axios';
// import {
//   CitySelect,
//   CountrySelect,
//   StateSelect,
//   RegionSelect
// } from "react-country-state-city";
import "react-country-state-city/dist/react-country-state-city.css";

export default function AddressScreen() {
  const location = useLocation();
  const { checkoutForm } = location.state || {};
  console.log(checkoutForm);

  const [addresses] = useState([{ id: 1 }]);
  const [billingAddresses, setBillingAddresses] = useState([]);
  const [deliveryAddresses, setDeliveryAddresses] = useState([]);
  const [sameAsBilling, setSameAsBilling] = useState(false)
  const [showError, setShowError] = useState(false);
  const [customerInfo, setCustomerInfo] = useState({
    phoneNumber: checkoutForm.phone,
    email: "",
    fullName: checkoutForm.firstName + " " + checkoutForm.lastName,
  });
  const navigate = useNavigate();

  // Create refs for each AddressForm
  const billingFormRef = useRef(null);
  const deliveryFormRef = useRef(null);

  const validateFields = () => {
    // Check if all customer info fields are filled
    if (!customerInfo.phoneNumber || !customerInfo.email || !customerInfo.fullName) {
      return false;
    }


    // Validate Billing and Delivery forms
    const isBillingValid = billingFormRef.current.isFormValid();
    const isDeliveryValid = sameAsBilling || deliveryFormRef.current.isFormValid();
    console.log(billingFormRef.current.getFormData())

    return isBillingValid && isDeliveryValid;
  };

  let dataToSubmit = {}

  const handleNext = () => {
    // Validate all fields before proceeding
    if (validateFields()) {
      if (sameAsBilling) {
        dataToSubmit = {
          customerInfo,
          billingAddresses,
        };
        console.log(dataToSubmit);
      } else {
        dataToSubmit = {
          customerInfo,
          billingAddresses,
          deliveryAddresses,
        };
        console.log(dataToSubmit);
      }
      executeApiFlow();
      // navigate('/payment'); // Proceed to payment if all fields are valid
    } else {
      setShowError(true)
      // alert("Please fill in all required fields before proceeding.");
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
  };

  const executeApiFlow = async () => {
    try {
      console.log("Starting API Flow...");
      const accessToken = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjoxMTczLCJ1c2VybmFtZSI6InJlYWN0LmN1c3RvbWVyMUB0ZXN0LmNvbSIsImV4cCI6MTczNTcxOTIwNX0.ntkh1CjG33ArCM0nUJs5_lED2pKQ4fCqa0vn0cFLssU";
      // Step 1: Create User
      // const createUserResponse = await createUser(accessToken);
      // console.log(createUserResponse);

      // const user_id = createUserResponse.user_id
      // const partner_id = createUserResponse.partner_id
      // console.log("User ID:", user_id, "  Partner ID:", partner_id);

      // // Step 2: Create Sales Order
      // const createOrderResponse = await createOrder(partner_id, accessToken);
      // const order_id = createOrderResponse.order_id;
      // console.log("Order id:", order_id);

      // // Step 3: Call Invoice Address
      // const billingAddResponse = await createBillingAddress(accessToken);
      // const invoice_address_id= billingAddResponse.invoice_address_id;
      // console.log("Third API Result:", invoice_address_id);

      // // Step 4: Call Delivery Address
      // const deliveryAddResponse = await createDeliveryAddress(accessToken);
      // const delivery_address_id = deliveryAddResponse.result.delivery_address_id;
      // console.log("Fourth API Result:", delivery_address_id);

      console.log("API Flow Completed Successfully.");

      // navigate('/payment'); // Proceed to payment if all fields are valid

    } catch (error) {
      console.error("API Flow Failed:", error.message);
    }
  };


  const createUser = async (accessToken) => {
    const postData = {
      jsonrpc: "2.0",
      method: "call",
      params: {
        name: customerInfo.fullName,
        email: customerInfo.email,
        mobile: "+" + customerInfo.phoneNumber,
      },
      id: 1,
    };

    try {
      const response = await axios.post(`/hi/portal_create_user`, postData, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`,
        },
      });

      if (response.data && response.data.result) {
        const result = JSON.parse(response.data.result);

        return result // Return partner_id on success
      } else {
        throw new Error("Create User API failed: " + JSON.stringify(response.data));
      }
    } catch (error) {
      handleError(error, "Create User API");
      throw error;
    }
  };

  const createOrder = async (partnerId, accessToken) => {
    const postData = {
      jsonrpc: "2.0",
      method: "call",
      params: {
        partner_id: partnerId,
        order_lines: [
          {
            product_id: 1,
            quantity: checkoutForm.quantity,
            company_type: "person",
            verify_type: checkoutForm.nationalIdType,
            tckn: "58333485650",
            passport_no: checkoutForm.nationalId,
            dob: checkoutForm.dob,
            person_first_name: checkoutForm.firstName,
            person_last_name: checkoutForm.lastName,
            email: customerInfo.email,
            phone: checkoutForm.phone,
            usage_area_id: 1, // for nes only
            account_type: "personal" // or company for KEP, TSA, and API
          }
        ]
      },
      id: 3,
    };

    try {
      const response = await axios.post(`/hi/portal_create_sale_order`, postData, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`,
        },
      });

      if (response.data && response.data.result) {
        const result = response.data.result;
        return result // Return the result on success
      } else {
        throw new Error("Create Order API failed: " + JSON.stringify(response.data));
      }
    } catch (error) {
      handleError(error, "Create Order API");
      throw error;
    }
  };

  const createBillingAddress = async (accessToken) => {
    const postData = {
      jsonrpc: "2.0",
      method: "call",
      params: {
        name: customerInfo.fullName,
        street: "Billing Street 3",
        city_id: 2843, // A city in the 966 state of Turkey
        state_id: 966,
        zip: "98765",
        vat: "7894561237",
        tax_office_name: "testing tax office",
        country_id: 224, // Turkey
      },
      id: 5,
    };

    try {
      const response = await axios.post(`/hi/portal_create_invoice_address`, postData, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`,
        },
      });

      if (response.data && response.data.result) {
        return response.data.result; // Return the result on success
      } else {
        throw new Error("Billing API failed: " + JSON.stringify(response.data));
      }
    } catch (error) {
      handleError(error, "Billing API");
      throw error;
    }
  };

  const createDeliveryAddress = async (accessToken) => {
    const postData = {
      jsonrpc: "2.0",
      method: "call",
      params: {
        name: "New Delivery test2",
        street: "New Delivery Address",
        city_id: 2845,
        state_id: 966,
        zip: "67590",
      },
      id: 7,
    };

    try {
      const response = await axios.post(`/hi/portal_create_delivery_address`, postData, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`,
        },
      });

      if (response.data && response.data.result) {
        return JSON.parse(response.data.result); // Return the result on success
      } else {
        throw new Error("Delivery API failed: " + JSON.stringify(response.data));
      }
    } catch (error) {
      handleError(error, "Delivery API");
      throw error;
    }
  };

  const handleError = (error, apiName) => {
    if (error.response) {
      console.error(`${apiName} Error Response:`, error.response.data);
    } else if (error.request) {
      console.error(`${apiName} Error Request:`, error.request);
    } else {
      console.error(`${apiName} Error Message:`, error.message);
    }
  };




  const handleCustomerInfoChange = (e) => {
    console.log(sameAsBilling)
    const { name, value } = e.target;
    setCustomerInfo((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <>
      {showError && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-30">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <img
              src={errorIcon} // Replace with the image URL or leave blank for now
              alt="Validation illustration"
              className="mb-2 mx-auto size-14"
            />
            <h2 className="text-xl font-bold mb-4">Fill all the forms to continue</h2>
            <div className="flex justify-end mt-4">
              <button
                type="button"
                onClick={() => setShowError(false)}
                className="px-4 py-2 text-white bg-red-500 hover:bg-red-600"
              >
                close
              </ button>
            </div>
          </div>
        </div>
      )}

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
                    {/* <select id="countryCode" className="block h-12 w-14 py-2 text-gray-700 bg-white border border-gray-300 rounded-l-2xl">
                    <option value="+49">+49 (Germany)</option>
                    <option value="+1">+1 (USA)</option>
                    <option value="+44">+44 (UK)</option>
                    <option value="+91">+91 (India)</option>
                    <option value="+33">+33 (France)</option>
                  </select> */}
                    {/* <!-- Mobile Number Input --> */}
                    {/* <input
                    type="tel"
                    name="phoneNumber"
                    placeholder="Phone#"
                    className="flex-1 block w-full h-12 p-2 px-3 py-2 text-gray-700 bg-white border border-gray-300 rounded-r-2xl"
                    value={customerInfo.phoneNumber}
                    onChange={handleCustomerInfoChange}
                    required
                  /> */}
                    <PhoneInput
                      country={'tr'}
                      value={customerInfo.phoneNumber}
                      disabled={true}
                      isValid={(value, country) => {
                        if (value.match(/12345/)) {
                          return 'Invalid value: ' + value + ', ' + country.name;
                        } else if (value.match(/1234/)) {
                          return false;
                        } else {
                          return true;
                        }
                      }}
                      inputProps={{
                        name: 'phone',
                        required: true,
                        autoFocus: true
                      }}
                      inputStyle={{
                        borderRadius: '17px',
                        width: '99%',
                        height: '48px',
                        paddingLeft: '50px', // Ensure room for flag button
                        border: '1px solid #ccc',
                        outline: 'none',
                        boxShadow: 'none',
                        backgroundColor: "#FAFAFA"
                      }}
                      buttonStyle={{
                        borderTopLeftRadius: '17px',
                        borderBottomLeftRadius: '17px',
                        margin: '0', // Remove margins that cause alignment issues
                        width: '48px', // Standardize width for the flag button
                        backgroundColor: '#FAFAFA', // Match input background
                        border: '1px solid #ccc', // Align border with input
                        boxShadow: 'none', // Prevent button shadow

                      }}
                      dropdownStyle={{
                        inlineSize: '200px',
                        textAlign: 'center'
                      }}
                      searchStyle={{
                        paddingLeft: '10px',
                      }}
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
                heading="Billing Address"
                ref={billingFormRef}
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
                heading="Delivery Address"
                setIsSameAsBilling={setSameAsBilling}
                ref={deliveryFormRef}
              />
            ))}
          </div>
          {/* Next Button */}
          <div className="flex self-end me-4 mb-8 w-40">
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
              {/* <uo> */}
              <li>Please ensure the delivery address is accurate
                and complete to avoid any delays.</li>
              {/* </uo> */}
            </p>
          </div>
        </div>
      </div>
    </>
  );
};