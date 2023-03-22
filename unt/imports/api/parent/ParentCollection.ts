import {Mongo} from "meteor/mongo";

export interface Parent {
    _id?: Mongo.ObjectID
    name: string
    surname: string
    patronymic: string
    address: string
    degree: string

}

export const ParentCollection = new Mongo.Collection<Parent>('parent', {idGeneration: 'MONGO'})