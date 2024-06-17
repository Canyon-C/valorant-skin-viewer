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
      <div className="w-80 h-72 sm:w-96 rounded-3xl bg-gray-900 py-5">
      
      {children}
    
    
  </div>
    </BackgroundGradient>
    
  )
}

