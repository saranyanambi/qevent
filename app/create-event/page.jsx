'use client';

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";

const CreateEvent=()=>{
    const session=useSession();
    const route=useRouter();
    const [flag,setFlag]=useState(false);
    const [formData, setFormData] = useState({
        id: uuidv4(),
        name: '',
        location: '',
        dateTime: '',
        tags: '',
        image: '',
        artist: '',
        price: '',
        description: ''
    });
    const [error,setError]=useState(null)

    const handleInputChange = (e) => {
        const { id, value } = e.target;

        const newFormData = { ...formData };

        newFormData[id] = value;

        setFormData(newFormData)
    }

   
    const handleEventCreate = async (e) => {
        e.preventDefault();

        setError(null);

        if (
            formData.name
            && formData.location
            && formData.dateTime
            && formData.image
            && formData.artist
            && formData.price
            && formData.description
        ) {

            //console.log('formInput', formInput);
            const { dateTime, tags, price, ...data } = formData;

            const tagsArr = tags.split(',');

            const dateTimeObj = new Date(dateTime);

            const dateOptions = {
                day: '2-digit',
                month: '2-digit',
                year: 'numeric'
            }
            const timeOptions = {
                hour: '2-digit',
                minute: '2-digit',
                hour12: true
            }

            const date = dateTimeObj.toLocaleDateString('en-CA', dateOptions);
            const time = dateTimeObj.toLocaleTimeString('en-US', timeOptions);

            const eventData = { ...data, price: Number(price), date, time, tags: tagsArr };

            try {
                const res = await fetch('https://qevent-backend.labs.crio.do/events',
                    {
                        method: 'POST',
                        body: JSON.stringify(eventData),
                        headers: {
                            "Content-Type": "application/json",
                        },
                    }
                );

                console.log('res', res);

                if (!res.ok) {
                    alert('Event creation failed');
                } else {
                    route.push('/events');
                }
            } catch (e) {
                alert('Event creation failed');
            }
        } else {
            setError('All Fields are required.')
        }
    }

    useEffect(() => {
        if (flag && !session.data)
            route.push('/events');
        setFlag(true);
    }, [session]);

    return(
        <div className="min-h-screen flex justify-center items-center">
            <div
                className="m-4 p-4 rounded-lg drop-shadow-lg bg-white"
            >
                <h2 className="font-bold text-4xl w-full text-center">Create Event</h2>
                <form
                    className="grid grid-cols-12 auto-cols-min gap-2 m-4 py-4 min-w-96"
                    onSubmit={handleEventCreate}
                >
                    {error && <p className="col-span-12 text-center text-lg border-2 border-red-400 py-2 mb-5 rounded-lg bg-red-200 text-red-600">{error}</p>}

                  
                    <label
                        className="text-lg col-span-2 text-end"
                    >
                        Name:
                    </label>
                    <input
                        className="col-span-10 border-2 border-gray-400 rounded py-1 px-2 ml-2"
                        type="text"
                        id="name"
                        placeholder="Enter your event name"
                        value={formData.name}
                        onChange={handleInputChange}
                        required
                    />

              
                    <label
                        className="text-lg col-span-2 text-end"
                    >
                        Location:
                    </label>

                    <input
                        className="col-span-10 border-2 border-gray-400 rounded py-1 px-2 ml-2"
                        id="location"
                        type="text"
                        placeholder="Enter your location"
                        value={formData.location}
                        onChange={handleInputChange}
                    />

                 
                    <label
                        className="text-lg col-span-2 text-end"
                    >
                        Date & Time:
                    </label>
                    <input
                        className="col-span-10 border-2 border-gray-400 rounded py-1 px-2 ml-2"
                        id="dateTime"
                        type="datetime-local"
                        value={formData.dateTime}
                        onChange={handleInputChange}
                        required
                    />

                  
                    <label
                        className="text-lg col-span-2 text-end"
                    >
                        Tags:
                    </label>
                    <input
                        className="col-span-10 border-2 border-gray-400 rounded py-1 px-2 ml-2"
                        placeholder="Enter event tags seprated by comma"
                        id="tags"
                        type="text"
                        value={formData.tags}
                        onChange={handleInputChange}
                    />

                   
                    <label
                        className="text-lg col-span-2 text-end"
                    >
                        Image:
                    </label>
                    <input
                        className="col-span-10 border-2 border-gray-400 rounded py-1 px-2 ml-2"
                        placeholder="Enter event image url"
                        id="image"
                        type="url"
                        value={formData.image}
                        onChange={handleInputChange}
                        
                    />

               
                    <label
                        className="text-lg col-span-2 text-end"
                    >
                        Artist:
                    </label>
                    <input
                        className="col-span-10 border-2 border-gray-400 rounded py-1 px-2 ml-2"
                        placeholder="Enter event artist"
                        id="artist"
                        type="text"
                        value={formData.artist}
                        onChange={handleInputChange}
                        required
                    />

                  
                    <label
                        className="text-lg col-span-2 text-end"
                    >
                        Price:
                    </label>
                    <input
                        className="col-span-10 border-2 border-gray-400 rounded py-1 px-2 ml-2"
                        placeholder="Enter event price"
                        id="price"
                        type="number"
                        value={formData.price}
                        onChange={handleInputChange}
                        required
                    />

                
                    <label
                        className="text-lg col-span-2 text-end"
                    >
                        Description:
                    </label>
                    <textarea
                        className="col-span-10 border-2 border-gray-400 rounded py-1 px-2 ml-2"
                        id="description"
                        rows="4"
                        placeholder="Enter event description here..."
                        value={formData.description}
                        onChange={handleInputChange}
                        required
                    />

                    <button
                        type="submit"
                        className="col-span-12 mt-4 w-fit mx-auto bg-gradient-to-r from-orange-400 to-teal-600 text-white px-4 py-2 rounded-md font-medium hover:opacity-70"
                    >
                        Create Event
                    </button>
                </form>
            </div>
        </div>
    )
}

export default CreateEvent