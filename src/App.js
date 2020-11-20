import React from "react"

import Search from "./components/Search"
import "./App.css"
import axios from "axios"

class App extends React.Component {
  state = {
    images: []
  }
  showImages() {
    axios.get("https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=b54580f369a7eeebecb2004dc429d08f&format=json&nojsoncallback=1&text=aik").then(res => {
      this.setState({ images: res.data })
    })
  }
  render() {
    return <Search />
  }
}

export default App
