const experienceSchema = require('../models/experienceModels');

exports.getExperience = async (req, res) => {
    try {
        const experience = await experienceSchema.find();
        res.json(experience);
    } catch (error) {
        res.status(500).json({msg: 'server error'});
    }
}

exports.addExperience = async (req, res) => {
    const {experience} = req.body;
    try {
        const newExperience = await experienceSchema({experience});
        await newExperience.save();
        res.json(newExperience);
    } catch (error) {
        res.status(500).json({msg: 'server error'});
    }
}

exports.getExperienceById = async (req, res) => {
    try {
        const experience = await experienceSchema.findById(req.params.id);  
        res.json(experience);
    } catch (error) {
        res.status(500).json({msg: 'server error'});
    }
}

exports.updateExperience = async(req, res) => {
    const {experience} = req.body;
    try {
        const updateExperience = await experienceSchema.findByIdAndUpdate(req.params.id, {experience});
        await updateExperience.save();
        res.json({msg: 'experience is updated'});
    } catch (error) {
        res.status(500).json({msg: 'server error'});
    }
}

exports.deleteExperience = async(req, res) => {
   try {
    const experience = await experienceSchema.findByIdAndDelete(req.params.id);
    res.json({msg: 'experience is deleted!'})
   } catch (error) {
    res.status(500).json({msg: 'server error'});
   }
}