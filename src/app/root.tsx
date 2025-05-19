import { Outlet } from 'react-router'

export default function Root() {
  return (
    <div>
      <h1>Root Component </h1>
      <Outlet />
    </div>
  )
}
