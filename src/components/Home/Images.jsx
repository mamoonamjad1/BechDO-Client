import React from 'react';
import Carousel from 'react-material-ui-carousel';
import Banner from './Banner';
import picture from '../../assets/carousel/picture-1.png';
import picture1 from '../../assets/carousel/picture-3.jpg';
import picture2 from '../../assets/carousel/picture-2.jpg';

const items = [
  {
    id: 1,
    image: picture,
  },
  {
    id: 2,
    image: picture1,
  },
  {
    id: 3,
    image: picture2,
  },
];

const Images = () => {
  return (
    <Carousel
      animation="fade"
      interval={3000} 
    >
      {items.map((item) => (
        <Banner key={item.id} item={item} />
      ))}
    </Carousel>
  );
};

export default Images;
