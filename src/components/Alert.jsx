import React from 'react'

export default function Alert(props) {
  return (
    <div className='text-center' style={{height : '55px'}}>
    {props.alert && (
    <div className={`alert alert-${props.alert.Artype}`} role="alert">
 {(props.alert.message + "!!!").toUpperCase()}
</div>)
}
</div>
  )
}
