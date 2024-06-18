'use client'
import Link from 'next/link';
import {SignOutButton} from '@clerk/nextjs';
import Container from './container';
import { TbCalendarRepeat, TbCreditCard, TbHeartHandshake, TbLayoutDashboard, TbSettings2 } from 'react-icons/tb';
import { Button } from './ui/button';
import Image from 'next/image';

const Sidebar = () => {

    return ( <div className='h-full max-h-screen fixed top-0 w-72'>
        <Container>
            <div className='flex flex-col gap-2 justify-between h-full'>
                <div className='space-y-10'>
                    <div className='flex items-center gap-2'>
                        <Image src={'/logos/logo-base-256x256.png'} width={40} height={40} alt='Subscribe Logo'/>
                        <h1 className='text-2xl font-bold'>Subscribe</h1>
                    </div>
                    <ul className="flex-1 flex flex-col gap-2">
                        <Link href='/dashboard' className={`bg-purple-600/10 text-purple-800 p-2 rounded flex gap-2 items-center`}>
                            <TbLayoutDashboard />
                            Dashboard
                        </Link>
                        <Link href='/subscriptions' className='text-purple-800 p-2 rounded flex gap-2 items-center'>
                            <TbCalendarRepeat />
                            Subscriptions
                        </Link>
                        <Link href='/dashboard' className='text-purple-800 p-2 rounded flex gap-2 items-center'>
                            <TbCreditCard />
                            Payment
                        </Link>
                        <Link href='/dashboard' className='text-purple-800 p-2 rounded flex gap-2 items-center'>
                            <TbHeartHandshake />
                            Support
                        </Link>
                        <Link href='/dashboard' className='text-purple-800 p-2 rounded flex gap-2 items-center'>
                            <TbSettings2 />
                            Settings
                        </Link>
                        
                    </ul>
                </div>
                <div className='flex flex-col gap-2'>
                    {/* <Button asChild>
                        <Link href='/profile'>Profile</Link>
                    </Button> */}
                    <Button size={'sm'} className='bg-destructive' asChild>
                        <SignOutButton />
                    </Button>
                </div>
            </div>
        </Container>
    </div> );
}
 
export default Sidebar;