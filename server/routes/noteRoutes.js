import express from "express";
import Note from "../models/Note.js";
import auth from "../middleware/auth.js";

const router = express.Router();

//create Note
router.post("/", auth, async (req, res) => {
  try {
    const { title, content } = req.body;

    const note = new Note({
      user: req.user.id,
      title,
      content,
    });

    await note.save();

    res.json({ msg: "Note created", note });
  } catch (err) {
    console.error("Add Note Error:", err);
    res.status(500).json({ msg: "Server error" });
  }
});


//Get all Notes
router.get("/", auth, async (req, res) => {
  const notes = await Note.find({ user: req.user.id });
  res.json(notes);
});

// UPDATE NOTE
router.put("/:id", auth, async (req, res) => {
  const { title, content } = req.body;

  const note = await Note.findByIdAndUpdate(
    req.params.id,
    { title, content },
    { new: true }
  );

  res.json({ msg: "Note updated", note });
});

// DELETE NOTE
router.delete("/:id", auth, async (req, res) => {
  await Note.findByIdAndDelete(req.params.id);
  res.json({ msg: "Note deleted" });
});

export default router;