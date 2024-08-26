const url = `https://api.cloudinary.com/v1_1/${import.meta.env.VITE_CLOUDINARY_CLOUD_NAME}/auto/upload`;


const uploadFile = async (file) => {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET);

    try {
        const response = await fetch(url, {
            method: 'POST',
            body: formData,
        });

        if (!response.ok) {
            throw new Error('Failed to upload file.');
        }

        const responseData = await response.json();
        return responseData;
    } catch (error) {
        console.error('Error uploading file:', error);
        throw error;
    }
};

export default uploadFile;
