import { FileEntry } from '@/src/Types/FileEntry';
import React, { Dispatch, SetStateAction, useEffect, useState } from 'react'
import TableHeader from '../TableHeader';
import { TranscriptionsTable } from '../TranscriptionsTable';
import { User } from '@/src/Types/User';
import UserApi from "../../api/user"
import { useNavigate } from "react-router-dom";
import { notifyError } from '../../utils/utils';

interface DashboardProps {
  user:User | undefined; 
  setUser: Dispatch<SetStateAction<User | undefined>>;
}

const Dashboard:React.FC<DashboardProps> = ({user,setUser}) => {
  const [files, setFiles] = useState<FileEntry[] | undefined>([]);
  const [filter, setFilter] = useState<string>('all');
  const navigate = useNavigate();

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

  if(user == null){
    navigate("/");
  }

  return (
    <div className='mx-7 my-7'>
      <TableHeader user={user} files={files} setFiles={setFiles} setFilter={setFilter}/>
      <TranscriptionsTable user={user} files={files!} setFiles={setFiles} filter={filter}/>
    </div>
  )
}

export default Dashboard;