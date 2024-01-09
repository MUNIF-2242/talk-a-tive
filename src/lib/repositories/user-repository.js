import User from "../model/User";

const create = async ({ userName, Password }) => {
    const result = await User.create({name:userName,password:Password});
    return result;
};

const get = async () => {
  const result = await User.find();
  return result;
};

const find = async ({userName}) => {
  const result = await User.findOne({name:userName});
  return result;
};

export const userRepository = {
  create,
  get,
  find
};
