'use client';
import React from 'react';
import { useState } from 'react';

export const Filters = () => {
    const [filters, setFilters] = useState<boolean[]>([]);
    const [applyFilters, setApplyFilters] = useState<string>('');

    return(
        <>
        
         <header className="text-white text-center text-3xl">Filters</header>
            <div className="flex flex-wrap h-fit py-5 px-5 justify-center items-center gap-2 ">
                <div className=" flex justify-center text-sm items-center w-20 textAccent h-2/6 rounded-full backgroundAccent ">
                    <p>Vandal</p>
                </div>
                <div className=" flex justify-center text-sm items-center w-20 textAccent backgroundAccent h-2/6 rounded-full">
                    <p>Phantom</p>
                </div>
                <div className=" flex justify-center text-sm items-center w-20 textAccent backgroundAccent h-2/6 rounded-full">
                    <p>Bulldog</p>
                </div>
                <div className=" flex justify-center text-sm items-center w-20 textAccent backgroundAccent h-2/6 rounded-full">
                    <p>Guardian</p>
                </div>
                <div className=" flex justify-center text-sm items-center w-20 textAccent backgroundAccent h-2/6 rounded-full">
                    <p>Odin</p>
                </div>
                <div className=" flex justify-center text-sm items-center w-20 textAccent backgroundAccent h-2/6 rounded-full">
                    <p>Ares</p>
                </div>
                <div className=" flex justify-center text-sm items-center w-20 textAccent backgroundAccent h-2/6 rounded-full">
                    <p>Operator</p>
                </div>
                <div className=" flex justify-center text-sm items-center w-20 textAccent backgroundAccent h-2/6 rounded-full">
                    <p>Outlaw</p>
                </div>
                <div className=" flex justify-center text-sm items-center w-20 textAccent backgroundAccent h-2/6 rounded-full">
                    <p>Marshal</p>
                </div>
                <div className=" flex justify-center text-sm items-center w-20 textAccent backgroundAccent h-2/6 rounded-full">
                    <p>Judge</p>
                </div>
                <div className=" flex justify-center text-sm items-center w-20 textAccent backgroundAccent h-2/6 rounded-full">
                    <p>Bucky</p>
                </div>
                <div className=" flex justify-center text-sm items-center w-20 textAccent backgroundAccent h-2/6 rounded-full">
                    <p>Spectre</p>
                </div>
                <div className=" flex justify-center text-sm items-center w-20 textAccent backgroundAccent h-2/6 rounded-full">
                    <p>Stinger</p>
                </div>
                <div className=" flex justify-center text-sm items-center w-20 textAccent backgroundAccent h-2/6 rounded-full">
                    <p>Sheriff</p>
                </div>
                <div className=" flex justify-center text-sm items-center w-20 textAccent backgroundAccent h-2/6 rounded-full">
                    <p>Ghost</p>
                </div>
                <div className=" flex justify-center text-sm items-center w-20 textAccent backgroundAccent h-2/6 rounded-full">
                    <p>Frenzy</p>
                </div>
                <div className=" flex justify-center text-sm items-center w-20 textAccent backgroundAccent h-2/6 rounded-full">
                    <p>Shorty</p>
                </div>
                <div className=" flex justify-center text-sm items-center w-20 textAccent backgroundAccent h-2/6 rounded-full">
                    <p>Classic</p>
                </div>
                <div className=" flex justify-center text-sm items-center w-20 textAccent backgroundAccent h-2/6 rounded-full">
                    <p>Melee</p>
                </div>

            </div>
        </>
       
    );
}