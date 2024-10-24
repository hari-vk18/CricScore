import React, { useEffect, useState } from 'react'
import './css/Stripcard.css'
import Card from './Card';
import { getSeriesInfo } from '../api/api';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

// import { ReactComponent as Location } from '../assets/SVG/location-2955.svg';

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


    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: Math.min(3, International.length),// Display 3 cards at a time
        slidesToScroll: 1, // Scroll one card at a time
        arrows: false,
        responsive: [
            {
                breakpoint: 2560,
                settings: {
                    slidesToShow: Math.min(3, International.length),
                    slidesToScroll: 1,
                    initialSlide: 3,
                    dots: true
                }
            },
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: Math.min(3, International.length),
                    slidesToScroll: 1,
                    initialSlide: 3,
                    dots: true
                }
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: Math.min(2, International.length),
                    slidesToScroll: 1,
                    initialSlide: 2,
                    dots: true
                }
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: Math.min(1, International.length),
                    slidesToScroll: 1,
                    dots: true
                }
            }
        ]
    };

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
                            inter?.seriesMatches?.map((data) => (
                                data.seriesAdWrapper && (
                                    data.seriesAdWrapper?.matches?.length > 0 && (
                                        <Card
                                            key={data.seriesAdWrapper.matches[0]?.matchInfo?.matchId}
                                            id={data.seriesAdWrapper.matches[0]?.matchInfo?.matchId}
                                            matchOb={data.seriesAdWrapper.matches[0]}
                                            series={data.seriesAdWrapper?.seriesId}
                                        />
                                    )
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
