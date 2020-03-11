import { createGlobalStyle } from 'styled-components';

import 'react-perfect-scrollbar/dist/css/styles.css';
import 'react-toastify/dist/ReactToastify.css';
import colors from './colors';

export default createGlobalStyle`
    @import url('https://fonts.googleapis.com/css?family=Roboto:400,700&display=swap');

    * {
        margin: 0px;
        padding: 0px;
        outline: 0;
        box-sizing: border-box;
    }

    *:focus {
        outline: 0;
    }

    html{
        height: 100%;
    }

    body, .root {
        min-height: 100vh;
    }


    body, input, button {
        font-family: 'Roboto', sans-serif;
        font-size: 14px;
    }

    a {
        text-decoration: none;
    }

    ul {
        list-style: none;
    }

    button {
        background-color: transparent;
        border: 1px solid transparent;
        cursor: pointer;
    }
`;
