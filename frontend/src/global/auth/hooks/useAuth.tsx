import { components } from '@/global/backend/apiV1/schema'
import { client } from '@/global/backend/client'
import { createContext, use, useEffect, useState } from 'react'

import { useRouter } from 'next/navigation'

type MemberDto = components['schemas']['MemberDto']
export default function useAuth() {
  const router = useRouter()

  const [loginMember, setLoginMember] = useState<MemberDto | null>(null)
  const isLogin = loginMember !== null
  const isAdmin = isLogin && loginMember.isAdmin

  useEffect(() => {
    client.GET('/api/v1/members/me').then((res) => {
      if (res.error) return

      setLoginMember(res.data.data)
    })
  }, [])

  const logout = () => {
    client.DELETE('/api/v1/members/logout').then((res) => {
      if (res.error) {
        alert(res.error.msg)
        return
      }

      // UI 로그아웃 처리
      setLoginMember(null)

      router.replace('/posts')
    })
  }

  if (isLogin)
    return {
      isLogin: true,
      loginMember,
      logout,
      setLoginMember,
      isAdmin,
    } as const

  return {
    isLogin: false,
    loginMember: null,
    logout,
    setLoginMember,
    isAdmin,
  } as const
}

export const AuthContext = createContext<ReturnType<typeof useAuth> | null>(
  null,
)

export function useAuthContext() {
  const authState = use(AuthContext)

  if (authState === null) throw new Error('AuthContext is not found')

  return authState
}

export function AuthProvider({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const authState = useAuth()

  return <AuthContext value={authState}>{children}</AuthContext>
}
