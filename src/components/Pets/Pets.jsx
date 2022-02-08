import React, {useState, useEffect, createContext} from 'react';
import axios from 'axios';
import Filter from "../Filter/Filter";
import Cards from "../Cards/Cards";
import "./Pets.css";

export const PetsContext = createContext({
    cats: [],
    setCats: () => {}
})

const Pets = () => {

    const [cats, setCats] = useState([]);
    const [filteredCats, setFilteredCats] = useState([]);
    const [filters, setFilters] = useState({
        gender: "any",
        favoured: "any"
    })

    const fetchCats = async () => {
        try {
            const response = await axios.get("http://localhost:4000/cats");
            setCats(response.data);
            setFilteredCats(response.data)
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        fetchCats()
    }, [])

    useEffect(() => {
        let catsFiltered = [...cats]
        if(filters.gender !== "any"){
            catsFiltered = catsFiltered.filter(cat => cat.gender === filters.gender)
        }
        if(filters.favoured !== "any"){
            catsFiltered = catsFiltered.filter(cat => cat.favoured === filters.favoured)
        }
        setFilteredCats(catsFiltered)
    }, [filters])

    return (
        <div className="container">
            <div className="app-container">
                <PetsContext.Provider value={{cats: filteredCats, setCats: setCats}}>
                    <Filter filters={filters} setFilters={setFilters}/>
                    <Cards />
                </PetsContext.Provider>
            </div>
        </div>
    );
};

export default Pets;