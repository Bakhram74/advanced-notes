import React, {createRef, FormEvent, MouseEventHandler, useRef, useState} from 'react';
import {Button, Col, Form, Row, Stack} from "react-bootstrap";
import CreatableReactSelect from "react-select/creatable";
import CreatableSelect from "react-select/creatable";
import {Link} from "react-router-dom";
import {NoteData, Tag} from "./App";

type NoteFormProps = {
    onSubmit:(data:NoteData)=>void
}

const NoteForm = ({onSubmit}:NoteFormProps) => {
    const titleRef = useRef<HTMLInputElement>(null)
    const markDownRef = useRef<HTMLTextAreaElement>(null)
    const [selectedTag,setSelectedTag] = useState<Tag[]>([])
    const submitHandler=(e:FormEvent)=>{
e.preventDefault()
        onSubmit({
            title:titleRef.current!.value,
            markdown:markDownRef.current!.value,
            tags:[]
        })
    }
    return (
        <Form onClick={submitHandler}>
            <Stack gap={4}>
            <Row>
                <Col>
            <Form.Group controlId="title">
                <Form.Label>Title</Form.Label>
                <Form.Control required ref={titleRef}/>
            </Form.Group>
                </Col>
                <Col>
                    <Form.Group controlId="tags">
                        <Form.Label>Tags</Form.Label>
                        <CreatableSelect isClearable isMulti
                        value={selectedTag.map(tag=> ({label:tag.label, id:tag.id}))}
                                         onChange={tags=>{setSelectedTag(tags.map(tag=>{
                                             return {label:tag.label,id:tag.id}
                                             })
                                         )}}
                        />
                    </Form.Group>
                </Col>
            </Row>
                <Form.Group controlId="markDown">
                    <Form.Label>Body</Form.Label>
                    <Form.Control required as={'textarea'} ref={markDownRef} rows={15}/>
                </Form.Group>
                <Stack gap={2} direction={'horizontal'} className={'justify-content-end'} >
                    <Button variant={'primary'} type={'submit'}>Save</Button>
                    <Link to={'..'}>
                        <Button variant={'outline-secondary'} type={'button'}>Cansel</Button>
                    </Link>
                </Stack>
            </Stack>
            </Form>

    );
};

export default NoteForm;