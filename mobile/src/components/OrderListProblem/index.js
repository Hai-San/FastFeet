import React, { useState, useMemo } from 'react';
import { format, parseISO } from 'date-fns';
import Modal from 'react-native-modal';

import {
    Container,
    OpenModal,
    Excerpt,
    Date,
    ModalBox,
    Description,
    CloseModal,
    CloseModal2,
    CloseModalText,
} from './styles';

export default function OrderListProblem({ data: problem }) {
    const createdAtFormated = useMemo(() => {
        return format(parseISO(problem.createdAt), 'dd/MM/y');
    }, [problem.createdAt]);

    const [visible, setVisible] = useState(false);

    function toggleModal() {
        setVisible(!visible);
    }

    return (
        <Container>
            <OpenModal onPress={toggleModal}>
                <Excerpt numberOfLines={1}>{problem.description}</Excerpt>
                <Date>{createdAtFormated}</Date>
            </OpenModal>

            <Modal
                isVisible={visible}
                swipeDirection="up"
                useNativeDriver={true}
                onBackdropPress={() => toggleModal()}
                onSwipeComplete={() => toggleModal()}>
                <ModalBox>
                    <Description>{problem.description}</Description>
                </ModalBox>
            </Modal>
        </Container>
    );
}
