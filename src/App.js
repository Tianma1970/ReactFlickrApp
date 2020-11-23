import React from "react"

import Search from "./components/Search"
import Gallery from "./components/Gallery"

import "./App.css"

class App extends React.Component {
  render() {
    return (
      <>
        <Search />
        <Gallery />
      </>
    )
  }
}

export default App
