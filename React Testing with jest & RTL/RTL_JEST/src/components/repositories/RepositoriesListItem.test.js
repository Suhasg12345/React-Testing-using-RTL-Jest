import { screen, render } from "@testing-library/react";
import RepositoriesListItem from "./RepositoriesListItem";
import { MemoryRouter } from 'react-router-dom';

// jest.mock("../tree/FileIcon",()=>{
//     return()=>{
//         return 'File Icon Component'
//     }
// })
function renderComponent() {
    const repository = {
        full_name: 'fachbook/react',
        language: "JavaScript",
        description: "A js library",
        owner: {login:"facebook"},
        name: "react",
        html_url: "https://github.com/facebook/react"
    }
    render(
        <MemoryRouter><RepositoriesListItem repository={repository} />
        </MemoryRouter>
    )

    return {repository};
}

test("show a link to github homepage to the repository", async() => {
  const {repository}=  renderComponent();

await screen.findByRole('img',{
    name:'JavaScript'
})
const link=screen.getByRole('link',{
    name:/github repository/i
});
expect(link).toHaveAttribute('href',repository.html_ulr
)

})

// const pause=()=>{
//     return new Promise(resolve=>{
//         setTimeout(()=>{
//             resolve()
//         },100)
//     })
// }