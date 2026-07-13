'use client'

import withLogin from '@/global/auth/hoc/withLogin'
import { client } from '@/global/backend/client'

import { useRouter } from 'next/navigation'

export default withLogin(function Page() {
  const router = useRouter()

  const handleSumbit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const form = e.target as HTMLFormElement

    const titleInput = form.elements.namedItem('title') as HTMLInputElement
    const contentInput = form.elements.namedItem(
      'content',
    ) as HTMLTextAreaElement

    if (titleInput.value.trim() === '' || titleInput.value.length === 0) {
      alert('제목을 입력해주세요.')
      titleInput.focus()
      return
    }

    if (contentInput.value.trim() === '' || contentInput.value.length === 0) {
      alert('내용을 입력해주세요.')
      contentInput.focus()
      return
    }

    client
      .POST('/api/v1/posts', {
        body: {
          title: titleInput.value,
          content: contentInput.value,
        },
      })
      .then((res) => {
        if (res.error) {
          alert(res.error.msg)
          return
        }

        alert(res.data.msg)
        router.replace(`/posts/${res.data.data.id}`)
      })
  }

  return (
    <>
      <h1>글쓰기</h1>
      <form className="flex flex-col gap-2 p-2" onSubmit={handleSumbit}>
        <input
          className="border p-2 rounded"
          type="text"
          name="title"
          placeholder="제목"
          autoFocus
        />
        <textarea
          className="border p-2 rounded"
          name="content"
          placeholder="내용"
        />
        <button className="border p-2 rounded" type="submit">
          저장
        </button>
      </form>
    </>
  )
})
