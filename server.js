const express = require('express');

const app = express();

//test
app.get('/', (req, res) => res.send('API Running'));

//listen to app var on PORT or go to locahost5000
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));