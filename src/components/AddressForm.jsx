/* eslint-disable react/prop-types */
import { useRef, useState, useEffect, useImperativeHandle, forwardRef } from "react";
// import locations from "../assets/locations.json"
import axios from 'axios';
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
        street: "",
        postalCode: "",
        city: "",
        state: "",
        country: ""
    });
    const [dialogFormData, setDialogFormData] = useState({
        street: "",
        postalCode: "",
        city: "",
        state: "",
        country: ""
    });
    const [disabled, setDisabled] = useState(false);
    const [sameAsBilling, setSameAsBilling] = useState(false);
    const [showDialog, setShowDialog] = useState(false);
    const [selectedAddress, setSelectedAddress] = useState("");
    const formRef = useRef(null);
    const [countryList, setCountryList] = useState([]);
    const [stateList, setStateList] = useState([]);
    const [cityList, setCityList] = useState([]);

    //   const [countryid, setCountryid] = useState(0);
    //   const [stateid, setstateid] = useState(0);
    //   const [region, setRegion] = useState("");
    //   const [cityid, setCityid] = useState(0);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
        console.log(formData);
        console.log(value);

        // if (name === "country") {
        //     const selectedCountry = locations.find((loc) => String(loc.id) === String(value));
        //     console.log("Selected Country Object:", selectedCountry);
        // } else {
        //     // setFormData({ ...formData, [name]: value });
        // }

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
        const newAddress = `${dialogFormData.street}, ${dialogFormData.postalCode}, ${dialogFormData.city}, ${dialogFormData.state}, ${dialogFormData.country}`;

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
            street: "",
            postalCode: "",
            city: cityList[0].id,
            state: stateList[0].id,
            country: countryList[0].id,
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
            (addr) => `${addr.street}, ${addr.postalCode}, ${addr.city}, ${addr.state}, ${addr.country}` === selectedAddress
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
            if (!sameAsBilling) {
                return {
                    street: formRef.current.street.value,
                    postalCode: formRef.current.postalCode.value,
                    city: formRef.current.city.value,
                    state: formRef.current.state.value,
                    country: formRef.current.country.value,
                };
            } else {
                return sameAsBilling
            }

        },
    }));

    const renderDropdown = () => {
        const addressArray = addresses;
        console.log(addresses);

        const getNameById = (id, list) => {
            const matchedItem = list.find((item) => String(item.id) === String(id));
            console.log(id, list, matchedItem);

            return matchedItem ? matchedItem.name : "Unknown"; // Default to "Unknown" if no match
        };

        return (
            addressArray.length > 0 && (
                <select
                    value={selectedAddress}
                    onChange={handleSelectChange}
                    className="h-12 p-2 border mt-1 block w-full border-gray-300 rounded-2xl shadow-sm"
                >
                    {addressArray.map((addr, index) => {

                        const countryName = getNameById(addr.country, countryList);
                        const stateName = getNameById(addr.state, stateList);
                        const cityName = getNameById(addr.city, cityList);
                        return (
                            <option

                                key={index}
                                value={`${addr.street}, ${addr.postalCode}, ${addr.city}, ${addr.state}, ${addr.country}`}
                            >
                                {`${addr.street}, ${addr.postalCode}, ${cityName}, ${stateName}, ${countryName}`}
                            </option>
                        )

                    })}
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

    const handleError = (error, apiName) => {
        if (error.response) {
            console.error(`${apiName} Error Response:`, error.response.data);
        } else if (error.request) {
            console.error(`${apiName} Error Request:`, error.request);
        } else {
            console.error(`${apiName} Error Message:`, error.message);
        }
    };

    useEffect(() => {
        if (addresses.length === 0) {
            setDisabled(false)
            // Only set formData if lists are populated
            if (countryList.length > 0 && stateList.length > 0 && cityList.length > 0) {
                setFormData({
                    street: "",
                    postalCode: "",
                    city: cityList[0].id,
                    state: stateList[0].id,
                    country: countryList[0].id,
                });
            }
        } else {
            setDisabled(true)
        }
        console.log("useEffect");

    }, [addresses, cityList, stateList, countryList])

    useEffect(() => {
        console.log("useEffect Api Calls");
        
        const fetchCountries = async () => {
            const postData = {
                countryid: 0,
            };

            try {
                const response = await axios.post(`/api/countries`, postData, {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });

                if (response.data && response.data.result) {
                    return response.data.result; // Return countries on success
                } else {
                    throw new Error("Countries API failed: " + JSON.stringify(response.data));
                }
            } catch (error) {
                handleError(error, "Countries API");
                throw error;
            }
        };

        const fetchStates = async (countryId) => {
            try {
                const response = await axios.get(
                    `/api/get_country_states`,
                    { countryid: countryId },
                    {
                        headers: {
                            'Content-Type': 'application/json',
                        },
                    }
                );

                if (response.data && response.data.result) {
                    return response.data.result; // Return states on success
                } else {
                    throw new Error("States API failed: " + JSON.stringify(response.data));
                }
            } catch (error) {
                handleError(error, "States API");
                throw error;
            }
        };

        const fetchCities = async (stateId) => {
            try {
                const response = await axios.get(
                    `/api/get_state_cities`,
                    { stateid: stateId },
                    {
                        headers: {
                            'Content-Type': 'application/json',
                        },
                    }
                );

                if (response.data && response.data.result) {
                    return response.data.result; // Return cities on success
                } else {
                    throw new Error("Cities API failed: " + JSON.stringify(response.data));
                }
            } catch (error) {
                handleError(error, "Cities API");
                throw error;
            }
        };

        const fetchData = async () => {
            try {
                // Fetch countries first
                const countries = await fetchCountries();
                console.log("Countries:", countries);
                setFormData((prev) => ({ ...prev, ["country"]: countries[0].id }));

                const states = await fetchStates(countries[0].id);
                console.log("States:", states);
                setFormData((prev) => ({ ...prev, ["state"]: states[0].id }));

                const cities = await fetchCities(states[0].id);
                console.log("Cities:", cities);
                setFormData((prev) => ({ ...prev, ["city"]: cities[0].id }));


                // Update state with fetched data
                setCountryList(countries);

                // Update city with fetched data
                setStateList(states);

                // Update city with fetched data
                setCityList(cities);
            } catch (error) {
                console.error("Error in data fetching:", error);
            }
        };

        fetchData();
    }, []); // Runs only on the first render

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
                                    name="street"
                                    placeholder="Street Address*"
                                    value={dialogFormData.street}
                                    onChange={handleDialogChange}
                                    required
                                    className="h-12 p-2 border block w-full border-gray-300 rounded-2xl shadow-sm col-span-2"
                                />
                                {/* <input
                                    type="text"
                                    name="addressLine2"
                                    placeholder="Address Line 2 (Optional)"
                                    value={dialogFormData.addressLine2}
                                    onChange={handleDialogChange}
                                    className="h-12 p-2 border block w-full border-gray-300 rounded-2xl shadow-sm col-span-2"
                                /> */}
                                <input
                                    type="text"
                                    name="postalCode"
                                    placeholder="ZipCode / Postal Address"
                                    value={dialogFormData.postalCode}
                                    onChange={handleDialogChange}
                                    required
                                    className="h-12 p-2 border block w-full border-gray-300 rounded-2xl shadow-sm"
                                />
                                <select
                                    name="city"
                                    value={dialogFormData.city}
                                    onChange={handleDialogChange}
                                    className="h-12 p-2 border block w-full border-gray-300 rounded-2xl shadow-sm"
                                    placeholder="City"
                                    required
                                >
                                    {cityList.map((loc, index) => (
                                        <option key={index} value={loc.id}>{loc.name}</option>
                                    )
                                    )}
                                </select>
                                <select
                                    name="state"
                                    value={dialogFormData.state}
                                    onChange={handleDialogChange}
                                    className="h-12 p-2 border block w-full border-gray-300 rounded-2xl shadow-sm"
                                    placeholder="State / Province"
                                    required
                                >
                                    {stateList.map((loc, index) => (
                                        <option key={index} value={loc.id}>{loc.name}</option>
                                    )
                                    )}
                                </select>
                                <select
                                    name="country"
                                    value={dialogFormData.country}
                                    onChange={handleDialogChange}
                                    className="h-12 p-2 border block w-full border-gray-300 rounded-2xl shadow-sm"
                                    required
                                >
                                    {countryList.map((loc, index) => (
                                        <option key={index} value={loc.id}>{loc.name}</option>
                                    )
                                    )}
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
                                    name="street"
                                    className="h-12 p-2 border mt-1 block w-full border-gray-300 rounded-2xl shadow-sm"
                                    placeholder="Street Address*"
                                    value={formData.street}
                                    onChange={handleChange}
                                    disabled={disabled}
                                    required
                                />
                                <label className="text-xs ms-2 text-gray-400">Enter Street Address.</label>
                            </div>
                            {/* <div className="col-span-2">
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
                            </div> */}


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
                                <select
                                    name="city"
                                    value={formData.city}
                                    onChange={handleChange}
                                    className="h-12 p-2 border mt-1 block w-full border-gray-300 rounded-2xl shadow-sm"
                                    placeholder="City"
                                    required
                                    disabled={disabled}
                                >
                                    {cityList.map((loc, index) => (
                                        <option key={index} value={loc.id}>{loc.name}</option>
                                    )
                                    )}
                                </select>
                                <label className="text-xs ms-2 text-gray-400">Enter city name.</label>
                            </div>


                            <div className="md:col-span-1 col-span-2">
                                <select
                                    name="state"
                                    value={formData.state}
                                    onChange={handleChange}
                                    className="h-12 p-2 border mt-1 block w-full border-gray-300 rounded-2xl shadow-sm"
                                    placeholder="State / Province"
                                    required
                                    disabled={disabled}
                                >
                                    {stateList.map((loc, index) => (
                                        <option key={index} value={loc.id}>{loc.name}</option>
                                    )
                                    )}
                                </select>
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
                                    {/* <option value="Turkey">Turkey</option>
                                    <option value="US">US</option>
                                    <option value="CANADA">Canada</option>
                                    <option value="PAKISTAN">Pakistan</option> */}

                                    {countryList.map((loc, index) => (
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