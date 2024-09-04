import { styled } from '@mui/material';
import { Button, colors } from '@mui/material'
import { Link, useLocation } from 'react-router-dom';
import SearchIcon from '@mui/icons-material/Search';
import './css/Cricscore.css';
import logo from '../assets/images/logo.png'
import React, { useState } from 'react'
import { useEffect } from 'react';

const navigationOptions = [
    { lable: 'Live Score', path: '/' },
    // { lable: 'Schedule', path: '/schedule' },
    { lable: 'Player Search', path: '/playersearch' },
    { lable: 'News', path: '/sportsnews' },
    { lable: 'Series', path: '/series' },
    // { lable: 'Teams', path: '/teams' },
    // { lable: 'Videos', path: '/videos' },
    { lable: 'Rankings', path: '/rankings' },
    // { lable: 'More', path: '/more' },
]

const NavOptin = styled(Button)(({ selected }) => ({
    padding: '7px 20px',
    borderRadius: '5px',
    background: selected
        ? 'linear-gradient(292deg, rgba(209,55,71,1) 4%, rgba(216,92,77,1) 54%, rgba(230,122,75,1) 90%)'
        : '#f0f0f0',
    color: selected ? 'white' : 'black',
    '&:hover': {
        background: 'linear-gradient(292deg, rgba(209,55,71,1)',
        color: 'white',
    },
    textTransform: 'none',
    display: 'flex',
    justifyContent: 'center', // Center text inside the button
    alignItems: 'center',
    boxSizing: 'border-box', // Ensures padding and border are included in the element's width and height
    minWidth: '120px',
}))

function Nav() {
    const [selectedOption, setSelecterOption] = useState('Live Score');
    const location = useLocation();

    useEffect(() => {
        const path = location.pathname;
        const option = navigationOptions.find(option => option.path === path);
        if (option) {
            setSelecterOption(option.lable);
        }
    }, [location])
    return (
        <div className="cricbuzz__header">
            <div className="cricbuzz__headerImage">
                <img src={logo} alt="" className='logo' />
            </div>
            <div className="cricbuzz__headerOptions">
                {
                    navigationOptions.map((Option, index) => (
                        <Link to={Option.path} style={{ textDecoration: 'none', color: 'inherit' }}>
                            <NavOptin
                                key={index}
                                selected={selectedOption === Option.lable}
                                onClick={() => setSelecterOption(Option.lable)}>

                                <h4>{Option.lable}</h4>

                            </NavOptin>
                        </Link>
                    ))
                }
            </div>
        </div>
    )
}

export default Nav