export const getCurrentUser = async () => {
  return [
    {
      image: {
        png: "./images/avatars/image-juliusomo.png",
        webp: "./images/avatars/image-juliusomo.webp",
      },
      username: "juliusomo",
    },
  ];
};

export const getComments = async () => {
  return [
    {
      id: 1,
      content:
        "Impressive! Though it seems the drag feature could be improved. But overall it looks incredible. You've nailed the design and the responsiveness at various breakpoints works really well.",
      createdAt: "2024-01-10T17:26:08.186Z",
      score: 12,
      user: {
        image: {
          png: "./images/avatars/image-amyrobson.png",
          webp: "./images/avatars/image-amyrobson.webp",
        },
        username: "amyrobson",
      },
      replies: [],
    },
    {
      id: 2,
      content:
        "Woah, your project looks awesome! How long have you been coding for? I'm still new, but think I want to dive into React as well soon. Perhaps you can give me an insight on where I can learn React? Thanks!",
      createdAt: "2024-03-02T17:26:08.186Z",
      score: 5,
      user: {
        image: {
          png: "./images/avatars/image-maxblagun.png",
          webp: "./images/avatars/image-maxblagun.webp",
        },
        username: "maxblagun",
      },
      replies: [
        {
          id: 3,
          content:
            "If you're still new, I'd recommend focusing on the fundamentals of HTML, CSS, and JS before considering React. It's very tempting to jump ahead but lay a solid foundation first.",
          createdAt: "2024-03-04T17:26:08.186Z",
          score: 4,
          replyingTo: "maxblagun",
          user: {
            image: {
              png: "./images/avatars/image-ramsesmiron.png",
              webp: "./images/avatars/image-ramsesmiron.webp",
            },
            username: "ramsesmiron",
          },
        },
        {
          id: 4,
          content:
            "I couldn't agree more with this. Everything moves so fast and it always seems like everyone knows the newest library/framework. But the fundamentals are what stay constant.",
          createdAt: "2024-03-07T17:26:08.186Z",
          score: 2,
          replyingTo: "ramsesmiron",
          user: {
            image: {
              png: "./images/avatars/image-juliusomo.png",
              webp: "./images/avatars/image-juliusomo.webp",
            },
            username: "juliusomo",
          },
        },
      ],
    },
  ];
};

export const createComment = async (content) => {
  return {
    id: Math.random().toString(36).substr(2, 9),
    content,
    createdAt: new Date().toISOString(),
    score: 0,
    user: {
      image: {
        png: "./images/avatars/image-juliusomo.png",
        webp: "./images/avatars/image-juliusomo.webp",
      },
      username: "juliusomo",
    },
    replies: [],
  };
};

// REPLIES
export const createReplies = async (comments, content, commentId) => {
  for (let i = 0; i < comments.length; i++) {
    const currentItem = comments[i];
    if (currentItem.id === commentId) {
      currentItem.replies.push({
        // todo
        id: Math.random().toString(36).substr(2, 9),
        content: `${content}`,
        createdAt: new Date().toISOString(),
        score: 0,
        replyingTo: currentItem.user.username,
        user: {
          image: {
            png: "./images/avatars/image-juliusomo.png",
            webp: "./images/avatars/image-juliusomo.webp",
          },
          username: "juliusomo",
        },
      });
      return comments;
      //
    } else if (currentItem.replies.length > 0) {
      for (let j = 0; j < currentItem.replies.length; j++) {
        const currentReplies = currentItem.replies[j];
        if (currentReplies.id === commentId) {
          currentItem.replies.push({
            // todo
            id: Math.random().toString(36).substr(2, 9),
            content: `${content}`,
            createdAt: new Date().toISOString(),
            score: 0,
            replyingTo: currentReplies.user.username,
            user: {
              image: {
                png: "./images/avatars/image-juliusomo.png",
                webp: "./images/avatars/image-juliusomo.webp",
              },
              username: "juliusomo",
            },
          });
          return comments;
        }
      }
    }
  }
  return comments;
};

export const editComment = (comments, commentId, content) => {
  for (let i = 0; i < comments.length; i++) {
    const currentItem = comments[i];
    if (currentItem.id === commentId) {
      currentItem.content = content;
      return comments;
    }

    if (currentItem.replies.length > 0) {
      for (let j = 0; j < currentItem.replies.length; j++) {
        const currReplies = currentItem.replies[j];
        if (currReplies.id === commentId) {
          currReplies.content = content;
          return comments;
        }
      }
    }
  }

  return [...comments];
};

// increse score
// export const increaseScore = (comments, commentId) => {
//   for (let i = 0; i < comments.length; i++) {
//     const currentItem = comments[i];
//     if (currentItem.id === commentId) {
//       currentItem.score += 1;
//       return comments;
//     }

//     if (currentItem.replies.length > 0) {
//       for (let j = 0; j < currentItem.replies.length; j++) {
//         const currReplies = currentItem.replies[j];
//         if (currReplies.id === commentId) {
//           currReplies.score += 1;
//           return comments;
//         }
//       }
//     }
//   }
//   return [...comments];
// };

export const deleteComment = async () => {
  return {};
};

export const data = [
  {
    id: 1,
    content:
      "Impressive! Though it seems the drag feature could be improved. But overall it looks incredible. You've nailed the design and the responsiveness at various breakpoints works really well.",
    createdAt: "2024-01-10T17:26:08.186Z",
    score: 12,
    user: {
      image: {
        png: "./images/avatars/image-amyrobson.png",
        webp: "./images/avatars/image-amyrobson.webp",
      },
      username: "amyrobson",
    },
    replies: [],
  },
  {
    id: 2,
    content:
      "Woah, your project looks awesome! How long have you been coding for? I'm still new, but think I want to dive into React as well soon. Perhaps you can give me an insight on where I can learn React? Thanks!",
    createdAt: "2024-03-02T17:26:08.186Z",
    score: 5,
    user: {
      image: {
        png: "./images/avatars/image-maxblagun.png",
        webp: "./images/avatars/image-maxblagun.webp",
      },
      username: "maxblagun",
    },
    replies: [
      {
        id: 3,
        content:
          "If you're still new, I'd recommend focusing on the fundamentals of HTML, CSS, and JS before considering React. It's very tempting to jump ahead but lay a solid foundation first.",
        createdAt: "2024-03-04T17:26:08.186Z",
        score: 4,
        replyingTo: "maxblagun",
        user: {
          image: {
            png: "./images/avatars/image-ramsesmiron.png",
            webp: "./images/avatars/image-ramsesmiron.webp",
          },
          username: "ramsesmiron",
        },
      },
      {
        id: 4,
        content:
          "I couldn't agree more with this. Everything moves so fast and it always seems like everyone knows the newest library/framework. But the fundamentals are what stay constant.",
        createdAt: "2024-03-07T17:26:08.186Z",
        score: 2,
        replyingTo: "ramsesmiron",
        user: {
          image: {
            png: "./images/avatars/image-juliusomo.png",
            webp: "./images/avatars/image-juliusomo.webp",
          },
          username: "juliusomo",
        },
      },
    ],
  },
];
