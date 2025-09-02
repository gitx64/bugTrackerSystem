import Bug from '../models/bug.model.js';

// desc => create a new bug

const createBug = async(req,res) => {
  const { title, description, severity, status, priority, assignedTo, createdBy } = req.body;
  
  if(!title || !description || !severity || !status || !priority || !assignedTo || !createdBy) {
    return res.status(400).json({ message: 'All fields are required' });
  }
  
  const newBug = new Bug({
    title,
    description,
    severity,
    status,
    priority,
    assignedTo,
    createdBy,
  })
  
  await newBug.save();
  
  res.status(201).json({ message: 'Bug created successfully', bug: newBug });
    
}

// 