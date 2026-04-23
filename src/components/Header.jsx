import React from 'react'

const Header = () => {
  return (
    <div 
      className='p-2' 
      style={{
        backgroundColor: "var(--indigo-700)", 
        color: "var(--primary-color-text)",
        borderRadius: "var(--border-radius)", 
        padding: "3rem" 
      }}
    >
      <h1 className="text-white text-3xl font-bold">Users CRUD</h1>
    </div>
  )
}

export default Header