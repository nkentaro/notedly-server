module.exports = {
  hello: () => 'Hello, World!',
  notes: async (parent, args, { models }) => {
    return await models.note.find();
  },
  note: async (parent, args, { models }) => {
    return await models.note.findById(args.id);
  }
}
