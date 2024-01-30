import serverAuth from "@/libs/serverAuth";
import { NextApiRequest, NextApiResponse } from "next";


import prisma from '@/libs/prismadb';
import toast from "react-hot-toast";

export default async function handler(req: NextApiRequest, res: NextApiResponse){
    if (req.method !== 'POST' && req.method !== 'DELETE') {
        return res.status(405).end();
    }

    try {
        const { userId } = req.body;

        const { currentUser } = await serverAuth(req);
    
        if (!userId || typeof userId !== 'string') {
          throw new Error('Invalid ID');
        }

        const user = await prisma.user.findUnique({
            where: {
              id: userId
            }
        });

        if (!user) {
            throw new Error('Invalid ID');
        }

        let updatedFollowingIds = [...(user.followingIds || [])];

        if (req.method === 'POST') {
            updatedFollowingIds.push(userId);
        }
        
        if (req.method === 'DELETE') {
            updatedFollowingIds = updatedFollowingIds.filter((followingId) => followingId !== userId);
        }

        const updatedUser = await prisma.user.update({
            where: {
              id: currentUser.id
            },
            data: {
              followingIds: updatedFollowingIds
            }
          });
        
          return res.status(200).json(updatedUser)

    } catch (error) {
        console.log(error);
        toast.error("erro")
        return res.status(404).end();
    }
}