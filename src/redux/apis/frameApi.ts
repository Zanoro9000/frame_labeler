import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export type VideoMeta = {
  video_name: string,
  frame_count: number,
}

export type Frame = any

// Define a service using a base URL and expected endpoints
export const frameAPI = createApi({
  reducerPath: 'frameAPI',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://invisai-frontend-interview-data.s3-website-us-west-2.amazonaws.com/' }),
  endpoints: (builder) => ({
    getMeta: builder.query<VideoMeta, {}>({
      query: () => `video.json`,
    }),
    getFrame: builder.query<Frame, number>({
      query: (index) => `frames/${index}.jpg`,
    }),
  }),
})

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useGetMetaQuery, useGetFrameQuery } = frameAPI