import { useSession } from 'next-auth/react'
import React from 'react'

export default function Dashboard() {
  const { data: session, status, update } = useSession();
  return (
    <pre>
      {status === "authenticated" && JSON.stringify(session, null, 2)}
    </pre>
  )
}
