import axios from "axios";

// * Create an Axios instance for API calls

export const axiosInstance = axios.create({
    baseURL: "http://localhost:3001",
    headers: {
        "Content-Type": "application/json",
    },
    withCredentials: true,
});

// * Error handler function
export const handleApiError = (error: unknown): string => {
    if (axios.isAxiosError(error)) {
      return error.response?.data?.message || "API error occurred.";
    } else if (error instanceof Error) {
      return error.message;
    } else {
      return "An unknown error occurred.";
    }
  };


// * Login API function
export const loginUser = async (data: { email: string; password: string }) => {
    try {
        const response = await axiosInstance.post("/api/user/login", data);
        return response.data;
    } catch (error: unknown) {
        throw new Error(handleApiError(error))
    }
};

export const signupUser = async(data:{username:string,email:string,password:string})=>{
    try {
        const response = await axiosInstance.post("/api/user/signup", data);
        return response.data;
    } catch (error: unknown) {
        throw new Error(handleApiError(error))
    }
}

export const logoutUser = async()=>{
    try {
        const response = await axiosInstance.post("/api/user/logout");
        return response.data;
    } catch (error: unknown) {
        throw new Error(handleApiError(error))
    }
}
