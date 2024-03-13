import { useState } from "react";

export default function CommentForm({
  user,
  handleSubmit,
  hasCancelButton = false,
  handleCancel,
  isEditing,
  isReplying,
  initialText = "",
}) {
  const [content, setContent] = useState(initialText);

  const isDisabled = content.trim().length === 0;

  function onSubmit(e) {
    e.preventDefault();
    handleSubmit(content);
    setContent("");
  }

  return (
    <form
      onSubmit={onSubmit}
      className={`w-full max-w-screen-md  bg-white grid gap-2 items-start rounded-lg ${
        isEditing ? "grid-cols-1" : "grid-cols-[auto_1fr_auto] p-6"
      }`}>
      {!isEditing && <img src={user?.image?.png} className="w-10" />}
      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        className="px-4 py-2 border rounded-md outline-none border-light-gray focus:border-grayish-blue"
        rows="4"
      />
      <div className={`flex gap-4 ${isEditing ? "justify-end" : "flex-col"}`}>
        <button
          disabled={isDisabled}
          className="px-4 py-2 font-semibold text-white rounded-md bg-moderate-blue disabled:cursor-not-allowed">
          {isReplying ? "REPLY" : isEditing ? "UPDATE" : "SEND"}
        </button>
        {hasCancelButton && (
          <button
            type="reset"
            onClick={handleCancel}
            className="px-4 py-2 font-semibold text-white rounded-md bg-soft-red disabled:cursor-not-allowed">
            CANCEL
          </button>
        )}
      </div>
    </form>
  );
}
