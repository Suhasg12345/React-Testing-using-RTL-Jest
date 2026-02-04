import { screen,render } from "@testing-library/react";
import { MemoryRouter } from "react-router";
import {createServer} from '../../test/server'
import AuthButtons from "./AuthButtons";


async function renderComponent(){
     render(
        <MemoryRouter>
        <AuthButtons/>
        </MemoryRouter>
    );
       await screen.findAllByRole('link')

}

describe("When user is not signed in",()=>{
//Create server
//GEt 'api/user' ---->{user:null}
test("sign in and sign up are visible",async()=>{
await renderComponent();
 const signInButton=screen.getByRole('link',{
        name: /sign in/i
     })
      const signUpButton=screen.getByRole('link',{
        name: /sign up/i
     });
     expect(signInButton).toBeInTheDocument();
     expect(signInButton).toHaveAttribute('href','/signin')
     expect(signUpButton).toBeInTheDocument();
    expect(signUpButton).toHaveAttribute('href','/signup')
})

test("sign out are not  visible",async()=>{

     await renderComponent();

    const signOutButton = screen.queryByRole('link',{
        name:/sign out/i,

    });
    expect(signOutButton).not.toBeInTheDocument();



});
});

describe("When user is  signed in",()=>{
    
//creqte server 
//Get 'api/user' --->{user:{id:3,email:"jack@gmail.com"}}
test("sign in and sign up are not visible",async()=>{

     await  renderComponent()
const signInButton=screen.queryByRole('link',{
    name:/sign in/i
})
const signUpButton=screen.queryByRole('link',{
    name:/sign up/i
})
expect(signInButton).not.toBeInTheDocument();
expect(signUpButton).not.toBeInTheDocument();
})

test("sign out is visible",async()=>{

     await  renderComponent()
const signOutButton=screen.getByRole('link',{
    name:/sign out/i

})
expect(signOutButton).toBeInTheDocument();
expect(signOutButton).toHaveAttribute('href', '/signout');

})
})

