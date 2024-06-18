'use client';

import { type ElementRef, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"

import { Button } from '@/components/ui/button';
import { TbX } from 'react-icons/tb';
import { queryClient } from '@/app/layout';

export function Modal({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const dialogRef = useRef<ElementRef<'dialog'>>(null);

  useEffect(() => {
    if (!dialogRef.current?.open) {
      dialogRef.current?.showModal();
    }
  }, []);

  async function onDismiss() {
    await queryClient.invalidateQueries({queryKey: ['subscriptions']})
    router.back();
  }

  return (
    <>
      <Dialog open={true}>
        <DialogContent  className='space-y-2'>
          <DialogHeader>
            <DialogTitle className='flex items-center justify-between'>
              Edit Subscription
              <Button onClick={onDismiss} variant={'ghost'} size={'icon'}>
                <TbX />
              </Button>
            </DialogTitle>
          </DialogHeader>
          <DialogDescription>
            {children}
          </DialogDescription>
        </DialogContent>
      </Dialog>
    </>
  )
   
}