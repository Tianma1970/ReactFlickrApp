import React from "react"

class Search extends React.Component {
  /*Fetch Flickr photos and
  dispatch handling */
  state = {
    searchText: "",
    errorMessage: ""
  }

  handleTextChange = e => this.setState({ searchText: e.target.value })

  fetchFlickrSearchResult = e => {
    e.preventDefault()
    if (!this.state.searchText) {
      this.setState({
        errorMessage: "You need to search for something"
      })
    }
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
          <div className="gallery-button__wrapper">{/* <button className="gallery-button" onClick={this.showGallery}>
              Show Gallery
            </button> */}</div>
        </div>

        <div className="message__container"></div>

        <div className="searchresults"></div>
      </>
    )
  }
}

export default Search
