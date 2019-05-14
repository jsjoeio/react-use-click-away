import { useEffect } from 'react'

function useClickAwayEffect ({ mainAppId, open, setOpen, containerId, toggleId = null }) {
  /**
   * @param {boolean} open - Boolean for open state of menu/container
   * @param {function} setOpen - function that flips the open Boolean
   * @param {string} containerId - pass the containerId so it doesn't close when user clicks inside it
   * @param {string} containerId - pass the toggleId so it doesn't affect the toggle click handler
   * @description - this function will register a click listener to the document to help you click away to close menus/containers
   */

  function handleClose (e) {
    if (e && (e.path || e.composedPath())) {
      // Chrome uses .e.path while Firefox uses composedPath
      const path = e.path || e.composedPath()
      // e.path returns an array of the elements in the path of the click
      for (let i = 0; i < path.length; i++) {
        // if dropdown-container was one or toggleId, exit handleClose and carry on
        if (path[i].id === containerId || path[i].id === toggleId) {
          return true
        }
      }
    }
    // Otherwise, it was outisde the dropdown, close the dropdown
    setOpen(false)
  }
  useEffect(() => {
    // Check to make sure document is defined
    if (document) {
    // Grab the main container for the app
      const mainContainer = document.querySelector(mainAppId)
      // Make sure mainContainer is defined, or it throws an error in the test
      if (mainContainer) {
        if (open) {
          mainContainer.addEventListener('click', handleClose, false)
        } else {
          mainContainer.removeEventListener('click', handleClose, false)
        }
      }
    }
    return () => {
      document.querySelector(mainAppId).removeEventListener('click', handleClose, false)
    }
  }, [open])
}

export default useClickAwayEffect
