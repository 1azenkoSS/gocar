import React, { useState } from 'react';

const PriceFilter = () => {
    const [cars, setCars] = useState(props.cars);

    const [sortDirection, setSortDirection] = useState('asc');

    const sortCars = () => {
        const sortedCars = [...cars].sort((a, b) => {
            if (sortDirection === 'asc') {
                return a.price - b.price;
            } else {
                return b.price - a.price;
            }
        });
        setCars(sortedCars);
        setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    };

    return (
        <div>
            <button onClick={sortCars}>Sort by Price</button>
            <ul>
                {cars.map((car) => (
                    <li key={car.id}>{`${car.name} - ${car.price}`}</li>
                ))}
            </ul>
        </div>
    );
};

export default PriceFilter;