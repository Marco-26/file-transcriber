import React, { Dispatch, SetStateAction } from 'react'
import { Tabs, TabsList, TabsTrigger } from './UI/Tabs';
import { UploadFileButton } from './UploadFileButton';
import { FileEntry } from '../shared/Types';
import { User } from '../shared/User';
  
interface TableHeaderProps{
  user:User | undefined; 
  files: FileEntry[] | undefined;
  setFiles: Dispatch<SetStateAction<FileEntry[] | undefined>>;
}

const TableHeader:React.FC<TableHeaderProps> = ({user,files,setFiles}) =>  {
  return (
    <div>
      <div className='mb-7'>
        <h1 className='text-3xl'>Dashboard</h1>
        <p>All your transcriptions in one place</p>
      </div>
      <div className='flex items-center justify-between mb-5'>
        <Tabs defaultValue="all">
          <div className="flex items-center">
            <TabsList>
              <TabsTrigger value="all">All</TabsTrigger>
              <TabsTrigger value="draft">Done</TabsTrigger>
            </TabsList>
          </div>
        </Tabs>
        <UploadFileButton user={user} files={files} setFiles={setFiles}  />
      </div>
    </div>
  )
}

export default TableHeader