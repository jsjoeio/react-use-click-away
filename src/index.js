import { useEffect } from 'react'

/**
 * Registers a click listener to the document to help you click away to close dropdowns/containers
 * @module react-use-click-away
 * @param {object} options - The options object expects the following properties
 * @property {string} reactAppId - the id of the react app (i.e. 'root')
 * @property {array} clickable - an array of element ids which can be clicked which won't close the menus/containers
 **/
export default function useClickAway ({ reactAppId, clickable, open, setOpen }) {
  // Check if they passed options object
  if (arguments.length < 1) {
    console.error('Oops! Looks like you forgot to pass the options object to `useClickAway`.')
    return
  }

  // If they passed the objects object
  if (arguments[0]) {
    const expectedProps = ['open', 'setOpen', 'reactAppId', 'clickable']
    // Check for all props
    for (let prop of expectedProps) {
      if (!arguments[0].hasOwnProperty(prop)) {
        console.error(`The options object is missing the ${prop} property.`)
      }
    }
  }

  // Check the clickable prop
  if (clickable.length < 1) {
    throw Error('`clickable` property must contain at least one element id. Try passing an array of element ids to useClickAway({ clickable: [\'element1\', \'element2\'] })')
  }

  // Check for # symbol
  if (reactAppId.includes('#')) console.error('`reactAppId` should not be prefixed with a `#` symbol.')
  if (clickable.some(e => e.includes('#'))) console.error('Element ids in `clickable` array should not be prefixed with a `#` symbol.')

  function handleClick (e) {
    if (e && (e.path || e.composedPath())) {
      // Chrome uses e.path while Firefox uses e.composedPath
      const path = e.path || e.composedPath()
      // e.path returns an array of the elements in the path of the click
      for (let i = 0; i < path.length; i++) {
        // If the elements within the click path have any clickable elements, then let the click event continue
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
