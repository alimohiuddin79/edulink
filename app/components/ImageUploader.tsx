"use client";
import React from 'react'
import axios from "axios";
import { CldUploadButton } from 'next-cloudinary';
import getCurrentUser from '../actions/getCurrentUser';


const ImageUploader = async ({ path } : { path: string }) => {
    const user = await getCurrentUser();
    const { _id } = user;
    const handleUpload = (result: any) => {
        axios.post(`/api/${path}/${_id}`, {
            img: result?.info?.secure_url,
        });
    }
  return (
    <>
        <CldUploadButton
            options={{ maxFiles: 1 }}
            onUpload={handleUpload}
            uploadPreset='vh8znhrn'
        />
    </>
  )
}

export default ImageUploader