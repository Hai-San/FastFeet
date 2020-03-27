import React from 'react';
import { AiOutlineLoading3Quarters } from 'react-icons/ai';

import { Container } from './styles';

export default function Loading({ loading }) {
    return (
        <Container>
            <div className="loadingScreen" data-loading={loading}>
                <AiOutlineLoading3Quarters size={45} />
            </div>
        </Container>
    );
}
