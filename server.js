// server.js
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const app = express();
const PORT = process.env.PORT || 3000;

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/button-counter', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

// Define a schema for the count
const countSchema = new mongoose.Schema({
    count: { type: Number, default: 0 }
});

const Count = mongoose.model('Count', countSchema);

// Middleware
app.use(bodyParser.json());

// Routes
app.get('/getCount', async (req, res) => {
    try {
        const count = await Count.findOne();
        res.json({ count: count ? count.count : 0 });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

app.post('/incrementCount', async (req, res) => {
    try {
        let count = await Count.findOne();
        if (!count) {
            count = new Count();
        }
        count.count++;
        await count.save();
        res.status(200).send();
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
