import {useCallback, useEffect} from "react";

export interface UseClickAwayProps {
  reactAppId?: string;
  clickableElementIds: string[];
  isActive: boolean;
  setIsActive: (value: boolean) => void;
}

/**
 * Registers a click listener to the document to help you click away to close dropdowns/containers
 * @module react-use-click-away
 * @param {object} options - The options object expects the following properties
 * @property {string} reactAppId - the id of the react app (default = 'root')
 * @property {array} clickableElementIds - an array of element ids which can be clicked which won't close the menus/containers
 * @property {boolean} isActive - value to determine if the click away listener is active
 * @property {function} setIsActive - function to set the isActive value
 **/
const useClickAway = ({reactAppId = "root", clickableElementIds, isActive, setIsActive}: UseClickAwayProps) => {
  const handleClick = useCallback(
    (e: any) => {
      if (e && (e.path || e.composedPath())) {
        // Chrome uses e.path while Firefox uses e.composedPath
        const path = e.path || e.composedPath();
        // e.path returns an array of the elements in the path of the click
        for (let i = 0; i < path.length; i++) {
          // If the elements within the click path have any clickable elements, then let the click event continue
          if (clickableElementIds.includes(path[i].id)) {
            return;
          }
        }
      }
      // Otherwise, the was outisde the dropdown then close the dropdown
      setIsActive(false);
    },
    [clickableElementIds, setIsActive]
  );

  useEffect(() => {
    // Grab the main container for the app
    const mainContainer = document.querySelector(`#${reactAppId}`);
    // Make sure mainContainer is defined, or it throws an error in the test
    if (mainContainer) {
      isActive
        ? mainContainer.addEventListener("click", handleClick, false)
        : mainContainer.removeEventListener("click", handleClick, false);
    }
    return () => {
      document?.querySelector(`#${reactAppId}`)?.removeEventListener("click", handleClick, false);
    };
  }, [isActive, handleClick, reactAppId]);
};

export default useClickAway;
