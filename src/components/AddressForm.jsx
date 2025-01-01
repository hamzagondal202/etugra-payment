/* eslint-disable react/prop-types */
import { useRef, useState, useEffect, useImperativeHandle, forwardRef } from "react";
import locations from "../assets/locations.json"
import deleteIcon from "../assets/delete.png"
// import {
//   CitySelect,
//   CountrySelect,
//   StateSelect,
//   RegionSelect
// } from "react-country-state-city";
// eslint-disable-next-line no-unused-vars
export const AddressForm = forwardRef(function AddressForm({ id, type, onDelete, addresses, setAddresses, heading, setIsSameAsBilling }, ref) {
    const [formData, setFormData] = useState({
        addressLine1: "",
        addressLine2: "",
        postalCode: "",
        city: "",
        state: "",
        country: "Turkey"
    });
    const [dialogFormData, setDialogFormData] = useState({
        addressLine1: "",
        addressLine2: "",
        postalCode: "",
        city: "",
        state: "",
        country: "Turkey"
    });
    const [disabled, setDisabled] = useState(false);
    const [sameAsBilling, setSameAsBilling] = useState(false);
    const [showDialog, setShowDialog] = useState(false);
    const [selectedAddress, setSelectedAddress] = useState("");
    const formRef = useRef(null);
    //   const [countryid, setCountryid] = useState(0);
    //   const [stateid, setstateid] = useState(0);
    //   const [region, setRegion] = useState("");
    //   const [cityid, setCityid] = useState(0);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
        console.log(formData);
        console.log(value);

        if (name === "country") {
            const selectedCountry = locations.find((loc) => String(loc.id) === String(value));
            console.log("Selected Country Object:", selectedCountry);
        } else {
            // setFormData({ ...formData, [name]: value });
        }

    };

    const handleDialogChange = (e) => {
        const { name, value } = e.target;
        setDialogFormData({ ...dialogFormData, [name]: value });
    };

    const saveNewAdd = (e) => {
        setAddresses((prev) => [...prev, dialogFormData]);
        e.preventDefault()
        console.log(type)
        setShowDialog(false)
        const newAddress = `${dialogFormData.addressLine1},${dialogFormData.addressLine2},${dialogFormData.postalCode}, ${dialogFormData.city}, ${dialogFormData.state}, ${dialogFormData.country}`;

        // Update selectedAddress and formData with the new address
        setSelectedAddress(newAddress);
        setFormData(dialogFormData);

    }
    const handleNext = (e) => {
        setAddresses((prev) => [...prev, formData]);
        e.preventDefault()
        setShowDialog(false)
        // setFormData({
        //   postalCode: "",
        //   city: "",
        //   state: "",
        //   country: "Turkey",
        //   addressLine1: "",
        //   addressLine2: "",
        // });
    };

    const handleCheckboxChange = (e) => {
        setSameAsBilling(e.target.checked);
        console.log(sameAsBilling);
        setIsSameAsBilling(e.target.checked)
    };

    const addNewAddress = () => {
        setDialogFormData({
            addressLine1: "",
            addressLine2: "",
            postalCode: "",
            city: "",
            state: "",
            country: "Turkey",

        });
        setShowDialog(true);
    };

    const deleteAddress = () => {
        const updatedAddresses = addresses.filter(addr => addr !== formData);
        setAddresses(updatedAddresses);
        setFormData(addresses[0])
    };

    const handleSelectChange = (e) => {
        const selectedAddress = e.target.value;
        console.log(selectedAddress);

        const addressArray = addresses;
        console.log(addresses)
        const selectedData = addressArray.find(
            (addr) => `${addr.addressLine1},${addr.addressLine2},${addr.postalCode}, ${addr.city}, ${addr.state}, ${addr.country}` === selectedAddress
        );


        console.log(selectedData);
        console.log(selectedAddress);


        if (selectedData) {
            setSelectedAddress(selectedAddress)
            setFormData(selectedData);
            console.log("set form data if selected data present");
        }
    };

    const isFormValid = () => {
        return formRef.current.checkValidity(); // Check form validity
    };

    useImperativeHandle(ref, () => ({
        isFormValid,  // Expose this method to parent components
        getFormData: () => {
            return {
                addressLine1: formRef.current.addressLine1.value,
                addressLine2: formRef.current.addressLine2.value,
                postalCode: formRef.current.postalCode.value,
                city: formRef.current.city.value,
                state: formRef.current.state.value,
                country: formRef.current.country.value,
            };
        },
    }));

    const renderDropdown = () => {
        const addressArray = addresses;
        return (
            addressArray.length > 0 && (
                <select
                    value={selectedAddress}
                    onChange={handleSelectChange}
                    className="h-12 p-2 border mt-1 block w-full border-gray-300 rounded-2xl shadow-sm"
                >
                    {/* <option value="" >Select a saved address</option> */}
                    {addressArray.map((addr, index) => (
                        <option
                            key={index}
                            value={`${addr.addressLine1},${addr.addressLine2},${addr.postalCode}, ${addr.city}, ${addr.state}, ${addr.country}`}
                        >
                            {`${addr.addressLine1},${addr.addressLine2},${addr.postalCode}, ${addr.city}, ${addr.state}, ${addr.country}`}
                        </option>
                    ))}
                </select>
            )
        );
    };

    const renderNewButton = () => {
        const addressArray = addresses;
        // const typeOfElement = type
        // console.log(typeOfElement);

        return (
            addressArray.length > 0 && !sameAsBilling && (
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

    const renderDelButton = () => {
        const addressArray = addresses;
        // const typeOfElement = type
        // console.log(typeOfElement);

        return (
            addressArray.length > 0 && !sameAsBilling && (
                <button
                    type="button"
                    onClick={() => deleteAddress()}
                    className="mt-2"
                >
                    <img
                        src={deleteIcon} // Replace with the image URL or leave blank for now
                        alt=""
                        className="size-7 hover:bg-gray-200"
                    />
                </button>
            )
        )
    }

    const renderSaveButton = () => {
        const addressArray = addresses;
        // const typeOfElement = type
        // console.log(typeOfElement);


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

    useEffect(() => {
        if (addresses.length > 0) {
            setDisabled(true)
        } else {
            setDisabled(false)
            setFormData({
                postalCode: "",
                city: "",
                state: "",
                country: "Turkey",
                addressLine1: "",
                addressLine2: "",
            });
        }
        console.log("useEffect");

    }, [addresses])

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
                                    value={dialogFormData.addressLine1}
                                    onChange={handleDialogChange}
                                    required
                                    className="h-12 p-2 border block w-full border-gray-300 rounded-2xl shadow-sm col-span-2"
                                />
                                <input
                                    type="text"
                                    name="addressLine2"
                                    placeholder="Address Line 2 (Optional)"
                                    value={dialogFormData.addressLine2}
                                    onChange={handleDialogChange}
                                    className="h-12 p-2 border block w-full border-gray-300 rounded-2xl shadow-sm col-span-2"
                                />
                                <input
                                    type="text"
                                    name="postalCode"
                                    placeholder="ZipCode / Postal Address"
                                    value={dialogFormData.postalCode}
                                    onChange={handleDialogChange}
                                    required
                                    className="h-12 p-2 border block w-full border-gray-300 rounded-2xl shadow-sm"
                                />
                                <input
                                    type="text"
                                    name="city"
                                    placeholder="City"
                                    value={dialogFormData.city}
                                    onChange={handleDialogChange}
                                    required
                                    className="h-12 p-2 border block w-full border-gray-300 rounded-2xl shadow-sm"
                                />
                                <input
                                    type="text"
                                    name="state"
                                    placeholder="State / Province"
                                    value={dialogFormData.state}
                                    onChange={handleDialogChange}
                                    required
                                    className="h-12 p-2 border block w-full border-gray-300 rounded-2xl shadow-sm"
                                />
                                <select
                                    name="country"
                                    value={dialogFormData.country}
                                    onChange={handleDialogChange}
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
                                    Save
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
            <form ref={formRef} onSubmit={handleNext} className="space-y-4 my-4">
                <div className="flex flex-row items-center justify-between">
                    <h2 className="text-2xl font-bold">{heading}</h2>
                    <div className="space-x-4 flex flex-row items-center">
                        {renderDelButton()}
                        {renderNewButton()}
                    </div>
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
                                    disabled={disabled}
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
                                    disabled={disabled}
                                />
                                <label className="text-xs ms-2 text-gray-400">Enter Address Line 2.</label>
                            </div>


                            {/* <div className="md:col-span-1 col-span-2">
                <RegionSelect
                  onChange={(e) => {
                    setRegion(e.name);
                    console.log(e.name);
                    
                  }}
                  placeHolder="Region"
                />
                <label className="text-xs ms-2 text-gray-400">Sekect your Region.</label>
              </div>

              <div className="md:col-span-1 col-span-2">
                <CountrySelect
                  onChange={(e) => {
                    setCountryid(e.id);
                    console.log(e.id);
                  }}
                  placeHolder="Country"
                  region={region}
                  inputClassName=""
                />
                <label className="text-xs ms-2 text-gray-400">Sekect your Country.</label>
              </div>

              <div className="md:col-span-1 col-span-2">
                <StateSelect
                  countryid={countryid}
                  onChange={(e) => {
                    setstateid(e.id);
                    console.log(e.id);
                  }}
                  placeHolder="State"
                />
                <label className="text-xs ms-2 text-gray-400">Sekect your State.</label>
              </div>

              <div className="md:col-span-1 col-span-2">
                <CitySelect
                  countryid={countryid}
                  stateid={stateid}
                  onChange={(e) => {
                    console.log(e);
                    setCityid(e.id)
                    console.log(e.id);
                  }}
                  placeHolder="City"
                  containerClassName=""
                  inputClassName=""
                />
                <label className="text-xs ms-2 text-gray-400">Select your city.</label>
              </div> */}

                            <div className="md:col-span-1 col-span-2">
                                <input
                                    type="text"
                                    name="postalCode"
                                    className="h-12 p-2 border mt-1 block w-full border-gray-300 rounded-2xl shadow-sm"
                                    placeholder="ZipCode / Postal Address"
                                    value={formData.postalCode}
                                    onChange={handleChange}
                                    disabled={disabled}
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
                                    disabled={disabled}
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
                                    disabled={disabled}
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
                                    disabled={disabled}
                                >
                                    {/* <option value="TURKEY">Turkey</option>
                                    <option value="US">US</option>
                                    <option value="CANADA">Canada</option>
                                    <option value="PAKISTAN">Pakistan</option> */}

                                    {locations.map((loc, index) => (
                                        <option key={index} value={loc.id}>{loc.name}</option>
                                    )
                                    )}
                                </select>
                                <label className="text-xs ms-2 text-gray-400">Select Your Country.</label>
                            </div>

                        </div>
                        <div className="flex flex-row items-center justify-end">
                            {renderSaveButton()}
                        </div>
                    </>
                }

            </form>
        </>

    );
});