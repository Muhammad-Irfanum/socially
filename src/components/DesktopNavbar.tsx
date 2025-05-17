//complete the desktop navbar component
import { currentUser } from '@clerk/nextjs/server'
import ModeToggle from './ModeToggle'
import { Button } from './ui/button'
import { BellIcon, HomeIcon, UserIcon } from 'lucide-react'
import Link from 'next/link'

import { SignInButton, UserButton } from '@clerk/nextjs'


async function DesktopNavbar() {
  const user = await currentUser()


  return (
    
    <div className='hidden md:flex  items-center space-x-4'>
      <ModeToggle />
      <Button variant='ghost' className='flex items-center gap-2' asChild>
        <Link href='/'>
        <HomeIcon className='h-4 w-4' />
          <span className='hidden md:inline'>Home</span>
        </Link>
      </Button>
      {user ? (
        <>
        <Button variant="ghost" className='flex items-center gap-2' asChild>
          <Link href='/notifications'>
          <BellIcon className='h-4 w-4' />
            <span className='hidden md:inline'>Notifications</span>
          </Link>
        </Button>
        <Button variant='ghost' className='flex items-center gap-2' asChild>
          <Link href={`/profile/${
            user.username ??user.emailAddresses[0].emailAddress.split('@')[0]}`}
            >
           <UserIcon className='h-4 w-4' />
            <span className='hidden md:inline'>Profile</span>
          
          </Link>
        </Button>
        <UserButton/>
        </>
      ) : (
        <SignInButton mode="modal">
        <Button variant="default" className='flex items-center gap-2' asChild>
          <Link href='/sign-in'>Sign In</Link>
        </Button>
        </SignInButton>
      )}
      
    </div>
  )
}

export default DesktopNavbar