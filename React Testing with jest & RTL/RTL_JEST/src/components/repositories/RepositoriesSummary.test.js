import { screen,render } from "@testing-library/react";
import RepositoriesSummary from "./RepositoriesSummary";


// test("dispaly primary language of repopsitry",()=>{
//     const repopsitory={
//         language:"JavaScript",
//         stargazers_count:5,
//         forks:30,
//         open_issues:1
//     }
    
//     render(<RepositoriesSummary repository={repopsitory} />);

//     const language=screen.getByText('JavaScript');
//     expect(language).toBeInTheDocument();
// })

test("displays information about thr repository",()=>{

    const repopsitory={
        language:"JavaScript",
        stargazers_count:5,
        forks:30,
        open_issues:1
    }
    
    render(<RepositoriesSummary repository={repopsitory} />);

for(let key in repopsitory){
    const value=repopsitory[key];
    const element=screen.getByText(new RegExp(value));
    expect(element).toBeInTheDocument();

}
})