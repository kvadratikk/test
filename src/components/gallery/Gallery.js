import React from 'react';
import './gallery.scss';

class Gallery extends React.Component {
  constructor() {
    super();
    this.state = {
      activePhoto: '',
    };
  }

  render() {
    const { gallery, inStock } = this.props;
    const { activePhoto } = this.state;

    return (
      <div className='card__gallery gallery'>
        <ul className='gallery__list'>
          {gallery.map((photo) => (
            <li
              className='gallery__item'
              key={photo}
              onClick={() => this.setState({ activePhoto: photo })}
            >
              <img className='gallery__img' alt='product' src={photo} />
            </li>
          ))}
        </ul>

        <div
          className={`gallery__img-wrapper ${inStock ? '' : 'out-of-stock'}`}
        >
          <img
            className='gallery__current'
            alt='product'
            src={activePhoto || gallery[0]}
          />
        </div>
      </div>
    );
  }
}

export default Gallery;
