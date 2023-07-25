import Card from "../components/Card.js"
import Navbar from "../components/Navbar.js"

export default function Dashboard() {
  return (
    <>
      <Navbar  />
    <div class="flex justify-center flex-wrap">
    <Card 
        name ="Netflex"
        description= "Video streaming application"
        providers = {["Google", "Spotify" , "Tinder"]}

      />
      <Card 
        name ="Netflex"
        description= "Video streaming application"
        providers = {["Google", "Spotify" , "Tinder"]}

      />
      <Card 
        name ="Netflex"
        description= "Video streaming application"
        providers = {["Google", "Spotify" , "Tinder"]}

      />
      <Card 
        name ="Netflex"
        description= "Video streaming application"
        providers = {["Google", "Spotify" , "Tinder"]}

      />
      <Card 
        name ="Netflex"
        description= "Video streaming application"
        providers = {["Google", "Spotify" , "Tinder"]}

      />
      </div>
    </>
  )
}
