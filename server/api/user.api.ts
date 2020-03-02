import { Router } from 'express'
import { RequestHandler, Updating, Document } from '../types'
import UserHandler from '../handlers/user.handler'
import { User } from '../models/user.model'
import { FilterQuery } from 'mongodb'

const user = Router()
const handler = new UserHandler()

//=====  USER MIDDLEWARE FUNCTIONS  =====//

/* CREATE */
const insert: RequestHandler<User, null> = async (req, res) => {
    await handler.insert(req.body)
    res.status(204).json(null)
}

/* READ */
const findById: RequestHandler<Document, User> = async (req, res) => {
    const user = await handler.findById(req.body.id)
    res.status(200).json(user)
}

/* UPDATE */
const update: RequestHandler<Updating<User>, null> = async (req, res) => {
    await handler.update(req.body)
    res.status(204).json(null)
} 

/* DELETE */
const remove: RequestHandler<Document, null> = async (req, res) => {
    await handler.remove(req.body.id)
    res.status(204).json(null)
}

/* FIND */
const find: RequestHandler<FilterQuery<User>, User[]> = async (req, res) => {
    console.log('find - body', req.body)
    const users = await handler.find(req.body)
    res.status(200).json(users)
}

// REST - CRUD (+F)
user.post('/', insert)
user.get('/', findById)
user.put('/', update)
user.delete('/', remove)
user.get('/find', find) // Query based

// user.post('/login', login) // Like this?
// user.post('/register', register)

// validation of req body???


export default user