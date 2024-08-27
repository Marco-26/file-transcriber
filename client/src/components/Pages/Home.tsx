import { FileEntry } from '@/src/Types/FileEntry';
import React, { Dispatch, SetStateAction, useEffect, useState } from 'react'
import TableHeader from '../TableHeader';
import { TranscriptionsTable } from '../TranscriptionsTable';
import { User } from '@/src/Types/User';
import { Header } from '../Header';
import UserApi from "../../api/user"

interface HomeProps {
  user:User | undefined; 
  setUser: Dispatch<SetStateAction<User | undefined>>;
}

const Home:React.FC<HomeProps> = ({user,setUser}) => {
  const [files, setFiles] = useState<FileEntry[] | undefined>([]);
  const [filter, setFilter] = useState<string>('all');
  
  useEffect(() => {
    const fetchUser = async () => {
      const response = await UserApi.fetchProfile();

      if(response!=null){
        const mappedUser: User = {
          id: response.id,
          name: response.name,
          email: response.email,
          profileImageURL: response.profileImageURL,
        };

        console.log(mappedUser.profileImageURL)
        
        setUser(mappedUser);
      }
    };

    fetchUser();
  }, [setUser]);

  return (
    <>
      <TableHeader user={user} files={files} setFiles={setFiles} setFilter={setFilter}/>
      <TranscriptionsTable user={user} files={files!} setFiles={setFiles} filter={filter}/>
    </>
  )
}

export default Home;