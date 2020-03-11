import styled from 'styled-components/native';
import { RNCamera } from 'react-native-camera';
import { RectButton } from 'react-native-gesture-handler';
import Button from '~/components/Form/Button';
import colors from '~/styles/colors';

export const Container = styled.SafeAreaView`
    flex: 1;
    justify-content: center;
    padding: 68px 20px 0px;
`;

export const CameraContainer = styled.View`
    position: relative;
    flex: 1;
    overflow: hidden;
    border-radius: 4px;
    align-items: center;
    margin-bottom: 10px;
`;

export const Camera = styled(RNCamera)`
    width: 100%;
    height: 100%;
`;

export const Picture = styled.Image`
    position: absolute;
    top: 0;
    left: 0;
    z-index: 10;
    width: 100%;
    height: 100%;
`;

export const CaptureButton = styled(RectButton)`
    position: absolute;
    bottom: 22px;
    z-index: 15;
    margin: 0 auto;
    align-items: center;
    justify-content: center;
    width: 61px;
    height: 61px;
    border-radius: 32px;
    background-color: rgba(0, 0, 0, 0.3);
`;

export const SendButton = styled(Button)`
    margin-bottom: 10px;
    background: ${colors.purple};
    height: 45px;
`;
