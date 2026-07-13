import { components } from '@/global/backend/apiV1/schema'

import Link from 'next/link'

type PostDto = components['schemas']['PostWithAuthorDto']
interface PostDetailProps {
  post: PostDto
  deletePost: (id: number) => void
}

export default function PostDetail({ post, deletePost }: PostDetailProps) {
  return (
    <>
      <h1>게시글 상세페이지</h1>
      <>
        <div>게시글 번호: {post.id}</div>
        <div>게시글 제목: {post.title}</div>
        <div>게시글 내용: {post.content}</div>
      </>

      <div className="flex gap-2">
        <button
          onClick={() => deletePost(post.id!)}
          className="p-2 rounded border"
        >
          삭제
        </button>
        <Link className="p-2 rounded border" href={`/posts/${post.id}/edit`}>
          수정
        </Link>
      </div>
    </>
  )
}
