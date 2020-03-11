import styled from 'styled-components';
import colors from '~/styles/colors';

export const Container = styled.div`
    display: flex;
    justify-content: center;
    background-color: ${colors.white};

    header {
        display: flex;
        align-items: center;
        justify-content: space-between;
        width: 1440px;
        max-width: 100%;
        padding: 14px 30px;
    }

    .header_left {
        display: flex;
        align-items: center;

        img {
            max-height: 26px;
        }

        nav {
            margin-left: 30px;
            padding: 6px 0px 6px 30px;
            border-left: 1px solid ${colors.gray};
        }

        a {
            color: ${colors.gray99};
            font-size: 15px;
            font-weight: 700;
            text-transform: uppercase;
            transition: color 250ms;

            &:not(:last-of-type) {
                margin-right: 20px;
            }

            &:hover,
            &.active {
                color: ${colors.gray44};
            }
        }
    }

    .header_right {
        display: flex;
        flex-direction: column;
        align-items: flex-end;

        strong {
            color: ${colors.gray44};
            font-size: 14px;
        }

        button {
            background-color: transparent;
            border: 0px;
            color: ${colors.red};
            font-size: 14px;
            font-weight: 400;
            transition: opacity 250ms;

            &:hover {
                opacity: 0.85;
            }
        }
    }
`;
