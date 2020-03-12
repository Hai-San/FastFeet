import React, { useState, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import { MdMoreHoriz, MdVisibility, MdCreate, MdDeleteForever } from 'react-icons/md';
import { Container, TableOptionsList } from '~/styles/tableOptions';

function TableOptions({ fcView, fcEdit, fcDelete }) {
    const [visible, setVisible] = useState(false);
    const wrapperRef = useRef(null);

    function handdleToggleVisible() {
        setVisible(!visible);
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
                    {typeof fcView == 'function' ? (
                        <button
                            type="button"
                            className="tableOptions_list_button tableOptions_list_button--view"
                            onClick={fcView}>
                            <MdVisibility size={18} />
                            <span>Visualizar</span>
                        </button>
                    ) : null}

                    {typeof fcEdit == 'function' ? (
                        <button
                            type="button"
                            className="tableOptions_list_button tableOptions_list_button--edit"
                            onClick={fcEdit}>
                            <MdCreate size={18} />
                            <span>Editar</span>
                        </button>
                    ) : null}

                    {typeof fcDelete == 'function' ? (
                        <button
                            type="button"
                            className="tableOptions_list_button tableOptions_list_button--delete"
                            onClick={fcDelete}>
                            <MdDeleteForever size={18} />
                            <span>Excluir</span>
                        </button>
                    ) : null}
                </TableOptionsList>
            </div>
        </Container>
    );
}

TableOptions.propTypes = {
    tableItem: PropTypes.objectOf(
        PropTypes.oneOfType([PropTypes.bool, PropTypes.number, PropTypes.string, PropTypes.object])
    ),
};

TableOptions.defaultProps = {
    tableItem: {},
};

export default TableOptions;
