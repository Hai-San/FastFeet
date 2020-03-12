import styled from 'styled-components';
import colors from '~/styles/colors';

export const SignInPage = styled.main`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100vh;
    background-color: ${colors.purpleDark};
`;

export const Container = styled.div`
    display: flex;
    flex-direction: column;
    width: 360px;
    max-width: 100%;
    padding: 60px 30px;
    background-color: ${colors.white};
    border-radius: 4px;

    img {
        margin-bottom: 40px;
    }

    form {
        display: flex;
        flex-direction: column;
    }

    button {
        padding: 12px 15px;
        color: ${colors.white};
        background-color: ${colors.purpleDark};
        border: 1px solid ${colors.purpleDark};
        border-radius: 4px;
        font-size: 16px;
        font-weight: 700;
    }

    label {
        display: flex;
        flex-direction: column;
        margin-bottom: 15px;

        span {
            color: ${colors.gray44};
            font-size: 14px;
            font-weight: 700;
            text-transform: uppercase;
            margin-bottom: 9px;
        }

        input {
            padding: 12px 15px;
            background-color: ${colors.white};
            border: 1px solid ${colors.gray};
            border-radius: 4px;
            font-size: 16px;
            font-weight: 400;
            color: ${colors.gray99};

            &::placeholder {
                color: ${colors.gray99};
            }
        }
    }
`;
