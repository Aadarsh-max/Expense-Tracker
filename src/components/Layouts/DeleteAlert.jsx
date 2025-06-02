import React from 'react'

const DeleteAlert = ({ content, onDelete, onCancel }) => {
  return (
    <div>
      <p className='text-sm text-gray-700'>{content}</p>
      <div className='flex justify-end mt-6 gap-3'>
        <button
          type="button"
          className='px-4 py-2 text-sm font-medium text-white bg-red-600 rounded hover:bg-red-700 transition cursor-pointer'
          onClick={onDelete}
        >
          Delete
        </button>
      </div>
    </div>
  )
}

export default DeleteAlert
