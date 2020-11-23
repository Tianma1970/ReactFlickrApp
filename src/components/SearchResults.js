/*
 * Search result.
 * Handles searching flickr for photos and
 * displaying and selecting photos.
 */
class SearchResult {
  constructor(helpers, message, lStorage) {
    // Dependencies
    this.helpers = helpers
    this.message = message
    this.lStorage = lStorage

    // Vars
    this.flickrSearchURL = "https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=b54580f369a7eeebecb2004dc429d08f&format=json&nojsoncallback=1"

    // Find some elements.
    this.searchInputTextEl = document.querySelector(".searchfield__input")
    this.searchButtonEl = document.querySelector(".searchfield__submit-button")
    this.searchResultsEl = document.querySelector(".searchresults")

    // Add event listeners.
    this.searchInputTextEl.addEventListener("keydown", e => {
      if (e.keyCode === 13) this.fetchFlickrSearchResult(e)
    })
    this.searchButtonEl.addEventListener("click", e => this.fetchFlickrSearchResult(e))

    // Init
    this.searchInputTextEl.focus()
  }

  /*
   * Fetch flickr photos and dispath handling
   * of the response.
   */
  fetchFlickrSearchResult(e) {
    e.preventDefault()

    // Show message if no search text was given.
    if (!this.searchInputTextEl.value) {
      this.message.displayMessage("You need to search for something...")
      return
    }

    // Build url to fetch from with the text from search input field.
    const searchUrl = `${this.flickrSearchURL}&text=${this.searchInputTextEl.value}`

    // Do fetch and handle response...
    fetch(searchUrl)
      .then(response => {
        return response.json()
      })
      .then(json => {
        this.displayFlickrSearchResult(json)
      })
      .catch(error => {
        console.log("Oops! Something went wrong...")
        console.log(error)
      })
  }

  /*
   * Build HTML from the response from flickr and
   * insert it into the DOM.
   */
  displayFlickrSearchResult(imagesJson) {
    // Remove previous search result and any message.
    const oldList = this.searchResultsEl.querySelector(".searchresults__list")
    if (oldList) this.searchResultsEl.removeChild(oldList)
    this.message.hideMessage()

    // Show message if search did not find anything.
    if (!imagesJson.photos || !imagesJson.photos.photo || imagesJson.photos.photo.length === 0) {
      this.message.displayMessage("No search results found...")
      return
    }

    // Loop through images json and return list of images.
    const imageHtmlListItems = imagesJson.photos.photo.reduce((prev, image, i) => {
      const srcUrl = this.getImageUrl(image.farm, image.server, image.id, image.secret)
      return `${prev}<li><img src=${srcUrl} alt='flickr-img-${i}'/></li>`
    }, "")

    // Insert images list into DOM wrapped in <ul>.
    const imageHtmlList = `<ul class='searchresults__list'>${imageHtmlListItems}</ul>`
    this.searchResultsEl.insertAdjacentHTML("beforeend", imageHtmlList)

    // Add click event listeners to all images (or actually the wrapping <li>).
    Array.from(this.searchResultsEl.querySelectorAll("img")).forEach(img => img.addEventListener("click", e => this.toggleImageSelected(e)))
  }

  /*
   * Toggles the select state of an image and
   * updates the array of selected image urls.
   * The url array is then persisted in localStorage.
   */
  toggleImageSelected(e) {
    // Toggle .selected class on the <li>
    const isLiSelected = this.helpers.closest(e.target, "li").classList.toggle("selected")

    // Add or remove from localStorage.
    if (isLiSelected) {
      this.lStorage.add(e.target.src)
    } else {
      this.lStorage.remove(e.target.src)
    }
  }

  /*
   * Builds a url to an flickr image from the data
   * received when fetching search results.
   */
  getImageUrl(farmId, serverId, id, secret) {
    return `https://farm${farmId}.staticflickr.com/${serverId}/${id}_${secret}_m.jpg`
  }
}
