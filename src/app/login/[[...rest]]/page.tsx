import { SignIn } from "@clerk/nextjs";

const Login = () => {
    return ( <div className="h-full grid place-content-center">
            <SignIn />
        </div> 
    );
}
 
export default Login;