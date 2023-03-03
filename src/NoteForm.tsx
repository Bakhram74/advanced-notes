import React from 'react';
import {Button, Col, Form, Row, Stack} from "react-bootstrap";
import CreatableReactSelect from "react-select/creatable";
import CreatableSelect from "react-select/creatable";


const NoteForm = () => {
    return (
        <Form>
            <Stack gap={4}>
            <Row>
                <Col>
            <Form.Group controlId="title">
                <Form.Label>Title</Form.Label>
                <Form.Control required/>
            </Form.Group>
                </Col>
                <Col>
                    <Form.Group controlId="tags">
                        <Form.Label>Tags</Form.Label>
                        <Form.Control required/>
                        <CreatableSelect isClearable isMulti/>
                    </Form.Group>
                </Col>
            </Row>
                <Form.Group controlId="markDown">
                    <Form.Label>Body</Form.Label>
                    <Form.Control required as={'textarea'} rows={15}/>
                </Form.Group>
                <Stack gap={2} direction={'horizontal'} className={'justify-content-end'} >
                    <Button variant={'primary'} type={'submit'}>Save</Button>
                    <Button variant={'outline-secondary'} type={'button'}>Cansel</Button>
                </Stack>
            </Stack>
            </Form>

    );
};

export default NoteForm;