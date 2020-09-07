import { LitElement, html, css } from 'lit-element'

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
