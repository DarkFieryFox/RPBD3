import { Mongo } from "meteor/mongo";
import React, {useState} from "react";
import {Progresss} from "/imports/api/progresss";
import {ProgressCollection} from "/imports/api/progresss/ProgresssCollection";
import {ProgresssForm} from "/imports/ui/progresss/ProgresssForm";
import {Property} from "/imports/ui/Propertyy";


interface Props {
    progresss: Progresss
}

export const ProgresssCard: React.FC<Props> = ({ progresss }) => {

    const [isEdit, setIsEdit] = useState(false)

    const onEdit = (newProgresss: Progresss) => {
        ProgressCollection.update(progresss._id ?? new Mongo.ObjectID(''), newProgresss)
        setIsEdit(false)
    }

    const onDelete = () => {
        ProgressCollection.remove(progresss._id ?? new Mongo.ObjectID(''))
    }

    return (
        <div className="card progresss-card">
            {isEdit ?
                <ProgresssForm progresss={progresss} onSubmit={onEdit} />
                :
                <div className="progresss-card__main">

                    <Property title="Класс:" value={progresss.classs} />
                    <Property title="Предмет:" value={progresss.subject} />
                    <Property title="Текущий год:" value={progresss.year} />
                    <Property title="Оценка за четверть:" value={progresss.quarter} />
                    <Property title="Оценка за полугодие:" value={progresss.half_yearly} />
                    <Property title="Годовая оценка:" value={progresss.yearly} />
                    <Property title="Оценка за экзамен:" value={progresss.exam} />
                    <Property title="Итоговая:" value={progresss.finaly} />
                </div>
            }
            <div className="progresss-card__controls">
                <button className="button" onClick={() => setIsEdit(!isEdit)}>{isEdit ? 'Закрыть' : 'Редактировать'}</button>
                <button className="button button_red" onClick={onDelete}>Удалить</button>
            </div>
        </div>
    )
}