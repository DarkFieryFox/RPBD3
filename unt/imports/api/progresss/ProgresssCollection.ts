import { Mongo } from 'meteor/mongo'

export interface Progresss {
    _id?: Mongo.ObjectID
    classs: string
    subject: string
    year:number
    quarter: number
    half_yearly: number
    yearly: number
    exam: number
    finaly: number

}

export const ProgressCollection = new Mongo.Collection<Progresss>('progresss', { idGeneration: 'MONGO' })