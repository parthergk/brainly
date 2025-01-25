import React, { LegacyRef} from 'react'
interface InputProps{
    refrence: LegacyRef<HTMLInputElement> | undefined
}

const Input:React.FC<InputProps> = ({refrence}) => {
  return (
    <input ref={refrence}></input>
  )
}

export default Input