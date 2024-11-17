"use client"

import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import Placeholder from '@tiptap/extension-placeholder'
import { useAppSelector } from '@/lib/hooks'
import UserAvatar from '@/components/UserAvatar'
import "./style.css"
import { useSubmitMutaion } from './muation'
import LodingButton from '@/components/LodingButton'

export default function PostEditor() {
    const {user}=useAppSelector((state)=>state.loginlice)
    const mutaion = useSubmitMutaion()
    const editor = useEditor({
        extensions: [
            StarterKit.configure({
                bold:false,
                italic:false
            }),
            Placeholder.configure({
                placeholder:"Write something here.."
            })

        ],
      })

      const inputPost =editor?.getText({
        blockSeparator:"\n",
      }) || "";




      async function onSubmit(){
        mutaion.mutate({ content: inputPost },{onSuccess:()=>{
          editor?.commands.clearContent();
        }});
        // const res = await graphqlclient.request(cretePostMutaion, {
        //     input: { content: inputPost },
        //   });
       
      }
      
  return (
    <div className='flex flex-col gap-5 rounded-2xl bg-card p-5 shadow-sm '>
        <div className='flex gap-5'>
            <UserAvatar avatarUrl={user?.userAvtar} className='hidden sm:inline'/>
            <EditorContent editor={editor} className='w-full max-h-[20rem] overflow-y-auto bg-background rounded-2xl px-5 py-3'/>
        </div>
        <div className='flex justify-end'>
            <LodingButton onClick={onSubmit} loding={mutaion.isPending} disabled={!inputPost.trim()} className='min-w-20'>Post</LodingButton>
        </div>
    </div>
  )
}
