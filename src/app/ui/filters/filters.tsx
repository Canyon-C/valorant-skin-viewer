'use client';
import React, { MouseEventHandler, useEffect } from 'react';
import { useState } from 'react';

export const Filters = () => {
    const [filters, setFilters] = useState<string[]>(['Vandal', 'Phantom', 'Bulldog', 'Guardian', 'Odin', 'Ares', 'Operator', 'Outlaw', 'Marshal', 'Judge', 'Bucky', 'Spectre', 'Stinger', 'Sheriff', 'Ghost', 'Frenzy', 'Shorty', 'Classic', 'Melee']);
    const [applyFilters, setApplyFilters] = useState<string>('');
    const [clicked, setClicked] = useState<string[]>([]);

    const clickHandle = (filter: string) => {
        clicked.push(filter);
    }

    return(
    
        filters.map((filter, index) => {
            return(
            <div onClick={() => clickHandle(filter)} key={index} className={`flex justify-center text-sm items-center w-20 textAccent h-2/6 rounded-full ${clicked ? 'bg-green-600' : 'backgroundAccent'}`}>
                <p>{filter}</p>
            </div>
            );
           
            
            
        })    
    );
}