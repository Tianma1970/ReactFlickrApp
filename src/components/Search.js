import React, { useEffect } from "react"

function Search() {
  return (
    <>
      <div class="controls">
        <div class="logo__wrapper"></div>
        <div class="searchfield">
          <input type="text" placeholder="Search flickr for photos..." class="searchfield__input" />
          <button class="searchfield__submit-button">Search</button>
        </div>
        <div class="gallery-button__wrapper">
          <button class="gallery-button">Show Gallery</button>
        </div>
      </div>

      <div class="message__container"></div>

      <div class="searchresults"></div>

      <div class="gallery">
        <div class="gallery__content">
          <div class="gallery__controls">
            <button class="gallery__control-left"></button>
            <button class="gallery__control-right"></button>
          </div>
        </div>
      </div>
    </>
  )
}

export default Search
