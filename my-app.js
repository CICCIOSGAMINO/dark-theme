import { LitElement, html, css } from 'lit'

import './child-component'

export class MyApp extends LitElement {
  static get properties () {
    return {
      dark: {
        type: Boolean,
        reflect: true
      }
    }
  }

  static get styles () {
    return css`
      :host {
        display: block;
        margin: 2em;
        padding: 2em;
        background-color: var(--surface1);
      }

      #container {
        display: block;
        margin: 2em;
        padding: 1em;
        text-align: center;
        background-color: var(--surface2);
      }
    `
  }

  #checked (event) {
    this.dark = event.target.checked
    const eDark = new CustomEvent('dark', {
      bubbles: true,
      composed: true,
      detail: 'dark'
    })
    const eLight = new CustomEvent('light', {
      bubbles: true,
      composed: true,
      detail: 'light'
    })
    event.target.checked ? 
      this.dispatchEvent(eDark) :
      this.dispatchEvent(eLight)
  }

  render () {
    return html`
      <div id="container">
        <h1>${this.dark ? 'DARK' : 'LIGHT'} Theme</h1>
        <hr>
        <input
          id="dark_label"
          type="checkbox" 
          name="dark"
          @click=${this.#checked}
          .checked=${this.dark}>
        <label for="dark"> Dark / Light Theme</label><br>

        <child-component ?dark="${this.dark}"></child-component>
      </div>
    `
  }
}

customElements.define('my-app', MyApp)
