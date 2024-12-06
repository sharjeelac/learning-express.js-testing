import express from "express"
const app = express()
const port = 3000

app.use(express.json())

let studentsData = [] //
let sid = 1 //


//add a new student
app.post('/about', (req, res)=>{ //
    const {name , age} = req.body //
    const newStudent = {id : sid++, name , age} // 
    studentsData.push(newStudent) // 
    res.status(200).send(newStudent) //
})

// list all students
app.get("/list", (req, res)=>{
    res.status(200).send(studentsData)
})


// fetch a student by ID
app.get("/list/:id", (req, res)=>{
    const student = studentsData.find(t => t.id === parseInt(req.params.id))
    if(!student){
       return res.status(404).send("Error 404 student not found!")
    } 
    res.status(200).send(student)
})

// Update student
app.put("/list/:id", (req, res)=>{
    const student = studentsData.find(t => t.id === parseInt(req.params.id))
    if(!student){
       return res.status(404).send("Error 404 student not found!")
    } 

    const {name, age} = req.body
    student.name = name
    student.age = age 
    res.status(200).send(student)
})

// delete Student
app.delete("/list/:id", (req, res)=>{
    const student = studentsData.findIndex(s => s.id === parseInt(req.params.id))
    if(student === -1){
        return res.status(404).send("Student not found")
    }
    studentsData.splice(student, 1)
    return res.status(204).send("Deleted")
})


// Start the server
app.listen(port, ()=>{
    console.log(`Server is listening at port ${port}...`)
})