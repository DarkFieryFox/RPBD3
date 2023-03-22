import { Mongo } from "meteor/mongo";
import React, {useState} from "react";
import {ParentForm} from "./ParentForm"
import {Property} from "/imports/ui/Propertyy";
import {Parent,ParentCollection} from "/imports/api/parent/ParentCollection";


interface Props {
    parent: Parent
}

export const ParentCard: React.FC<Props> = ({ parent }) => {

    const [isEdit, setIsEdit] = useState(false)

    const onEdit = (newParent: Parent) => {
        ParentCollection.update(parent._id ?? new Mongo.ObjectID(''), newParent)
        setIsEdit(false)
    }

    const onDelete = () => {
        ParentCollection.remove(parent._id ?? new Mongo.ObjectID(''))
    }

    return (
        <div className="card parent-card">
            {isEdit ?
                <ParentForm Parent={parent} onSubmit={onEdit} />
                :
                <div className="parent-card__main">

                    <Property title="Имя:" value={parent.name} />
                    <Property title="Фамилия:" value={parent.surname} />
                    <Property title="Отчество:" value={parent.patronymic} />
                    <Property title="Адрес:" value={parent.address} />
                    <Property title="Степень родства:" value={parent.degree} />


                </div>
            }
            <div className="parent-card__controls">
                <button className="button" onClick={() => setIsEdit(!isEdit)}>{isEdit ? 'Закрыть' : 'Редактировать'}</button>
                <button className="button button_red" onClick={onDelete}>Удалить</button>
            </div>
        </div>
    )
}