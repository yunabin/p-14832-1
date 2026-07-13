import { components } from '@/global/backend/apiV1/schema'

type PostCommentDto = components['schemas']['PostCommentDto']

interface PostCommentWriteAndListProps {
  postId: number
  postComments: PostCommentDto[] | null
  deletePostComment: (postId: number, commentId: number) => void
  handleSumbit: (e: React.FormEvent<HTMLFormElement>) => void
}

export default function PostCommentWriteAndList({
  postId,
  postComments,
  deletePostComment,
  handleSumbit,
}: PostCommentWriteAndListProps) {
  return (
    <>
      <h2>댓글 작성</h2>
      <form className="flex flex-col gap-2 p-2" onSubmit={handleSumbit}>
        <textarea
          className="border p-2 rounded"
          name="content"
          placeholder="댓글 내용"
        />
        <button className="border p-2 rounded" type="submit">
          작성
        </button>
      </form>

      <h2>댓글 목록</h2>

      {postComments === null && <div>댓글이 로딩중...</div>}

      {postComments !== null && postComments.length > 0 && (
        <ul>
          {postComments.map((comment) => (
            <li key={comment.id}>
              {comment.id}/{comment.content}
              <button
                className="p-2 rounded border"
                onClick={() => deletePostComment(postId, comment.id)}
              >
                삭제
              </button>
            </li>
          ))}
        </ul>
      )}
    </>
  )
}
