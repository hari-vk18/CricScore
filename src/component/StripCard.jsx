import React, { useEffect, useState } from 'react'
import './css/Stripcard.css'
import Card from './Card';
import { getSeriesInfo } from '../api/api';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

// import { ReactComponent as Location } from '../assets/SVG/location-2955.svg';



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
    const [loding, setLoding] = useState(true);

    useEffect(() => {
        const matches = data;
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

            <div className='slid'>
                <Slider {...settings}>
                    {console.log('Slider Data:', International)}

                    {
                        International.map((inter, index) => (
                            inter?.matchType &&
                            inter?.seriesMatches?.map((data, index) => (
                                data.seriesAdWrapper && (
                                    data.seriesAdWrapper?.matches?.map((match) => (

                                        <Card key={index} id={match?.matchInfo?.matchId} matchOb={match} series={data.seriesAdWrapper?.seriesId} />

                                    ))
                                )

                            ))
                        ))

                    }
                    {/* {International[0]?.seriesMatches &&
                        International[0]?.seriesMatches?.map((data, index) => (
                            data.seriesAdWrapper && (
                                data.seriesAdWrapper?.matches?.map((match) => (

                                    <Card key={index} id={match?.matchInfo?.matchId} matchOb={match} series={data.seriesAdWrapper?.seriesId} />

                                ))
                            )

                        ))
                    } */}
                </Slider>
            </div>
        </div>
    )
}
