// import express from 'express';
// import bodyParser from 'body-parser';
// import path from 'path';
// import apiRoutes from './routes';

// const cors = require('cors');

// // Setup Express
// const app = express();
// app.use(cors());
// const port = process.env.PORT || 5000;

// // Setup body-parser
// app.use(bodyParser.json({ extended: false }));

// // Setup our routes. These will be served as first priority.
// // Any request to /api will go through these routes.
// app.use('/api', apiRoutes);

// // Make the "public" folder available statically
// app.use(express.static(path.join(__dirname, 'public')));

// // Start the server running. Once the server is running, the given function will be called, which will
// // log a simple message to the server console. Any console.log() statements in your node.js code
// // can be seen in the terminal window used to run the server.
// app.listen(port, () => console.log(`App server listening on port ${port}!`));

// export default app;
