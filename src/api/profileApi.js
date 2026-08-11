// TODO: No profile read/update endpoints are present in the supplied backend documentation.
export const getProfile = async () => {
  throw new Error("TODO: Profile endpoint is not documented.");
};

export const updateProfile = async () => {
  throw new Error("TODO: Profile update endpoint is not documented.");
};

export const changePassword = async () => {
  throw new Error("TODO: Change-password endpoint is not documented.");
};

export default { getProfile, updateProfile, changePassword };
