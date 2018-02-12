import Post from '../../db/models/post';

export default {
  query: {
    posts: async () => {
      const posts = await Post.find({}).exec();

      return posts;
    },
  },
  mutation: {},
  resolvers: {},
};
