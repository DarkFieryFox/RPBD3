import {SchoolchildCollection, Schoolchilds} from "/imports/api/schoolchilds";
import {useTracker} from "meteor/react-meteor-data";
import {ProgressCollection} from "/imports/api/progresss/ProgresssCollection";
import {ParentCollection} from "/imports/api/parent/ParentCollection";
import React, {useState} from "react";
import { Mongo } from "meteor/mongo";
import {SchoolchildForm} from "/imports/ui/schoolchilds/SchoolchildsForm";
import {Property} from "/imports/ui/Propertyy";

interface Props {
    schoolchild: Schoolchilds
}

export const SchoolchildCard: React.FC<Props> = ({ schoolchild }) => {

    const progresssFromDb = useTracker(() => ProgressCollection.find({}).fetch())
    const parentFromDb = useTracker(() => ParentCollection.find({}).fetch())

    const [isEdit, setIsEdit] = useState(false)

    const onEdit = (newSchoolchild: Schoolchilds) => {
        SchoolchildCollection.update(schoolchild._id ?? new Mongo.ObjectID(''), newSchoolchild)
        setIsEdit(false)
    }

    const onDelete = () => {
        SchoolchildCollection.remove(schoolchild._id ?? new Mongo.ObjectID(''))
    }

    return (
        <div className="card schoolchild-card">
            {isEdit ?
                <SchoolchildForm schoolchild={schoolchild} onSubmit={onEdit} />
                :
                <div className="schoolchild-card__main">
                    <Property title="Имя:" value={schoolchild.name} />
                    <Property title="Фамилия:" value={schoolchild.surname} />
                    <Property title="Отчество:" value={schoolchild.patronymic} />
                    <Property title="Адрес:" value={schoolchild.address} />
                    <Property title="День рождения:" value={schoolchild.birthdate} />
                    <Property title="Год поступления:" value={schoolchild.year_admission} />
                    <Property title="Прогресс:" value={<span>{schoolchild.progresss.map((progresss, idx) => <span key={progresss._id.toHexString()} className="schoolchild-card__progresss">{progresssFromDb.find(m => m._id?.equals(progresss._id))?.classs} {progresssFromDb.find(m => m._id?.equals(progresss._id))?.subject} {progresssFromDb.find(m => m._id?.equals(progresss._id))?.year} {progresssFromDb.find(m => m._id?.equals(progresss._id))?.quarter} {progresssFromDb.find(m => m._id?.equals(progresss._id))?.half_yearly} {progresssFromDb.find(m => m._id?.equals(progresss._id))?.yearly} {progresssFromDb.find(m => m._id?.equals(progresss._id))?.exam} {progresssFromDb.find(m => m._id?.equals(progresss._id))?.finaly}{`${idx !== schoolchild.progresss.length - 1 ? ',' : ''} `}</span>)}</span>} />
                    <Property title="Родитель:" value={<span>{schoolchild.parent.map((parent, idx) => <span key={parent._id.toHexString()} className="schoolchild-card__parent">{parentFromDb.find(s => s._id?.equals(parent._id))?.surname} {parentFromDb.find(s => s._id?.equals(parent._id))?.name} {parentFromDb.find(s => s._id?.equals(parent._id))?.patronymic} {`${idx !== schoolchild.parent.length - 1 ? ',' : ''} `}</span>)  }</span>} />
                </div>
            }
            <div className="schoolchild-card__controls">

                <button className="button" onClick={() => setIsEdit(!isEdit)}>{isEdit ? 'Закрыть' : 'Редактировать'}</button>
                <button className="button button_red" onClick={onDelete}>Удалить</button>
            </div>
        </div>
    )
}