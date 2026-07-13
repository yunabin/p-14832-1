'use client'

import { client } from '@/global/backend/client'
import { useEffect, useState } from 'react'

import Link from 'next/link'

import { components } from '../../global/backend/apiV1/schema'

export default function Page() {
  type PostDto = components['schemas']['PostWithAuthorDto']

  const [posts, setPosts] = useState<PostDto[] | null>(null)

  useEffect(() => {
    client.GET('/api/v1/posts').then((res) => {
      if (res.error) {
        alert(res.error.msg)
        return
      }

      setPosts(res.data)
    })
  }, [])
  if (posts === null) return <div>로딩중...</div>

  return (
    <>
      <h1>글 목록</h1>
      {posts.length === 0 && <div>글이 없습니다.</div>}

      {posts.length > 0 && (
        <ul>
          {posts.map((post) => (
            <li key={post.id}>
              {post.id} /<Link href={`/posts/${post.id}`}>{post.title}</Link> /
              {post.content}
            </li>
          ))}
        </ul>
      )}

      <div>
        <Link href="/posts/write">글쓰기</Link>
      </div>
    </>
  )
}
