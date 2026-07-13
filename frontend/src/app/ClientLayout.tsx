'use client'

import { useAuthContext } from '@/global/auth/hooks/useAuth'

import Link from 'next/link'

export default function ClientLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const authState = useAuthContext()
  const { isLogin, loginMember, logout } = authState

  const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL
  const frontedBaseUrl = process.env.NEXT_PUBLIC_FRONTEND_BASE_URL
  const redirectUrl = encodeURIComponent(`${frontedBaseUrl}/members/me`)

  const loginUrl = (providerTypeCode: string) =>
    `${apiBaseUrl}/oauth2/authorization/${providerTypeCode}?redirectUrl=${redirectUrl}`

  return (
    <>
      <header>
        <nav className="flex">
          <Link href="/" className="p-2 rounded hover:bg-gray-100">
            홈
          </Link>
          <Link href="/posts" className="p-2 rounded hover:bg-gray-100">
            글목록
          </Link>
          {isLogin ? (
            <>
              <button
                onClick={logout}
                className="p-2 rounded hover:bg-gray-100 flex"
              >
                로그아웃
              </button>
              <Link
                href="/members/me"
                className="p-2 rounded hover:bg-gray-100 flex gap-2"
              >
                <span>{loginMember.nickname}님의 정보</span>
                <img
                  src={loginMember.profileImageUrl}
                  width="30"
                  alt=""
                  className="rounded-full object-cover aspect-[1/1]"
                />
              </Link>
            </>
          ) : (
            <>
              <Link
                href="/members/login"
                className="p-2 rounded hover:bg-gray-100"
              >
                로그인
              </Link>
              <a
                href={loginUrl('kakao')}
                className="p-2 rounded hover:bg-gray-100"
              >
                카카오 로그인
              </a>
              <a
                href={loginUrl('google')}
                className="p-2 rounded hover:bg-gray-100"
              >
                구글 로그인
              </a>
              <a
                href={loginUrl('naver')}
                className="p-2 rounded hover:bg-gray-100"
              >
                네이버 로그인
              </a>
            </>
          )}
        </nav>
      </header>
      <main className="flex-1 flex flex-col">{children}</main>
      <footer className="text-center p-2">풋터</footer>
    </>
  )
}
