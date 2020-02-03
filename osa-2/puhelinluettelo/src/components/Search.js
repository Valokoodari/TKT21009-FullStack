import React from "react";

const Search = ({text, setText}) => {
    const handleSearchChange = (event) => {
        setText(event.target.value);
    }

    return (
        <div style={{marginTop: -15}}>
            Search
            <input style={{marginLeft: 11}}
                value={text}
                onChange={handleSearchChange}
            />
        </div>
    )
}

export default Search;