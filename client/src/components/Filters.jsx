import React, {  useState } from 'react';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { updateList } from '../features/cartSlice';

import "./Filters.css";

const Filters = () => {
    const ulStyle= {
        display:'flex',
        flexDirection: 'column',
        gap: '.6rem'
    };
    const List= {
        textDecoration: 'none',
        listStyle:'none',
        textTransform: 'capitalize',
        transition: 'color 0.3s ease',
        cursor: 'pointer',
    };
    const categories = useSelector(state => state.cart.categories);
    const availableColors = useSelector(state => state.cart.availableColors);
    const reduxCurrentCategory = useSelector(state => state.cart.currentCategory);
    const [currentCategory, setCurrentCategory] = useState(reduxCurrentCategory);
    const dispatch = useDispatch();
    
    const handleCategory = (category) => {
        setCurrentCategory(category);
        console.log(currentCategory);
        dispatch(updateList({value: category, type: 'category' }));
    };
    const handleColor = (color) => {
        dispatch(updateList({value: color, type:'color'}));
    };

    return (
        <div className='filters-container'>
            <div>
            <h2>Category</h2>
            <ul style={ulStyle}>
                {categories.map(category => (
                    <li 
                        key={category.name}
                        value={category.name}
                        style={List}
                        onClick={() => handleCategory(category.name)}
                    >
                        {category.name} {category.number}
                    </li>
                ))}
            </ul>
            </div>
            <div>
            <h2>Filter by color</h2>
            <ul style={ulStyle}>
                {availableColors.map(color => (
                    <li 
                        key={color.name}
                        value={color.name}
                        style={List}
                        onClick={() => handleColor(color.name)}
                    >
                        {color.name} {color.number}
                    </li>
                ))}
            </ul>
            </div>
        </div>
    );
};

export default Filters;
