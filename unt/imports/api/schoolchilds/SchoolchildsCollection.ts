
import {Mongo} from "meteor/mongo"

export interface Schoolchilds {
    _id?: Mongo.ObjectID

    name: string
    surname: string
    patronymic: string
    address: string
    birthdate: string
    year_admission: number

    progresss: {
        _id: Mongo.ObjectID
    }[]
    parent: {
        _id: Mongo.ObjectID
    }[]
}

export const SchoolchildCollection = new Mongo.Collection<Schoolchilds>('schoolchild', {idGeneration: 'MONGO'})
