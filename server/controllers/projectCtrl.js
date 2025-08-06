const projectSchema = require("../models/projectModels");

// GET all projects
exports.getProject = async (req, res) => {
  try {
    const projects = await projectSchema.find();
    if (!projects || projects.length === 0) {
      return res.status(404).json({ msg: "No projects found" });
    }
    res.status(200).json(projects);
  } catch (err) {
    console.error("Error fetching projects:", err);
    res.status(500).json({ msg: "Server error: " + err.message });
  }
};

// POST new project
exports.addProject = async (req, res) => {
  try {
    const { product_id, title, description, image } = req.body;

    if (!product_id || !title || !description) {
      return res
        .status(400)
        .json({ msg: "Product ID, Title, and Description are required" });
    }

    const newProject = new projectSchema({
      product_id,
      title,
      description,
      image,
    });
    await newProject.save();

    res
      .status(201)
      .json({ msg: "Project added successfully", data: newProject });
  } catch (err) {
    console.error("Error adding project:", err);
    res.status(500).json({ msg: "Server error: " + err.message });
  }
};

// GET project by ID
exports.getProjectById = async (req, res) => {
  try {
    const project = await projectSchema.findById(req.params.id);
    if (!project) {
      return res.status(404).json({ msg: "Project not found" });
    }
    res.status(200).json(project);
  } catch (err) {
    console.error("Error fetching project by ID:", err);
    res.status(500).json({ msg: "Server error: " + err.message });
  }
};

// PUT update project
exports.updateProject = async (req, res) => {
  const { product_id, title, description, image } = req.body;

  if (!product_id || !title || !description) {
    return res
      .status(400)
      .json({ msg: "Product ID, Title, and Description are required" });
  }

  try {
    const updatedProject = await projectSchema.findByIdAndUpdate(
      req.params.id,
      { product_id, title, description, image },
      { new: true }
    );

    if (!updatedProject) {
      return res.status(404).json({ msg: "Project not found" });
    }

    res
      .status(200)
      .json({ msg: "Project updated successfully", data: updatedProject });
  } catch (err) {
    console.error("Error updating project:", err);
    res.status(500).json({ msg: "Server error: " + err.message });
  }
};

// DELETE project
exports.deleteProject = async (req, res) => {
  try {
    const deletedProject = await projectSchema.findByIdAndDelete(req.params.id);
    if (!deletedProject) {
      return res.status(404).json({ msg: "Project not found" });
    }
    res.status(200).json({ msg: "Project deleted successfully" });
  } catch (err) {
    console.error("Error deleting project:", err);
    res.status(500).json({ msg: "Server error: " + err.message });
  }
};
