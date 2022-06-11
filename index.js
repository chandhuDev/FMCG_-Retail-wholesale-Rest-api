const app=require("./app")
const {PORT}=process.env
app.listen(PORT,()=>console.log(`started the server and listening at ${PORT}`))

