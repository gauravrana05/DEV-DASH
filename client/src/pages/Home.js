import Header from "../components/Header"

export default function HomePage(){
    return(
        <>
             <Header
                heading="Welcome to Dev-Dash"
                linkName="Proceed to Dashboard"
                linkUrl="/dashboard"
                />
        </>
    )
}