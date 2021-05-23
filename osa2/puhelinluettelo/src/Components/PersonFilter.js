import React from 'react';

const PersonFilter = ({newFilter, handleFilterChange}) => {
    return ( 
    <form>
        filter show with: <input  value={newFilter} onChange={handleFilterChange}></input>
    </form> 
    );
}
 
export default PersonFilter;