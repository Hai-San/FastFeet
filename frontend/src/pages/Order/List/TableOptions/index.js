import React, { useState, useRef, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import { MdMoreHoriz, MdVisibility, MdCreate, MdDeleteForever } from 'react-icons/md';

import { OrderUpdateParams, OrderDeleteRequest } from '~/store/modules/order/actions';
import { OrderFloater, OrderFloaterBg } from './styles';
import { Container, TableOptionsList } from '~/styles/tableOptions';

function OrderMenu({ order }) {
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

    function handdleEdit() {
        dispatch(OrderUpdateParams(order));
    }

    async function handdleDelete() {
        if (window.confirm(`Você realmente quer deletar a encomenda ${order.product}?`)) {
            dispatch(OrderDeleteRequest(order.id));
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
                    <button
                        type="button"
                        className="tableOptions_list_button tableOptions_list_button--edit"
                        onClick={handdleEdit}>
                        <MdCreate size={18} />
                        <span>Editar</span>
                    </button>
                    <button
                        type="button"
                        className="tableOptions_list_button tableOptions_list_button--delete"
                        onClick={handdleDelete}>
                        <MdDeleteForever size={18} />
                        <span>Excluir</span>
                    </button>
                </TableOptionsList>
            </div>

            <OrderFloater visible={floaterStatus}>
                <OrderFloaterBg onClick={handdleToggleFloaterStatus} />
                <div className="orderData">
                    <div>
                        <h4>Informações da encomenda</h4>
                        <address>
                            {order.recipient.street}
                            <br />
                            {order.recipient.city} - {order.recipient.state}
                            <br />
                            {order.recipient.zip_code}
                        </address>
                    </div>
                    {(order.start_date || order.end_date || order.canceled_at) && (
                        <div className="dates">
                            <h4>Datas</h4>

                            {order.start_date && (
                                <div className="dateItem">
                                    <strong>Retirada:</strong>
                                    <span>{order.start_date_formated}</span>
                                </div>
                            )}

                            {order.end_date && (
                                <div className="dateItem">
                                    <strong>Entrega:</strong>
                                    <span>{order.end_date_formated}</span>
                                </div>
                            )}

                            {order.canceled_at && (
                                <div className="dateItem">
                                    <strong>Cancelamento:</strong>
                                    <span>{order.canceled_at_formated}</span>
                                </div>
                            )}
                        </div>
                    )}

                    {order.signature && (
                        <div className="signature">
                            <h4>Assinatura do destinatário</h4>
                            <div>
                                <img src={order.signature.url} alt={order.signature.path} />
                            </div>
                        </div>
                    )}
                </div>
            </OrderFloater>
        </Container>
    );
}

OrderMenu.propTypes = {
    order: PropTypes.objectOf(
        PropTypes.oneOfType([PropTypes.bool, PropTypes.number, PropTypes.string, PropTypes.object])
    ),
};

OrderMenu.defaultProps = {
    order: {},
};

export default OrderMenu;
