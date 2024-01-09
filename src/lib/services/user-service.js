import { userRepository } from "../repositories/user-repository";

export const createUserService = async ({ userName, Password }) => {
  try {
    const result = await userRepository.create({ userName, Password });
    return result;
  } catch (err) {
    throw new Error("something went wrong for create user");
  }
};

export const getUsersService = async () => {
  try {
    const result = await userRepository.get();
    return result;
  } catch (err) {
    throw new Error("something went wrong for get user");
  }
};

export const verifyUserService = async ({userName}) => {
  try {
    const result = await userRepository.find({userName});
    return result;
  } catch (err) {
    console.log(err);
    throw new Error("something went wrong for verify user");
  }
};
