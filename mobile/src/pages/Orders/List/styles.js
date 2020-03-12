import styled from 'styled-components/native';

import colors from '~/styles/colors';

export const Container = styled.SafeAreaView`
    flex: 1;
    height: 100%;
    background-color: ${colors.white};
`;

export const Deliveryer = styled.View`
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    padding: 20px;
`;

export const Avatar = styled.Image`
    width: 68px;
    height: 68px;
    border-radius: 34px;
`;

export const ViewButton = styled.View`
    flex: 2;
    align-items: flex-start;
    margin-left: 12px;
`;

export const Title = styled.Text`
    font-size: 12px;
    font-weight: 400;
    color: ${colors.gray66};
`;

export const Name = styled.Text`
    font-size: 22px;
    font-weight: 700;
    color: ${colors.gray44};
`;

export const ListHeader = styled.View`
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    padding: 0px 20px 10px;
`;

export const ListTitle = styled.Text`
    font-size: 22px;
    font-weight: 700;
    color: ${colors.gray44};
`;

export const List = styled.FlatList.attrs({
    showsVerticalScrollIndicator: false,
    numColumns: 1,
})`
    flex-grow: 1;
    flex: 1;
    padding: 0px 20px;
`;

export const Empty = styled.Text`
    font-size: 18px;
    font-weight: 700;
    text-align: center;
    color: ${colors.purple};
    margin-top: 100px;
`;
