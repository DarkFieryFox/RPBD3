import {Schoolchilds} from "/imports/api/schoolchilds";
import {useTracker} from "meteor/react-meteor-data";
import {ProgressCollection} from "/imports/api/progresss/ProgresssCollection";
import {ParentCollection} from "/imports/api/parent/ParentCollection";
import {useState} from "react";
import {Mongo} from "meteor/mongo";
import {Property} from "/imports/ui/Propertyy";
import React from "react";

interface Props {
    schoolchild?: Schoolchilds
    onSubmit: (schoolchild: Schoolchilds) => void
}

export const SchoolchildForm: React.FC<Props> = ({schoolchild, onSubmit}) => {

    const progresssFromDb = useTracker(() => ProgressCollection.find({}).fetch())
    const parentFromDb = useTracker(() => ParentCollection.find({}).fetch())

    const [name, setName] = useState(schoolchild?.name ?? '')
    const [surname, setSurname] = useState(schoolchild?.surname ?? '')
    const [patronymic, setPatronymic] = useState(schoolchild?.patronymic ?? '')
    const [address, setAddress] = useState(schoolchild?.address ?? '')
    const [birthdate, setBirthdate] = useState(schoolchild?.birthdate ?? '')
    const [year_admission, setYear_admission] = useState<number>(schoolchild?.year_admission ?? 0)
    const [progresss, setProgresss] = useState<string[]>(progresssFromDb.filter(m => (schoolchild?.progresss.findIndex(mm => mm._id.equals(m._id ?? new Mongo.ObjectID)) ?? -1) !== -1).map(m => m._id?.toHexString() ?? '') ?? [])
    const [parents, setParent] = useState<string[]>(parentFromDb.filter(s => (schoolchild?.parent.findIndex(ms => ms._id.equals(s._id ?? new Mongo.ObjectID)) ?? -1) !== -1).map(s => s._id?.toHexString() ?? '') ?? [])


    const onClick = () => {
        onSubmit({
            name,
            surname,
            patronymic,
            address,
            birthdate,
            year_admission,
            progresss: progresss.map(m => ({_id: new Mongo.ObjectID(m)})),
            parent: parents.map(s => ({_id: new Mongo.ObjectID(s)}))
        })
        setName('')
        setSurname('')
        setPatronymic('')
        setAddress('')
        setBirthdate('')
        setYear_admission(0)
        setProgresss([])
        setParent([])
    }

    return (
        <div className="schoolchild-form">
            <Property title="Имя:" value={<input type="text" value={name} onChange={e => setName(e.target.value)} />} />
            <Property title="Фамилия:" value={<input type="text" value={surname} onChange={e => setSurname(e.target.value)} />} />
            <Property title="Отчество:" value={<input type="text" value={patronymic} onChange={e => setPatronymic(e.target.value)} />} />
            <Property title="Адрес:" value={<input type="text" value={address} onChange={e => setAddress(e.target.value)} />} />
            <Property title="Дата рождения:" value={<input type="text" value={birthdate} onChange={e => setBirthdate(e.target.value)} />} />
            <Property title="Год поступления:" value={<input type="text" value={year_admission} onChange={e => setYear_admission(Number(e.target.value))} />} />

            <Property title="Прогресс:">
                <select multiple value={progresss}
                        onChange={e => setProgresss(Array.from(e.target.selectedOptions, option => option.value))}>
                    {progresssFromDb.map(m => <option key={m._id?.toHexString()}
                                                      value={m._id?.toHexString()}>{m.classs} {m.subject} {m.year} {m.quarter} {m.yearly} {m.half_yearly} {m.exam} {m.finaly}</option>)}
                </select>
            </Property>
            <Property title="Родитель:">
                <select multiple value={parents}
                        onChange={e => setParent(Array.from(e.target.selectedOptions, option => option.value))}>
                    {parentFromDb.map(s => <option key={s._id?.toHexString()}
                                                   value={s._id?.toHexString()}>{s.surname} {s.name} {s.patronymic}</option>)}
                </select>
            </Property>
            <button className="button button_green" onClick={onClick}>Ок</button>
        </div>
    )
}