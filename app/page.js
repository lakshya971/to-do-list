"use client"
import React, { useState } from 'react';


const page = () => {

  const [title, setTitle] = useState('');
  const [desc, setDesc] = useState('');

  const [mainTask, setMainTask] = useState([]);

  const submitHandler = (e) => {
    e.preventDefault()
    setMainTask([...mainTask, { title, desc }])
    setTitle('');
    setDesc('');
    console.log(mainTask);
  }

  const deleteHandler = (i) => {
    let copytask = [...mainTask];
    copytask.splice(i, 1);
    setMainTask(copytask);
  }

  let renderTask = <h2 className='text-white text-xl font-semibold'>No Task Available</h2>;

  if (mainTask.length > 0) {
    renderTask = mainTask.map((t, i) => {
      return <li key={i} className='flex mb-1 items-center justify-between'>
        <div className='flex justify-between w-2/3'>
          <h5 className='text-2xl text-white font-bold'>{t.title}</h5>
          <h6 className='text-xl text-white font-semibold'>{t.desc}</h6>
        </div>
        <button
          onClick={() => {
            deleteHandler(i);
          }}
          className='bg-red-500 text-white font-bold px-3 py-2 rounded-xl hover:bg-red-600'>Delete</button>
      </li>
    });
  }

  return (
    <div className='bg-zinc-900 h-screen w-full'>
      <h1 className='bg-zinc-900 
        text-blue-500 h-32 text-5xl font-bold uppercase w-full 
        flex items-center justify-center'>
        Lakshya's To-Do List
      </h1>

      <hr className='text-gray-700 border-1 mb-10' />

      <form onSubmit={submitHandler} className='flex items-center flex-row justify-center gap-4 px-4'>
        <input
          type="text"
          placeholder='Enter Title:'
          className='text-xl text-white border-gray-700 border-2 rounded-xl 
          px-3 py-2 w-[20vw]'
          value={title}
          onChange={(e) => {
            setTitle(e.target.value);
          }}
        />
        <input
          type="text"
          placeholder='Enter Description:'
          className='text-xl text-white border-gray-700 border-2 rounded-xl 
          px-3 py-2 w-[50vw]'
          value={desc}
          onChange={(e) => {
            setDesc(e.target.value);
          }}
        />

        <button
          type="submit"
          className='border-zinc-700 bg-blue-500 hover:bg-blue-600 border-2 rounded-xl 
          px-6 py-2 text-zinc-200 transition-colors'
        >
          Add Task
        </button>
      </form>

      <hr className='text-gray-700 m-10' />

      <div className='m-10 py-10 px-10 bg-gray-500'>
        <ul className='flex flex-col gap-6'>
          {renderTask}
        </ul>
      </div>
    </div>
  )
}

export default page;