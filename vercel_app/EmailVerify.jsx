import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";

const EmailVerify = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [msg, setMsg] = useState("");
  const [spin, setSpin] = useState(false);

  const handleOTP = async (e) => {
    e.preventDefault();

    if (!email || !otp) {
      toast.error("Please fill all fields");
      return;
    }

    setSpin(true);

    try {
      const response = await fetch("http://localhost:5000/api/verify", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, otp }),
      });

      const data = await response.json();

      if (!response.ok) {
        toast.error(data.message || "Email verification failed");
      } else {
        setMsg(data.message);
        toast.success("Email verified successfully!");
        setTimeout(() => {
          navigate("/userlogin");
          setMsg("");
        }, 3000);
      }
    } catch (error) {
      toast.error("Server error: " + error.message);
    } finally {
      setSpin(false);
    }
  };

  useEffect(() => {
    setSpin(false);
  }, []);

  const a1 = email;
  const a2 = otp;
  const all = { a1, a2 };
  console.log("Email and OTP data:", all);

  return (
    <div style={{ background: "url(https://storage.googleapis.com/gweb-uniblog-publish-prod/images/gmail_security_policies_hero_2.width-1300.jpg)", backgroundSize: "cover", height: "100vh"}}>
      <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSaoKK5rT44YXw08JLNI0oCf8VR45F0XTeXs9kjM29-BiC2OCLcNcs1VD00-ceWPaMbv8Q&usqp=CAU"/>
      <form
        onSubmit={handleOTP}
        style={{
          width: "30rem",
          height: "25rem",
          margin: "auto",
          padding: "20px",
          borderRadius: "0px",
          boxShadow: "0 0 10px #999",
          marginTop: "1rem",
        }}
      >
        <br/>
        <p
          style={{
            fontSize: "18px",
            fontWeight: "bold",
            backgroundColor: "#cc0c39",
            color: "#fff",
            textAlign: "center",
            padding: "12px",
          }}
        >
          {msg || "Access Application after verify your email?"}
        </p>
        <br />
        <input
          type="email"
          placeholder="Enter Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="form-control"
          style={{ padding: "12px", borderRadius: "0px", fontSize: '20px'}}
        />
        <br />
        <input
          type="text"
          placeholder="Enter OTP"
          value={otp}
          onChange={(e) => setOtp(e.target.value)}
          className="form-control"
          style={{ padding: "12px", borderRadius: "0px", fontSize: '20px'}}
        />
        <br /><br/>
       {
        all.a1 && all.a2 ? (
            <button type="submit" className="form-control" style={{ background: "navy", color: "orange", fontWeight: "bold", fontSize: "18px", padding: "10px", borderRadius: "0px", }}>{spin ? (<img src="https://i.pinimg.com/originals/af/10/b0/af10b0661568f8aa2f98a43f7298224e.gif" alt="Loading" style={{ height: "25px" }} />) : ("Verify")} </button>
        ) : (
          <button className="text-center" style={{marginLeft: '9rem', boxShadow: '0px 0px 10px 2px #ff67', fontSize: '20px', cursor: 'pointer'}} disabled>Please fill all fields</button>
        )
       }
      </form>
      <ToastContainer />
    </div>
  );
};

export default EmailVerify;
