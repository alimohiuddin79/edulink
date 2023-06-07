import React from 'react'
import axios from "axios";
import { CldUploadButton } from 'next-cloudinary';

interface ImageUploaderProps {
    path: string;
    id: string;
}

const ImageUploader: React.FC<ImageUploaderProps> = ({ path, id }) => {
    const handleUpload = (result: any) => {
        axios.post(`/api/${path}`, {
            img: result?.info?.secure_url,
            id
        })

    }
  return (
    <>
        <CldUploadButton
            options={{ maxFiles: 1 }}
            onUpload={handleUpload}
            uploadPreset='vh8znhrn'
        >

        </CldUploadButton>
    </>
  )
}

export default ImageUploader