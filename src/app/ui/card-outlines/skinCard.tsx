import * as React from "react"
import { BackgroundGradient } from "../background-gradient";


type SkinCardProps = {
    children: React.ReactNode;
    
  };
  


export const SkinCard: React.FC<SkinCardProps> = (
    {   children,
        
        

    } : {
        children: React.ReactNode;
        
        
    }
) => {
  return (
    <BackgroundGradient>
      <div className="w-80 h-72 sm:w-96 border-2 rounded-3xl py-5 bg-black">
      
      {children}
    
    
  </div>
    </BackgroundGradient>
    
  )
}

