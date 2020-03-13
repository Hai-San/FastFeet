import React, { useRef, useState } from 'react';
import { Text, ActivityIndicator, Alert } from 'react-native';
import { RNCamera } from 'react-native-camera';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { StackActions } from '@react-navigation/native';

import api from '~/services/api';
import Background from '~/components/Background';
import colors from '~/styles/colors';

import { Container, CameraContainer, Camera, CaptureButton, SendButton, Picture } from './styles';

export default function OrderConfirm({ route, navigation }) {
    const { order, parentKey } = route.params;
    const cameraRef = useRef(null);
    const [file, setFile] = useState(null);
    const [loading, setLoading] = useState(false);

    async function handdleCapture() {
        if (cameraRef) {
            setLoading(true);

            const options = { quality: 0.5, base64: true };
            const data = await cameraRef.current.takePictureAsync(options);

            if (data) {
                setFile(data.uri);
            }

            setLoading(false);
        }
    }

    async function sendCapture() {
        try {
            setLoading(true);

            let data = new FormData();

            data.append('file', {
                uri: file,
                name: file.split('/').pop(),
                type: 'image/jpg',
            });

            const fileResponse = await api.post('files', data, {
                headers: { 'Content-Type': 'multipart/form-data' },
            });

            const orderResponse = await api.put(`deliveryer/order/${order.id}/end`, {
                signature_id: fileResponse.data.id,
            });

            setLoading(false);

            navigation.dispatch({
                ...StackActions.replace('OrderDetails', { order: orderResponse.data }),
                source: parentKey,
            });

            navigation.pop(1);
        } catch (error) {
            Alert.alert(
                'Ocorreu um problema ao finalizar a entrega',
                'Verifique com os administradores se esta entrega ainda esta disponivel ou atualize sua lista de entregas',
                [
                    {
                        text: 'Atualizar lista de entregas',
                        onPress: () => {
                            navigation.reset({
                                index: 0,
                                routes: [
                                    {
                                        name: 'OrdersList',
                                    },
                                ],
                            });
                        },
                    },
                ],
                { cancelable: false }
            );
        }
    }

    function handdleDeleteCapture() {
        setFile(null);
    }

    return (
        <Background>
            <Container>
                <CameraContainer>
                    <Camera
                        ref={cameraRef}
                        type={RNCamera.Constants.Type.back}
                        flashMode={RNCamera.Constants.FlashMode.on}
                        androidCameraPermissionOptions={{
                            title: 'Este aplicativo precisa utilizar a câmera',
                            message: 'Você deseja permitir que este aplicativo utilize a camêra?',
                            buttonPositive: 'Sim',
                            buttonNegative: 'Não',
                        }}
                        androidRecordAudioPermissionOptions={{
                            title: 'Este aplicativo precisa utilizar o áudio',
                            message: 'Você deseja permitir que este aplicativo acesse o áudio?',
                            buttonPositive: 'Sim',
                            buttonNegative: 'Não',
                        }}
                        onGoogleVisionBarcodesDetected={({ barcodes }) => {
                            console.log(barcodes);
                        }}
                        notAuthorizedView={<Text>O uso da camêra não foi autorizado.</Text>}
                        pendingAuthorizationView={<Text>A câmera precisa de autorização para funcionar</Text>}
                    />
                    {file ? (
                        <CaptureButton onPress={handdleDeleteCapture}>
                            <Icon name="close" size={26} color={colors.red} />
                        </CaptureButton>
                    ) : (
                        <CaptureButton onPress={handdleCapture} children="Enviar">
                            {loading ? (
                                <ActivityIndicator size="small" color={colors.white} />
                            ) : (
                                <Icon name="camera" size={26} color={colors.white} />
                            )}
                        </CaptureButton>
                    )}

                    <Picture
                        source={{
                            uri: file,
                        }}
                    />
                </CameraContainer>
                {file && <SendButton loading={loading} onPress={sendCapture} children="Enviar" />}
            </Container>
        </Background>
    );
}
