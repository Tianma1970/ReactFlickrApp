/*
 * Local Storage.
 * Handles persisting gallery image data.
 */
class LocalStorage {
  constructor(helpers) {
    this.helpers = helpers
  }

  /*
   * Adds an image to the stored array.
   */
  add(imageSrc) {
    const currentGallery = this.get()

    // Add image to storage unless it's already in there.
    if (!currentGallery.includes(imageSrc)) {
      const updatedGallery = [...currentGallery, imageSrc]
      this.set(updatedGallery)
    }
  }

  /*
   * Removes an image from the stored array.
   */
  remove(imageSrc) {
    const currentGallery = this.get()

    // Remove image from storage if it is in there.
    const index = currentGallery.indexOf(imageSrc)
    if (index > -1) {
      currentGallery.splice(index, 1)
      this.set(currentGallery)
    }
  }

  /*
   * Sets an array of images as the new stored array.
   */
  set(galleryArray) {
    localStorage.flickrGallery = JSON.stringify(galleryArray)
  }

  /*
   * Gets the stored array.
   */
  get() {
    return this.helpers.tryParseJson(localStorage.flickrGallery, [])
  }
}

export default LocalStorage
