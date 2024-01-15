import './Baselayout.scss'

function baseLayout({children}) {
  return (
    <main className="main__container">{children}</main>
  )
}

export default baseLayout
