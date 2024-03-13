import moment from "moment";
import CommentForm from "./CommentForm";

export default function Comment({
  comment,
  currUser,
  handleShowModal,
  replies,
  activeComment,
  setActiveComment,
  addComment,
  updateComment,
  onUpVote,
  onDownVote,
}) {
  const isReplying =
    activeComment &&
    activeComment.type === "replying" &&
    activeComment.id === comment.id;

  const isEditing =
    activeComment &&
    activeComment.type === "editing" &&
    activeComment.id === comment.id;

  return (
    <>
      <div className="flex flex-col w-full max-w-screen-md gap-4">
        <div className="relative grid w-full grid-cols-1 gap-4 p-6 bg-white rounded-lg sm:flex">
          <div className="flex items-center row-start-2 gap-4 p-2 text-lg font-bold rounded-lg w-fit sm:gap-1 sm:flex-col bg-very-light-gray h-fit">
            <button
              className="text-xl font-bold text-light-grayish-blue hover:text-moderate-blue"
              onClick={() => onUpVote(comment.id)}>
              &#xFF0B;
            </button>

            <p className="text-base text-moderate-blue">{comment.score}</p>

            <button
              className="text-sm font-bold text-light-grayish-blue hover:text-moderate-blue"
              onClick={() => onDownVote(comment.id)}>
              &#9866;
            </button>
          </div>

          <div className="w-full">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <img src={comment.user.image.png} className="w-8" />
                <p className="font-bold text-dark-blue">
                  {comment.user.username}
                </p>

                {currUser.username === comment.user.username && (
                  <span className="px-2 font-semibold text-white rounded-md bg-moderate-blue">
                    You
                  </span>
                )}

                <p className="text-sm text-grayish-blue whitespace-nowrap sm:text-base">
                  {moment(comment.createdAt).fromNow()}
                </p>
              </div>

              {currUser.username !== comment.user.username && (
                <button
                  className="absolute flex items-center gap-2 font-bold sm:static right-4 text-moderate-blue hover:text-light-grayish-blue bottom-9"
                  onClick={() =>
                    setActiveComment({
                      type: "replying",
                      id: comment.id,
                      replyingTo: comment.user.username,
                    })
                  }>
                  <img src="/images/icon-reply.svg" />
                  Reply
                </button>
              )}

              {currUser.username === comment.user.username && (
                <div className="absolute flex gap-4 sm:static bottom-9 right-4">
                  <button
                    className="flex items-center gap-2 font-bold text-soft-red hover:text-plae-red disabled:text-plae-red"
                    onClick={() => handleShowModal(comment.id)}
                    disabled={isEditing}>
                    <img src="/images/icon-delete.svg" />
                    Delete
                  </button>
                  <button
                    className="flex items-center gap-2 font-bold text-moderate-blue hover:text-light-grayish-blue disabled:text-light-grayish-blue"
                    onClick={() =>
                      setActiveComment({ type: "editing", id: comment.id })
                    }
                    disabled={isEditing}>
                    <img src="/images/icon-edit.svg" />
                    Edit
                  </button>
                </div>
              )}
            </div>
            {!isEditing && (
              <p className="pr-2 text-grayish-blue">{comment.content}</p>
            )}
            {isEditing && (
              <CommentForm
                hasCancelButton
                isEditing={isEditing}
                initialText={comment.content}
                handleCancel={() => setActiveComment(null)}
                handleSubmit={(content) => updateComment(content, comment.id)}
              />
            )}
          </div>
        </div>

        {isReplying && (
          <CommentForm
            user={currUser}
            handleSubmit={(content) => addComment(content, comment.id)}
            hasCancelButton
            handleCancel={() => setActiveComment(null)}
            isReplying={isReplying}
          />
        )}

        {/* replies lying here */}
        <div className="relative">
          {replies.map((reply) => (
            <div className="flex pl-4 sm:gap-8 sm:pl-16 " key={reply.id}>
              <div className="absolute top-0 left-0 w-[2px] h-full sm:ml-8 bg-light-gray"></div>
              <Comment
                comment={reply}
                replies={[]}
                currUser={currUser}
                handleShowModal={handleShowModal}
                activeComment={activeComment}
                setActiveComment={setActiveComment}
                addComment={addComment}
                updateComment={updateComment}
                onUpVote={onUpVote}
                onDownVote={onDownVote}
              />
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
