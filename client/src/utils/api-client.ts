 import axios, { AxiosResponse, AxiosError } from 'axios';

type ResponseCallback = (resp: AxiosResponse) => void
type SuccessCallback = (message: string) => void
type ErrorCallback = (error: AxiosError) => void

// export async function getTranscriptionsEntries(user_id:string, onSuccess: SuccessCallback, onError: ErrorCallback) {
//   const formData = new FormData()
//   // Append each file to formData
//   formData.append("user_id", user_id);
  
//   console.log("Uploading the file...")

//   const response = await axios.post('api/entries', formData)
//     .then((response: AxiosResponse<{ message: string, transcriptions:any[] }>) => {
//       onSuccess(response.data.message);
//       console.log(response.data.transcriptions)
//     })
//     .catch((error: AxiosError) => {
//       onError(error);
//     });
// }
type TranscriptionResponse = {
  id:string,
  user_id:string,
  filename: string;
  // Add other properties as needed
};
export async function getTranscriptionsEntries(
  user_id: string,
  onSuccess: SuccessCallback,
  onError: ErrorCallback
): Promise<TranscriptionResponse[]> {
  const formData = new FormData();
  formData.append('user_id', user_id);
  
  console.log('Uploading the file...');

  try {
    const response: AxiosResponse<{ message: string; transcriptions: TranscriptionResponse[] }> = await axios.post('api/entries', formData);
    onSuccess(response.data.message);
    return response.data.transcriptions; 
  } catch (error) {
    onError(error as AxiosError);
    return []; 
  }
}

export async function processUpload(user_id:string,file: File, onSuccess: SuccessCallback, onError: ErrorCallback) {
  const formData = new FormData()
  formData.append("file", file);
  formData.append("user_id", user_id);
  
  await axios.post('api/upload', formData)
    .then((response: AxiosResponse<{ message: string, file_info:any }>) => {
      onSuccess(response.data.message);
      return response.data.file_info
    })
    .catch((error: AxiosError) => {
      onError(error);
    });
}

export async function processTranscription(file: File, onSuccess: SuccessCallback, onError: ErrorCallback) {
  const data = {
    filename: file.name,
  };

  console.log("Starting transcription...")
  console.log("This might take awhile")
  
  await axios.post('api/transcript', data)
    .then((response: AxiosResponse<{ message: string }>) => {
      onSuccess("" + response.data);
    })
    .catch((error: AxiosError) => {
      onError(error);
    });
}

export async function processDelete(filename: string, onSuccess: SuccessCallback, onError: ErrorCallback) {
  console.log("Deleting file...")

  await axios.delete('api/delete/'+filename)
    .then((response: AxiosResponse<{ message: string }>) => {
      onSuccess("" + response.data);
    })
    .catch((error: AxiosError) => {
      onError(error);
    });
}

export async function processLogin(email: string, password:string, onResponse: ResponseCallback,onError: ErrorCallback) {
  // const data = {
  //   "email": email,
  //   "password": password
  // };

  await axios.post('/login')
    .then((response: AxiosResponse<{ message: string }>) => {
      onResponse(response)
    })
    .catch((error: AxiosError) => {
      onError(error);
    });
}

export async function processSignup(email: string, password:string, confirmPassword:string,name:string, onResponse: ResponseCallback,onError: ErrorCallback) {
  const data = {
    "email": email,
    "password": password,
    "confirmPassword":confirmPassword,
    "name":name
  };

  await axios.post('/signup', data)
    .then((response: AxiosResponse<{ message: string }>) => {
      onResponse(response)
    })
    .catch((error: AxiosError) => {
      onError(error);
    });
}