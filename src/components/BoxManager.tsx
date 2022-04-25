import { removeBox, useAppSelector } from "../redux/slices/appSlice";
import { useAppDispatch } from "../redux/store";
import TrashCan from '../svg/trash-24'

export function BoxManager() {
  const dispatch = useAppDispatch();
  const boxes = useAppSelector(s => s.boxes[s.frame] ?? []);

  const onDelete = (boxIndex: number) => () => {
    dispatch(removeBox(boxIndex))
  }

  return <div className='boxManager'>
    <div className="boxTitle">
      Boxes
    </div>
    <div className='boxManagerContent'>
      {boxes.map((b, i) => <div key={`${i}-${b.x}-${b.y}-${b.w}-${b.h}`} className='boxRow'>
        <span className='boxLabel'>{`Box ${i}`}</span>
        <button className='boxDelete' onClick={onDelete(i)}>{<TrashCan />}</button>
      </div>)}    
    </div>
  </div>
}