import React, { useState } from 'react'
import { Property } from '/imports/ui/Propertyy'

import {Parent} from "/imports/api/parent/ParentCollection";

interface Props {
    Parent?: Parent
    onSubmit: (Parent: Parent) => void
}

export const ParentForm: React.FC<Props> = ({ Parent, onSubmit }) => {

    const [name, setName] = useState(Parent?.name ?? '')
    const [surname, setSurname] = useState(Parent?.surname ?? '')
    const [patronymic, setPatronymic] = useState(Parent?.patronymic ?? '')
    const [address, setAddress] = useState(Parent?.address ?? '')
    const [degree, setDegree] = useState(Parent?.degree ?? '')


    const onClick = () => {
        if (name === '') return
        onSubmit({
            name,
            surname,
            patronymic,
            address,
            degree
        })
        setName('')
        setSurname('')
        setPatronymic('')
        setAddress('')
        setDegree('')
    }

    return (
        <div className="Parent-form">
            <Property title="Имя:" value={<input type="text" value={name} onChange={e => setName(e.target.value)} />} />
            <Property title="Фамилия:" value={<input type="text" value={surname} onChange={e => setSurname(e.target.value)} />} />
            <Property title="Отчество:" value={<input type="text" value={patronymic} onChange={e => setPatronymic(e.target.value)} />} />
            <Property title="Адрес:" value={<input type="text" value={address} onChange={e => setAddress(e.target.value)} />} />
            <Property title="Степень родства:" value={<input type="text" value={degree} onChange={e => setDegree(e.target.value)} />} />
            <button className="button button_green" onClick={onClick}>Ок</button>
        </div>
    )
}