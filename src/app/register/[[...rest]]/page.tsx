import { SignUp } from "@clerk/nextjs";

const Register = () => {
    return ( <div className="h-full grid place-content-center">
            <SignUp />
        </div> 
    );
}
 
export default Register;