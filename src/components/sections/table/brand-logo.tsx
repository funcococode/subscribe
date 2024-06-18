"use client"

import {SiNetflix, SiGoogle, SiSpotify, SiApple, SiApplemusic, SiFigma, SiCanva, SiAdobe, SiPeloton, SiPrime, SiCoursera} from 'react-icons/si';
import { TbCircleDot } from 'react-icons/tb';

const BrandLogo = ({brandname} : {brandname: string}) => {
    const name = brandname?.toLowerCase();
    switch(name){
        case 'netflix':
            return <SiNetflix />;
        case 'spotify':
            return <SiSpotify />;
        case 'google':
            return <SiGoogle />;
        case 'apple':
            return <SiApple />;
        case 'apple music':
            return <SiApplemusic />;
        case 'adobe':
            return <SiAdobe />;
        case 'figma':
            return <SiFigma />;
        case 'adobe':
            return <SiAdobe />;
        case 'canva':
            return <SiCanva />;
        case 'peloton':
            return <SiPeloton />;
        case 'amazon prime':
            return <SiPrime />;
        case 'prime video':
            return <SiPrime />;
        case 'coursera':
            return <SiCoursera />;
        default: 
            return <TbCircleDot />
    }
}
 
export default BrandLogo;