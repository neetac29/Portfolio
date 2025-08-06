const aboutSchema = require("../models/aboutModels");

// GET all about entries
exports.getAbout = async (req, res) => {
  try {
    const about = await aboutSchema.find();
    if (!about || about.length === 0) {
      return res.status(404).json({ msg: "No about content found" });
    }
    res.status(200).json(about);
  } catch (error) {
    console.error("Error fetching about data:", error);
    res.status(500).json({ msg: "Server error: " + error.message });
  }
};

// POST new about entry
exports.addAbout = async (req, res) => {
  const { about } = req.body;

  if (!about || about.trim() === "") {
    return res.status(400).json({ msg: "About field is required" });
  }

  try {
    const newAbout = new aboutSchema({ about });
    const savedAbout = await newAbout.save();
    res.status(201).json(savedAbout);
  } catch (error) {
    console.error("Error adding about:", error);
    res.status(500).json({ msg: "Server error: " + error.message });
  }
};

// GET about entry by ID
exports.getAboutById = async (req, res) => {
  try {
    const about = await aboutSchema.findById(req.params.id);
    if (!about) {
      return res.status(404).json({ msg: "About record not found" });
    }
    res.status(200).json(about);
  } catch (error) {
    console.error("Error fetching about by ID:", error);
    res.status(500).json({ msg: "Server error: " + error.message });
  }
};

// PUT update about by ID
exports.updateAboutById = async (req, res) => {
  const { about } = req.body;

  if (!about || about.trim() === "") {
    return res.status(400).json({ msg: "About field is required" });
  }

  try {
    const updatedAbout = await aboutSchema.findByIdAndUpdate(
      req.params.id,
      { about },
      { new: true }
    );

    if (!updatedAbout) {
      return res.status(404).json({ msg: "About record not found" });
    }

    res.status(200).json({ msg: "Updated successfully", data: updatedAbout });
  } catch (error) {
    console.error("Error updating about:", error);
    res.status(500).json({ msg: "Server error: " + error.message });
  }
};

// DELETE about entry
exports.deleteAbout = async (req, res) => {
  try {
    const deletedAbout = await aboutSchema.findByIdAndDelete(req.params.id);
    if (!deletedAbout) {
      return res.status(404).json({ msg: "About record not found" });
    }
    res.status(200).json({ msg: "Deleted successfully" });
  } catch (error) {
    console.error("Error deleting about:", error);
    res.status(500).json({ msg: "Server error: " + error.message });
  }
};
