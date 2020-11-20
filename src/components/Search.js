import React from "react"

function Search() {
  return (
    <>
      <div className="controls">
        <div className="logo__wrapper"></div>
        <div className="searchfield">
          <input type="text" placeholder="Search flickr for photos..." className="searchfield__input" />
          <button className="searchfield__submit-button">Search</button>
        </div>
        <div className="gallery-button__wrapper">
          <button className="gallery-button">Show Gallery</button>
        </div>
      </div>

      <div className="message__container"></div>

      <div className="searchresults"></div>

      <div className="gallery">
        <div className="gallery__content">
          <div className="gallery__controls">
            <button className="gallery__control-left"></button>
            <button className="gallery__control-right"></button>
          </div>
        </div>
      </div>
    </>
  )
}

export default Search
