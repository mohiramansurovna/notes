'use client'
import { useEdgeStore } from "@/lib/edgestore";
export default function useImageUrl(setProgress:React.Dispatch<React.SetStateAction<number>>, oldUrl:string|null){
    const {edgestore}=useEdgeStore();
    const rest=oldUrl?{replaceTargetUrl:oldUrl}:{};
    const run=async(file:File)=>{
        if(file){
            try{
                const upload=await edgestore.profileImages.upload({file, onProgressChange:(progress:number)=>setProgress(progress),options:rest});
                return {status:200,url:upload.url,miniUrl:upload.thumbnailUrl}
            }catch(e){
                console.log('server error in useImageUrl',e)
                return {status:400,url:'',miniUrl:''};

            }
        }else{
            return {status:400,url:'',miniUrl:''};
        }
    }
    return run;
}

