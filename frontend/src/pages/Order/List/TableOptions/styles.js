import styled from 'styled-components';
import colors from '~/styles/colors';

export const OrderFloater = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    z-index: 100;
    width: 100%;
    height: 100%;
    display: ${props => (props.visible ? 'block' : 'none')};

    .orderData {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        width: 450px;
        max-width: 100%;
        min-height: 150px;
        padding: 25px;
        border-radius: 4px;
        background-color: ${colors.white};

        > div {
            &:not(:last-of-type) {
                padding-bottom: 12px;
                margin-bottom: 12px;
                border-bottom: 1px solid ${colors.grayee};
            }
        }

        h4 {
            display: block;
            font-size: 14px;
            color: ${colors.gray44};
            margin-bottom: 6px;
        }

        address {
            font-size: 16px;
            color: ${colors.gray66};
            font-weight: 400;
            line-height: 1.6;
            font-style: normal;
        }

        .dates {
            .dateItem {
                &:not(:last-of-type) {
                    margin-bottom: 6px;
                }
            }

            strong {
                font-size: 16px;
                color: ${colors.gray66};
                font-weight: 700;
            }

            span {
                font-size: 16px;
                color: ${colors.gray66};
                font-weight: 400;
                margin-left: 5px;
            }
        }

        .signature {
            > div {
                display: flex;
                align-items: center;
                justify-content: center;
                margin-top: 10px;
            }

            img {
                max-width: 100%;
            }
        }
    }
`;

export const OrderFloaterBg = styled.div`
    float: left;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.7);
`;
