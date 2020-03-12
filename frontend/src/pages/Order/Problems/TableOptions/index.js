import React, { useState, useRef, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import { MdMoreHoriz, MdVisibility, MdDeleteForever } from 'react-icons/md';

import { OrderCancelRequest } from '~/store/modules/order/actions';
import { OrderFloater, OrderFloaterBg } from './styles';
import { Container, TableOptionsList } from '~/styles/tableOptions';

function TableOptions({ problem }) {
    const dispatch = useDispatch();
    const [visible, setVisible] = useState(false);
    const [floaterStatus, setFloaterStatus] = useState(false);
    const wrapperRef = useRef(null);

    function handdleToggleVisible() {
        setVisible(!visible);
    }

    function handdleToggleFloaterStatus() {
        setFloaterStatus(!floaterStatus);
    }

    function useOutsideOptionsClick(ref) {
        function handleClickOutside(event) {
            if (ref.current && !ref.current.contains(event.target) && visible) {
                handdleToggleVisible();
            }
        }

        useEffect(() => {
            function setOutsideClick() {
                document.addEventListener('mousedown', handleClickOutside);
            }
            setOutsideClick();
        });
    }

    useOutsideOptionsClick(wrapperRef);

    async function handdleCancel() {
        if (window.confirm(`Você realmente quer cancelar a encomenda ${problem.order.product}?`)) {
            dispatch(OrderCancelRequest(problem.id));
        }
    }

    return (
        <Container ref={wrapperRef}>
            <div className="tableOptions_block">
                <button
                    className="tableOptions_button"
                    type="button"
                    onClick={handdleToggleVisible}>
                    <MdMoreHoriz size={24} />
                </button>

                <TableOptionsList visible={visible}>
                    <button
                        type="button"
                        className="tableOptions_list_button tableOptions_list_button--view"
                        onClick={handdleToggleFloaterStatus}>
                        <MdVisibility size={18} />
                        <span>Visualizar</span>
                    </button>
                    {!problem.order.canceled_at && (
                        <button
                            type="button"
                            className="tableOptions_list_button tableOptions_list_button--delete"
                            onClick={handdleCancel}>
                            <MdDeleteForever size={18} />
                            <span>Cancelar encomenda</span>
                        </button>
                    )}
                </TableOptionsList>
            </div>

            <OrderFloater visible={floaterStatus}>
                <OrderFloaterBg onClick={handdleToggleFloaterStatus} />
                <div className="orderData">{problem.description}</div>
            </OrderFloater>
        </Container>
    );
}

TableOptions.propTypes = {
    problem: PropTypes.objectOf(
        PropTypes.oneOfType([PropTypes.bool, PropTypes.number, PropTypes.string, PropTypes.object])
    ),
};

TableOptions.defaultProps = {
    problem: {},
};

export default TableOptions;
