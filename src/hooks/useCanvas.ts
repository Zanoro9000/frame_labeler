import { useEffect, useRef } from "react";
import { Box } from "../redux/slices/appSlice";

type Region = Box
export type useCanvasOptions = { 
  onStartRegion?: (e: MouseEvent) => void, 
  onEndRegion?: (e: MouseEvent, region: Region) => void, 
  onDragRegion?: (e: MouseEvent) => void,
  regionOpts?: {
    color?: string;
    fillColor?: string;
    lineWidth?: number;
  },
}

export function useCanvas(
  drawFn: (context: CanvasRenderingContext2D, frameCount?: number) => Promise<void>, 
  { 
    onStartRegion, 
    onEndRegion, 
    onDragRegion, 
    regionOpts: { 
      color = 'red', 
      fillColor = 'rgba(255, 0, 0, .2)',
      lineWidth = 2 
    } = {} 
  }: useCanvasOptions
){
  const ref = useRef<HTMLCanvasElement>(null);

  // handle mouse events
  useEffect(() => {
    const canvas = ref.current
    if (canvas) {
      const context = canvas.getContext('2d')
      if (context) {
        // animationFrame stuff
        let frameCount = 0;
        let animationFrameId: number;

        // region drag stuff
        let x0 = canvas.offsetLeft - canvas.scrollLeft + canvas.clientLeft
        let y0 = canvas.offsetTop - canvas.scrollTop + canvas.clientTop
        let anchor: { x: number, y: number } | undefined;

        const mouseDown = (e: MouseEvent) => { 
          if (
            e.clientX >= x0 && 
            e.clientX <= x0 + canvas.width && 
            e.clientY >= y0 && 
            e.clientY <= y0 + canvas.height
          ) {
            anchor = { x: e.clientX - x0, y: e.clientY - y0 } 
            onStartRegion?.(e)
          }          
        }

        const mouseMove = (e: MouseEvent) => { 
          if (anchor && context) {
            const { x, y } = anchor;
            //draw
            drawFn(context)
              .then(() => {
                context.lineWidth = lineWidth;
                context.strokeStyle = color;
                context.beginPath();
                context.rect(x, y, e.clientX - x0 - x, e.clientY - y0 - y)
                context.stroke();

                context.fillStyle = fillColor;
                context.beginPath();
                context.fillRect(x, y, e.clientX - x0 - x, e.clientY - y0 - y)
                context.stroke();
              })           

            onDragRegion?.(e)
          }         
        }

        const mouseUp = (e: MouseEvent) => { 
          if (anchor) {
            const { x, y } = anchor;
            onEndRegion?.(e, { x, y, w: e.clientX - x0 - x, h: e.clientY - y0 - y })
            anchor = undefined
          }
        }

        window.addEventListener('mousedown', mouseDown)
        canvas.addEventListener('mousemove', mouseMove)
        window.addEventListener('mouseup', mouseUp)

        const render = () => {
          frameCount++;
          drawFn(context, frameCount);
        }
        animationFrameId = window.requestAnimationFrame(render)

        return () => {
          window.removeEventListener('mousedown', mouseDown)
          canvas.removeEventListener('mousemove', mouseMove)
          window.removeEventListener('mouseup', mouseUp)
          if (animationFrameId !== undefined) window.cancelAnimationFrame(animationFrameId)
        }
      }
    }
  }, [ref, color, fillColor, drawFn, lineWidth, onDragRegion, onEndRegion, onStartRegion])

  return ref;

}