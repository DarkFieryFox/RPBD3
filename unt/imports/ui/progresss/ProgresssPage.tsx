import {useTracker} from "meteor/react-meteor-data";
import React, {useState} from "react";
import {Progresss, ProgressCollection} from "/imports/api/progresss/ProgresssCollection";
import {ProgresssForm} from "/imports/ui/progresss/ProgresssForm";
import {ProgresssCard} from "/imports/ui/progresss/ProgresssCard";

export const ProgresssPage: React.FC = () => {
    const progresssMap = useTracker(() => ProgressCollection.find({}, {sort: {classs: 1}}).fetch())

    const [addFormShow, setAddFormShow] = useState(false)

    const onAddSubmit = (progresss: Progresss) => {
        console.log(progresss)
        ProgressCollection.insert(progresss)
        setAddFormShow(false)
    }

    return (
        <div className="progressspage">
            <div className="card">
                <button className="button" onClick={() => setAddFormShow(!addFormShow)}>{`${addFormShow ? 'Закрыть' : 'Добавить'}`}</button>
                {addFormShow &&
                <ProgresssForm onSubmit={onAddSubmit} />
                }
            </div>
            <div>
                {progresssMap.map(a => <ProgresssCard key={a._id?.toHexString()} progresss={a} />)}
            </div>
        </div>
    )
}