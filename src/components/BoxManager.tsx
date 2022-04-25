import { useAppSelector } from "../redux/slices/appSlice";

export function BoxManager() {
  const boxes = useAppSelector(s => s.boxes[s.frame] ?? []);
  return <div className='boxManager'>
    <div className="boxTitle">
      Boxes
    </div>
    <div className='boxManagerContent'>
      {boxes.map((b, i) => <div key={`${i}-${b.x}-${b.y}-${b.w}-${b.h}`} className='boxRow'>
        <span className='boxLabel'>{`Box ${i}`}</span>
        <button className='boxDelete'>Delete</button>
      </div>)}    
    </div>
  </div>
}