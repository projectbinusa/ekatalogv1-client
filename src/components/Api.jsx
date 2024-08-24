import axios from "axios";

const apiUrl = "http://localhost:7000";

export const authenticatePengguna = async (username, password) => {
  try {
    const response = await axios.post(
      `${apiUrl}/login`,
      {
        username: username,
        password: password,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    const { token, user } = response.data;
    localStorage.setItem("token", token);
    return { token, user };
  } catch (error) {
    console.error(`Failed to authenticate user: `, error);
    throw error;
  }
};
