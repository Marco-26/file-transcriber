import React from 'react';
import { Loader2, PlusCircle} from 'lucide-react';
import { Button } from './UI/Button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from './UI/Dialog';
import { Input } from './UI/Input';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from './UI/Form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Dispatch, SetStateAction } from 'react';
import { FileEntry } from '../Types/FileEntry';
import { notifyError, updateFiles } from '../utils/utils';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import { User } from '../Types/User';
import UploadApi from '../api/upload';

const formSchema = z.object({
  file: z
    .custom<FileList>((val) => val instanceof FileList, "Required")
    .refine((files) => files.length > 0, `Required`),
});

interface UploadFileButtonProps {
  user:User |undefined;
  files:FileEntry[] | undefined; 
  setFiles: Dispatch<SetStateAction<FileEntry[] | undefined>>;
}

export const UploadFileButton: React.FC<UploadFileButtonProps> = ({ user,files, setFiles }): JSX.Element => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      file: undefined,
    },
  });

  const fileRef = form.register("file");
  
  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    if(!user){
      notifyError("Please login to proceed...")
      return;
    }
    
    const user_id = user.id;
    const fileTemp = values.file[0];

    const fileInfo = await UploadApi.processUpload(user_id, fileTemp)
    
    if(fileInfo != null){
      const fileEntry = JSON.parse(JSON.stringify(fileInfo));
      setFiles((prevFiles) => updateFiles(prevFiles!, fileEntry));
    }
  };

  return (
    <>
      <ToastContainer />
      <Dialog>
        <DialogTrigger asChild>
          <Button disabled={!user}>
            <PlusCircle className="mr-2" />
            New Transcription
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="mb-3">Upload your File(s)</DialogTitle>
          </DialogHeader>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <FormField
                  control={form.control}
                  name="file"
                  render={() => (
                    <FormItem>
                      <FormLabel>File</FormLabel>
                      <FormControl>
                        <Input type="file" {...fileRef} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button type="submit" disabled={form.formState.isSubmitting} className="flex gap-1">
                  {form.formState.isSubmitting && <Loader2 className="h-4 w-4 animate-spin" />}
                  Submit
               </Button>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </>
  );
};