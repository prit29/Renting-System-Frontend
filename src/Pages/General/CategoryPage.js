import React, { useState, useEffect } from 'react';
import axios from 'axios';
import SearchHeader from '../../Components/Header/SearchHeader';
import ProductCard from '../../Components/Cardview/ProductCard';
import './style.css';
import { useLocation } from 'react-router-dom';
import { useAlert } from 'react-alert';

const CategoryPage = (props) => {
    let location = useLocation();
    const alert = useAlert();

    const [Products, setData] = useState([]);

    useEffect(() => {
        const fetch = () => {
            axios
                .get('https://rentingsystem.herokuapp.com/product/')
                .then((response) => {
                    const data = response.data;
                    if (data.error) {
                        alert.error(data.msg);
                        setData([]);
                    } else {
                        setData(response.data.product);
                    }
                })
                .catch((e) => {
                    console.log(e);
                });
        };

        fetch();
    }, [alert]);

    return (
        <div className='Dashboard'>
            <SearchHeader />
            <div className='Main-card'>
                {Products.map((product) => {
                    return (
                        product.category === location.state && (
                            <ProductCard key={product._id} product={product} />
                        )
                    );
                })}
            </div>
        </div>
    );
};

export default CategoryPage;
