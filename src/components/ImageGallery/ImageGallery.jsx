import PropTypes from 'prop-types';
import { toast } from 'react-toastify';

import ImageGalleryItem from 'components/ImageGalleryItem/ImageGalleryItem';
import { Loader } from 'components/Loader/Loader';
import Button from 'components/Button/Button';

import './ImageGallery.css';

export default function ImageGallery({ status, error, images, onClick, onLoadMore }) {
  const handelImageClick = imageURL => {
    onClick(imageURL);
  };

  if (status === 'idle') {
    return <div className="Info">The gallery is empty</div>;
  }
  if (status === 'pending') {
    return <Loader />;
  }
  if (status === 'rejected') {
    toast.error('Search error');
  }
  if (status === 'resolved' && images.length !== 0) {
    return (
      <>
        <ul className="ImageGallery">
          {images.map(({ id, webformatURL, largeImageURL }) => (
            <ImageGalleryItem
              key={id}
              id={id}
              webformatURL={webformatURL}
              largeImageURL={largeImageURL}
              onClick={handelImageClick}
            />
          ))}
        </ul>
        {<Button onLoadMore={onLoadMore} />}
      </>
    );
  } else {
    return <div className="Info">We cant find it</div>;
  }
}
ImageGallery.propTypes = {
  onClick: PropTypes.func.isRequired,
  onLoadMore: PropTypes.func.isRequired,
  status: PropTypes.string.isRequired,
  error: PropTypes.string,
  images: PropTypes.array,
};
