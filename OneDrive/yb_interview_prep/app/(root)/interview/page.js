import React from 'react'
import Agent from '@/components/agent';

const page = () => {
  return (
    <>
    <h3>Interview Generation</h3>
    <Agent username="You" userId = "user1" type="generate"/>
    </>
  )
}

export default page
