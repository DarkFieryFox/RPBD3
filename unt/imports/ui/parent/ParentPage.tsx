import {useTracker} from "meteor/react-meteor-data";
import {Parent,ParentCollection} from "/imports/api/parent/ParentCollection";
import {useState} from "react";
import {ParentForm} from "./ParentForm";
import {ParentCard} from "/imports/ui/parent/ParentCard";
import React from "react";

export const ParentPage: React.FC = () => {
    const parents = useTracker(() => ParentCollection.find({}, {sort: {name: 1}}).fetch())
    const [addFormShow, setAddFormShow] = useState(false)

    const onAddSubmit = (parent: Parent) => {
        console.log(parent)
        ParentCollection.insert(parent)
        setAddFormShow(false)
    }

    return (
        <div className="parent-page">
            <div className="card">
                <button className="button" onClick={() => setAddFormShow(!addFormShow)}>{`${addFormShow ? 'Закрыть' : 'Добавить'}`}</button>
                {addFormShow &&
                <ParentForm onSubmit={onAddSubmit} />
                }
            </div>
            <div>
                {parents.map(a => <ParentCard key={a._id?.toHexString()} parent={a} />)}
            </div>
        </div>
    )
}