export default function DeleteModal({
  handleShowModal,
  deleteComment,
  selectedComment,
}) {
  return (
    <div className="fixed top-0 w-screen h-screen bg-opacity-50 bg-dark-blue">
      <div className="fixed flex flex-col w-11/12 gap-3 p-8 -translate-x-1/2 -translate-y-1/2 rounded-lg sm:max-w-sm top-1/2 left-1/2 bg-very-light-gray">
        <p className="text-2xl font-semibold text-dark-blue">Delete comment</p>
        <p className="text-grayish-blue">
          Are you sure you want to delete this comment? This will remove the
          comment and can&apos;t be undone.
        </p>
        <div className="flex justify-between gap-4">
          <button
            className="w-full p-3 font-semibold text-white rounded-md bg-grayish-blue"
            onClick={() => handleShowModal(false)}>
            NO, CANCEL
          </button>
          <button
            className="w-full p-3 font-semibold text-white rounded-md bg-soft-red"
            onClick={() => deleteComment(selectedComment)}>
            YES, DELETE
          </button>
        </div>
      </div>
    </div>
  );
}
