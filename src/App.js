import React from "react"

import Search from "./components/Search"
import Gallery from "./components/Gallery"
import SearchResult from "./components/SearchResult"
import "./App.css"

class App extends React.Component {
  state = {
    images: []
  }

  setImages = fetchedImages => {
    this.setState({
      images: fetchedImages
    })
  }
  render() {
    return (
      <>
        <Search setImages={this.setImages} />

        <Gallery />
        <SearchResult displayImages={this.state.images} />
      </>
    )
  }
}

export default App
