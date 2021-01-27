import { html, LitElement } from 'lit-element';
import { wcNameStyles } from './buttons-language-style';

/**
 * `buttons-language`
 * ButtonsLanguage
 *
 * @customElement buttons-language
 * @litElement
 * @demo demo/index.html
 */

export class ButtonsLanguage extends LitElement {
  static get is() {
    return 'buttons-language';
  }

  static get styles() {
    return [ wcNameStyles ];
  }

  static get properties() {
    return {
      languages: { 
        type: Array,
        converter: { 
          fromAttribute: (value, type) => { 
            return value.split(',');
          },
          toAttribute: (value, type) => { 
            return value.join(',');
          }
        }
      },
      languageSelected: { 
        type: String, 
        attribute: 'language-selected'
      },
      path: {
        type: String
      }
    };
  }

  constructor() {
    super();
    this.languages = [];
    this.languageSelected = '';
    this.path = '/';
    this.urlGroups = {};
  }

  connectedCallback() {
    super.connectedCallback();
    const urlRegex = /^(?<protocol>http[s]?:\/\/)?(?<server>[^:\/\s]+)(:(?<port>[^\/]*))?(?<path>(\/\w+\.)*([^#?\s]+))(\?(?<query>([^#]*)))?(#(?<hash>(.*)))?$/gi;
    const pageRegex = /\/(?<page>\w*\.\w*$)/gi;
    const url = location.href;
    const urlObj = urlRegex.exec(url);
    this.urlGroups = urlObj.groups;
    this.urlGroups.page = undefined;
    const path = this.urlGroups.path;
    const pathParts = path.split('/');
    const pathTMP = pageRegex.exec(path);
    if (pathTMP && pathTMP.groups.page) {
      this.urlGroups.page = pathTMP.groups.page;
      pathParts.pop();
    }
    console.log(this.urlGroups);

    let pathPartsEnd = pathParts.length - 1;
    if (pathParts[pathPartsEnd] === '') {
      pathParts.pop();
      pathPartsEnd -= 1;
    }
    if (this.languageSelected === "path") {
      if (pathParts.length >= 1 && this.languages.includes(pathParts[pathPartsEnd])) {
        this.languageSelected = pathParts[pathPartsEnd];
        pathParts.pop();
        this.path = pathParts.join('/');
        console.log(this.languageSelected, this.path);
      }
    }
  }

  toggleLanguageClick(language) {
    if (this.languages.includes(language)) {
      const page = (this.urlGroups.page) ? this.urlGroups.page : '';
      const query = (this.urlGroups.query) ? `?${this.urlGroups.query}` : ''
      const hash = (this.urlGroups.hash) ? `#${this.urlGroups.hash}` : '';
      document.location = `${this.path}/${language}/${page}${query}${hash}`;
      this.languageSelected = language;
    }
  }

  keyPressChangelanguage(language, event) {
    const codeKey = event.keyCode;
    if (codeKey === 13) {
      this.toggleLanguageClick(language);
    }
  }

  render() {
    if (this.languages) {
      return html`
        <div class="button-language_container" part="container">
          <div class="button-language_box" part="lang-box">
            ${this.languages.map((language) => html`
              <label class="label" tabindex="0" @keydown="${(event) => this.keyPressChangelanguage(language, event)}">
                <button 
                  class="button-language ${this.languageSelected === language ? 'button-language--click' : ''}"
                  ?disabled="${this.languageSelected === language}" 
                  @click="${() => this.toggleLanguageClick(language)}"
                > 
                  ${language}
                </button>
              </label>
            `)}
          </div>
        </div>
      `;
    }
    return html``;
  }
}