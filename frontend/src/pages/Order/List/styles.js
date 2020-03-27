import styled from 'styled-components';

export const PageContainer = styled.div`
    position: relative;
    height: 100%;

    .orderDeliveryer {
        display: flex;
        align-items: center;

        .deliveryer_avatar {
            display: flex;
            align-items: flex-start;
            justify-content: center;
            width: 35px;
            height: 35px;
            border-radius: 50%;
            overflow: hidden;
        }

        img {
            max-width: 100%;
        }

        .sb-avatar {
            border-radius: 50%;
            overflow: hidden;
        }

        > span {
            margin-left: 5px;
        }
    }

    .table_container {
        position: relative;
    }
`;
