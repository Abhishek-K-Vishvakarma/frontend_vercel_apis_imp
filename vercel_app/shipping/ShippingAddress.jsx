import { useRef } from "react"
import { ToastContainer, toast } from "react-toastify";
import { FcElectricity } from "react-icons/fc";
import { GiModernCity } from "react-icons/gi";

const ShippingAddress = () =>{
  const nmRef = useRef();
  const adRef = useRef();
  const cityRef = useRef();
  const stateRef = useRef();
  const zipRef = useRef();
  const countryRef = useRef();


  const handleShippingSubmit = async(e)=>{
    e.preventDefault();
    const obj = {
      name: nmRef.current.value,
      address: adRef.current.value,
      city: cityRef.current.value,
      state: stateRef.current.value,
      zip_code: zipRef.current.value,
      country: countryRef.current.value
    }
   try{
     const response = await fetch("http://localhost:5000/api/shipping", {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(obj)
    });

    const data = await response.json();
    if(!response.ok){
      throw new Error(data.message || "Failed to create shipping address");
    }else{
      toast.success("Shipping Address Created Successfully!", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      console.log(data);
    }
   
   }catch(error){
   toast.error("Error creating shipping address!", error);
   }
  }

  return (
    <div>
      <form onSubmit={handleShippingSubmit} className="card" style={{width: '37rem', height: '48rem', padding: '50px', borderRadius: '0px', margin: 'auto', marginTop: '30px', boxShadow: '0 0 10px #ccc'}}>
        <p style={{background: '#cc0c39', color: '#fff', fontWeight: 'bold', textAlign: 'center', padding: '12px'}}>MAKES SHIPPING ADDRESS</p>
        <br/>
        <label>
          <input type="text" placeholder="Enter Name" ref={nmRef} className="form-control" style={{padding: '12px', fontSize: '20px', borderRadius: '0px'}}/>
        </label>
        <br/>
        <label>
          <input type="text" placeholder="Enter Address" ref={adRef} className="form-control" style={{ padding: '12px', fontSize: '20px', borderRadius: '0px' }} />
        </label>
        <br />
        <label>
          <input type="text" placeholder="Enter City" ref={cityRef} className="form-control" style={{ padding: '12px', fontSize: '20px', borderRadius: '0px' }} />
        </label>
        <br />
        <label>
          <input type="text" placeholder="Enter State" ref={stateRef} className="form-control" style={{ padding: '12px', fontSize: '20px', borderRadius: '0px' }} />
        </label>
        <br />
        <label>
          <input type="text" placeholder="Enter Zip_Code" ref={zipRef} className="form-control" style={{ padding: '12px', fontSize: '20px', borderRadius: '0px' }} />
        </label>
        <br />
        <label>
          <input type="text" placeholder="Enter Country" ref={countryRef} className="form-control" style={{ padding: '12px', fontSize: '20px', borderRadius: '0px' }} />
        </label>
        <br /><br/>
        <button type="submit" className="form-control" style={{ background: 'navy', color: 'orange', fontWeight: 'bold', fontSize: '20px', borderRadius: '0px' }}>Shipping</button>
      </form>
      <ToastContainer/>
      <FcElectricity style={{fontSize: '50rem', marginTop: '-46.5rem'}}/>
      <GiModernCity style={{ fontSize: '40rem', marginTop: '-62rem', marginLeft: '78rem', color: 'pink'}}/>
    </div>
  )
}

export default ShippingAddress;
