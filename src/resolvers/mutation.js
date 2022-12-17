module.exports = {
  newNote: async (parent, args, { models }) => {
    return await models.note.create({
      content: args.content,
      author: 'Kentaro Nakamaye'
    });
  },
  deleteNote: async (parent, args, { models }) => {
    try {
      await models.Note.findOneAndRemove({ _id: id});
      return true;
    } catch (err) {
      return false;
    }
  },
  updateNote: async (parent, args, { models }) => {
    return await models.Note.findOneAndUpdate(
      {
        _id: id,
      },
      {
        $set: {
          content
        }
      },
      {
        new: true
      }
    );
  }
};
