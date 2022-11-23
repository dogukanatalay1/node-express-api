import express, { raw } from 'express'
import { v4 as uuidv4 } from 'uuid';

const router = express.Router()

const users = [
  {
    firstName: "Dogus",
    lastName: "Haliloglu",
    age: 21
  },
  {
    firstName: "Ertugrul",
    lastName: "Atalay", 
    age: 20
  },
  {
    firstName: "Yavuz",
    lastName: "Bilgic",
    age: 29
  }                                               
]

// all routes here starting with /users (take a look at index.js)
router.get('/', (req, res)=> {

  res.send(users)
})

router.post('/', (req,res)=> {

  const user = req.body

  const userWithId = {...user, id: uuidv4()}

  users.push(userWithId)

  res.send(`User ${userWithId.firstName} added!`)
})

// - /users/2  => req.params  {id: 2}
router.get('/:id', (req,res)=> {
  const { id } = req.params

  const foundUser = users.find((user)=> user.id == id)
  
  res.send(foundUser)
})

router.delete('/:id', (req,res)=> {
  const { id } = req.params

  users = users.filter((user)=> user.id != id)

  res.send(`User with id: ${id} deleted!`)
})

router.patch('/:id', (req,res)=> {
  const { id } = req.params
  const { firstName, lastName, age } = req.body

  const user = users.find((user)=> user.id == id)

  if(firstName) user.firstName = firstName
  if(lastName) user.lastName = lastName
  if(age) user.age = age
  
  res.send(`User with id: ${id} is updated!`)
})

export default router
