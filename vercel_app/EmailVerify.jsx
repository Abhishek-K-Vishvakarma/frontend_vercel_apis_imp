import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
const EmailVerify = () => {
  const emRef = useRef();
  const otpRef = useRef();
  const navigate = useNavigate();
  const [msg, setMsg] = useState("");
  const [spin, setSpin] = useState(false);
  const handelOTP = async(e)=>{
    e.preventDefault();
    const obj = {
      email : emRef.current.value,
      otp : otpRef.current.value
    }
    // if (!emRef.current.value || !otpRef.current.value) {
    //   toast.error("Please fill all fields");
    //   return;
    // }
    try{
      const response = await fetch("http://localhost:5000/api/verify", {
        method: "POST",
        headers: {
          "Content-Type" : "application/json",
        },
        body: JSON.stringify(obj)
       });
       const data = await response.json();
       if(!response.ok){
        toast.error(data.message || "Email verification failed");
      }else{
        setMsg(data.message);
         toast.success("Email verified successfully!");
         setSpin(true);
          setTimeout(()=>{
          navigate("/userlogin");
          setMsg("");
          setSpin(false);
         }, 3000);
        }
    }catch(error){
       toast.error("Server error :", error);
    }
  }

  const processing = emRef.current?.value && otpRef.current?.value 
  return (
  <div>
    <form onSubmit={handelOTP} style={{ width: "30rem", height: '25rem', margin: "auto", padding: "20px", backgroundColor: "#f8f9fa", borderRadius: "0px", boxShadow: "0 0 10px #ccc", marginTop: '10rem' }}>
      {msg ? <p style={{ color: 'blue', fontWeight: 'bold', textAlign: 'center', fontSize: '20px'}}>{msg}</p> : <p style={{ fontSize: '18px', fontWeight: 'bold', backgroundColor: '#cc0c39', color: '#fff', textAlign: "center", padding: '12px' }}>Access Application after verify your email?</p>}
       <br/>
       <label>
        <input type="email" placeholder="Enter Email" ref={emRef} className="form-control" style={{padding: '12px', width: '27.55rem', borderRadius: '0px'}}/>
       </label>
       <br/><br/>
        <label>
          <input type="text" placeholder="Enter OTP" ref={otpRef} className="form-control" style={{ padding: '12px', width: '27.55rem', borderRadius: '0px' }} />
        </label>
        <br /><br />
        {!processing ? (<button type="submit" className="form-control" style={{ background: 'navy', color: 'orange', fontWeight: 'bold', fontSize: '18px', padding: '10px', borderRadius: '0px' }}>{spin ? <img src="https://i.pinimg.com/originals/af/10/b0/af10b0661568f8aa2f98a43f7298224e.gif"/> : "Verify"}</button>) : (<button disabled>Verify</button>)}
      </form>
      <ToastContainer/>
    </div>
  )
}

export default EmailVerify;
