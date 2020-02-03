import React, { useState, useEffect } from "react";
import axios from "axios";

import Countries from "./Countries.js";
import Search from "./Search.js";

function App() {
    const api_key = process.env.REACT_APP_API_KEY;
    const [ countries, setCountries ] = useState([]);
    const [ searchText, setSearchText ] = useState("");
    const [ capital, setCapital ] = useState("");
    const [ weather, setWeather ] = useState([]);

    useEffect(() => {
        axios.get("https://restcountries.eu/rest/v2/all")
            .then(response => setCountries(response.data));
    }, []);

    useEffect(() => {
        if (capital === "") {
            axios.get(`http://api.weatherstack.com/current?access_key=${api_key}&query=Helsinki&units=m`)
                .then(response => setWeather(response.data.current));
        } else {
            axios.get(`http://api.weatherstack.com/current?access_key=${api_key}&query=${capital}&units=m`)
                .then(response => setWeather(response.data.current));
        }
    }, [capital, api_key]);

    return (
        <div>
            <Search text={searchText} setText={setSearchText} />
            <Countries countries={countries} search={searchText}
                setSearch={setSearchText} weather={weather}
                setCapital={setCapital}
            />
        </div>
    );
}

export default App;
