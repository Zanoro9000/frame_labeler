import { ActionCreatorWithoutPayload } from "@reduxjs/toolkit";
import { FocusEventHandler, useRef } from "react";
import { decrementFrame, incrementFrame, useAppSelector, setFrame } from "../redux/slices/appSlice"
import { useAppDispatch } from "../redux/store"

export function Header() {
  const dispatch = useAppDispatch();
  const { frame, totalFrames } = useAppSelector(s => ({ frame: s.frame, totalFrames: s.totalFrames }))

  const handleClick = (fn: ActionCreatorWithoutPayload<string>) => () => dispatch(fn()) 
  const handleFrameChange: FocusEventHandler<HTMLInputElement> = (e) => {
    const val = parseInt(e.target.value)
    if (!isNaN(val)) dispatch(setFrame(val - 1)) 
  }
  
  const timeout = useRef<NodeJS.Timeout>()

  const debounceFrameChange: FocusEventHandler<HTMLInputElement> = (e) => {
    if (timeout.current) clearTimeout(timeout.current)
    timeout.current = setTimeout(() => handleFrameChange(e), 500)
  }

  return <div className='header'>
    <button className='previous' onClick={handleClick(decrementFrame)} disabled={frame === 0 || totalFrames === 0}>Previous Frame</button>
    <div>
      <input key={frame} defaultValue={frame + 1} onChange={debounceFrameChange} onBlur={handleFrameChange} type='number' min={1} max={totalFrames + 1} /> / {totalFrames + 1}
    </div>
    <button className='next' onClick={handleClick(incrementFrame)} disabled={frame === totalFrames}>Next Frame</button>
  </div>
}