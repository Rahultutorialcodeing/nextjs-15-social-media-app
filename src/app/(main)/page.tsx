"use client"
import { useAppSelector } from '@/lib/hooks'
import React from 'react'

export default function Home() {
  const selecot=useAppSelector((state)=>state.loginlice.user)


  return (
    <div>
      Home page {selecot?.email}</div>

  )
}
