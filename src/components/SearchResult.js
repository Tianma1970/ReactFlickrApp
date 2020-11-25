import React from "react"
/*
 * Search result.
 * Handles searching flickr for photos and
 * displaying and selecting photos.
 */
class SearchResult extends React.Component {
  /*
   * Fetch flickr photos and dispath handling
   * of the response.
   */

  displayImages = photoUrls => {
    const imageListItem = `<li>${photoUrls}</li>`
    const imageHtmlList = `<ul class="searchresults-list">${imageListItem}</ul>`
    console.log(imageHtmlList)
  }
  render() {
    return (
      <div className="searchresults">
        <ul className="searchresults__list">
          {
            // Map over displayImages and return list of <img src={photoUrl}>.
            this.props.displayImages.map((photoUrl, index) => {
              return (
                <li>
                  <img key={index} alt="" src={photoUrl} />
                </li>
              )
            })
          }
        </ul>
      </div>
    )
  }
}

export default SearchResult
