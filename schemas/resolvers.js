const { User, Thought } = require('../models');

const resolvers = {
  Query: {
    // the parent as more of a placeholder parameter.
    // It won't be used, but we need something in that first parameter's
    // spot so we can access the username argument from the second parameter
    thoughts: async (parent, { username }) => {
      const params = username ? { username } : {};
      return Thought.find(params).sort({ createdAt: -1 });
    },
    thought: async (parent, { _id }) => {
      return Thought.findOne({ _id });
    },
    users: async () => {
      return User.find()
        .select('-__v -password')
        .populate('friends')
        .populate('thoughts');
    },
    user: async (parent, { username }) => {
      return User.findOne({ username })
        .select('-__v -password')
        .populate('friends')
        .populate('thoughts');
    },
  },
};

module.exports = resolvers;
