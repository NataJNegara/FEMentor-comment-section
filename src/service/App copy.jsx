import { useEffect } from "react";
import { useState } from "react";
import {
  createComment,
  getComments,
  getCurrentUser,
  deleteComment as deleteCommentApi,
} from "./service/data";
import Comment from "./components/Comment";
import CommentForm from "./components/CommentForm";
import DeleteModal from "./components/DeleteModal";

export default function App() {
  const [currUser, setCurrUser] = useState([]);
  const [comments, setComments] = useState([]);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedComment, setSelectedComment] = useState();
  const [activeComment, setActiveComment] = useState(null);

  // getting current user
  useEffect(() => {
    getCurrentUser().then((data) => setCurrUser(data[0]));
  }, []);

  // getting comments
  useEffect(() => {
    getComments().then((data) => setComments(data));
  }, []);

  // add comment
  const addComment = (content) => {
    createComment(content).then((comment) =>
      setComments([...comments, comment])
    );
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
            handleSubmit={addComment}
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
