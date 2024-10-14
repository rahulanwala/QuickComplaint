const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bcrypt = require('bcrypt'); // Add bcrypt
const User = require('./Models/User');
const Complaint = require('./Models/Complaint');

// MongoDB connection string (replace <password> with your actual password)
const mongoUrl = "mongodb+srv://electic:WrA3OaoKIne8ZS2a@cluster0.1otlv.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"

// Connect to MongoDB
mongoose.connect(mongoUrl)
  .then(() => {
    console.log('MongoDB connected successfully.');
  })
  .catch((err) => {
    console.error('MongoDB connection error:', err);
  });

const app = express();
app.use(express.json());
app.use(cors({
    credentials: true,
    origin: 'http://localhost:3000',  // Replace with your actual client URL if needed
}));

app.get('/test', (req, res) => {
    res.json('test ok');
});

app.post('/register', async (req, res) => {
    const { name, rollNumber, hall, phoneNumber, email, password, confirmPassword } = req.body;

    if (password !== confirmPassword) {
        return res.status(400).json({ message: 'Passwords do not match' });
    }

    try {
        // Check if the user already exists by rollNumber or email
        const existingUser = await User.findOne({ $or: [{ rollNumber }, { email }] });
        if (existingUser) {
            return res.status(400).json({ message: 'User with this Roll Number or Email already exists' });
        }

        // Hash the password before saving it
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create the new user with the hashed password
        const createdUser = await User.create({
            name,
            rollNumber,
            hall,
            phoneNumber,
            email,
            password: hashedPassword,  // Save the hashed password
        });

        res.status(201).json({
            id: createdUser._id,
            rollNumber: createdUser.rollNumber,
            email: createdUser.email,
        });
    } catch (err) {
        console.error('Error during registration:', err);
        res.status(500).json({ message: 'Server error' });
    }
});

app.post('/login', async (req, res) => {
    const { rollNumber, password } = req.body;

    try {
        // Find the user by rollNumber
        const user = await User.findOne({ rollNumber });

        if (!user) {
            return res.status(400).json({ message: 'Invalid roll number or password' });
        }

        // Compare the hashed password
        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (!isPasswordValid) {
            return res.status(400).json({ message: 'Invalid roll number or password' });
        }

        // If user is found and password is correct, respond with user details
        res.status(200).json({
            id: user._id,
            rollNumber: user.rollNumber,
            email: user.email,
        });
    } catch (err) {
        console.error('Error during login:', err);
        res.status(500).json({ message: 'Server error' });
    }
});

// Get all complaints
app.get('/complaints', async (req, res) => {
    try {
        const complaints = await Complaint.find();
        res.json(complaints);
    } catch (err) {
        console.error('Error fetching complaints:', err);
        res.status(500).json({ message: 'Server error' });
    }
});

// Add a new complaint
app.post('/complaints', async (req, res) => {
    const { text, userId } = req.body;

    try {
        const newComplaint = new Complaint({
            text,
            resolved: false, // Default status is pending
            userId, // Associate the complaint with the user
        });
        await newComplaint.save();
        res.status(201).json(newComplaint);
    } catch (err) {
        console.error('Error creating complaint:', err);
        res.status(500).json({ message: 'Server error' });
    }
});

// Update complaint status
app.put('/complaints/:id', async (req, res) => {
    try {
        const { resolved } = req.body;
        const complaint = await Complaint.findByIdAndUpdate(req.params.id, { resolved }, { new: true });

        if (!complaint) {
            return res.status(404).json({ message: 'Complaint not found' });
        }

        res.json(complaint);
    } catch (err) {
        console.error('Error updating complaint status:', err);
        res.status(500).json({ message: 'Server error' });
    }
});

app.listen(4040, () => {
    console.log('Server is running on http://127.0.0.1:4040');
});
