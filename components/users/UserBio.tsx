import {format} from "date-fns"

import useCurrentUser from '@/hooks/useCurrentUser';
import useUser from '@/hooks/useUser';
import React, { useMemo } from 'react'


interface UserBioProps {
    userId: string;
  }

const UserBio:React.FC<UserBioProps> = ({userId})=>{
    const {data: fetchedUser } = useUser(userId);
    const {data : currentUser} = useCurrentUser();


    const createdAt = useMemo(() => {
        if (!fetchedUser?.createdAt) {
          return null;
        }
    
        return format(new Date(fetchedUser.createdAt), 'MMMM yyyy');
      }, [fetchedUser?.createdAt])

    return(

    )
}

export default UserBio
