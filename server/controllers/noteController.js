const Note = require("../models/Note");

// CREATE NOTE
exports.createNote = async (req, res) => {
  try {
    const { title, content } = req.body;

    if (!title || !content)
      return res.status(400).json({ msg: "All fields required" });

    const note = await Note.create({
      title,
      content,
      user: req.user.id,
    });

    res.json(note);
  } catch (err) {
    console.error(err);
    res.status(500).send("Server Error");
  }
};

// GET ALL NOTES FOR LOGGED IN USER
exports.getNotes = async (req, res) => {
  try {
    const notes = await Note.find({ user: req.user.id }).sort({ date: -1 });
    res.json(notes);
  } catch (err) {
    console.error(err);
    res.status(500).send("Server Error");
  }
};

// UPDATE NOTE
exports.updateNote = async (req, res) => {
  try {
    const { title, content } = req.body;

    let note = await Note.findById(req.params.id);

    if (!note) return res.status(404).json({ msg: "Note not found" });

    // Check user permission
    if (note.user.toString() !== req.user.id)
      return res.status(401).json({ msg: "Not allowed" });

    note.title = title;
    note.content = content;

    await note.save();
    res.json(note);
  } catch (err) {
    console.error(err);
    res.status(500).send("Server Error");
  }
};

// DELETE NOTE
exports.deleteNote = async (req, res) => {
  try {
    let note = await Note.findById(req.params.id);

    if (!note) return res.status(404).json({ msg: "Note not found" });

    if (note.user.toString() !== req.user.id)
      return res.status(401).json({ msg: "Not allowed" });

    await note.remove();
    res.json({ msg: "Note deleted" });
  } catch (err) {
    console.error(err);
    res.status(500).send("Server Error");
  }
};
