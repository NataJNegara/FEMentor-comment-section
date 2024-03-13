import { useEffect } from "react";
import { useState } from "react";
import {
  createComment,
  getCurrentUser,
  deleteComment as deleteCommentApi,
  createReplies,
  editComment,
  data,
} from "./service/data";
import Comment from "./components/Comment";
import CommentForm from "./components/CommentForm";
import DeleteModal from "./components/DeleteModal";

export default function App() {
  const [currUser, setCurrUser] = useState([]);
  const [comments, setComments] = useState(
    localStorage.getItem("comments")
      ? JSON.parse(localStorage.getItem("comments"))
      : data
  );
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedComment, setSelectedComment] = useState();
  const [activeComment, setActiveComment] = useState(null);

  // getting current user
  useEffect(() => {
    getCurrentUser().then((data) => setCurrUser(data[0]));
  }, []);

  // store data to localstorage
  useEffect(() => {
    localStorage.setItem("comments", JSON.stringify(comments));
  }, [comments]);

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("comments"));
    if (data) {
      setComments(data);
    }
  }, []);

  // add commnet
  const addComment = (content, commentId) => {
    if (commentId) {
      createReplies(comments, content, commentId).then((comment) => {
        setComments(comment);
        localStorage.setItem("comments", JSON.stringify(comment));
      });
    } else {
      createComment(content).then((comment) =>
        setComments([...comments, comment])
      );
    }
    setActiveComment(null);
  };

  // edit comment
  const updateComment = (content, commentId) => {
    const finalStructure = editComment(comments, commentId, content);
    localStorage.setItem("comments", JSON.stringify(finalStructure));
    setComments(finalStructure);
    setActiveComment(null);
  };

  // delete comment
  const deleteComment = (commentId) => {
    deleteCommentApi(commentId).then(() => {
      //check delete on initial comments(root comment)
      const isInitial = comments.find((comment) => comment.id === commentId);

      let updatedComment;
      if (isInitial) {
        updatedComment = comments.filter((comment) => comment.id !== commentId);
      } else {
        updatedComment = comments.map((comment) => ({
          ...comment,
          replies: comment.replies.filter(
            (comment) => comment.id !== commentId
          ),
        }));
      }

      setComments(updatedComment);
      setShowDeleteModal((showDeleteModal) => !showDeleteModal);
    });
  };

  // UPVOTE
  const onUpVote = (commentId) => {
    const isInitial = comments.find((comment) => comment.id === commentId);
    if (isInitial) {
      setComments((comments) =>
        comments.map((comment) =>
          comment.id === commentId
            ? { ...comment, score: comment.score + 1 }
            : comment
        )
      );
    } else {
      const updatedComment = comments.map((comment) => ({
        ...comment,
        replies: comment.replies.map((reply) =>
          reply.id === commentId ? { ...reply, score: reply.score + 1 } : reply
        ),
      }));
      setComments(updatedComment);
    }
  };
  // DOWN VOTE
  const onDownVote = (commentId) => {
    const isInitial = comments.find((comment) => comment.id === commentId);
    if (isInitial) {
      setComments((comments) =>
        comments.map((comment) =>
          comment.id === commentId
            ? {
                ...comment,
                score: comment.score === 0 ? comment.score : comment.score - 1,
              }
            : comment
        )
      );
    } else {
      const updatedComment = comments.map((comment) => ({
        ...comment,
        replies: comment.replies.map((reply) =>
          reply.id === commentId
            ? {
                ...reply,
                score: reply.score === 0 ? reply.score : reply.score - 1,
              }
            : reply
        ),
      }));
      setComments(updatedComment);
    }
  };

  // show delete modal
  const handleShowModal = (commentId) => {
    setShowDeleteModal((showDeleteModal) => !showDeleteModal);
    setSelectedComment(commentId);
  };

  return (
    <div>
      <section className="flex flex-col items-center justify-center w-screen h-full gap-4 p-4 py-12">
        {comments.map((comment) => (
          <Comment
            key={comment.id}
            comment={comment}
            replies={comment.replies}
            currUser={currUser}
            handleShowModal={handleShowModal}
            activeComment={activeComment}
            setActiveComment={setActiveComment}
            addComment={addComment}
            updateComment={updateComment}
            onUpVote={onUpVote}
            onDownVote={onDownVote}
          />
        ))}
        <CommentForm user={currUser} handleSubmit={addComment} />
        {showDeleteModal && (
          <DeleteModal
            handleShowModal={handleShowModal}
            selectedComment={selectedComment}
            deleteComment={deleteComment}
          />
        )}
      </section>
    </div>
  );
}
