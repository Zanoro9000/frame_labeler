import { ActionCreatorWithoutPayload } from "@reduxjs/toolkit";
import { FocusEventHandler } from "react";
import { decrementFrame, incrementFrame, useAppSelector, setFrame } from "../redux/slices/appSlice"
import { useAppDispatch } from "../redux/store"

export function Header() {
  const dispatch = useAppDispatch();
  const { frame, totalFrames } = useAppSelector(s => ({ frame: s.frame, totalFrames: s.totalFrames }))

  const handleClick = (fn: ActionCreatorWithoutPayload<string>) => () => dispatch(fn()) 
  const handleFrameChange: FocusEventHandler<HTMLInputElement> = (e) => dispatch(setFrame(parseInt(e.target.value))) 

  return <div className='header'>
    <button className='previous' onClick={handleClick(decrementFrame)} disabled={frame === 0 || totalFrames === 0}>Previous Frame</button>
    <div>
      <input key={frame} defaultValue={frame} onBlur={handleFrameChange} type='number' /> / {totalFrames}
    </div>
    <button className='next' onClick={handleClick(incrementFrame)} disabled={frame === totalFrames}>Next Frame</button>
  </div>
}