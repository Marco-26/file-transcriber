import { toast } from 'react-toastify';
import { FileToTranscribe } from '../shared/FileType';

export const formatFileSize = (sizeInBytes: number): string => {
  const kilobyte = 1024;
  const megabyte = kilobyte * 1024;
  const gigabyte = megabyte * 1024;

  if (sizeInBytes < kilobyte) {
    return sizeInBytes + ' B';
  } else if (sizeInBytes < megabyte) {
    return (sizeInBytes / kilobyte).toFixed(2) + ' KB';
  } else if (sizeInBytes < gigabyte) {
    return (sizeInBytes / megabyte).toFixed(2) + ' MB';
  } else {
    return (sizeInBytes / gigabyte).toFixed(2) + ' GB';
  }
}

export const notifyError = (error:string) => toast(
  toast.error(error, {
    position: "bottom-right",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "colored",
  })
);

export const generateFileInfo = (file:File) => {
  const fileInfo:FileToTranscribe = {
    name:file.name,
    duration:"12:05",//TODO: CHANGE
    size:file.size,
    status:"Processing"
  }
  return fileInfo
}