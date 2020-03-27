import styled from 'styled-components';
import colors from '~/styles/colors';

export const Container = styled.div`
    width: 900px;
    max-width: 100%;
    padding-top: 25px;
    margin: 0 auto;

    form {
        display: flex;
        flex-direction: column;

        label {
            display: flex;
            flex-direction: column;

            > span {
                font-size: 14px;
                font-weight: 700;
                color: ${colors.gray44};
                margin-bottom: 9px;
            }
        }

        input {
            padding: 12px 15px;
            background-color: ${colors.white};
            border: 1px solid ${colors.gray};
            border-radius: 4px;
            font-size: 16px;
            font-weight: 400;
            color: ${colors.gray99};
            transition: border 250ms;

            &::placeholder {
                color: ${colors.gray99};
            }

            &[type='number'] {
                -moz-appearance: textfield;

                &::-webkit-outer-spin-button,
                &::-webkit-inner-spin-button {
                    -webkit-appearance: none;
                }
            }

            &:focus {
                border-color: ${colors.gray66};
            }
        }

        .error {
            color: ${colors.red};
            font-size: 12.5px;
            font-weight: 700;
            margin-top: 5px;
            padding-left: 5px;
        }
    }

    .form_container {
        display: flex;
        flex-direction: column;
        padding: 32px 30px;
        border-radius: 4px;
        background-color: ${colors.white};
        position: relative;

        &[data-loading='true'] {
            opacity: 0.4;
        }
    }

    .form_container_row {
        display: flex;
        justify-content: space-between;

        &:not(:last-of-type) {
            margin-bottom: 16px;
        }

        &.center {
            justify-content: center;
        }
    }

    .large_label {
        width: 100%;
    }

    .medium_Label {
        width: calc(50% - 15px);
    }

    .medium_Label--big {
        width: calc(60% - 15px);
    }

    .small_label {
        width: calc(20% - 7.5px);
    }

    .small_label--big {
        width: calc(33% - 10px);
    }

    [class*='control'] {
        border: 1px solid ${colors.gray};
    }

    [class*='value-container'] {
        padding: 8px 15px;
    }

    [class*='placeholder'] {
        font-size: 16px;
        font-weight: 400;
        color: ${colors.gray99};
    }

    [class*='indicator-separator'] {
        display: none;
    }

    header {
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin-bottom: 35px;
    }

    h1 {
        color: ${colors.gray44};
        font-size: 24px;
        font-weight: 700;
    }

    .form_buttons {
        display: flex;
        align-items: center;
        justify-content: flex-end;

        .button {
            display: flex;
            align-items: center;
            justify-content: center;
            height: 36px;
            padding: 0px 15px;
            color: ${colors.white};
            border: 1px solid transparent;
            border-radius: 4px;
            transition: opacity 250ms;

            svg {
                fill: ${colors.white};
            }

            span {
                margin-left: 5px;
                font-size: 14px;
                font-weight: 700;
                text-transform: uppercase;
            }

            &:hover {
                opacity: 0.8;
            }
        }

        a.button {
            background-color: ${colors.grayc6};
            border-color: ${colors.grayc6};
        }

        button {
            &.button {
                background-color: ${colors.purpleDark};
                border-color: ${colors.purpleDark};
                margin-left: 16px;
            }

            &:disabled {
                &[type='submit'] {
                    background-color: ${colors.grayc6};
                    border-color: ${colors.grayc6};

                    svg {
                        animation: rotating 1.25s linear infinite;
                    }
                }

                @keyframes rotating {
                    from {
                        transform: rotate(0deg);
                    }
                    to {
                        transform: rotate(360deg);
                    }
                }
            }
        }
    }

    .avatar {
        position: relative;
        display: inline-block;

        .avatar_image {
            position: relative;
            display: flex;
            align-items: center;
            justify-content: center;
            width: 150px;
            height: 150px;
            border-radius: 50%;
            overflow: hidden;
            transition: opacity 250ms;
            cursor: pointer;

            &:hover {
                opacity: 0.7;
            }
        }

        .avatar_image_none {
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            width: 100%;
            height: 100%;
            border: 1px dashed ${colors.gray};
            border-radius: 50%;

            span {
                font-size: 16px;
                font-weight: 700;
                color: ${colors.gray};
            }
        }

        .avatar_image_preview {
            position: absolute;
            top: 50%;
            left: 50%;
            max-width: 100%;
            transform: translate(-50%, -50%);
        }

        .avatar_input {
            display: none;
        }

        .avatar_image_remove {
            position: absolute;
            top: -10px;
            right: -10px;
            z-index: 10;
            display: flex;
            align-items: center;

            svg {
                fill: ${colors.red};
            }
        }
    }
`;
