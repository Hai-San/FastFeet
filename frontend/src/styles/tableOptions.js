import styled from 'styled-components';
import colors from './colors';

export const Container = styled.div`
    display: flex;
    justify-content: flex-end;

    .tableOptions_block {
        position: relative;
        display: flex;
        align-items: center;
    }

    .tableOptions_button {
        position: relative;
        display: flex;
        align-items: center;
        background-color: transparent;
        border: 0px;
        cursor: pointer;

        svg {
            display: block;
            fill: ${colors.grayc6};
        }
    }
`;

export const TableOptionsList = styled.div`
    position: absolute;
    top: calc(100% + 15px);
    left: 50%;
    z-index: 10;
    display: ${props => (props.visible ? 'flex' : 'none')};
    flex-direction: column;
    min-width: 150px;
    padding: 15px 10px;
    border-radius: 7px;
    transform: translate(-50%, 0%);
    background-color: ${colors.white};
    box-shadow: 0 0px 4px rgba(0, 0, 0, 0.15);

    &::before {
        content: '';
        position: absolute;
        top: -2px;
        left: calc(50% - 2px);
        width: 0px;
        height: 0px;
        border: 4px solid transparent;
        border-color: transparent transparent ${colors.white} ${colors.white};

        transform-origin: 0 0;
        transform: rotate(135deg) translate(-50%, -100%);

        box-shadow: -3px 3px 4px 0px rgba(0, 0, 0, 0.12);
    }

    .tableOptions_list_button {
        display: flex;
        align-items: center;
        background-color: transparent;
        border: 0px;
        transition: opacity 250ms;

        &:hover {
            opacity: 0.8;
        }

        span {
            color: ${colors.gray99};
            font-size: 16px;
            font-weight: 400;
            margin-left: 8px;
            white-space: nowrap;
        }

        &:not(:last-child) {
            padding-bottom: 6px;
            margin-bottom: 6px;
            border-bottom: 1px solid ${colors.gray};
        }

        &[class*='view'] {
            svg {
                fill: ${colors.purpleDark};
            }
        }

        &[class*='edit'] {
            svg {
                fill: ${colors.blue};
            }
        }

        &[class*='delete'] {
            svg {
                fill: ${colors.red};
            }
        }
    }
`;
