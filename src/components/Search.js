import React from "react"

class Search extends React.Component {
  /*Fetch Flickr photos and
  dispatch handling */
  state = {
    searchText: ""
  }

  handleTextChange = e => this.setState({ searchText: e.target.value })

  fetchFlickrSearchResult = e => {
    e.preventDefault()
    const url = "https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=b54580f369a7eeebecb2004dc429d08f&format=json&nojsoncallback=1&text=" + this.state.searchText

    fetch(url)
      .then(response => {
        return response.json()
      })
      .then(json => {
        //console.log(json.photos.photo)
        const photoUrls = json.photos.photo.map(photo => {
          return `https://farm${photo.farm}.staticflickr.com/${photo.server}/${photo.id}_${photo.secret}_m.jpg`
        })
        this.props.setImages(photoUrls)
        console.log(photoUrls)
      })
  }
  /*Build URL from the response from Flickr and insert it into the DOM
   */

  /*Toggles the selected state of an image and 
 updates the array of selected image urls
 the url array is then persisted in localStorage
 */
  toggleImageSelected(e) {
    //toggle selceted class on the <li>
    const isLiSelected = this.helpers.closest(e.target, "li").classList.toggle("selected")

    //add or remove from local Storage
    if (isLiSelected) {
      this.lStorage.add(e.target.src)
    } else {
      this.lStorage.remove(e.target.src)
    }
  }
  /*Builds a url to an Flickr image from the data
   */
  getImageUrl(farmId, serverId, id, secret) {
    return `https://farm${farmId}.staticflickr.com/${serverId}/${id}_${secret}_m.jpg`
  }

  render() {
    return (
      <>
        <div className="controls">
          <div className="logo__wrapper"></div>
          <div className="searchfield">
            <input type="text" placeholder="Search flickr for photos..." className="searchfield__input" onChange={this.handleTextChange} value={this.state.searchText} />
            <button className="searchfield__submit-button" onClick={this.fetchFlickrSearchResult}>
              Search
            </button>
          </div>
          <div className="gallery-button__wrapper">
            <button className="gallery-button">Show Gallery</button>
          </div>
        </div>

        <div className="message__container"></div>

        <div className="searchresults"></div>
      </>
    )
  }
}

export default Search
