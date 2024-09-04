import Footer from "../Components/Footer"
import Headers from "../Components/Headers"
import Hero from "../Components/Hero"

interface  Props {
   children: React.ReactNode;
}

const Layout = ({children}:Props) => {
  return (
    <div className=" flex flex-col min-h-screen">
  <Headers/>
      <Hero/>
      <div className="container mx-auto py-10 flex-1">{
 children
}
</div>
<Footer/>
    </div>
  )
}

export default Layout
