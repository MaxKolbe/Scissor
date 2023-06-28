const app = require("./server")
require("dotenv").config()

if (process.env.NODE_ENV !== 'test') {
    const port = process.env.PORT; 
    app.listen(port, () => {
      console.log(`Server is listening on port ${port}`);
    });
}  

module.exports = app;  