Dark Theme
==========
[TOC]

A dark theme is a low-light UI that displays mostly DARK surfaces. Thinking at when you at night switching between sreens with no light at all. This is a simple example to handle the attribute **dark** in the simple app build on top of LitElement to sync all the UI components that needs to change within dark / light theme.

 # is Supported
 Before start thinking to customize the view in dark mode for the user, check is the feture is supported from the browser they used to navigate to your Web content:

 ```javascript
 // Check if dark mode is supported by browser
if (window.matchMedia('(prefers-color-scheme)').media !== 'not all') {
  console.log('@DARK-MODE >> Supported 🎉')
}
 ```

 # DevTools (Chrome > 79)
To test the code to detect and customize the dark mode view in Google Chrome > 79 you need to toggle the CSS media query:

  prefers-color-scheme: dark
  prefers-color-scheme: light

to do that in Chrome (from v79):

  Open Command Control Ctrl + Shift + P 
  Type Show Rendering
  Set the Emulate CSS media feature prefers-color-scheme
 

# WebComponents WebApp and Lit
Building a component or complex app on top of LitElement means keep in mind the use of CustomElement, Template and Shadow DOM in a javascript coded element. In this easy post i'll show a simple web app shell based on MyApp LitElement component in charge of sync the dark property, used to style in light and dark mode the app element, the app's childs elements and the upper body parent.

When the dark mode is triggered by the media-query **prefers-color-scheme** an attribute is set to the main WebApp component and as a property descend the components tree to trigger the elements that need to know about the change. 

When the dark mode is triggered by the toggle button into the WebApp, the property dark is set and reflected to the attribute dark on the main WebApp element.

```javascript
export class MyApp extends LitElement {
  
  static get properties() {
    return {
      dark: {
        type: Boolean,
        reflect: true
      }
    }
  }

  constructor() {
    super()
    this.dark = false
  }
static get styles() {

    return css`

      /* handle the light / dark mode */ 
      :host:not([dark]) {
        --bk-color: #fff;
        --bk-second-color: #e0e0e0e;
      }
      :host([dark]) {
        --bk-color: #666;
        --bk-second-color: #004c8c;
      }

      :host {
        display: block;
        margin: 2em;
        padding: 2em;
        background-color: var(--bk-color, #fff);
      }

      #container {
        display: block;
        margin: 2em;
        padding: 1em;
        text-align: center;
        background-color: var(--bk-second-color, #e0e0e0);
      }
    `
  }

  _checked(event) {
    this.dark = event.target.checked
  }

  render() {
    return html`
      <div id="container">
        <h1>${this.dark ? 'DARK' : 'LIGHT'} Theme</h1>
        <hr>
        <input type="checkbox" id="dark_label" name="dark" @click="${this._checked}">
        <label for="dark"> Dark Theme</label><br>

        <child-component ?dark="${this.dark}"></child-component>
      </div>
    `
  }
``` 

This code reflect the dark property to the app custom element my-app, this attribute is handled in the index.html in case the parent body needs to use the dark property to set some CSS custom vars outside the my-app application shell:
```html
  <style>

    html {
      /* light and dark custom vars */
      --bk-color: #fff;
      --color: #222;
      
      --bk-color-dark: #222;
      --color-dark: whitesmoke;
    }

    body:not([dark]) {
      /* custom var and fallback value */ 
      background-color: var(--bk-color, #fff);
      color: var(--color, #222)
    }
    body[dark] {
      /* custom var and fallback value */ 
      background-color: var(--bk-color-dark, #121212);
      color: var(--color-dark, whitesmoke)
    }

    body  {
      margin: 0;
      font-family: Roboto, Helvetica, Arial, sans-serif;
      padding: 2em;
      text-align: center;
    }

  </style>
  
</head>

<body>
  
  <!-- LitElement with dark attribute -->
  <my-app></my-app>

  <!-- Import Js Module -->
  <script type="module" src="my-app.js"></script>

  <script>
    // propagate the attribute of app to body 
    const body = document.querySelector('body')
    const app = document.querySelector('my-app')
    const config = { attributes: true, childList: false, subtree: false };
    const callback = (mutationsList, observer) => {
      for(let mutation of mutationsList) {
        if (mutation.type === 'attributes' && mutation.attributeName === 'dark') {
            // console.log(`@DARK >> ${app.hasAttribute('dark')}`)
            app.hasAttribute('dark') ? 
              body.setAttribute('dark', '') :
              body.removeAttribute('dark')
        }
      }
    }

    const observer = new MutationObserver(callback)
    observer.observe(app, config)
  </script>

</body>
```

The dark property go down in the DOM tree to be shared inside all the child that needs the dark property to trigger some UI difference between light and dark theme:
```javascript
export class ChildComponent extends LitElement {

  static get properties() {
    return {
      dark: {
        type: Boolean,
        reflect: true
      }
    }
  }

  static get styles() {
    return css`

    /* handle the light / dark mode */ 
    :host:not([dark]) {
      --bk-color: #eee;
    }
    :host([dark]) {
      --bk-color: #0069c0;
    }

    :host {
      display: block;
    }
  
    div {
      width: 50%;
      height: 150px;
      margin-right: auto;
      margin-left: auto;
      margin-top: 1em;
      margin-bottom: 1em;
      padding: 2em;
      background-color: var(--bk-color, #fff);
    }
    `
  }

  render() {
    return html`
      <div>
        <h2>Child Component</h2>
      </div>
    `
  }
}

customElements.define('child-component', ChildComponent)
```



