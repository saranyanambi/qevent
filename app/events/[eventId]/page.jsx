import Tag from "@/components/Tag";

const Eventid=async({params})=>{
    
    const fetchid=async()=>{
        try{
        let res=await fetch(`https://qevent-backend.labs.crio.do/events/${params.eventId}`)
            
        return res.json()
        }catch(e){
            console.log(e)
        }
    }
    const event=await fetchid();
   
    return(
        <div className="max-w-7xl sm:mx-auto m-2 min-h-screen">
        <img className="mx-auto h-auto sm:max-w-7xl sm:h-72 object-cover" src={event.image} />
        <header className="my-4 ">
            <h1 className="text-4xl font-bold bg-gradient-to-b from-orange-400 from-50% to-teal-600 text-transparent bg-clip-text">
                {event.name}
            </h1>
            <p className="text-xl font-bold bg-gradient-to-b from-orange-400 from-50% to-teal-600 text-transparent bg-clip-text">
                {event.location}
            </p>
            <p className="text-xl font-bold bg-gradient-to-b from-orange-400 from-50% to-teal-600 text-transparent bg-clip-text">
                {event.artist}
            </p>
        </header>
        <main className="mt-12 mb-5">
            <div className="my-2 flex flex-wrap gap-4 ">
                {event.tags?.map((tag) => (
                    <Tag key={tag.id} text={tag} />
                ))}
            </div>
            <p>
                {event.description}
            </p>
        </main>
        <footer className="flex flex-wrap gap-4  justify-between">
            <p className="text-4xl font-bold bg-gradient-to-b from-orange-400 from-50% to-teal-600 text-transparent bg-clip-text">
                ${event.price}
            </p>
            <button className="xs:w-fit bg-red-500 text-white px-4 py-1 rounded-md">
                Buy Tickets
            </button>
        </footer>
    </div>
    )
}

export default Eventid;