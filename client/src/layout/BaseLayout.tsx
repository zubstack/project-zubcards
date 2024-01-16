import './Baselayout.scss'

function BaseLayout({children}) {
  return (
    <main className="main__container">{children}</main>
  )
}

export default BaseLayout
