import { useEffect } from 'react'

/**
 * @param {object} options - Boolean for open state of menu/container
 * @param {function} setOpen - function that flips the open Boolean
 * @param {[string]} containerId - pass the containerId so it doesn't close when user clicks inside it
 * @description - this function will register a click listener to the document to help you click away to close menus/containers
 **/
function useClickAway ({ reactAppId, clickable, open, setOpen }) {
  if (clickable.length < 1) throw Error('`clickable` property must contain at least one element id. Try passing an array of element ids to useClickAway({ clickable: [\'element1\', \'element2\'] })')
  if (clickable.some(e => e.contains('#'))) console.warn('Element ids in `clickable` array should not be prefixed with a `#` symbol.')

  function handleClick (e) {
    if (e && (e.path || e.composedPath())) {
      // Chrome uses e.path while Firefox uses e.composedPath
      const path = e.path || e.composedPath()
      // e.path returns an array of the elements in the path of the click
      for (let i = 0; i < path.length; i++) {
        // if the click is within the element with the containerId or toggleId, then let the click event continue
        if (clickable.includes(path[i].id)) {
          return
        }
      }
    }
    // Otherwise, the was outisde the dropdown then close the dropdown
    setOpen(false)
  }

  useEffect(() => {
    // Check to make sure document is defined
    if (document) {
    // Grab the main container for the app
      const mainContainer = document.querySelector(`#${reactAppId}`)
      // Make sure mainContainer is defined, or it throws an error in the test
      if (mainContainer) {
        open
          ? mainContainer.addEventListener('click', handleClick, false)
          : mainContainer.removeEventListener('click', handleClick, false)
      }
    }
    return () => {
      document
        .querySelector(`#${reactAppId}`)
        .removeEventListener('click', handleClick, false)
    }
  }, [open])
}

export default useClickAway
