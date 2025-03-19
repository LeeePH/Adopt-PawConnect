import React, { useState, useEffect } from "react";

const AdoptFormModal = ({ onClose }) => {
    const [selectedPetId, setSelectedPetId] = useState(""); // To track the selected pet ID
    const [selectedPet, setSelectedPet] = useState(null);  // To track the selected pet's details (name, age)
    const [formData, setFormData] = useState({
        FirstName: "",
        LastName: "",
        Address: "",
        Phone: "",
        Email: "",
        Occupation: "",
        CompanyName: "",
        SocProfile: "",
        SelectedPet: "",
        Status: "",
        AdoptChoose: "",
        IdealPet: "",
        LivingCondition: "",
        AllergicHouseholds: "",
        PetCareResponsible: "",
        FinancialResponsible: "",
        VacationCare: "",
        AloneHours: "",
        IntroSteps: "",
        FamilySupport: "",
        SupportExplanation: "",
        OtherPets: "",
        PastPets: "",
    });

    const [errors, setErrors] = useState({});
    const [petData, setPetData] = useState([]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value, // Dynamically updates the field
        }));
    };

    useEffect(() => {
        const fetchPets = async () => {
            try {
                const response = await fetch("http://localhost:5001/pets")
                const data = await response.json();
                setPetData(data);
            } catch (error) {
                console.error("Error fetching pets:", error);
            }
        };

        fetchPets();
    }, []); 

    const handlePetChange = (e) => {
        const selectedId = e.target.value;
        setSelectedPetId(selectedId);
    
        setFormData((prevData) => ({
            ...prevData,
            SelectedPet: selectedId,
        }));
    
        // Find the selected pet from petData and set it in the state
        const pet = petData.find((pet) => pet.id === selectedId);
        setSelectedPet(pet);
    };
    

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        // Check if a pet has been selected
        if (!formData.SelectedPet) {
            alert('Please select a pet to adopt.');
            return;
        }
    
        try {
            const response = await fetch('http://localhost:5001/submit-form', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });
    
            if (response.ok) {
                alert('Application submitted successfully!');
                
                // Reset form data after successful submission
                setFormData({
                    FirstName: '',
                    LastName: '',
                    Address: '',
                    Phone: '',
                    Email: '',
                    CompanyName: '',
                    SelectedPet: '', // Clear selected pet after submission
                    PetCareResponsible: '',
                    FinancialResponsible: '',
                    VacationCare: '',
                    AloneHours: '',
                    IntroSteps: '',
                });
            } else {
                alert('Failed to submit application.');
            }
        } catch (error) {
            console.error('Error:', error);
            alert('An error occurred.');
        }
    };
    

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
            <div className="bg-white dark:bg-gray-800 w-full h-auto sm:w-[90%] md:w-[80%] lg:w-[70%] mx-auto max-w-4xl rounded-lg shadow-lg p-6 overflow-y-auto max-h-[80vh]">
                <div className="flex justify-end">
                <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
                    ✖
                </button>
                </div>
                <h1 className="text-2xl font-bold text-center mb-6">ADOPTION APPLICATION</h1>
                <p className="text-sm text-center mb-4">
                <span className="text-red-500">*</span> indicates required fields
                </p>

                <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                    <h2 className="font-bold text-lg mb-4">APPLICANT'S INFO</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-medium">
                        Name <span className="text-red-500">*</span>
                        </label>
                        <input
                        type="text"
                        name="FirstName"
                        value={formData.FirstName}
                        onChange={handleChange}
                        placeholder="First Name"
                        className="mt-1 block w-full border rounded-md p-2 dark:text-gray-800"
                        />
                        {errors.FirstName && <p className="text-red-500 text-sm">{errors.FirstName}</p>}
                    </div>
                    <div>
                        <input
                        type="text"
                        name="LastName"
                        placeholder="Last Name"
                        value={formData.LastName}
                        onChange={handleChange}
                        className="mt-7 block w-full border rounded-md p-2 dark:text-gray-800"
                        />
                        {errors.LastName && <p className="text-red-500 text-sm">{errors.LastName}</p>}
                    </div>
                    <div>
                        <label className="block text-sm font-medium">
                        Address <span className="text-red-500">*</span>
                        </label>
                        <input
                        type="text"
                        name="Address"
                        placeholder="Eg: Blk 218, Lot 3, Phase 8, North Fairview, Quezon City"
                        value={formData.Address}
                        onChange={handleChange}
                        className="mt-1 block w-full border rounded-md p-2 dark:text-gray-800"
                        />
                        {errors.Address && <p className="text-red-500 text-sm">{errors.Address}</p>}
                    </div>
                    <div>
                        <label className="block text-sm font-medium">
                        Phone <span className="text-red-500">*</span>
                        </label>
                        <input
                        type="tel"
                        name="Phone"
                        placeholder="Enter your phone number"
                        value={formData.Phone}
                        onChange={handleChange}
                        className="mt-1 block w-full border rounded-md p-2 dark:text-gray-800"
                        />
                        {errors.Phone && <p className="text-red-500 text-sm">{errors.Phone}</p>}
                    </div>
                    <div>
                        <label className="block text-sm font-medium">
                        Email <span className="text-red-500">*</span>
                        </label>
                        <input
                        type="email"
                        name="Email"
                        placeholder="Enter your email address"
                        value={formData.Email}
                        onChange={handleChange}
                        className="mt-1 block w-full border rounded-md p-2 dark:text-gray-800"
                        />
                        {errors.Email && <p className="text-red-500 text-sm">{errors.Email}</p>}
                    </div>
                    <div>
                        <label className="block text-sm font-medium">Occupation</label>
                        <input
                        type="text"
                        name="Occupation"
                        placeholder="Enter your current occupation, N/A if none or retired"
                        value={formData.Occupation}
                        onChange={handleChange}
                        className="mt-1 block w-full border rounded-md p-2 dark:text-gray-800"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium">
                        Company/Business Name <span className="text-red-500">*</span>
                        </label>
                        <input
                        type="text"
                        name="CompanyName"
                        placeholder="N/A if unemployed"
                        value={formData.CompanyName}
                        onChange={handleChange}
                        className="mt-1 block w-full border rounded-md p-2 dark:text-gray-800"
                        />
                        {errors.CompanyName && <p className="text-red-500 text-sm">{errors.CompanyName}</p>}
                    </div>
                    <div>
                        <label className="block text-sm font-medium">
                        Social Media Profile
                        </label>
                        <input
                        type="text"
                        name="SocProfile"
                        placeholder="Enter FB/Twitter/IG Link"
                        value={formData.SocProfile}
                        onChange={handleChange}
                        className="mt-1 block w-full border rounded-md p-2 dark:text-gray-800"
                        />
                    </div>
                    </div>
                </div>

                <label className="block text-sm font-medium mb-2">
                What pet are you looking to adopt? <span className="text-red-500">*</span>
            </label>
            <select
                name="pet"
                value={selectedPetId}
                onChange={handlePetChange}
                className="mt-1 block w-full border rounded-md p-2 dark:text-gray-800"
            >
                <option value="">Select a pet</option>
                {petData.map((pet) => (
                    <option key={pet.id} value={pet.id}>
                        {pet.name} - ({pet.age})
                    </option>
                ))}
            </select>

                <div>
                    <label className="block text-sm font-medium">
                    Status
                    </label>
                    <div className="mt-2 flex space-x-4">
                    <label>
                        <input type="radio" name="Status" value="Single" checked={formData.Status === "Single"} onChange={handleChange} className="mr-2" /> Single
                    </label>
                    <label>
                        <input type="radio" name="Status" value="Married" checked={formData.Status === "Married"} onChange={handleChange} className="mr-2" /> Married
                    </label>
                    <label>
                        <input type="radio" name="Status" value="Others" checked={formData.Status === "Others"} onChange={handleChange} className="mr-2" /> Others
                    </label>
                    </div>
                </div>
                <div>
            </div>

            <div>
                <label className="block text-sm font-medium mb-2">
                    What are you looking to adopt? <span className="text-red-500">*</span>
                </label>
                <div className="flex space-x-4">
                    <label>
                        <input 
                            type="radio" 
                            name="AdoptChoose" 
                            value="Cat"
                            checked={formData.AdoptChoose === "Cat"} 
                            onChange={handleChange} 
                            className="mr-2" 
                        /> Cat
                    </label>
                    <label>
                        <input 
                            type="radio" 
                            name="AdoptChoose" 
                            value="Dog"
                            checked={formData.AdoptChoose === "Dog"} 
                            onChange={handleChange} 
                            className="mr-2" 
                        /> Dog
                    </label>
                    <label>
                        <input 
                            type="radio" 
                            name="AdoptChoose" 
                            value="Both"
                            checked={formData.AdoptChoose === "Both"} 
                            onChange={handleChange} 
                            className="mr-2" 
                        /> Both
                    </label>
                    <label>
                        <input 
                            type="radio" 
                            name="AdoptChoose" 
                            value="Not decided"
                            checked={formData.AdoptChoose === "Not decided"} 
                            onChange={handleChange} 
                            className="mr-2" 
                        /> Not decided
                    </label>
                </div>
            </div>


                <div>
                    <label className="block text-sm font-medium">
                    Describe your ideal pet
                    </label>
                    <textarea
                    className="mt-1 block w-full border rounded-md p-2 dark:text-gray-800"
                    rows="3"
                    name="IdealPet"
                    placeholder="Include sex, age, appearance, temperament, etc."
                    value={formData.IdealPet}
                    onChange={handleChange}
                    ></textarea>
                </div>

                <div>
                    <h2 className="font-bold text-lg mb-4">LIVING CONDITIONS</h2>
                    <label className="block text-sm font-medium">
                    Who do you live with?
                    </label>
                    <select
                    name="LivingCondition"
                    className="mt-1 block w-full border rounded-md p-2 dark:text-gray-800"
                    value={formData.LivingCondition}
                    onClick={handleChange}>
                    <option value="Living Alone">Living alone</option>
                    <option value="Spouse">Spouse</option>
                    <option value="Parents">Parents</option>
                    <option value="Children over 18">Children over 18</option>
                    <option value="Children below 18">Children below 18</option>
                    <option value="Relatives">Relatives</option>
                    <option value="Roommate(s)">Roommate(s)</option>
                    </select>

                    <label className="block text-sm font-medium mt-4">
                    Are any members of your household allergic to animals?{" "}
                    </label>
                    <div className="mt-2 flex space-x-4">
                    <label>
                        <input type="radio" name="AllergicHouseholds" value="Yes" checked={formData.AllergicHouseholds === "Yes"} onChange={handleChange} className="mr-2" /> Yes
                    </label>
                    <label>
                        <input type="radio" name="AllergicHouseholds" value="No" checked={formData.AllergicHouseholds === "No"} onChange={handleChange} className="mr-2" /> No
                    </label>
                    </div>

                    <label className="block text-sm font-medium mt-4">
                    Who will be responsible for feeding, grooming, and generally caring for your pet?{" "}
                    <span className="text-red-500">*</span>
                    </label>
                    <input
                    type="text"
                    name="PetCareResponsible"
                    className="mt-1 block w-full border rounded-md p-2 dark:text-gray-800"
                    value={formData.PetCareResponsible}
                    onChange={handleChange}
                    />
                    {errors.PetCareResponsible && <p className="text-red-500 text-sm">{errors.PetCareResponsible}</p>}

                    <label className="block text-sm font-medium mt-4">
                    Who will be financially responsible for your pet’s needs?{" "}
                    <span className="text-red-500">*</span>
                    </label>
                    <input
                    type="text"
                    name="FinancialResponsible"
                    className="mt-1 block w-full border rounded-md p-2 dark:text-gray-800"
                    value={formData.FinancialResponsible}
                    onChange={handleChange}
                    />
                    {errors.FinancialResponsible && <p className="text-red-500 text-sm">{errors.FinancialResponsible}</p>}

                    <label className="block text-sm font-medium mt-4">
                    Who will look after your pet if you go on vacation or in case of emergency?{" "}
                    <span className="text-red-500">*</span>
                    </label>
                    <input
                    type="text"
                    name="VacationCare"
                    className="mt-1 block w-full border rounded-md p-2 dark:text-gray-800"
                    value={formData.VacationCare}
                    onChange={handleChange}
                    />
                    {errors.VacationCare && <p className="text-red-500 text-sm">{errors.VacationCare}</p>}
                    <label className="block text-sm font-medium mt-4">
                    How many hours in an average workday will your pet be left alone?{" "}
                    <span className="text-red-500">*</span>
                    </label>
                    <input
                    type="number"
                    name="AloneHours"
                    className="mt-1 block w-full border rounded-md p-2 dark:text-gray-800"
                    value={formData.AloneHours}
                    onChange={handleChange}
                    />
                    {errors.AloneHours && <p className="text-red-500 text-sm">{errors.AloneHours}</p>}

                    <label className="block text-sm font-medium mt-4">
                    What steps will you take to introduce your new pet to their new surroundings?{" "}
                    <span className="text-red-500">*</span>
                    </label>
                    <textarea
                    name="IntroSteps"
                    className="mt-1 block w-full border rounded-md p-2 dark:text-gray-800"
                    value={formData.IntroSteps}
                    onChange={handleChange}
                    rows="3"
                    ></textarea>
                    {errors.IntroSteps && <p className="text-red-500 text-sm">{errors.IntroSteps}</p>}

                    <label className="block text-sm font-medium mt-4">
                    Does everyone in the family support your decision to adopt a pet?{" "}
                    </label>
                    <div className="mt-2 flex space-x-4">
                    <label>
                        <input type="radio" name="FamilySupport" value="Yes" checked={formData.FamilySupport === "Yes"} onChange={handleChange} className="mr-2" /> Yes
                    </label>
                    <label>
                        <input type="radio" name="FamilySupport" value="No" checked={formData.FamilySupport === "No"} onChange={handleChange} className="mr-2" /> No
                    </label>
                    </div>

                    <label className="block text-sm font-medium mt-4">
                    Please explain
                    </label>
                    <textarea
                    className="mt-1 block w-full border rounded-md p-2 dark:text-gray-800"
                    rows="3"
                    name="SupportExplanation"
                    placeholder="Leave N/A if answer above is yes"
                    value={formData.SupportExplanation}
                    onChange={handleChange}
                    ></textarea>

                    <label className="block text-sm font-medium mt-4">
                    Do you have other pets?{" "}
                    </label>
                    <div className="mt-2 flex space-x-4">
                    <label>
                        <input type="radio" name="OtherPets" value="Yes" checked={formData.OtherPets === "Yes"} onChange={handleChange} className="mr-2" /> Yes
                    </label>
                    <label>
                        <input type="radio" name="OtherPets" value="No" checked={formData.OtherPets === "No"} onChange={handleChange} className="mr-2" /> No
                    </label>
                    </div>

                    <label className="block text-sm font-medium mt-4">
                    Have you had pets in the past?{" "}
                    </label>
                    <div className="mt-2 flex space-x-4">
                    <label>
                        <input type="radio" name="PastPets" value="Yes" checked={formData.PastPets === "Yes"} onChange={handleChange} className="mr-2" /> Yes
                    </label>
                    <label>
                        <input type="radio" name="PastPets" value="No" checked={formData.PastPets === "No"} onChange={handleChange} className="mr-2" /> No
                    </label>
                    </div>
                </div>

                <div className="mx-auto flex text-center items-center justify-center">
                    <button
                    type="submit"
                    className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-md"
                    onClick={handleSubmit}
                    >
                    Submit
                    </button>
                </div>
                </form>
            </div>
            </div>
    )
}

export default AdoptFormModal