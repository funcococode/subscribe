"use client"
import { SignUpButton } from "@clerk/nextjs";
import Container from "./container";
import { Button } from "./ui/button";

const Header = () => {
    return ( <>
        <header className="py-10 sticky top-0 bg-white">
            <Container>
                <nav className='flex items-center'>
                    <h1>SubScribe</h1>
                    <ul className="flex-1 flex justify-center gap-10">
                        <li>Home</li>
                        <li>About</li>
                        <li>Features</li>
                        <li>Pricing</li>
                        <li>Help Center</li>
                    </ul>
                    <div>
                        <Button size={"sm"} className='bg-emerald-600/10 text-emerald-600 hover:bg-emerald-600/70 hover:text-white shadow-none'>
                            <SignUpButton />
                        </Button>
                    </div>
                </nav>
            </Container>
        </header>
    </> );
}
 
export default Header;