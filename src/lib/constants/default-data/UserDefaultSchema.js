export const userDefaultSchema = (schemaName) => {
  return {
    userId: {
      type: String,
      required: [true, `++ user id is required ${schemaName} schema`],
    },
    userType: {
      type: String,
      // enum: Object.keys(UserType),
      required: [true, `++ user type is required in ${schemaName} Schema`],
    },
  };
};
