import React, { Dispatch, SetStateAction } from 'react';
import LandingPageGraphic from './graphics/LandingPageGraphic';
import { LoginButton } from './LoginButton';
import { User } from '../Types/User';

interface LandingPageProps {
  user:User | undefined;
  setUser: Dispatch<SetStateAction<User | undefined>>;
}

const LandingPage:React.FC<LandingPageProps> = ({user, setUser}) => {
  return (
    <div className="flex items-center justify-center " style={{ minHeight: 'calc(100vh - 7rem)' }}>
      <div className="max-w-screen-2xl">
        <div className='flex'>
          <div className='mr-5'>
            <h1 className="text-6xl font-bold text-left">
              Effortlessly Transcribe Audio <br /> with Just a Click
            </h1>
            <p className="text-xl mt-4 text-left">
              Save valuable time by converting your audio recordings into text seamlessly with our AI-powered transcription tool. Perfect for meetings, interviews, podcasts, or any other spoken content.
            </p>
            <div className='mt-5'>
              <LoginButton user={user} setUser={setUser}/>
            </div>
          </div>
          <LandingPageGraphic/>
        </div>
        
        <div className="mt-10 text-center">
          <p className="text-lg">
            Join the <span className="text-primary">124,244 users</span> and start transcribing your audios.
          </p>
          <p className="text-2xl font-bold mt-4">Like seriously, it's THIS easy</p>
        </div>
      </div>
    </div>

  );
};

export default LandingPage;