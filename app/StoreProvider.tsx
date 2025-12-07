'use client'
import { useMemo } from 'react'
import { Provider } from 'react-redux'
import { store, AppStore } from '@/app/lib/store'

export default function StoreProvider({
  children,
}: {
  children: React.ReactNode
}) {
  const appStore = useMemo<AppStore>(() => store(), [])
  
  return <Provider store={appStore}>{children}</Provider>
}
