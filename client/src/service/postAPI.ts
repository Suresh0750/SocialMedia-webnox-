import { IComment, Posts } from "@/types/post";
import axios from "axios";

// * Create an Axios instance for API calls

export const axiosInstance = axios.create({
    baseURL: "http://localhost:3001",
    headers: {
        "Content-Type": "application/json",
    },
    withCredentials: true,
});

export const axiosInstance1 = axios.create({
  baseURL: "http://localhost:3001",
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


export const createPost = async(data:FormData)=>{
    try {
        const response = await axiosInstance1.post('/api/post/create',data)
        return response.data
    } catch (error) {
          throw new Error(handleApiError(error))
    }
}

export const fetchPost = async(page:number,limit:number)=>{
  try {
    const response = await axiosInstance1.get('/api/post/fetch',{
      params: {
        page,
        limit,
      },
    })
    return response.data
  } catch (error) {
    throw new Error(handleApiError(error))
  }
}

export const postComment = async(data:IComment)=>{
  try{
    const response = await axiosInstance1.post('/api/post/postComment',data)
    return response.data

  }catch(error){
    throw new Error(handleApiError(error))
  }
}


export const toggleLike = async(postId:string,userId:string)=>{
  try {
    const response = await axiosInstance1.patch('/api/post/toggleLike',{postId,userId})
    return response.data
  } catch (error) {
    throw new Error(handleApiError(error))
  }
}