import LinearGradient from 'react-native-linear-gradient';
import styled from 'styled-components';
import colors from '~/styles/colors';

export default styled(LinearGradient).attrs({
    start: { x: 0, y: 0 },
    end: { x: 0, y: 0.77 },
    locations: [0.3, 0, 1],
    colors: [colors.purple, colors.white, colors.white],
})`
    flex: 1;
`;
