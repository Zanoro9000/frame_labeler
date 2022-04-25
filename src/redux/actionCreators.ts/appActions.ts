import { createAsyncThunk } from "@reduxjs/toolkit";

export type VideoMeta = {
  video_name: string,
  frame_count: number,
}

const baseUrl = 'http://invisai-frontend-interview-data.s3-website-us-west-2.amazonaws.com'

export const getFrameUrl = (id: number) => `${baseUrl}/frames/${String(id).padStart(5, '0')}.jpg` 

export const fetchImageMeta = createAsyncThunk(
  'app/fetchImageMeta',
  async (): Promise<VideoMeta> => {
    return fetch(`${baseUrl}/video.json`).then(res => res.json())
  }
)

export const fetchImage = createAsyncThunk(
  'app/fetchImage',
  async (id: number): Promise<string> => {
    return fetch(getFrameUrl(id)).then(res => res.text())
  }
)