const express = require('express')
const authRouter = require('./routes/auth')
const app = express()
const cors = require('cors')
const port = 7777

app.use(express.json())
app.use(cors());
app.use('/api/users',authRouter)
    
app.listen(port, () => {
    console.log(`Server app listening on port ${port}`)
})