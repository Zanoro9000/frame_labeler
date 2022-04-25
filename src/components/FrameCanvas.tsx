import { useCallback } from "react"
import { useCanvas } from "../hooks/useCanvas";
import { getFrameUrl } from "../redux/actionCreators.ts/appActions";
import { addBox, Box, useAppSelector } from "../redux/slices/appSlice";
import { useAppDispatch } from "../redux/store";

export function FrameCanvas() {
  const dispatch = useAppDispatch();
  const boxes = useAppSelector(s => s.boxes[s.frame] ?? []);
  const frame = useAppSelector(s => s.frame);

  // load image
  const drawFn = useCallback((context: CanvasRenderingContext2D) => {
    return new Promise<void>(res => {
      const img = new Image();
      // img.src = `data:image/jpg;${image}`;
      img.src = getFrameUrl(frame);

      img.onload = () => {
        context.drawImage(img, 0, 0)

        context.lineWidth = 2;
        context.strokeStyle = 'black';
        boxes.forEach(b => {
          context.beginPath();
          context.rect(b.x, b.y, b.w, b.h)
          context.stroke();
        })  
        res();
      }

      img.onerror = () => res();
    })
  }, [frame, boxes])  

  const onEndRegion = useCallback((e: MouseEvent, box: Box) => {
    dispatch(addBox(box))
  }, [dispatch]);

  const ref = useCanvas(drawFn, { onEndRegion })

  return <div className='frameCanvas'>
    <canvas ref={ref} width={500} height={500} />
  </div>
}