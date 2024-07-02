import React from "react";

const LocalSearch = ({keyword, setKeyword}) => {
    
    const handleSearchChange = (e) => {
        e.preventDefault()
        setKeyword(e.target.value.toLowerCase())
    }

    return (
        <div>
        <input 
        type='search' 
        placeholder='Filter' 
        value={keyword} 
        onChange={handleSearchChange} 
        className='form-control mt-4'/>

        </div>
    )
}

export default LocalSearch