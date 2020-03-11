import styled from 'styled-components/native';
import colors from '~/styles/colors';

export const Container = styled.SafeAreaView`
    flex: 1;
    justify-content: flex-start;
    padding: 68px 20px 0px;
`;

export const Title = styled.Text`
    font-size: 18px;
    font-weight: 700;
    text-align: center;
    color: ${colors.white};
    margin-bottom: 15px;
`;

export const List = styled.FlatList.attrs({
    showsVerticalScrollIndicator: false,
    numColumns: 1,
})``;

export const Empty = styled.Text`
    font-size: 18px;
    font-weight: 700;
    text-align: center;
    color: ${colors.purple};
    margin-top: 100px;
`;
