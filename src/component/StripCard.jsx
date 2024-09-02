import React, { useEffect, useState } from 'react'
import { Button, styled } from '@mui/material';
import './css/Stripcard.css'
import Card from './Card';
import { getSeriesInfo } from '../api/api';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

// import { ReactComponent as Location } from '../assets/SVG/location-2955.svg';

const navigationOptions = [
    { label: 'International' },
    { label: 'League' },
    { label: 'Domestic' },
    { label: 'Womens' },
]

const MatchType = styled(Button)(({ selected }) => ({
    padding: '5px 5px',
    borderRadius: '5px',
    margin: '5px',
    background: selected
        ? 'linear-gradient(292deg, rgba(209,55,71,1) 4%, rgba(216,92,77,1) 54%, rgba(230,122,75,1) 90%)'
        : '#f0f0f0',
    color: selected ? 'white' : 'black',
    '&:hover': {
        background: selected
            ? 'linear-gradient(292deg, rgba(209,55,71,1) 4%, rgba(216,92,77,1) 54%, rgba(230,122,75,1) 90%)'
            : '#e0e0e0',
        color: 'black',
    },
    textTransform: 'none',
    display: 'flex',
    justifyContent: 'center', // Center text inside the button
    alignItems: 'center',
    boxSizing: 'border-box', // Ensures padding and border are included in the element's width and height
    minWidth: '120px',
}))

const ButtonContainer = styled('div')({
    width: '80%',
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginBottom: '10px',
});

const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3, // Display 3 cards at a time
    slidesToScroll: 1, // Scroll one card at a time
    arrows: false,
    responsive: [
        {
            breakpoint: 2560,
            settings: {
                slidesToShow: 3,
                slidesToScroll: 1,
                initialSlide: 3,
                dots: true
            }
        },
        {
            breakpoint: 1024,
            settings: {
                slidesToShow: 3,
                slidesToScroll: 1,
                initialSlide: 3,
                dots: true
            }
        },
        {
            breakpoint: 600,
            settings: {
                slidesToShow: 2,
                slidesToScroll: 1,
                initialSlide: 2,
                dots: true
            }
        },
        {
            breakpoint: 480,
            settings: {
                slidesToShow: 1,
                slidesToScroll: 1,
                dots: true
            }
        }
    ]
};


export default function StripCard({ data }) {
    const [International, setInternational] = useState([]);
    const [selectedOption, setSelecterOption] = useState('International')
    const [loding, setLoding] = useState(true);

    useEffect(() => {
        const matches = data.filter((item) => item.matchType === 'International');
        console.log('matchesss', matches)
        setInternational(matches);
        setLoding(false);
    }, [data])
    console.log('Strip', data)

    if (loding) {
        return (
            <div>Loading...</div>
        )
    }
    return (
        <div className='Strip'>
            <ButtonContainer >
                {
                    navigationOptions.map((Option, index) => (
                        <MatchType
                            key={index}
                            selected={selectedOption === Option.label}
                            onClick={() => setSelecterOption(Option.label)}>
                            {Option.label}
                        </MatchType>
                    ))
                }
            </ButtonContainer>
            <div className='slid'>
                <Slider {...settings}>
                    {console.log('Slider Data:', International)}
                    {International[0]?.seriesMatches &&
                        International[0]?.seriesMatches?.map((data, index) => (
                            data.seriesAdWrapper && (
                                data.seriesAdWrapper?.matches?.map((match) => (

                                    <Card key={index} id={match?.matchInfo?.matchId} matchOb={match} series={data.seriesAdWrapper?.seriesId} />

                                ))
                            )

                        ))
                    }
                </Slider>
            </div>
        </div>
    )
}
