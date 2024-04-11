import { Appbar } from "../components/Appbar"
import { BottomWarning } from "../components/BottomWarning"
import { LongButton } from "../components/LongButton"
import { Heading } from "../components/Heading"
import { InputBox } from "../components/InputBox"
import { SubHeading } from "../components/SubHeading"
import { useState } from "react"
import axios from "axios";
import { useNavigate } from "react-router-dom"
import { LandingBar } from "../components/LandingBar"


export const Dashboard = () => {

    
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async () => {
    //   const response = await axios.post("http://localhost:3000/api/v1/user/signin",{
    //     username,
    //     password
    //   })
    //   localStorage.setItem("token", response.data.token)
      navigate("/chatbot")
    }

    return <div>
        <Appbar/>
            <div className="bg-slate-200 h-screen flex justify-center">
            <div className="flex flex-col justify-center">
            <div className="rounded-lg bg-white w-90 text-center p-2 h-max px-4">
            {/* <div className="flex items-center font-bold text-4xl">
                <Heading label={"Let's G"} />
                <span className="-ml-1 mr-2 pt-6 line-through">I</span>
                <Heading label={"ET Insight"}/>
            </div> */}
             <Heading label="Let's Get Insight"/>
                <SubHeading label={"Enter github information"} />
                <InputBox onChange={(e)=>{
                  setPassword(e.target.value);
                }} placeholder="john_doe" label={"Github Username"} />
                <InputBox onChange={(e)=>{
                  setPassword(e.target.value);
                }} placeholder="facebook" label={"Github Repo Name"} />
                <InputBox onChange = {(e)=>{
                setUsername(e.target.value);
                }} placeholder="az12er33adfgefdfdfa23$af" label={"OpenAI API Key (Optional)"} />
                <div className="pt-4">
                <LongButton onClick = {handleSubmit} label={"Proceed"} />
                </div>
                <BottomWarning label={"Don't have an OpenAI API Key?"} buttonText={"Get API key"} to={"https://openai.com/blog/openai-api"} />
            </div>
            </div>
        </div>
    </div>
}
