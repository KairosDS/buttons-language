import { css } from 'lit-element';

export const wcNameStyles = css`
  :host {
    --background-color: #000;
    --background-color-selected: #000;
    --color-selected: #fff;
  }
  .button-language_container {
    margin: 0 auto;
    width: inherit;
  }

  .button-language_box {
    display: flex;
  }
  .button-language_box:first-child {
    margin-left: 35px;
  }

  .button-language {
    background-color: #F5F6FA;
    display: flex;
    font-size: 12px;
    font-weight: 300;
    line-height: 16px;
    cursor: pointer;
    color: #4D4D4E;
    padding: 5px 10px;
    margin: 0 15px 0 0;
    outline:none;
    border:none;
  }

  .button-language--click {
    cursor: not-allowed; 
    font-weight: 800;
    background-color: var(--background-color-selected, #fff);
    color: var(--color-selected, #000);
  }


  @media all and (min-width: 1024px) {
    .button-language_container {
      margin: 0;
      padding: 0;
    }
    .button-language_box:first-child {
      margin-left: 5px;
    }      

    .button-language_box {
      display: flex;
      justify-content: space-evenly;
      padding: 0;
    }
    .button-language {
      font-size: 14px;
      padding: 5px;
      margin: 0px 7px 0px 0px;
    }
  }
  @media all and (min-width: 1280px) {
    .button-language_box:first-child {
      margin-left: 35px;
    } 
    .button-language {
      padding: 5px 10px;
      margin: 0 15px 0 0;
    }
  }
`;
