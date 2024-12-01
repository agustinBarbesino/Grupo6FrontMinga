import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { MapPin, Cake } from 'lucide-react';

const Profile = () => {
    const navigate = useNavigate();
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [showSaveModal, setShowSaveModal] = useState(false);
    const [formData, setFormData] = useState({
        name: 'Lucas Ezequiel',
        lastname: 'Silva',
        location: 'Caseros, Buenos Aires',
        date: '28/12/2022',
        profileUrl: 'https://s3-alpha-sig.figma.com/img/d771/e8ee/4d516f000e29670bda6ceb5a6c836183?Expires=1733702400&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=eLwYCN-8mR4Gid6w2ArEj9XNZ6~SkEYnz-44vxHXmD0sVFWCopHO-AS0ILvEg6QDmhi9~yFMorE8l2gN7Nx8FsQ85JGguAVYJCHccKR-68oAA6t5L53hh-Wqxax1fnNNBVk2SKmzbLcpMLdwDMmNgAUbtJQX~KrVRwpTjRa1YvTbsUx-MvzFXLLdhLBcaEcQjTuHnfG70gTotrQmr5TWRK1cjcFlRfjGeW44g4Q3mV01JXvsbLoGY8umEiX-5~MeEhA9CytZnDBnA5R~KvBsQKo8CbdRDlJQTJkwGFAWGwXkSeDWdFw9woVhKymqDQ3JRoe~aoSDkUuSOCjKiaJSyQ__'
    });

    return (
        <div className="min-h-screen relative pt-32">
            {/* Background - hidden on mobile */}
            <div className="absolute inset-0 hidden md:block" style={{ zIndex: -1 }}>
                <div className="relative w-full h-[60%]">
                    <div
                        className="absolute inset-0 bg-cover bg-center"
                        style={{
                            backgroundImage: `url('https://s3-alpha-sig.figma.com/img/10b2/d5ee/20210b0eea83b4ff7cf04e7d9e72c1a2?Expires=1733702400&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=ApbIxzrVIYI3IICLpggmt~3Q8IDT9Nzu-TRDdbNtHZdCMmCDi8egz9-yKlv1DueuS6-L9PnuOEvua~mshZJbwMcLr7O7wIeFMhzIWUPCdpqaTGakjtg5ykE4KkQGmiKmUw-iuYNDcBnbnStigwAruYCVpSoSp65pruXf8FpRG~NrEG9Z63TV1s7BfcqLzThJswDc8lFBkmOE57V7RMJLQZfmPOcUt23bMXtwl-wCMZ8IrbQyu~G2Dm8u3axeBKcncCptqsGhkKZqOr2srFyNT7GBuJP4JcRon5gBz9dwE1VAL-YXsEjbnubJuZw6BIGL0t-Efxli1y35KAw2PTW2Tw__')`
                        }}
                    ></div>
                    <div className="absolute inset-0 bg-black bg-opacity-50"></div>
                </div>
                <div className="w-full h-1/2 bg-white"></div>
            </div>

            {/* Main content */}
            <div className="relative z-10 container mx-auto px-4">
                {/* Title */}
                <h1 className="hidden md:block text-6xl font-bold text-center text-white pt-8">Profile</h1>

                {/* Content container */}
                <div className="md:mt-[30vh] bg-white rounded-lg shadow-lg p-8 max-w-8xl mx-auto">
                    {/* Mobile profile image */}
                    <div className="md:hidden flex justify-center mb-8">
                        <div className="w-24 h-24 rounded-full overflow-hidden bg-gray-200">
                            <img
                                src={formData.profileUrl}
                                alt="Profile"
                                className="w-full h-full object-cover"
                            />
                        </div>
                    </div>

                    <div className="flex flex-col md:flex-row gap-8 items-start justify-center">
                        {/* Form Section */}
                        <div className="w-full md:w-1/3">
                            <form className="space-y-6">
                                <div className="flex justify-center md:justify-start">
                                    <input
                                        type="text"
                                        name="name"
                                        value={formData.name}
                                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                        className="w-64 border-b border-gray-300 p-2 focus:outline-none focus:border-gray-500"
                                        placeholder="Name"
                                    />
                                </div>

                                <div className="flex justify-center md:justify-start">
                                    <input
                                        type="text"
                                        name="lastname"
                                        value={formData.lastname}
                                        onChange={(e) => setFormData({ ...formData, lastname: e.target.value })}
                                        className="w-64 border-b border-gray-300 p-2 focus:outline-none focus:border-gray-500"
                                        placeholder="LastName"
                                    />
                                </div>

                                <div className="flex justify-center md:justify-start">
                                    <input
                                        type="text"
                                        name="location"
                                        value={formData.location}
                                        onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                                        className="w-64 border-b border-gray-300 p-2 focus:outline-none focus:border-gray-500"
                                        placeholder="Location"
                                    />
                                </div>

                                <div className="flex justify-center md:justify-start">
                                    <input
                                        type="text"
                                        name="date"
                                        value={formData.date}
                                        onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                                        className="w-64 border-b border-gray-300 p-2 focus:outline-none focus:border-gray-500"
                                        placeholder="Date"
                                    />
                                </div>

                                <div className="flex justify-center md:justify-start">
                                    <input
                                        type="text"
                                        name="profileUrl"
                                        value={formData.profileUrl}
                                        onChange={(e) => setFormData({ ...formData, profileUrl: e.target.value })}
                                        className="w-64 border-b border-gray-300 p-2 focus:outline-none focus:border-gray-500"
                                        placeholder="URL Profile Image"
                                    />
                                </div>

                                <div className="flex justify-center md:justify-start">
                                    <button
                                        type="button"
                                        onClick={() => setShowSaveModal(true)}
                                        className="w-64 md:w-[50%] text-lg bg-emerald-500 text-white py-2 rounded-full hover:bg-emerald-600 transition-colors"
                                    >
                                        Save
                                    </button>
                                </div>

                                <div className="flex justify-center md:justify-start">
                                    <button
                                        type="button"
                                        onClick={() => setShowDeleteModal(true)}
                                        className="w-64 md:w-[50%] text-lg bg-red-100 text-red-500 py-2 rounded-full hover:bg-red-200 transition-colors"
                                    >
                                        Delete Account
                                    </button>
                                </div>
                            </form>
                        </div>

                        {/* Desktop Profile Image Section */}
                        <div className="hidden md:flex w-full md:w-1/3 pt-16 flex-col items-end">
                            <div>
                                <div className="w-48 h-48 rounded-full overflow-hidden bg-gray-200 mb-4">
                                    <img
                                        src={formData.profileUrl}
                                        alt="Profile"
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                                <h2 className="text-2xl font-semibold mb-2">{`${formData.name} ${formData.lastname}`}</h2>
                                <div className="flex items-center gap-2 text-gray-600 mb-2">
                                    <MapPin size={18} />
                                    <p>{formData.location}</p>
                                </div>
                                <div className="flex items-center gap-2 text-gray-500">
                                    <Cake size={18} />
                                    <p>{formData.date}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Modals */}
            {showDeleteModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
                    <div className="bg-white rounded-lg p-6 max-w-sm w-full">
                        <h3 className="text-lg font-medium mb-4">Are you sure you want to delete?</h3>
                        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
                            <div className="bg-white rounded-lg p-6 max-w-sm w-full">
                                <h3 className="text-lg font-medium mb-4">Are you sure you want to delete this?</h3>
                                <hr className="border-gray-300 my-4" /> 
                                <div className="flex items-center">
                                    <button
                                        onClick={() => setShowDeleteModal(false)}
                                        className="flex-1 text-red-500 py-2"
                                    >
                                        Yes, I'm sure
                                    </button>
                                    <div className="w-px bg-gray-400 h-8 mx-4" />
                                    <button
                                        onClick={() => setShowDeleteModal(false)}
                                        className="flex-1 text-blue-500 py-2"
                                    >
                                        No
                                    </button>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            )}

            {showSaveModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
                    <div className="bg-white rounded-lg p-6 max-w-sm w-full">
                        <h3 className="text-lg font-medium mb-4">Your changes are saved correctly!</h3>
                        <hr className="border-gray-300 my-4" />
                        <button
                            onClick={() => setShowSaveModal(false)}
                            className="w-full text-blue-500 py-2"
                        >
                            Accept
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Profile;