import type { Post } from "@/types/post"

export const mockPosts: Post[] = [
  {
    id: "post-1",
    userName: "John Doe",
    userAvatar: "/placeholder.svg?height=40&width=40",
    content:
      "Just finished my morning hike! The view from the top was absolutely breathtaking. Nature always has a way of putting things into perspective. #MorningHike #NatureLover",
    image: "/placeholder.svg?height=500&width=800",
    likes: 42,
    isLiked: false,
    comments: [
      {
        id: "comment-1",
        userName: "Sarah Johnson",
        userAvatar: "/placeholder.svg?height=40&width=40",
        content: "Wow, that looks amazing! Where is this?",
        timestamp: "2023-06-15T08:30:00Z",
      },
      {
        id: "comment-2",
        userName: "Mike Wilson",
        userAvatar: "/placeholder.svg?height=40&width=40",
        content: "Great shot! The lighting is perfect.",
        timestamp: "2023-06-15T09:15:00Z",
      },
    ],
    timestamp: "2023-06-15T07:30:00Z",
  },
  {
    id: "post-2",
    userName: "Emily Chen",
    userAvatar: "/placeholder.svg?height=40&width=40",
    content:
      "Just launched my new website! It's been months of hard work, but I'm so proud of the result. Check it out and let me know what you think! #WebDevelopment #Design",
    likes: 78,
    isLiked: true,
    comments: [
      {
        id: "comment-3",
        userName: "David Kim",
        userAvatar: "/placeholder.svg?height=40&width=40",
        content: "Congratulations! The site looks fantastic.",
        timestamp: "2023-06-14T15:45:00Z",
      },
    ],
    timestamp: "2023-06-14T14:20:00Z",
  },
  {
    id: "post-3",
    userName: "John Doe",
    userAvatar: "/placeholder.svg?height=40&width=40",
    content:
      "Just tried this new coffee shop downtown. Their cold brew is absolutely amazing! Definitely coming back here. #CoffeeLover #LocalBusiness",
    image: "/placeholder.svg?height=500&width=800",
    likes: 35,
    isLiked: false,
    comments: [],
    timestamp: "2023-06-13T11:10:00Z",
  },
  {
    id: "post-4",
    userName: "Alex Morgan",
    userAvatar: "/placeholder.svg?height=40&width=40",
    content:
      "Just finished reading this book and I can't recommend it enough. It's changed my perspective on so many things. Has anyone else read it? #BookRecommendation #Reading",
    image: "/placeholder.svg?height=500&width=800",
    likes: 92,
    isLiked: false,
    comments: [
      {
        id: "comment-4",
        userName: "Lisa Taylor",
        userAvatar: "/placeholder.svg?height=40&width=40",
        content: "I loved that book too! The chapter about mindfulness really resonated with me.",
        timestamp: "2023-06-12T19:30:00Z",
      },
      {
        id: "comment-5",
        userName: "James Wilson",
        userAvatar: "/placeholder.svg?height=40&width=40",
        content: "Adding this to my reading list right now!",
        timestamp: "2023-06-12T20:15:00Z",
      },
      {
        id: "comment-6",
        userName: "Emma Davis",
        userAvatar: "/placeholder.svg?height=40&width=40",
        content: "I've been meaning to read this. Thanks for the recommendation!",
        timestamp: "2023-06-12T21:05:00Z",
      },
    ],
    timestamp: "2023-06-12T18:45:00Z",
  },
]

