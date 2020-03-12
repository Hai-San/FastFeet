import styled from 'styled-components';
import colors from '~/styles/colors';

export const Container = styled.div`
    width: 1200px;
    max-width: 100%;
    padding-top: 25px;
    margin: 0 auto;

    h1 {
        color: ${colors.gray44};
        font-size: 24px;
        font-weight: 700;
        margin-bottom: 35px;
    }

    .page_header {
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin-bottom: 20px;

        form {
            position: relative;
            width: 237px;
            max-width: 100%;

            svg {
                position: absolute;
                top: 50%;
                left: 14px;
                fill: ${colors.gray99};
                transform: translate(0%, -50%);
            }
        }

        input {
            width: 100%;
            height: 36px;
            padding: 0px 15px 0px 40px;
            background-color: ${colors.white};
            border: 1px solid ${colors.gray};
            border-radius: 4px;
            font-size: 14px;
            font-weight: 400;
            color: ${colors.gray44};
            transition: border 250ms;

            &::placeholder {
                color: ${colors.gray99};
            }

            &:focus {
                border-color: ${colors.gray66};
            }
        }

        a {
            display: flex;
            align-items: center;
            justify-content: center;
            height: 36px;
            padding: 0px 15px;
            color: ${colors.white};
            background-color: ${colors.purpleDark};
            border: 1px solid ${colors.purpleDark};
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
                opacity: 0.85;
            }
        }
    }

    .rc-pagination-item {
        background-color: ${colors.white};
        border: 1px solid ${colors.grayc6};
        border-radius: 4px;

        a {
            color: ${colors.black};
        }
    }

    .rc-pagination-item-active {
        background-color: ${colors.blue};
        border: 1px solid ${colors.blue};

        a {
            color: ${colors.white};
        }
    }

    .rc-pagination-next,
    .rc-pagination-prev {
        border-radius: 4px;
    }
`;

export const Table = styled.table`
    width: 100%;
    border-collapse: separate;
    border-spacing: 0px;

    thead th {
        color: #999;
        text-align: left;
        padding: 12px;
        font-size: 16px;
        font-weight: 700;
        color: ${colors.gray44};

        &:last-of-type {
            text-align: right;
        }
    }

    tbody tr {
        min-height: 56px;
        background-color: ${colors.white};
    }

    tbody td {
        padding: 12px;
        font-size: 16px;
        font-weight: 400;
        color: ${colors.gray66};
        border-bottom: 20px solid ${colors.grayf5};

        &:first-of-type {
            border-top-left-radius: 4px;
            border-bottom-left-radius: 4px;
        }

        &:last-of-type {
            border-top-right-radius: 4px;
            border-bottom-right-radius: 4px;
        }

        .description {
            max-width: 95%;
        }
    }
`;
