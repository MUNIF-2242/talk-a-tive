export const conversationContentDefaultSchema = () => {
  return {
    text: {
      type: String,
    },
    image: [
      {
        type: String,
      },
    ],
    menu: {
      type: String,
    },
  };
};
