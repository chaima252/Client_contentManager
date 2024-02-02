import React from 'react'

function AddUnit() {
  return (
    <div class="content" style={{justifyContent:'center', display:'Flex',alignItems:'center',marginTop:'60px'}} >
    <div class="form" 
    style={{backgroundColor: '#15172b' , borderRadius: '20px',
         boxSizing: 'border-box',
         height: '500px',padding: '20px' ,width: '320px' 
    }}>
    <div class="title" style={{  color: '#eee' ,
        fontFamily: 'sans-serif',
        fontSize: '36px',
       fontWeight: '600',
        marginTop: '30px'
    }}>Welcome</div>
    <div class="subtitle" 
    style={{  color: '#eee' ,
    fontFamily: 'sans-serif',
    fontSize: '16px',
   fontWeight: '600',
    marginTop: '10px'
}}
>Let's add your unit!</div>
    <div class="input-container ic1" style={{ height: '50px',
  position: 'relative',
  width: '100%'}}>
      <input id="unitname" class="input" type="text" placeholder=" "
      style={{ backgroundColor: '#303245',
        borderRadius: '12px',
        border: 0,
        boxSizing: 'border-box',
        color: '#eee',
        fontSize: '18px',
        height: '100%',
        outline: 0,
        padding: '4px 20px 0',
        width: '100%'}} />
      <div class="cut"></div>
      <label for="firstname" class="placeholder" style={{
        color: '#65657b',
        fontFamily: 'sans-serif',
        left: '20px',
        lineHeight: '14px',
        pointerEvents: 'none',
        position: 'absolute',
        transformOrigin: '0 50%',
        transition: 'transform 200ms, color 200ms',
        top: '20px',
      }}>First name</label>
    </div>
   
   
    <button type="text" class="submit">submit</button>
  </div>
  </div>
  )
}

export default AddUnit