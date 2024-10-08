import React, {useState} from 'react';

const SearchBar = ({onSearch}) =>  {
    const [searchQuery, setSearchQuery] = useState('');
    
    // const handleInputChange = (e) => {
    //     const query = e.target.value;

    //     setSearchQuery(query);
    //     onSearch(query);
    // };
const handleInputChange = (e) => {
    setSearchQuery(e.target.value);
};

const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(searchQuery);
}
    return (
        // <div className='search-bar'>
        //     <label htmlFor='item-search'> Search for items:</label>
        //     <input 
        //     type='text'
        //     id= 'item-search'
        //     value={searchQuery}
        //     onChange={handleInputChange}
        //     placeholder='Search for items to add...'
        //     />
        // </div>

        <form onSubmit={handleSubmit} className='search-bar'>
            <label htmlFor='item-search'>Search for items:</label>
            <input
            type='text'
            id='item-search'
            value={searchQuery}
            onChange={handleInputChange}
            placeholder='Search for items to add...'
            />
            <button type='submit'>Search</button>
        </form>
    );
};

export default SearchBar;