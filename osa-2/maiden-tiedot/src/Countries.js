import React from "react";

const Countries = ({countries, search, setSearch, weather, setCapital}) => {
    let filtered = countries.filter(country =>
        country.name.toLowerCase() === search.toLowerCase()
    );

    if (filtered.length === 0) {
        filtered = countries.filter(country => 
            country.name.toLowerCase().includes(search.toLowerCase())
        );
    }

    if (filtered.length > 10) {
        return (<p>Too many matching countries.</p>);
    } else if (filtered.length === 0) {
        return (<p>No matching countries found.</p>);
    } else if (filtered.length > 1) {
        return (
            <div>
                {filtered.map(country => (
                        <div key={country.name}>
                            {country.name}
                            <button onClick={() => setSearch(country.name)} style={{marginLeft: 5}}>Show</button>
                        </div>
                    )
                )}
            </div>
        );
    } else {
        setCapital(filtered[0].capital);

        return (
            <div>
                <h1 style={{marginBottom: 5}}>{filtered[0].name}</h1>
                Capital: {filtered[0].capital} <br />
                Population: {filtered[0].population}
                <h3 style={{marginBottom: -10, marginTop: 5}}>Languages</h3>
                <ul style={{marginLeft: -15}}>
                    {filtered[0].languages.map(language => 
                        <li key={language.name}>{language.name}</li>
                    )}
                </ul>
                <img alt={`Flag of ${filtered[0].name}`} src={filtered[0].flag} style={{width: 350}} />
                <h3>Weather in {filtered[0].capital}</h3>
                <img alt="Weather icon" src={weather.weather_icons} /><br />
                Temperature: {weather.temperature} &#176;C
                <br />
                Wind: {weather.wind_speed} km/h, {weather.wind_dir}
            </div>
        );
    }
}

export default Countries;