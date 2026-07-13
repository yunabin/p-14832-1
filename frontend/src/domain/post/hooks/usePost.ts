import { components } from '@/global/backend/apiV1/schema'
import { client } from '@/global/backend/client'
import { useEffect, useState } from 'react'

import { useRouter } from 'next/navigation'

type PostDto = components['schemas']['PostWithAuthorDto']

export default function usePost(id: number) {
  const [post, setPost] = useState<PostDto | null>(null)
  const router = useRouter()

  useEffect(() => {
    client
      .GET('/api/v1/posts/{id}', {
        params: {
          path: {
            id,
          },
        },
      })
      .then((res) => {
        if (res.error) {
          alert(res.error.msg)
          return
        }

        setPost(res.data)
      })
  }, [id])

  const deletePost = (id: number) => {
    if (!confirm('정말 삭제하시겠습니까?')) return

    client
      .DELETE('/api/v1/posts/{id}', {
        params: {
          path: {
            id,
          },
        },
      })
      .then((res) => {
        if (res.error) {
          alert(res.error.msg)
          return
        }
        alert(res.data.msg)
        router.replace('/posts')
      })
  }

  const modifyPost = (id: number, title: string, content: string) => {
    client
      .PUT('/api/v1/posts/{id}', {
        params: {
          path: {
            id,
          },
        },
        body: {
          title,
          content,
        },
      })
      .then((res) => {
        if (res.error) {
          alert(res.error.msg)
          return
        }

        alert(res.data.msg)
        router.replace(`/posts/${id}`)
      })
  }

  return {
    post,
    deletePost,
    modifyPost,
  }
}
