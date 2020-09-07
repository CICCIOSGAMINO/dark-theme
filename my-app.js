import { LitElement, html, css } from 'lit-element'

import './child-component'

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

}

customElements.define('my-app', MyApp)
