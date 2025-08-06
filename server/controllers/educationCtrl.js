const educationSchema = require("../models/educationModels");

// Get all education records
exports.getEducation = async (req, res) => {
  try {
    const education = await educationSchema.find();
    if (!education || education.length === 0) {
      return res.status(404).json({ msg: "No education records found" });
    }
    res.status(200).json(education);
  } catch (err) {
    console.error("Error fetching education data:", err);
    res.status(500).json({ msg: "Server error: " + err.message });
  }
};

// Add new education
exports.addEducation = async (req, res) => {
  const { education } = req.body;

  if (!education || education.trim() === "") {
    return res.status(400).json({ msg: "Education field is required" });
  }

  try {
    const newEducation = new educationSchema({ education });
    const savedEducation = await newEducation.save();
    res.status(201).json(savedEducation);
  } catch (error) {
    console.error("Error adding education:", error);
    res.status(500).json({ msg: "Server error: " + error.message });
  }
};

// Get education by ID
exports.getEducationById = async (req, res) => {
  try {
    const education = await educationSchema.findById(req.params.id);
    if (!education) {
      return res.status(404).json({ msg: "Education record not found" });
    }
    res.status(200).json(education);
  } catch (error) {
    console.error("Error fetching education by ID:", error);
    res.status(500).json({ msg: "Server error: " + error.message });
  }
};

// Update education
exports.updateEducation = async (req, res) => {
  const { education } = req.body;

  if (!education || education.trim() === "") {
    return res.status(400).json({ msg: "Education field is required" });
  }

  try {
    const updatedEducation = await educationSchema.findByIdAndUpdate(
      req.params.id,
      { education },
      { new: true } // return the updated document
    );

    if (!updatedEducation) {
      return res.status(404).json({ msg: "Education record not found" });
    }

    res.status(200).json({ msg: "Education updated!", data: updatedEducation });
  } catch (error) {
    console.error("Error updating education:", error);
    res.status(500).json({ msg: "Server error: " + error.message });
  }
};

// Delete education
exports.deleteEducation = async (req, res) => {
  try {
    const deletedEducation = await educationSchema.findByIdAndDelete(
      req.params.id
    );

    if (!deletedEducation) {
      return res.status(404).json({ msg: "Education record not found" });
    }

    res.status(200).json({ msg: "Education deleted successfully!" });
  } catch (error) {
    console.error("Error deleting education:", error);
    res.status(500).json({ msg: "Server error: " + error.message });
  }
};
