const projectSchema = require('../models/projectModels');

exports.getProject = async(req, res) => {
    try {
        const project = await projectSchema.find();
        res.json(project);

    } catch (err) {
        res.status(500).json({msg: err})
    }
}


exports.addProject = async (req, res) => {
    try {
        console.log("REQ BODY", req.body);  // TEMP LOGGING
        const {product_id, title, description, image} = req.body;

        if (!product_id || !title || !description || !image) {
            return res.status(400).json({ msg: 'All fields are required' });
        }

        const newProject = new projectSchema({
            product_id,
            title, 
            description, 
            image
        });
        await newProject.save();
        res.json({msg: 'Project Added!'});
    } catch (err) {
        console.error('Add Project Error:', err);
        res.status(500).json({msg: 'Internal Server Error'});
    }
};


exports.getProjectById = async (req, res) => {
try {
    const project = await projectSchema.findById(req.params.id);
    res.json(project);
} catch (err) {
    res.status(500).json({msg: err});
}

}

exports.updateProject = async(req, res) => {
    const { title, product_id, description, image} = req.body;
    try {
        const updateProject = await projectSchema.findByIdAndUpdate(req.params.id, {
            title,
            product_id,
            description,
            image
        });
        await updateProject.save();
        res.json({msg: 'Project Updated!'})
    } catch (err) {
        res.status(500).json({msg: err});
    }

}

exports.deleteProject = async(req, res) => {
    try {
        const project = await projectSchema.findByIdAndDelete(req.params.id);
        res.json({msg: 'Project Deleted!'});
    } catch (err) {
        res.status(500).json({msg: err});
    }

}