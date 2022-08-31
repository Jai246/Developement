import React from 'react';
import PropTypes from 'prop-types';
import defaultImage from '../../../assets/default-image.jpeg'
// it is not always that we will get the price and image (for sofa set) property in thr object
// so while iterating we might check for that property and since thar is
// not present then we might get an error 
const Product = ({image,name,price}) => {
  const url = image && image.url;
  console.log(image,name,price)
  return <article className='product'>
    {/* this will also not work */}
    <img src={url || defaultImage} alt={name}/>
    <h4>{name}</h4>
    <p>${price || 3.99}</p>


    <h4>Single Product</h4>

  </article>;
};

// this is property on the component and not the one we imported
// it tells in the comnsole that something is off
Product.propTypes = {
  image:PropTypes.object.isRequired,
  name:PropTypes.string.isRequired,
  price:PropTypes.number.isRequired,
}

// the image will still not be displayed because in this object image doesnot have
// the URl property
// Product.defaultProps = {
//   name : 'default name',
//   price : 3.99,
//   image : defaultImage,
// }

export default Product;
