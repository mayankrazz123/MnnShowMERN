import React, { useEffect, useState } from 'react'
import { dummyShowsData } from '../../assets/assets';
import Loading from '../../components/Loading';
import Title from '../../components/admin/Title';
import { dateFormat } from '../../lib/dateFormat';
import { useAppContext } from '../../context/AppContext';
import TheaterSelect from '../../components/TheaterSelect';

const bhopalTheaters = [
    { id: 1, name: "PVR Logix Mall", address: "DB City Mall, Arera Colony" },
    { id: 2, name: "INOX", address: "Aashima Mall, Hoshangabad Road" },
    { id: 3, name: "Cinepolis", address: "Planet Godrej, MP Nagar" },
    { id: 4, name: "Cineworld", address: "Shahpura, Bhopal" },
    { id: 5, name: "MPR Cinemas", address: "Bhopal Junction" },
    { id: 6, name: "PVR DB Mall", address: "DB City Mall, Bhopal" },
    { id: 7, name: "Esquire Cinemas", address: "Habibganj, Bhopal" },
    { id: 8, name: "Carnival Cinemas", address: "Kolar Road, Bhopal" }
]

const ListShows = () => {

    const currency = import.meta.env.VITE_CURRENCY

    const {axios, getToken, user} = useAppContext()

    const [shows, setShows] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showTheaterSelect, setShowTheaterSelect] = useState(false);
    const [selectedShowIndex, setSelectedShowIndex] = useState(null);
    const [theaters, setTheaters] = useState({});

    const getAllShows = async () =>{
        try {
            const { data } = await axios.get("/api/admin/all-shows", {
                headers: { Authorization: `Bearer ${await getToken()}` }
            });
            setShows(data.shows)
            setLoading(false);
        } catch (error) {
            console.error(error);
        }
    }

    useEffect(() => {
        if(user){
            getAllShows();
        }   
    }, [user]);

    const handleTheaterSelect = (theater) => {
        setTheaters(prev => ({ ...prev, [selectedShowIndex]: theater.name }))
        setShowTheaterSelect(false)
    }

    const openTheaterSelect = (index) => {
        setSelectedShowIndex(index)
        setShowTheaterSelect(true)
    }

  return !loading ? (
    <>
      <Title text1="List" text2="Shows" />
      <div className="max-w-4xl mt-6 overflow-x-auto">
         <table className="w-full border-collapse rounded-md overflow-hidden text-nowrap">
<thead>
                 <tr className="bg-primary/20 text-left text-white">
                     <th className="p-2 font-medium pl-5">Movie Name</th>
                     <th className="p-2 font-medium">Theater</th>
                     <th className="p-2 font-medium">Show Time</th>
                     <th className="p-2 font-medium">Total Bookings</th>
                     <th className="p-2 font-medium">Earnings</th>
                 </tr>
             </thead>
             <tbody className="text-sm font-light">
                 {shows.map((show, index) => (
                     <tr key={index} className="border-b border-primary/10 bg-primary/5 even:bg-primary/10">
                         <td className="p-2 min-w-45 pl-5">{show.movie.title}</td>
                         <td className="p-2">
                             <button 
                                onClick={() => openTheaterSelect(index)}
                                className="text-xs px-3 py-1.5 bg-primary/20 hover:bg-primary/30 border border-primary/30 rounded-full text-primary-dull"
                             >
                                {theaters[index] || "Select"}
                             </button>
                         </td>
                         <td className="p-2">{dateFormat(show.showDateTime)}</td>
                         <td className="p-2">{Object.keys(show.occupiedSeats).length}</td>
                         <td className="p-2">{currency} {Object.keys(show.occupiedSeats).length * show.showPrice}</td>
                     </tr>
                 ))}
             </tbody>
         </table>
      </div>

      <TheaterSelect 
        isOpen={showTheaterSelect}
        onClose={() => setShowTheaterSelect(false)}
        onSelect={handleTheaterSelect}
      />
    </>
  ) : <Loading />
}

export default ListShows
