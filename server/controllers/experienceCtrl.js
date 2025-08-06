const experienceSchema = require("../models/experienceModels");

// GET all experiences
exports.getExperience = async (req, res) => {
  try {
    const experience = await experienceSchema.find();
    if (!experience || experience.length === 0) {
      return res.status(404).json({ msg: "No experience records found" });
    }
    res.status(200).json(experience);
  } catch (error) {
    console.error("Error fetching experience:", error);
    res.status(500).json({ msg: "Server error: " + error.message });
  }
};

// POST new experience
exports.addExperience = async (req, res) => {
  const { experience } = req.body;

  if (!experience || experience.trim() === "") {
    return res.status(400).json({ msg: "Experience field is required" });
  }

  try {
    const newExperience = new experienceSchema({ experience });
    const savedExperience = await newExperience.save();
    res.status(201).json(savedExperience);
  } catch (error) {
    console.error("Error adding experience:", error);
    res.status(500).json({ msg: "Server error: " + error.message });
  }
};

// GET experience by ID
exports.getExperienceById = async (req, res) => {
  try {
    const experience = await experienceSchema.findById(req.params.id);
    if (!experience) {
      return res.status(404).json({ msg: "Experience record not found" });
    }
    res.status(200).json(experience);
  } catch (error) {
    console.error("Error fetching experience by ID:", error);
    res.status(500).json({ msg: "Server error: " + error.message });
  }
};

// PUT update experience by ID
exports.updateExperience = async (req, res) => {
  const { experience } = req.body;

  if (!experience || experience.trim() === "") {
    return res.status(400).json({ msg: "Experience field is required" });
  }

  try {
    const updatedExperience = await experienceSchema.findByIdAndUpdate(
      req.params.id,
      { experience },
      { new: true }
    );

    if (!updatedExperience) {
      return res.status(404).json({ msg: "Experience record not found" });
    }

    res
      .status(200)
      .json({
        msg: "Experience updated successfully",
        data: updatedExperience,
      });
  } catch (error) {
    console.error("Error updating experience:", error);
    res.status(500).json({ msg: "Server error: " + error.message });
  }
};

// DELETE experience by ID
exports.deleteExperience = async (req, res) => {
  try {
    const deletedExperience = await experienceSchema.findByIdAndDelete(
      req.params.id
    );
    if (!deletedExperience) {
      return res.status(404).json({ msg: "Experience record not found" });
    }
    res.status(200).json({ msg: "Experience deleted successfully" });
  } catch (error) {
    console.error("Error deleting experience:", error);
    res.status(500).json({ msg: "Server error: " + error.message });
  }
};
