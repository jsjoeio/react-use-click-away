<h1 align="center">react-use-click-away</h1>

<br />
<p align="center">
  <a href="https://www.joypixels.com/emoji/1f5b1">
    <img src="https://raw.githubusercontent.com/jsjoeio/react-use-click-away/master/mouse.png" alt="Logo" width="128" height="128">
  </a>

  <p align="center">
    a custom React effect for clicking away to close dropdowns
    <br />
    <a href="https://github.com/othneildrew/Best-README-Template"><strong>Explore the docs »</strong></a>
    <br />
    <br />
    <a href="https://codesandbox.io/s/reactuseclickaway-q3zng?fontsize=14">View Demo</a>
    ·
    <a href="https://github.com/othneildrew/Best-README-Template/issues">Report Bug</a>
    ·
    <a href="https://github.com/othneildrew/Best-README-Template/issues">Request Feature</a>
  </p>
</p>

<div align="center">
  <img alt="npm version" src="https://img.shields.io/npm/v/react-use-click-away.svg" />
  <img slt="npm downloads" src="https://img.shields.io/npm/dm/react-use-click-away.svg"/>
  <a href="https://github.com/jsjoeio/react-use-click-away/graphs/contributors/">
    <img alt="number of contributors." src="https://img.shields.io/github/contributors/jsjoeio/react-use-click-away.svg" />
  </a>
  <img alt="license." src="https://img.shields.io/github/license/jsjoeio/react-use-click-away.svg" />
</div>

<hr>

<!-- TABLE OF CONTENTS -->
## Table of Contents

* [The Problem](#the-problem)
* [The Solution](#the-solution)
* [Example](#example)
* [Installation](#installation)
* [Contributors](#contributors)
* [License](#license)
* [Acknowledgements](#acknowledgements)


## The Problem

In modern web applications, it is difficult to build a dropdown or other container that closes when you click away.

## The Solution

`react-use-click-away` is a custom React effect which allows you to easily close your dropdowns and other containers when clicking away.

Similar to `useEffect`, you call it within a Hook component and it will help you hide and show your components based on where you click within your app.

### Example
Using it in your application might look something like this:

```javascript
import React, { useState } from "react"
import useClickAway from "react-use-click-away"

function NavBar () {
  const [open, setOpen] = useState(false)

  useClickAway({
    open,
    setOpen,
    reactAppId: "my-react-app",
    clickable: ["navbar"]
  })

  return (
    <nav id='navbar'>
      <span id='toggle' onClick={() => setOpen(!open)}>Menu</span>
        <div className={`inner-menu ${open ? "active" : ""}`}>
          <ul className="nav-list">
            <li>Page 1</li>
            <li>Page 2</li>
          </ul>
        </div>
    </nav>
  )
}

export default NavBar
```

You call `useClickAway` inside your function component and pass it an object with the following properties:
- `open`: the state value for the dropdown or container (boolean)
- `setOpen`: the corresponding hook which updates `open` (function)
- `reactAppId`: the id on the div that wraps your entire app (string)
- `clickable`: the elements that are clickable (i.e. clicking them won't close the dropdown or container) (array of strings)

## Installation

You can install it using either of the following:
```bash
# Using npm
npm install --save react-use-click-away

# Using yarn
yarn add --save react-use-click-away
```

## Contributors

Thanks goes to these wonderful people ([emoji key](https://allcontributors.org/docs/en/emoji-key)):
<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
<!-- prettier-ignore -->
<table><tr><td align="center"><a href="http://tadscritchfield.com"><img src="https://avatars0.githubusercontent.com/u/11529600?v=4" width="100px;" alt="Tad Scritchfield"/><br /><sub><b>Tad Scritchfield</b></sub></a><br /><a href="https://github.com/jsjoeio/react-use-click-away/commits?author=tscritch" title="Code">💻</a> <a href="#ideas-tscritch" title="Ideas, Planning, & Feedback">🤔</a> <a href="#review-tscritch" title="Reviewed Pull Requests">👀</a></td><td align="center"><a href="https://joeprevite.com/"><img src="https://avatars3.githubusercontent.com/u/3806031?v=4" width="100px;" alt="JavaScript Joe"/><br /><sub><b>JavaScript Joe</b></sub></a><br /><a href="https://github.com/jsjoeio/react-use-click-away/commits?author=jsjoeio" title="Code">💻</a> <a href="#ideas-jsjoeio" title="Ideas, Planning, & Feedback">🤔</a> <a href="https://github.com/jsjoeio/react-use-click-away/commits?author=jsjoeio" title="Documentation">📖</a> <a href="#example-jsjoeio" title="Examples">💡</a></td></tr></table>

## License

Distributed under the MIT License. See `LICENSE` for more information.

## Acknowledgements
* [Digital Air Strike](https://digitalairstrike.com/)
* [Img Shields](https://shields.io)
* [@othneildrew's README template](https://github.com/othneildrew/Best-README-Template)
* [All Contributors](https://allcontributors.org/)
