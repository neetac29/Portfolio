const educationSchema = require('../models/educationModels');

exports.getEducation = async(req, res) => {
    // res.json('getEducation');
    try {
        const education = await educationSchema.find()
        res.json(education);
    } catch (error) {
        res.staus(500).json({msg: 'server error'})
    }
    
}

exports.addEducation = async(req, res) => {
    // res.json('add Education');
    const {education} = req.body;
    try {
        const newEducation = new educationSchema({education})
        await newEducation.save()
        res.json(newEducation);
    } catch (error) {
        res.status(500).json({msg: 'server error'});
    }
}

exports.getEducationById = async(req, res) => {
    // res.json('get Education by Id');
    try {
        const education = await educationSchema.findById(req.params.id)
        res.json(education);
    } catch (error) {
        res.status(500).json({msg: 'server error'}); 
    }
}

exports.updateEducation = async(req, res) =>{
    // res.json('update Education');
    const {education} = req.body;
    try {
        const newEducation = await educationSchema.findByIdAndUpdate(req.params.id, {education});
        await newEducation.save()
        res.json({msg: 'education updated!'})
    } catch (error) {
        res.status(500).json({msg: 'server error'}); 
    }
}

exports.deleteEducation = async (req, res) => {
    // res.json('delete education');
    try {
        const education = await educationSchema.findByIdAndDelete(req.params.id);
        res.json({msg: 'Education Deleted!'})
    } catch (error) {
        res.status(500).json({msg: 'server error'});  
    }
}