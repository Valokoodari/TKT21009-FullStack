import React from "react";

const Search = ({text, setText}) => {
    const handleChange = (event) => {
        setText(event.target.value);
    }

    return (
        <div>
            Search by name
            <input style={{marginLeft: 5}}
                value={text}
                onChange={handleChange}
            />
        </div>
    );
}

export default Search;