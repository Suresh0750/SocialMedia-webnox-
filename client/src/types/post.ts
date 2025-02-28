export interface Comment {
    id: string
    userName: string
    userAvatar: string
    content: string
    timestamp: string
  }
  
  export interface Post {
    id: string
    userName: string
    userAvatar: string
    content: string
    image?: string
    likes: number
    isLiked: boolean
    comments: Comment[]
    timestamp: string
  }
  
  export interface Posts{
    userId : string;
    content : string;
    image : File | string
  }





export interface IUser {
  _id: string;
  username: string;
  email: string;
  password: string;
  avatar: string;
  createdAt: string;
  updatedAt: string;
}

export interface IComment {
  _id?: string;
  userId: string;
  comment: string;
  postId: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface IPost {
  _id: string;
  userId: IUser;
  content: string;
  image: string;
  like: string[];
  createdAt: string;
  updatedAt: string;
  comments: IComment[];
}



  /*
  userId: Types.ObjectId | string; 
    content: string;
    image: string;
    like: (Types.ObjectId | string)[]; 
  */