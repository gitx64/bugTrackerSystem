import express from 'express';
import Bug from '../models/bug.model.js';

const router = express.Router();

//POST /api/bugs/create create a new bug

router.post('/create', async(req,res) => {
  try {
    const { title, description, severity, status, priority, assignedTo, createdBy } = req.body;
    
    const bug = await Bug.findOne({title})
    if(bug)
      return res.status(400).json({ error: 'Bug already exists' });
    
    const newBug = new Bug({
      title,
      description,
      severity,
      status,
      priority,
      assignedTo,
      createdBy
    });
    await newBug.save();
    res.status(201).json({ message: 'Bug created successfully', newBug });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

//GET /api/bugs get all bugs
router.get('/', async(req,res) => {
  try {
    const bugs = await Bug.find();
    res.status(200).json({ bugs });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

//GET /api/bugs/:id get a bug by id
router.get('/:id', async (req,res) => {
  try {
    const bug = await Bug.findById(req.params.id);
    if(!bug)
      return res.status(404).json({ error: 'Bug not found' });
    res.status(200).json({ bug });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});


//DELETE /api/bugs/:id delete a bug by id
router.delete('/:id', async(req,res) => {
  try {
    const bug = await Bug.findByIdAndDelete(req.params.id);
    if(!bug)
      return res.status(404).json({ error: 'Bug not found' });
    res.status(200).json({ message: 'Bug deleted successfully', bug });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

//PUT /api/bugs/:id update a bug by id
router.put('/:id', async(req,res) => {
  try {
    const { title, description, severity, status, priority, assignedTo, createdBy } = req.body;
    
    const bug = await Bug.findById(req.params.id);
    if(!bug)
      return res.status(404).json({ error: 'Bug not found' });
    
    bug.title = title || bug.title;
    bug.description = description || bug.description;
    bug.severity = severity || bug.severity;
    bug.status = status || bug.status;
    bug.priority = priority || bug.priority;
    bug.assignedTo = assignedTo || bug.assignedTo;
    bug.createdBy = createdBy || bug.createdBy;
    
    await bug.save();
    res.status(200).json({ message: 'Bug updated successfully', bug });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

export default router;