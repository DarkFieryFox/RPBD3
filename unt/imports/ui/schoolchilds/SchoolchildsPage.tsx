import React, {useState} from "react";
import {useTracker} from "meteor/react-meteor-data";
import {SchoolchildCollection, Schoolchilds} from "/imports/api/schoolchilds";
import {SchoolchildForm} from "./SchoolchildsForm";
import {SchoolchildCard} from "./SchoolchildsCard";

export const SchoolchildPage: React.FC = () => {
    const schoolchilds = useTracker(() => SchoolchildCollection.find({}, {sort: {name: 1}}).fetch())

    const [addFormShow, setAddFormShow] = useState(false)

    const onAddSubmit = (schoolchild: Schoolchilds) => {
        console.log(schoolchild)
        SchoolchildCollection.insert(schoolchild)
        setAddFormShow(false)
    }

    return (
        <div className="schoolchild-page">
            <div className="card">
                <button className="button" onClick={() => setAddFormShow(!addFormShow)}>{`${addFormShow ? 'Закрыть' : 'Добавить'}`}</button>
                {addFormShow &&
                <SchoolchildForm onSubmit={onAddSubmit} />
                }
            </div>
            <div>
                {schoolchilds.map(schoolchild => <SchoolchildCard key={schoolchild._id?.toHexString()} schoolchild={schoolchild} />)}
            </div>
        </div>
    )
}