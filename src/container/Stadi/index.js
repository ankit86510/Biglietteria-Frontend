import Layout from '../../componenti/Layout'
import React, { useEffect, useState } from 'react'
import { Container, Row, Col, Button } from 'react-bootstrap'
import { useSelector, useDispatch } from 'react-redux';
import {addStadio } from '../../azioni';
import Input from '../../componenti/UI/input';
import DateTimePicker from 'react-datetime-picker';
import Modal from '../../componenti/UI/Modal'

/**
* @author
* @function Stadi
**/

const Stadi = (props) => {

    const [nome, setNomeStadio] = useState('');
    const [citta, setCitta] = useState('');
    const [regione, setRegione] = useState('');
    const [totalePostiStadio, settotalePostiStadio] = useState('');
    const [descrizione, setDescrizoine] = useState('');
    const [ImmagineStadio, setImmagineStadio] = useState('');
    const [show, setShow] = useState(false);
    const [modalShow, setModalShow] = useState(false);

    const dispatch = useDispatch();


    const handelClose = () => {
        const form = new FormData();
        form.append('nome', nome);
        form.append('citta', citta);
        form.append('regione', regione);
        form.append('totalePostiStadio', totalePostiStadio);
        form.append('descrizione', descrizione);
        form.append('ImmagineStadio', ImmagineStadio);
        dispatch(addStadio(form));

        setModalShow(false);
    }


    return (
        <>
            <Layout sidebar>
                <Button variant="primary" onClick={() => setModalShow(true)}>
                    Aggiungi
                </Button>
                <Modal
                    handelClose={handelClose}
                    onHide={() => setModalShow(false)}
                    show={modalShow}
                    modalTitle="Aggiungi nuovo Stadio"
                >
                    <Row>
                        <Col sm={6} >
                            <Input
                                placeholder={"Nome Stadio"}
                                value={nome}
                                type="text"
                                onChange={(e) => setNomeStadio(e.target.value)}
                            />
                        </Col>

                        <Col sm={6} >
                            <Input
                                placeholder={"Citta"}
                                value={citta}
                                type="text"
                                onChange={(e) => setCitta(e.target.value)}
                            />

                        </Col>
                    </Row>
                    <Input
                        value={regione}
                        onChange={(e) => setRegione(e.target.value)}
                        placeholder={"Regione"}
                        type="text"
                    />
                    <Input
                        type="text"
                        pattern="[0-9]*"
                        placeholder={"Posti totali Stadio"}
                        value={totalePostiStadio}
                        onChange={(e) =>
                            settotalePostiStadio((v) => (e.target.validity.valid ? e.target.value : v))}
                    />
                    <Input
                        placeholder={"Descrione..."}
                        value={descrizione}
                        type="text"
                        onChange={(e) => setDescrizoine(e.target.value)}
                    />
                    <input type="file" name="ImmagineStadio" onChange={(e) => setImmagineStadio(e.target.files[0])} />
            </Modal>
        </Layout>
        </>
    )

}
export default Stadi