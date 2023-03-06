import React, {FormEvent, useRef, useState} from 'react';
import {Button, Col, Form, Row, Stack} from "react-bootstrap";
import CreatableReactSelect from "react-select/creatable"
import {Link, useNavigate} from "react-router-dom";
import {NoteData, Tag} from "./App";
import { v4 } from 'uuid';

type NoteFormProps = {
    onSubmit: (data: NoteData) => void
    onAddTag:(tag:Tag)=>void
    availableTags:Tag[]
}

const NoteForm = ({onSubmit,onAddTag,availableTags}: NoteFormProps) => {
    const titleRef = useRef<HTMLInputElement>(null)
    const markdownRef = useRef<HTMLTextAreaElement>(null)
    const [selectedTags, setSelectedTag] = useState<Tag[]>([])
    const navigate = useNavigate()
    function submitHandler(e: FormEvent) {
        e.preventDefault()
        onSubmit({
            title: titleRef.current!.value,
            markdown: markdownRef.current!.value,
            tags: selectedTags,
        })

        navigate("..")
    }
    return (
        <Form onSubmit={submitHandler}>
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
                            <CreatableReactSelect isMulti
                                             value={selectedTags.map(tag => ({label: tag.label, id: tag.id}))}
                                             options={availableTags.map(tag=>({
                                                 label:tag.label,id:tag.id
                                             }))}
                                             onChange={tags => {
                                                 setSelectedTag(tags.map(tag => {
                                                         return {label: tag.label, id: tag.id}
                                                     })
                                                 )
                                             }}
                                             onCreateOption={label=>{
                                                 const newTag = {id:v4(),label}
                                                 onAddTag(newTag)
                                                 setSelectedTag(prev=>([...prev,newTag]))
                                             }}
                            />
                        </Form.Group>
                    </Col>
                </Row>
                <Form.Group controlId="markDown">
                    <Form.Label>Body</Form.Label>
                    <Form.Control required as={'textarea'} ref={markdownRef} rows={15}/>
                </Form.Group>
                <Stack gap={2} direction={'horizontal'} className={'justify-content-end'}>
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